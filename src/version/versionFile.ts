import * as core from '@actions/core';
import * as fs from 'fs';
import {ReleaseType} from "../helpers/util";

interface SupportedFileVersion {
    bump(releaseType: ReleaseType): Promise<string>
}

class VersionFile {
    readonly filePath: string;
    
    constructor(filePath: string) {
        this.filePath = filePath;
    }
    
    read(): string {
        if (fs.existsSync(this.filePath)) {
            return fs.readFileSync(this.filePath, 'utf8')
        }
        
        core.warning(`Tried to read "${this.filePath}" but file does not exist!`)
        return ''
    }
    
    write(newContent: string): void {
        fs.writeFileSync(this.filePath, newContent)
    }
    
}

export {VersionFile, SupportedFileVersion}
