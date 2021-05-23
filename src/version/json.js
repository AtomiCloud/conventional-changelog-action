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
exports.Json = void 0;
const core = __importStar(require("@actions/core"));
const object_path_1 = __importDefault(require("object-path"));
const bumpVersion_1 = require("../helpers/bumpVersion");
const util_1 = require("../helpers/util");
class Json {
    constructor(file, versionPath) {
        this.file = file;
        this.versionPath = versionPath;
    }
    bump(releaseType) {
        return __awaiter(this, void 0, void 0, function* () {
            // Read the file
            const fileContent = this.file.read();
            // Parse the file
            let jsonContent;
            try {
                jsonContent = JSON.parse(fileContent);
            }
            catch (error) {
                core.startGroup(`Error when parsing the file '${this.file.filePath}'`);
                core.info(`File-Content: ${fileContent}`);
                core.warning(error);
                core.endGroup();
                jsonContent = {};
            }
            // Get the old version
            const oldVersion = util_1.GetObjectPath(jsonContent, this.versionPath);
            // Get the new version
            const newVersion = yield bumpVersion_1.bump(releaseType, oldVersion);
            core.info(`Bumped file "${this.file.filePath}" from "${oldVersion}" to "${newVersion}"`);
            // Update the content with the new version
            object_path_1.default.set(jsonContent, this.versionPath, newVersion);
            // Update the file
            this.file.write(JSON.stringify(jsonContent, null, 2));
            return newVersion;
        });
    }
}
exports.Json = Json;
//# sourceMappingURL=json.js.map