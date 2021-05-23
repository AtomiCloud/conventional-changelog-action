"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const version_1 = require("./version");
const core_2 = require("@kirinnee/core");
const gitFactory_1 = require("./helpers/gitFactory");
const coreHelper_1 = require("./helpers/coreHelper");
const requireScript_1 = require("./helpers/requireScript");
const conventionalCommitRecommendation_1 = require("./helpers/conventionalCommitRecommendation");
const monads_1 = require("@hqoss/monads");
const util_1 = require("./helpers/util");
const generateChangelog_1 = require("./helpers/generateChangelog");
const c = new core_2.Kore();
c.ExtendPrimitives();
function handleVersioningByExtension(f, ext, releaseType) {
    return __awaiter(this, void 0, void 0, function* () {
        return f.get(ext).match({
            none: () => {
                return Promise.resolve(monads_1.Err(`File extension "${ext}" is not supported`));
            },
            some(val) {
                return __awaiter(this, void 0, void 0, function* () {
                    const newVersion = yield val.bump(releaseType);
                    return monads_1.Ok(newVersion);
                });
            }
        });
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conventionalConfigFile = coreHelper_1.Get('config-file-path');
            const gitCommitMessage = core_1.getInput('git-message');
            const gitUserName = core_1.getInput('git-user-name');
            const gitUserEmail = core_1.getInput('git-user-email');
            const tagPrefix = coreHelper_1.Get('tag-prefix');
            const preset = conventionalConfigFile.isNone() ? coreHelper_1.Get('preset') : monads_1.None;
            const preCommitFile = coreHelper_1.Get('pre-commit');
            const outputFile = core_1.getInput('output-file');
            const releaseCount = core_1.getInput('release-count');
            const versionFile = core_1.getInput('version-file');
            const versionPath = core_1.getInput('version-path');
            const skipVersionFile = core_1.getInput('skip-version-file').toLowerCase() === 'true';
            const skipCommit = core_1.getInput('skip-commit').toLowerCase() === 'true';
            const skipEmptyRelease = core_1.getInput('skip-on-empty').toLowerCase() === 'true';
            const preChangelogGenerationFile = coreHelper_1.Get('pre-changelog-generation');
            core_1.info(`Using "${preset.unwrapOr('')}" preset`);
            core_1.info(`Using "${tagPrefix.unwrapOr('')}" as tag prefix`);
            core_1.info(`Using "${conventionalConfigFile.unwrapOr('')}" as config file`);
            core_1.info(`Using "${gitCommitMessage}" as commit message`);
            core_1.info(`Using "${gitUserName}" as git user.name`);
            core_1.info(`Using "${gitUserEmail}" as git user.email`);
            core_1.info(`Using "${releaseCount}" release count`);
            core_1.info(`Using "${versionFile}" as version file`);
            core_1.info(`Using "${versionPath}" as version path`);
            core_1.info(`Using "${outputFile}" as output file`);
            if (preCommitFile.isSome()) {
                core_1.info(`Using "${preCommitFile}" as pre-commit script`);
            }
            if (preChangelogGenerationFile.isSome()) {
                core_1.info(`Using "${preChangelogGenerationFile}" as pre-changelog-generation script`);
            }
            core_1.info(`Skipping empty releases is "${skipEmptyRelease ? 'enabled' : 'disabled'}"`);
            core_1.info(`Skipping the update of the version file is "${skipVersionFile ? 'enabled' : 'disabled'}"`);
            const vff = new version_1.VersioningFactory(versionFile, versionPath, tagPrefix.unwrapOr(''));
            const git = yield gitFactory_1.InitializeGit();
            core_1.info('Pull to make sure we have the full git history');
            const method = core_1.getInput('git-pull-method');
            const result = yield git.pull(method);
            if (result.isErr()) {
                core_1.error(result.unwrapErr());
                throw result.unwrapErr();
            }
            const config = conventionalConfigFile.andThen(requireScript_1.RequireScript);
            const recommendationResult = yield conventionalCommitRecommendation_1.ConventionalRecommendedBump({ preset, tagPrefix, config });
            yield recommendationResult.map((recommendation) => __awaiter(this, void 0, void 0, function* () {
                core_1.info(`Recommended release type: ${recommendation.releaseType}`);
                // If we have a reason also log it
                if (recommendation.reason)
                    core_1.info(`Because: ${recommendation.reason}`);
                const GitHandleVersion = () => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    core_1.info('Using GIT to determine the new version');
                    const result = yield handleVersioningByExtension(vff, 'git', (_a = recommendation.releaseType) !== null && _a !== void 0 ? _a : "patch");
                    if (result.isErr()) {
                        core_1.error(result.unwrapErr());
                        throw result.unwrapErr();
                    }
                    return result.unwrap();
                });
                const FileHandleVersion = () => __awaiter(this, void 0, void 0, function* () {
                    const files = versionFile.split(',').TrimAll();
                    core_1.info(`Files to bump: ${files.join(', ')}`);
                    const versioning = yield Promise.all(files.map((file) => {
                        return util_1.GetFileExtension(file)
                            .map((ext) => {
                            var _a;
                            core_1.info(`Bumping version to file "${file}" with extension "${ext}"`);
                            return handleVersioningByExtension(vff, ext, (_a = recommendation.releaseType) !== null && _a !== void 0 ? _a : "patch");
                        });
                    }));
                    const success = versioning.filter(x => x.isOk()).map(x => x.unwrap());
                    if (success.length == 0) {
                        throw "no valid version file found";
                    }
                    const top = yield success[0];
                    return top.unwrap();
                });
                const newVersion = skipVersionFile || skipCommit ? yield GitHandleVersion() : yield FileHandleVersion();
                let gitTag = `${tagPrefix}${newVersion}`;
                yield preChangelogGenerationFile.andThen(requireScript_1.RequireScript).map((x) => __awaiter(this, void 0, void 0, function* () {
                    if (!x.preTagGeneration)
                        return;
                    const modifiedTag = yield x.preTagGeneration(gitTag);
                    if (modifiedTag) {
                        core_1.info(`Using modified tag "${modifiedTag}"`);
                        gitTag = modifiedTag;
                    }
                }));
                // Generate the string changelog
                const stringChangelog = yield generateChangelog_1.generateStringChangelog(tagPrefix.unwrapOr(''), preset.unwrapOr(''), newVersion, '1', config);
                core_1.info('Changelog generated');
                core_1.info(stringChangelog);
                // Removes the version number from the changelog
                const cleanChangelog = stringChangelog.split('\n').slice(3).join('\n').trim();
                if (skipEmptyRelease && cleanChangelog === '') {
                    core_1.info('Generated changelog is empty and skip-on-empty has been activated so we skip this step');
                    core_1.setOutput('skipped', 'true');
                    return;
                }
                core_1.info(`New version: ${newVersion}`);
                // If output file === 'false' we don't write it to file
                if (outputFile !== 'false') {
                    // Generate the changelog
                    yield generateChangelog_1.generateFileChangelog(tagPrefix.unwrapOr(''), preset.unwrapOr(''), newVersion, outputFile, releaseCount, config);
                }
                if (!skipCommit) {
                    // Add changed files to git
                    yield preCommitFile.andThen(requireScript_1.RequireScript).map((x) => __awaiter(this, void 0, void 0, function* () {
                        if (!x.preCommit)
                            return;
                        yield x.preCommit({ tag: gitTag, version: newVersion });
                    }));
                    yield git.add('.');
                    yield git.commit(gitCommitMessage.replace('{version}', gitTag));
                }
                // Create the new tag
                yield git.createTag(gitTag);
                core_1.info('Push all changes');
                yield git.push();
                // Set outputs so other actions (for example actions/create-release) can use it
                core_1.setOutput('changelog', stringChangelog);
                core_1.setOutput('clean_changelog', cleanChangelog);
                core_1.setOutput('version', newVersion);
                core_1.setOutput('tag', gitTag);
                core_1.setOutput('skipped', 'false');
                try {
                    // If we are running in test mode we use this to validate everything still runs
                    git.testHistory();
                }
                catch (error) {
                    console.error(error);
                    core_1.setFailed(error);
                }
            }));
        }
        catch (error) {
            core_1.setFailed(error);
        }
    });
}
run();
//# sourceMappingURL=index.js.map