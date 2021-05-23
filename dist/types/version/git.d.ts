import { ReleaseType } from "../helpers/util";
import { SupportedFileVersion } from "./versionFile";
declare class GitType implements SupportedFileVersion {
    private readonly tagPrefix;
    constructor(tagPrefix: string);
    bump(releaseType: ReleaseType): Promise<string>;
}
export { GitType };
