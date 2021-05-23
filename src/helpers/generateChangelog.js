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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStringChangelog = exports.generateFileChangelog = void 0;
const fs = __importStar(require("fs"));
const conventional_changelog_1 = __importDefault(require("conventional-changelog"));
const convertConfig = require('conventional-changelog-conventionalcommits');
function getChangelogStream(tagPrefix, preset, version, releaseCount, cfg) {
    const config = cfg == null ? convertConfig(cfg) : null;
    return conventional_changelog_1.default({
        preset,
        releaseCount: parseInt(releaseCount, 10),
        tagPrefix,
        config,
    }, {
        version,
        currentTag: `${tagPrefix}${version}`,
    }, {}, config && config.parserOpts, config && config.writerOpts);
}
function generateStringChangelog(tagPrefix, preset, version, releaseCount, config) {
    return new Promise((resolve) => {
        const changelogStream = getChangelogStream(tagPrefix, preset, version, releaseCount, config);
        let changelog = '';
        changelogStream
            .on('data', (data) => {
            changelog += data.toString();
        })
            .on('end', () => resolve(changelog));
    });
}
exports.generateStringChangelog = generateStringChangelog;
function generateFileChangelog(tagPrefix, preset, version, fileName, releaseCount, config) {
    return new Promise((resolve) => {
        const changelogStream = getChangelogStream(tagPrefix, preset, version, releaseCount, config);
        changelogStream
            .pipe(fs.createWriteStream(fileName))
            .on('finish', resolve);
    });
}
exports.generateFileChangelog = generateFileChangelog;
//# sourceMappingURL=generateChangelog.js.map