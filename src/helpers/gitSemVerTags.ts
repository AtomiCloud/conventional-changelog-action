import {Err, Ok, Result} from "@hqoss/monads";

import gitSemverTags from "git-semver-tags";

function GitSemVerTags(tagPrefix: string): Promise<Result<string[], string>> {
    return new Promise<Result<string[], string>>(r => {
        gitSemverTags({tagPrefix}, (err, tags) => {
            if (err) {
                r(Err(err))
                return
            }
            r(Ok(tags))
        })
    })
}

export {GitSemVerTags}
