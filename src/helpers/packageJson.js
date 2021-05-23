"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageJson = void 0;
const monads_1 = require("@hqoss/monads");
const fs = __importStar(require("fs"));
class PackageJson {
    constructor(path) {
        this.path = path;
    }
    get() {
        const p = this.path;
        return new Promise((resolve) => {
            fs.readFile(p, (err, data) => {
                if (err) {
                    resolve(monads_1.Err(err.message));
                    return;
                }
                resolve(JSON.parse(data.toString("utf8")));
            });
        });
    }
    update(packageJson) {
        const p = this.path;
        return new Promise((resolve) => {
            const data = JSON.stringify(packageJson, null, 2);
            fs.writeFile(p, data, (err) => {
                if (err)
                    resolve(monads_1.Some(err.message));
                resolve(monads_1.None);
            });
        });
    }
}
exports.PackageJson = PackageJson;
//# sourceMappingURL=packageJson.js.map