import {SupportedFileVersion, VersionFile} from "./versionFile";
import {GetObjectPath, ReleaseType} from "../helpers/util";
import toml from '@iarna/toml'
import {bump} from "../helpers/bumpVersion";
import objectPath from "object-path";
import {info} from "@actions/core";

class Toml implements SupportedFileVersion {
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
        const tomlContent = toml.parse(fileContent)
        const oldVersion = GetObjectPath<string>(tomlContent, this.versionPath)
        
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
                fileContent.replace(
                    `${versionName} = "${oldVersion}"`,
                    `${versionName} = "${newVersion}"`,
                ),
            )
        } else {
            // Update the content with the new version
            objectPath.set(tomlContent, this.versionPath, newVersion)
            this.file.write(toml.stringify(tomlContent))
        }
        return newVersion;
    }
    
}


export {Toml}
