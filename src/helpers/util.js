"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionAll = exports.ResultAll = exports.GetObjectPath = exports.GetFileExtension = exports.ForceUnwrap = exports.Wrap = void 0;
const monads_1 = require("@hqoss/monads");
const object_path_1 = __importDefault(require("object-path"));
function Wrap(i) {
    return i == null ? monads_1.None : monads_1.Some(i);
}
exports.Wrap = Wrap;
function ForceUnwrap(opt) {
    return opt.isSome() ? opt.unwrap() : undefined;
}
exports.ForceUnwrap = ForceUnwrap;
function GetFileExtension(file) {
    const ext = file.split('.').pop();
    if (ext == "" || ext == null)
        return monads_1.Err('no file extension');
    if (['json', 'yaml', 'yml', 'toml', 'git'].Has(ext)) {
        return monads_1.Ok(ext);
    }
    return monads_1.Err(`Unknown file extension: ${ext}`);
}
exports.GetFileExtension = GetFileExtension;
function GetObjectPath(object, path) {
    const r = object_path_1.default.get(object, path, null);
    if (r == null) {
        return monads_1.None;
    }
    return monads_1.Some(r);
}
exports.GetObjectPath = GetObjectPath;
function ResultAll(r) {
    const t = [];
    const e = [];
    r.Each(x => {
        if (x.isOk()) {
            t.push(x.unwrap());
        }
        else {
            e.push(x.unwrapErr());
        }
    });
    if (e.length > 0) {
        return monads_1.Err(e);
    }
    return monads_1.Ok(t);
}
exports.ResultAll = ResultAll;
function OptionAll(r) {
    const t = [];
    for (const key in r) {
        const actual = r[key];
        if (actual.isSome()) {
            t.push(actual.unwrap());
        }
        else {
            return monads_1.None;
        }
    }
    return monads_1.Some(t);
}
exports.OptionAll = OptionAll;
//# sourceMappingURL=util.js.map