import {ReleaseType} from "../helpers/util";

interface SupportedFileVersion {
    bump(releaseType: ReleaseType): Promise<string>;
}

declare class VersionFile {
    readonly filePath: string;
    
    constructor(filePath: string);
    
    read(): string;
    
    write(newContent: string): void;
}

export {VersionFile, SupportedFileVersion};
