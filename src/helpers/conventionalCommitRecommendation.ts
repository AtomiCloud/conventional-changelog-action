import conventionalRecommendedBump from "conventional-recommended-bump";
import {Err, Ok, Option, Result} from "@hqoss/monads";
import {ForceUnwrap} from "./util";

const config = require('conventional-changelog-conventionalcommits');

interface BumpOptions {
    config: Option<any>
    preset: Option<string>
    tagPrefix: Option<string>
}

function ConventionalRecommendedBump(options: BumpOptions): Promise<Result<conventionalRecommendedBump.Callback.Recommendation, any>> {
    return new Promise<Result<conventionalRecommendedBump.Callback.Recommendation, any>>(r => {
        const opts = {
            tagPrefix: ForceUnwrap(options.tagPrefix),
            config: ForceUnwrap(options.config.map(x => config(x))),
            preset: ForceUnwrap(options.preset),
        }
        
        conventionalRecommendedBump(opts, (err, rec) => {
            if (err) {
                r(Err(err))
                return
            }
            r(Ok(rec))
        })
    })
}

export {ConventionalRecommendedBump}
