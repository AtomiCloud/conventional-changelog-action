import {error, getInput, info, setFailed, setOutput} from '@actions/core';
import {VersioningFactory} from "./version"
import {Core, Kore} from "@kirinnee/core"
import {InitializeGit} from "./helpers/gitFactory";
import {Get} from "./helpers/coreHelper";
import {RequireScript} from "./helpers/requireScript";
import {ConventionalRecommendedBump} from "./helpers/conventionalCommitRecommendation";
import {Err, None, Ok, Result} from "@hqoss/monads";
import {FileExtension, GetFileExtension, ReleaseType} from "./helpers/util";
import {SupportedFileVersion} from "./version/versionFile";
import {generateFileChangelog, generateStringChangelog} from "./helpers/generateChangelog";


const c: Core = new Kore();
c.ExtendPrimitives();

async function handleVersioningByExtension(f: VersioningFactory, ext: FileExtension, releaseType: ReleaseType): Promise<Result<string, string>> {
    return f.get(ext).match({
        none: (): Promise<Result<string, string>> => {
            return Promise.resolve(Err(`File extension "${ext}" is not supported`))
        },
        async some(val: SupportedFileVersion): Promise<Result<string, string>> {
            const newVersion = await val.bump(releaseType);
            return Ok(newVersion)
        }
    });
}

async function run() {
    try {
        const conventionalConfigFile = Get('config-file-path')
        const gitCommitMessage = getInput('git-message')
        const gitUserName = getInput('git-user-name')
        const gitUserEmail = getInput('git-user-email')
        const tagPrefix = Get('tag-prefix')
        const preset = conventionalConfigFile.isNone() ? Get('preset') : None;
        const preCommitFile = Get('pre-commit')
        const outputFile = getInput('output-file')
        const releaseCount = getInput('release-count')
        const versionFile = getInput('version-file')
        const versionPath = getInput('version-path')
        const skipVersionFile = getInput('skip-version-file').toLowerCase() === 'true'
        const skipCommit = getInput('skip-commit').toLowerCase() === 'true'
        const skipEmptyRelease = getInput('skip-on-empty').toLowerCase() === 'true'
        
        const preChangelogGenerationFile = Get('pre-changelog-generation')
        
        info(`Using "${preset.unwrapOr('')}" preset`)
        info(`Using "${tagPrefix.unwrapOr('')}" as tag prefix`)
        info(`Using "${conventionalConfigFile.unwrapOr('')}" as config file`)
        info(`Using "${gitCommitMessage}" as commit message`)
        info(`Using "${gitUserName}" as git user.name`)
        info(`Using "${gitUserEmail}" as git user.email`)
        info(`Using "${releaseCount}" release count`)
        info(`Using "${versionFile}" as version file`)
        info(`Using "${versionPath}" as version path`)
        info(`Using "${outputFile}" as output file`)
        
        if (preCommitFile.isSome()) {
            info(`Using "${preCommitFile}" as pre-commit script`)
        }
        
        if (preChangelogGenerationFile.isSome()) {
            info(`Using "${preChangelogGenerationFile}" as pre-changelog-generation script`)
        }
        
        info(`Skipping empty releases is "${skipEmptyRelease ? 'enabled' : 'disabled'}"`)
        info(`Skipping the update of the version file is "${skipVersionFile ? 'enabled' : 'disabled'}"`)
        const vff = new VersioningFactory(versionFile, versionPath, tagPrefix.unwrapOr(''));
        const git = await InitializeGit();
        info('Pull to make sure we have the full git history')
        const method = getInput('git-pull-method')
        const result = await git.pull(method)
        if (result.isErr()) {
            error(result.unwrapErr())
            throw result.unwrapErr();
        }
        
        const config = conventionalConfigFile.andThen(RequireScript)
        const recommendationResult = await ConventionalRecommendedBump({preset, tagPrefix, config})
        
        await recommendationResult.map(async recommendation => {
            info(`Recommended release type: ${recommendation.releaseType}`)
            
            // If we have a reason also log it
            if (recommendation.reason) info(`Because: ${recommendation.reason}`)
            
            
            const GitHandleVersion = async (): Promise<string> => {
                info('Using GIT to determine the new version')
                const result = await handleVersioningByExtension(
                    vff,
                    'git',
                    recommendation.releaseType ?? "patch",
                )
                if (result.isErr()) {
                    error(result.unwrapErr())
                    throw result.unwrapErr();
                }
                return result.unwrap()
                
            }
            
            const FileHandleVersion = async (): Promise<string> => {
                const files = versionFile.split(',').TrimAll();
                info(`Files to bump: ${files.join(', ')}`)
                
                const versioning = await Promise.all(
                    files.map((file) => {
                        return GetFileExtension(file)
                            .map((ext) => {
                                
                                info(`Bumping version to file "${file}" with extension "${ext}"`)
                                
                                return handleVersioningByExtension(vff, ext, recommendation.releaseType ?? "patch")
                            });
                    }),
                )
                const success = versioning.filter(x => x.isOk()).map(x => x.unwrap());
                if (success.length == 0) {
                    throw "no valid version file found";
                }
                const top = await success[0];
                return top.unwrap();
            }
            
            const newVersion = skipVersionFile || skipCommit ? await GitHandleVersion() : await FileHandleVersion();
            let gitTag = `${tagPrefix}${newVersion}`
            
            await preChangelogGenerationFile.andThen(RequireScript).map(async x => {
                if (!x.preTagGeneration) return;
                const modifiedTag = await x.preTagGeneration(gitTag)
                if (modifiedTag) {
                    info(`Using modified tag "${modifiedTag}"`)
                    gitTag = modifiedTag
                }
            })
            
            // Generate the string changelog
            const stringChangelog = await generateStringChangelog(tagPrefix.unwrapOr(''), preset.unwrapOr(''), newVersion, '1', config)
            info('Changelog generated')
            info(stringChangelog)
            
            // Removes the version number from the changelog
            const cleanChangelog = stringChangelog.split('\n').slice(3).join('\n').trim()
            
            if (skipEmptyRelease && cleanChangelog === '') {
                info('Generated changelog is empty and skip-on-empty has been activated so we skip this step')
                setOutput('skipped', 'true')
                return
            }
            
            info(`New version: ${newVersion}`)
            
            // If output file === 'false' we don't write it to file
            if (outputFile !== 'false') {
                // Generate the changelog
                await generateFileChangelog(tagPrefix.unwrapOr(''), preset.unwrapOr(''), newVersion, outputFile, releaseCount, config)
            }
            
            if (!skipCommit) {
                // Add changed files to git
                await preCommitFile.andThen(RequireScript).map(async x => {
                    if (!x.preCommit) return;
                    await x.preCommit({tag: gitTag, version: newVersion})
                })
                await git.add('.')
                await git.commit(gitCommitMessage.replace('{version}', gitTag))
            }
            
            // Create the new tag
            await git.createTag(gitTag)
            
            info('Push all changes')
            await git.push()
            
            // Set outputs so other actions (for example actions/create-release) can use it
            setOutput('changelog', stringChangelog)
            setOutput('clean_changelog', cleanChangelog)
            setOutput('version', newVersion)
            setOutput('tag', gitTag)
            setOutput('skipped', 'false')
            
            try {
                // If we are running in test mode we use this to validate everything still runs
                git.testHistory()
                
            } catch (error) {
                console.error(error)
                
                setFailed(error)
            }
        })
    } catch (error) {
        setFailed(error)
    }
}

run()
