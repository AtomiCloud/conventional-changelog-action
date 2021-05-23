import {FileExtension} from "../helpers/util";
import {Json} from "./json";
import {SupportedFileVersion, VersionFile} from "./versionFile";
import {Yaml} from "./yaml";
import {Toml} from "./toml";
import {GitType} from "./git";
import {None, Option, Some} from "@hqoss/monads";


class VersioningFactory {
    constructor(filePath: string, versionPath: string, tagPrefix: string) {
        this.filePath = filePath;
        this.versionPath = versionPath;
        this.tagPrefix = tagPrefix;
    }
    
    private readonly filePath: string;
    private readonly versionPath: string;
    private readonly tagPrefix: string;
    
    get(fileExtension: FileExtension): Option<SupportedFileVersion> {
        const file = new VersionFile(this.filePath);
        switch (fileExtension.toLowerCase()) {
            case 'json':
                return Some(new Json(file, this.versionPath));
            case 'yaml':
            case 'yml':
                return Some(new Yaml(file, this.versionPath));
            
            case 'toml':
                return Some(new Toml(file, this.versionPath));
            
            case 'git':
                return Some(new GitType(this.tagPrefix));
            
            default:
                return None
        }
    }
    
}


export {VersioningFactory}
