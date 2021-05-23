"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConventionalRecommendedBump = void 0;
const conventional_recommended_bump_1 = __importDefault(require("conventional-recommended-bump"));
const monads_1 = require("@hqoss/monads");
const util_1 = require("./util");
const config = require('conventional-changelog-conventionalcommits');
function ConventionalRecommendedBump(options) {
    return new Promise(r => {
        const opts = {
            tagPrefix: util_1.ForceUnwrap(options.tagPrefix),
            config: util_1.ForceUnwrap(options.config.map(x => config(x))),
            preset: util_1.ForceUnwrap(options.preset),
        };
        conventional_recommended_bump_1.default(opts, (err, rec) => {
            if (err) {
                r(monads_1.Err(err));
                return;
            }
            r(monads_1.Ok(rec));
        });
    });
}
exports.ConventionalRecommendedBump = ConventionalRecommendedBump;
//# sourceMappingURL=conventionalCommitRecommendation.js.map