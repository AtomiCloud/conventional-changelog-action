"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToSemVer = exports.SemVerValid = void 0;
const monads_1 = require("@hqoss/monads");
const semver_1 = require("semver");
function SemVerValid(version) {
    if (semver_1.valid(version))
        return monads_1.Ok(version);
    return monads_1.Err("invalid server");
}
exports.SemVerValid = SemVerValid;
function ToSemVer(version) {
    return SemVerValid(version)
        .map(x => x
        .split('.')
        .map(x => parseInt(x, 10)))
        .ok();
}
exports.ToSemVer = ToSemVer;
//# sourceMappingURL=semVer.js.map