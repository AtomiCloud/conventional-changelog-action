import {SupportedFileVersion, VersionFile} from "./versionFile";
import {GetObjectPath, ReleaseType} from "../helpers/util";
import {bump} from "../helpers/bumpVersion";
import {info} from "@actions/core";
import objectPath from "object-path";
import yaml from 'yaml'


class Yaml implements SupportedFileVersion {
    
    constructor(file: VersionFile, versionPath: string) {
        this.file = file;
        this.versionPath = versionPath;
    }
    
    private readonly file: VersionFile;
    private readonly versionPath: string;
    
    /**
     * Bumps the version in the package.json
     *
     * @param {!string} releaseType - The type of release
     * @return {*}
     */
    async bump(releaseType: ReleaseType): Promise<string> {
        // Read the file
        const fileContent = this.file.read()
        const yamlContent = yaml.parse(fileContent) || {}
        const oldVersion = GetObjectPath<string>(yamlContent, this.versionPath)
        
        // Get the new version
        const newVersion = await bump(
            releaseType,
            oldVersion,
        )
        
        // Update the file
        if (oldVersion.isSome()) {
            // Get the name of where the version is in
            const versionName = this.versionPath.split('.').pop()
            
            info(`Bumped file "${this.file.filePath}" from "${oldVersion}" to "${newVersion}"`)
            
            this.file.write(
                // We use replace instead of yaml.stringify so we can preserve white spaces and comments
                // Replace if version was used with single quotes
                fileContent.replace(
                    `${versionName}: '${oldVersion}'`,
                    `${versionName}: '${newVersion}'`,
                ).replace( // Replace if version was used with double quotes
                    `${versionName}: "${oldVersion}"`,
                    `${versionName}: "${newVersion}"`,
                ).replace( // Replace if version was used with no quotes
                    `${versionName}: ${oldVersion}`,
                    `${versionName}: ${newVersion}`,
                ),
            )
        } else {
            // Update the content with the new version
            objectPath.set(yamlContent, this.versionPath, newVersion)
            this.file.write(yaml.stringify(yamlContent))
        }
        return newVersion;
    }
    
}

export {Yaml}
