import {FileExtension} from "../helpers/util";
import {SupportedFileVersion} from "./versionFile";
import {Option} from "@hqoss/monads";

declare class VersioningFactory {
    constructor(filePath: string, versionPath: string, tagPrefix: string);
    
    private readonly filePath;
    private readonly versionPath;
    private readonly tagPrefix;
    
    get(fileExtension: FileExtension): Option<SupportedFileVersion>;
}

export {VersioningFactory};
