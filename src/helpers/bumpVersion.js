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
exports.bump = void 0;
const coreHelper_1 = require("./coreHelper");
const util_1 = require("./util");
const requireScript_1 = require("./requireScript");
const semVer_1 = require("./semVer");
function bumpLogic(releaseType, version) {
    const fallbackValue = coreHelper_1.Get('fallback-version')
        .andThen(semVer_1.ToSemVer)
        .unwrapOr([0, 1, 0]);
    return version.andThen(semVer_1.ToSemVer).unwrapOr(fallbackValue);
}
function ExtractScriptFunction(a) {
    return util_1.Wrap(a.preVersionGeneration);
}
function GetPreVersionHook() {
    return coreHelper_1.Get('pre-changelog-generation')
        .andThen(requireScript_1.RequireScript)
        .andThen(ExtractScriptFunction);
}
function bump(releaseType, version) {
    return __awaiter(this, void 0, void 0, function* () {
        const [major, minor, patch] = bumpLogic(releaseType, version);
        const v = `${major}.${minor}.${patch}`;
        return yield GetPreVersionHook()
            .map((hook) => __awaiter(this, void 0, void 0, function* () { return yield hook(v); }))
            .unwrapOr(Promise.resolve(v));
    });
}
exports.bump = bump;
//# sourceMappingURL=bumpVersion.js.map