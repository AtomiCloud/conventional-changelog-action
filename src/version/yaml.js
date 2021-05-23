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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Yaml = void 0;
const util_1 = require("../helpers/util");
const bumpVersion_1 = require("../helpers/bumpVersion");
const core_1 = require("@actions/core");
const object_path_1 = __importDefault(require("object-path"));
const yaml_1 = __importDefault(require("yaml"));
class Yaml {
    constructor(file, versionPath) {
        this.file = file;
        this.versionPath = versionPath;
    }
    /**
     * Bumps the version in the package.json
     *
     * @param {!string} releaseType - The type of release
     * @return {*}
     */
    bump(releaseType) {
        return __awaiter(this, void 0, void 0, function* () {
            // Read the file
            const fileContent = this.file.read();
            const yamlContent = yaml_1.default.parse(fileContent) || {};
            const oldVersion = util_1.GetObjectPath(yamlContent, this.versionPath);
            // Get the new version
            const newVersion = yield bumpVersion_1.bump(releaseType, oldVersion);
            // Update the file
            if (oldVersion.isSome()) {
                // Get the name of where the version is in
                const versionName = this.versionPath.split('.').pop();
                core_1.info(`Bumped file "${this.file.filePath}" from "${oldVersion}" to "${newVersion}"`);
                this.file.write(
                // We use replace instead of yaml.stringify so we can preserve white spaces and comments
                // Replace if version was used with single quotes
                fileContent.replace(`${versionName}: '${oldVersion}'`, `${versionName}: '${newVersion}'`).replace(// Replace if version was used with double quotes
                `${versionName}: "${oldVersion}"`, `${versionName}: "${newVersion}"`).replace(// Replace if version was used with no quotes
                `${versionName}: ${oldVersion}`, `${versionName}: ${newVersion}`));
            }
            else {
                // Update the content with the new version
                object_path_1.default.set(yamlContent, this.versionPath, newVersion);
                this.file.write(yaml_1.default.stringify(yamlContent));
            }
            return newVersion;
        });
    }
}
exports.Yaml = Yaml;
//# sourceMappingURL=yaml.js.map