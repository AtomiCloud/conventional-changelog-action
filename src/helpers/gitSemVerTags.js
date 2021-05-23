"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitSemVerTags = void 0;
const monads_1 = require("@hqoss/monads");
const git_semver_tags_1 = __importDefault(require("git-semver-tags"));
function GitSemVerTags(tagPrefix) {
    return new Promise(r => {
        git_semver_tags_1.default({ tagPrefix }, (err, tags) => {
            if (err) {
                r(monads_1.Err(err));
                return;
            }
            r(monads_1.Ok(tags));
        });
    });
}
exports.GitSemVerTags = GitSemVerTags;
//# sourceMappingURL=gitSemVerTags.js.map