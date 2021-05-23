"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersioningFactory = void 0;
const json_1 = require("./json");
const versionFile_1 = require("./versionFile");
const yaml_1 = require("./yaml");
const toml_1 = require("./toml");
const git_1 = require("./git");
const monads_1 = require("@hqoss/monads");
class VersioningFactory {
    constructor(filePath, versionPath, tagPrefix) {
        this.filePath = filePath;
        this.versionPath = versionPath;
        this.tagPrefix = tagPrefix;
    }
    get(fileExtension) {
        const file = new versionFile_1.VersionFile(this.filePath);
        switch (fileExtension.toLowerCase()) {
            case 'json':
                return monads_1.Some(new json_1.Json(file, this.versionPath));
            case 'yaml':
            case 'yml':
                return monads_1.Some(new yaml_1.Yaml(file, this.versionPath));
            case 'toml':
                return monads_1.Some(new toml_1.Toml(file, this.versionPath));
            case 'git':
                return monads_1.Some(new git_1.GitType(this.tagPrefix));
            default:
                return monads_1.None;
        }
    }
}
exports.VersioningFactory = VersioningFactory;
//# sourceMappingURL=index.js.map