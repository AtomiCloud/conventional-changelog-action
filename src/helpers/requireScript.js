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
exports.RequireScript = void 0;
const core_1 = require("@actions/core");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const monads_1 = require("@hqoss/monads");
function RequireScript(file) {
    const fileLocation = path.resolve(process.cwd(), file);
    // Double check the script exists before loading it
    if (fs.existsSync(fileLocation)) {
        core_1.info(`Loading "${fileLocation}" script`);
        return monads_1.Some(require(fileLocation));
    }
    core_1.error(`Tried to load "${fileLocation}" script but it does not exists!`);
    return monads_1.None;
}
exports.RequireScript = RequireScript;
//# sourceMappingURL=requireScript.js.map