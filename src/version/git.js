"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitType = void 0;
const monads_1 = require("@hqoss/monads");
const gitSemVerTags_1 = require("../helpers/gitSemVerTags");
const bumpVersion_1 = require("../helpers/bumpVersion");
function GitBump(releaseType, tagPrefix) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield gitSemVerTags_1.GitSemVerTags(tagPrefix);
        const r = result.map(tags => {
            const currentVersion = tags.length > 0 ? monads_1.Some(tags.shift().replace(tagPrefix, '')) : monads_1.None;
            return bumpVersion_1.bump(releaseType, currentVersion);
        });
        if (r.isErr())
            return r.map(_ => "");
        const updatedVersion = yield r.unwrap();
        return monads_1.Ok(updatedVersion);
    });
}
class GitType {
    constructor(tagPrefix) {
        this.tagPrefix = tagPrefix;
    }
    bump(releaseType) {
        return __awaiter(this, void 0, void 0, function* () {
            const v = yield GitBump(releaseType, this.tagPrefix);
            if (v.isErr()) {
                throw new Error(v.unwrapErr());
            }
            return v.unwrap();
        });
    }
}
exports.GitType = GitType;
//# sourceMappingURL=git.js.map