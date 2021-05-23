import * as core from '@actions/core';
import objectPath from 'object-path';
import {bump} from '../helpers/bumpVersion';
import {SupportedFileVersion, VersionFile} from "./versionFile";
import {GetObjectPath} from "../helpers/util";

class Json implements SupportedFileVersion {
    
    private readonly file: VersionFile;
    private readonly versionPath: string;
    
    constructor(file: VersionFile, versionPath: string) {
        this.file = file;
        this.versionPath = versionPath;
    }
    
    async bump(releaseType: string): Promise<string> {
        // Read the file
        const fileContent = this.file.read()
        
        // Parse the file
        let jsonContent
        try {
            jsonContent = JSON.parse(fileContent)
        } catch (error) {
            core.startGroup(`Error when parsing the file '${this.file.filePath}'`)
            core.info(`File-Content: ${fileContent}`)
            core.warning(error)
            core.endGroup()
            jsonContent = {}
        }
        
        // Get the old version
        const oldVersion = GetObjectPath<string>(jsonContent, this.versionPath)
        
        // Get the new version
        const newVersion = await bump(
            releaseType,
            oldVersion,
        )
        
        core.info(`Bumped file "${this.file.filePath}" from "${oldVersion}" to "${newVersion}"`);
        
        
        // Update the content with the new version
        objectPath.set(jsonContent, this.versionPath, newVersion)
        
        // Update the file
        this.file.write(JSON.stringify(jsonContent, null, 2))
        
        return newVersion;
    }
    
}

export {Json}
