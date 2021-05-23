import conventionalRecommendedBump from "conventional-recommended-bump";
import {Option, Result} from "@hqoss/monads";

interface BumpOptions {
    config: Option<any>;
    preset: Option<string>;
    tagPrefix: Option<string>;
}

declare function ConventionalRecommendedBump(options: BumpOptions): Promise<Result<conventionalRecommendedBump.Callback.Recommendation, any>>;

export {ConventionalRecommendedBump};
