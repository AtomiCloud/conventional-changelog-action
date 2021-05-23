import {SupportedFileVersion, VersionFile} from "./versionFile";

declare class Json implements SupportedFileVersion {
    private readonly file;
    private readonly versionPath;
    
    constructor(file: VersionFile, versionPath: string);
    
    bump(releaseType: string): Promise<string>;
}

export {Json};
