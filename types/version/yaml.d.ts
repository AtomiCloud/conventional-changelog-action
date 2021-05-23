import {SupportedFileVersion, VersionFile} from "./versionFile";
import {ReleaseType} from "../helpers/util";

declare class Yaml implements SupportedFileVersion {
    constructor(file: VersionFile, versionPath: string);
    
    private readonly file;
    private readonly versionPath;
    
    /**
     * Bumps the version in the package.json
     *
     * @param {!string} releaseType - The type of release
     * @return {*}
     */
    bump(releaseType: ReleaseType): Promise<string>;
}

export {Yaml};
