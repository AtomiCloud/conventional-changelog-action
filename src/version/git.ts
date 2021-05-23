import {None, Ok, Result, Some} from "@hqoss/monads";
import {GitSemVerTags} from "../helpers/gitSemVerTags";
import {bump} from "../helpers/bumpVersion";
import {ReleaseType} from "../helpers/util";
import {SupportedFileVersion} from "./versionFile";


async function GitBump(releaseType: ReleaseType, tagPrefix: string): Promise<Result<string, string>> {
    const result = await GitSemVerTags(tagPrefix);
    const r = result.map(tags => {
        const currentVersion = tags.length > 0 ? Some(tags.shift()!.replace(tagPrefix, '')) : None;
        return bump(releaseType, currentVersion);
    })
    if (r.isErr()) return r.map(_ => "");
    const updatedVersion = await r.unwrap()
    return Ok(updatedVersion)
}

class GitType implements SupportedFileVersion {
    
    private readonly tagPrefix: string;
    
    constructor(tagPrefix: string) {
        this.tagPrefix = tagPrefix;
    }
    
    async bump(releaseType: ReleaseType): Promise<string> {
        const v = await GitBump(releaseType, this.tagPrefix);
        if (v.isErr()) {
            throw new Error(v.unwrapErr())
        }
        return v.unwrap()
    }
    
    
}

export {GitType}
