(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define([], factory);
    else {
        var a = factory();
        for (var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
    }
})(global, function () {
    return /******/ (() => { // webpackBootstrap
        /******/
        var __webpack_modules__ = ({
            
            /***/ 363:
            /***/ ((module) => {
                
                function webpackEmptyContext(req) {
                    var e = new Error("Cannot find module '" + req + "'");
                    e.code = 'MODULE_NOT_FOUND';
                    throw e;
                }
                
                webpackEmptyContext.keys = () => ([]);
                webpackEmptyContext.resolve = webpackEmptyContext;
                webpackEmptyContext.id = 363;
                module.exports = webpackEmptyContext;
                
                /***/
            }),
            
            /***/ 357:
            /***/ ((module) => {
                
                "use strict";
                module.exports = require("assert");
                ;
                
                /***/
            }),
            
            /***/ 711:
            /***/ ((module) => {
                
                "use strict";
                module.exports = require("conventional-changelog-conventionalcommits");
                ;
                
                /***/
            })
            
            /******/
        });
        /************************************************************************/
        /******/ 	// The module cache
        /******/
        var __webpack_module_cache__ = {};
        /******/
        /******/ 	// The require function
        /******/
        function __webpack_require__(moduleId) {
            /******/ 		// Check if module is in cache
            /******/
            var cachedModule = __webpack_module_cache__[moduleId];
            /******/
            if (cachedModule !== undefined) {
                /******/
                return cachedModule.exports;
                /******/
            }
            /******/ 		// Create a new module (and put it into the cache)
            /******/
            var module = __webpack_module_cache__[moduleId] = {
                /******/ 			// no module.id needed
                /******/ 			// no module.loaded needed
                /******/            exports: {}
                /******/
            };
            /******/
            /******/ 		// Execute the module function
            /******/
            __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
            /******/
            /******/ 		// Return the exports of the module
            /******/
            return module.exports;
            /******/
        }
        
        /******/
        /************************************************************************/
        /******/ 	/* webpack/runtime/compat get default export */
        /******/
        (() => {
            /******/ 		// getDefaultExport function for compatibility with non-harmony modules
            /******/
            __webpack_require__.n = (module) => {
                /******/
                var getter = module && module.__esModule ?
                    /******/                () => (module['default']) :
                    /******/                () => (module);
                /******/
                __webpack_require__.d(getter, {a: getter});
                /******/
                return getter;
                /******/
            };
            /******/
        })();
        /******/
        /******/ 	/* webpack/runtime/define property getters */
        /******/
        (() => {
            /******/ 		// define getter functions for harmony exports
            /******/
            __webpack_require__.d = (exports, definition) => {
                /******/
                for (var key in definition) {
                    /******/
                    if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                        /******/
                        Object.defineProperty(exports, key, {enumerable: true, get: definition[key]});
                        /******/
                    }
                    /******/
                }
                /******/
            };
            /******/
        })();
        /******/
        /******/ 	/* webpack/runtime/hasOwnProperty shorthand */
        /******/
        (() => {
            /******/
            __webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
            /******/
        })();
        /******/
        /******/ 	/* webpack/runtime/make namespace object */
        /******/
        (() => {
            /******/ 		// define __esModule on exports
            /******/
            __webpack_require__.r = (exports) => {
                /******/
                if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                    /******/
                    Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'});
                    /******/
                }
                /******/
                Object.defineProperty(exports, '__esModule', {value: true});
                /******/
            };
            /******/
        })();
        /******/
        /************************************************************************/
        var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
        (() => {
            "use strict";
// ESM COMPAT FLAG
            __webpack_require__.r(__webpack_exports__);
            
            ;// CONCATENATED MODULE: external "@actions/core"
            const core_namespaceObject = require("@actions/core");
            ;
            ;// CONCATENATED MODULE: external "object-path"
            const external_object_path_namespaceObject = require("object-path");
            ;
            var external_object_path_default = /*#__PURE__*/__webpack_require__.n(external_object_path_namespaceObject);
            ;// CONCATENATED MODULE: external "@hqoss/monads"
            const monads_namespaceObject = require("@hqoss/monads");
            ;
            ;// CONCATENATED MODULE: ./src/helpers/coreHelper.ts
            
            
            function Get(name, options) {
                var opt = (0, core_namespaceObject.getInput)(name, options);
                return (opt == null || opt == "") ? monads_namespaceObject.None : (0, monads_namespaceObject.Some)(opt);
            }
            
            
            ;// CONCATENATED MODULE: ./src/helpers/util.ts
            
            
            function Wrap(i) {
                return i == null ? monads_namespaceObject.None : (0, monads_namespaceObject.Some)(i);
            }
            
            function ForceUnwrap(opt) {
                return opt.isSome() ? opt.unwrap() : undefined;
            }
            
            function GetFileExtension(file) {
                var ext = file.split('.').pop();
                if (ext == "" || ext == null)
                    return (0, monads_namespaceObject.Err)('no file extension');
                if (['json', 'yaml', 'yml', 'toml', 'git'].Has(ext)) {
                    return (0, monads_namespaceObject.Ok)(ext);
                }
                return (0, monads_namespaceObject.Err)("Unknown file extension: " + ext);
            }
            
            function GetObjectPath(object, path) {
                var r = external_object_path_default().get(object, path, null);
                if (r == null) {
                    return monads_namespaceObject.None;
                }
                return (0, monads_namespaceObject.Some)(r);
            }
            
            function ResultAll(r) {
                var t = [];
                var e = [];
                r.Each(function (x) {
                    if (x.isOk()) {
                        t.push(x.unwrap());
                    } else {
                        e.push(x.unwrapErr());
                    }
                });
                if (e.length > 0) {
                    return Err(e);
                }
                return Ok(t);
            }
            
            function OptionAll(r) {
                var t = [];
                for (var key in r) {
                    var actual = r[key];
                    if (actual.isSome()) {
                        t.push(actual.unwrap());
                    } else {
                        return None;
                    }
                }
                return Some(t);
            }
            
            
            ;// CONCATENATED MODULE: external "path"
            const external_path_namespaceObject = require("path");
            ;
            ;// CONCATENATED MODULE: external "fs"
            const external_fs_namespaceObject = require("fs");
            ;
            ;// CONCATENATED MODULE: ./src/helpers/requireScript.ts
            
            
            function RequireScript(file) {
                var fileLocation = external_path_namespaceObject.resolve(process.cwd(), file);
                // Double check the script exists before loading it
                if (external_fs_namespaceObject.existsSync(fileLocation)) {
                    (0, core_namespaceObject.info)("Loading \"" + fileLocation + "\" script");
                    return (0, monads_namespaceObject.Some)(__webpack_require__(363)(fileLocation));
                }
                (0, core_namespaceObject.error)("Tried to load \"" + fileLocation + "\" script but it does not exists!");
                return monads_namespaceObject.None;
            }
            
            
            ;// CONCATENATED MODULE: external "semver"
            const external_semver_namespaceObject = require("semver");
            ;
            ;// CONCATENATED MODULE: ./src/helpers/semVer.ts
            
            
            function SemVerValid(version) {
                if ((0, external_semver_namespaceObject.valid)(version))
                    return (0, monads_namespaceObject.Ok)(version);
                return (0, monads_namespaceObject.Err)("invalid server");
            }
            
            function ToSemVer(version) {
                return SemVerValid(version)
                    .map(function (x) {
                        return x
                            .split('.')
                            .map(function (x) { return parseInt(x, 10); });
                    })
                    .ok();
            }
            
            
            ;// CONCATENATED MODULE: ./src/helpers/bumpVersion.ts
            var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
                function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
                
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
                    
                    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
                    
                    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
                    
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };
            var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
                var _ = {
                    label: 0, sent: function () {
                        if (t[0] & 1) throw t[1];
                        return t[1];
                    }, trys: [], ops: []
                }, f, y, t, g;
                return g = {
                    next: verb(0),
                    "throw": verb(1),
                    "return": verb(2)
                }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
                
                function verb(n) { return function (v) { return step([n, v]); }; }
                
                function step(op) {
                    if (f) throw new TypeError("Generator is already executing.");
                    while (_) try {
                        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                        if (y = 0, t) op = [op[0] & 2, t.value];
                        switch (op[0]) {
                            case 0:
                            case 1:
                                t = op;
                                break;
                            case 4:
                                _.label++;
                                return {value: op[1], done: false};
                            case 5:
                                _.label++;
                                y = op[1];
                                op = [0];
                                continue;
                            case 7:
                                op = _.ops.pop();
                                _.trys.pop();
                                continue;
                            default:
                                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                    _ = 0;
                                    continue;
                                }
                                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                    _.label = op[1];
                                    break;
                                }
                                if (op[0] === 6 && _.label < t[1]) {
                                    _.label = t[1];
                                    t = op;
                                    break;
                                }
                                if (t && _.label < t[2]) {
                                    _.label = t[2];
                                    _.ops.push(op);
                                    break;
                                }
                                if (t[2]) _.ops.pop();
                                _.trys.pop();
                                continue;
                        }
                        op = body.call(thisArg, _);
                    } catch (e) {
                        op = [6, e];
                        y = 0;
                    } finally { f = t = 0; }
                    if (op[0] & 5) throw op[1];
                    return {value: op[0] ? op[1] : void 0, done: true};
                }
            };
            
            
            function bumpLogic(releaseType, version) {
                var fallbackValue = Get('fallback-version')
                    .andThen(ToSemVer)
                    .unwrapOr([0, 1, 0]);
                return version.andThen(ToSemVer).unwrapOr(fallbackValue);
            }
            
            function ExtractScriptFunction(a) {
                return Wrap(a.preVersionGeneration);
            }
            
            function GetPreVersionHook() {
                return Get('pre-changelog-generation')
                    .andThen(RequireScript)
                    .andThen(ExtractScriptFunction);
            }
            
            function bump(releaseType, version) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, major, minor, patch, v;
                    var _this = this;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = bumpLogic(releaseType, version), major = _a[0], minor = _a[1], patch = _a[2];
                                v = major + "." + minor + "." + patch;
                                return [4 /*yield*/, GetPreVersionHook()
                                    .map(function (hook) {
                                        return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        return [4 /*yield*/, hook(v)];
                                                    case 1:
                                                        return [2 /*return*/, _a.sent()];
                                                }
                                            });
                                        });
                                    })
                                    .unwrapOr(Promise.resolve(v))];
                            case 1:
                                return [2 /*return*/, _b.sent()];
                        }
                    });
                });
            }
            
            
            ;// CONCATENATED MODULE: ./src/version/json.ts
            var json_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
                function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
                
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
                    
                    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
                    
                    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
                    
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };
            var json_generator = (undefined && undefined.__generator) || function (thisArg, body) {
                var _ = {
                    label: 0, sent: function () {
                        if (t[0] & 1) throw t[1];
                        return t[1];
                    }, trys: [], ops: []
                }, f, y, t, g;
                return g = {
                    next: verb(0),
                    "throw": verb(1),
                    "return": verb(2)
                }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
                
                function verb(n) { return function (v) { return step([n, v]); }; }
                
                function step(op) {
                    if (f) throw new TypeError("Generator is already executing.");
                    while (_) try {
                        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                        if (y = 0, t) op = [op[0] & 2, t.value];
                        switch (op[0]) {
                            case 0:
                            case 1:
                                t = op;
                                break;
                            case 4:
                                _.label++;
                                return {value: op[1], done: false};
                            case 5:
                                _.label++;
                                y = op[1];
                                op = [0];
                                continue;
                            case 7:
                                op = _.ops.pop();
                                _.trys.pop();
                                continue;
                            default:
                                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                    _ = 0;
                                    continue;
                                }
                                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                    _.label = op[1];
                                    break;
                                }
                                if (op[0] === 6 && _.label < t[1]) {
                                    _.label = t[1];
                                    t = op;
                                    break;
                                }
                                if (t && _.label < t[2]) {
                                    _.label = t[2];
                                    _.ops.push(op);
                                    break;
                                }
                                if (t[2]) _.ops.pop();
                                _.trys.pop();
                                continue;
                        }
                        op = body.call(thisArg, _);
                    } catch (e) {
                        op = [6, e];
                        y = 0;
                    } finally { f = t = 0; }
                    if (op[0] & 5) throw op[1];
                    return {value: op[0] ? op[1] : void 0, done: true};
                }
            };
            
            
            var Json = /** @class */ (function () {
                function Json(file, versionPath) {
                    this.file = file;
                    this.versionPath = versionPath;
                }
                
                Json.prototype.bump = function (releaseType) {
                    return json_awaiter(this, void 0, void 0, function () {
                        var fileContent, jsonContent, oldVersion, newVersion;
                        return json_generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    fileContent = this.file.read();
                                    try {
                                        jsonContent = JSON.parse(fileContent);
                                    } catch (error) {
                                        core_namespaceObject.startGroup("Error when parsing the file '" + this.file.filePath + "'");
                                        core_namespaceObject.info("File-Content: " + fileContent);
                                        core_namespaceObject.warning(error);
                                        core_namespaceObject.endGroup();
                                        jsonContent = {};
                                    }
                                    oldVersion = GetObjectPath(jsonContent, this.versionPath);
                                    return [4 /*yield*/, bump(releaseType, oldVersion)];
                                case 1:
                                    newVersion = _a.sent();
                                    core_namespaceObject.info("Bumped file \"" + this.file.filePath + "\" from \"" + oldVersion + "\" to \"" + newVersion + "\"");
                                    // Update the content with the new version
                                    external_object_path_default().set(jsonContent, this.versionPath, newVersion);
                                    // Update the file
                                    this.file.write(JSON.stringify(jsonContent, null, 2));
                                    return [2 /*return*/, newVersion];
                            }
                        });
                    });
                };
                return Json;
            }());
            
            
            ;// CONCATENATED MODULE: ./src/version/versionFile.ts
            
            
            var VersionFile = /** @class */ (function () {
                function VersionFile(filePath) {
                    this.filePath = filePath;
                }
                
                VersionFile.prototype.read = function () {
                    if (external_fs_namespaceObject.existsSync(this.filePath)) {
                        return external_fs_namespaceObject.readFileSync(this.filePath, 'utf8');
                    }
                    core_namespaceObject.warning("Tried to read \"" + this.filePath + "\" but file does not exist!");
                    return '';
                };
                VersionFile.prototype.write = function (newContent) {
                    external_fs_namespaceObject.writeFileSync(this.filePath, newContent);
                };
                return VersionFile;
            }());
            
            
            ;// CONCATENATED MODULE: external "yaml"
            const external_yaml_namespaceObject = require("yaml");
            ;
            var external_yaml_default = /*#__PURE__*/__webpack_require__.n(external_yaml_namespaceObject);
            ;// CONCATENATED MODULE: ./src/version/yaml.ts
            var yaml_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
                function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
                
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
                    
                    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
                    
                    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
                    
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };
            var yaml_generator = (undefined && undefined.__generator) || function (thisArg, body) {
                var _ = {
                    label: 0, sent: function () {
                        if (t[0] & 1) throw t[1];
                        return t[1];
                    }, trys: [], ops: []
                }, f, y, t, g;
                return g = {
                    next: verb(0),
                    "throw": verb(1),
                    "return": verb(2)
                }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
                
                function verb(n) { return function (v) { return step([n, v]); }; }
                
                function step(op) {
                    if (f) throw new TypeError("Generator is already executing.");
                    while (_) try {
                        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                        if (y = 0, t) op = [op[0] & 2, t.value];
                        switch (op[0]) {
                            case 0:
                            case 1:
                                t = op;
                                break;
                            case 4:
                                _.label++;
                                return {value: op[1], done: false};
                            case 5:
                                _.label++;
                                y = op[1];
                                op = [0];
                                continue;
                            case 7:
                                op = _.ops.pop();
                                _.trys.pop();
                                continue;
                            default:
                                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                    _ = 0;
                                    continue;
                                }
                                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                    _.label = op[1];
                                    break;
                                }
                                if (op[0] === 6 && _.label < t[1]) {
                                    _.label = t[1];
                                    t = op;
                                    break;
                                }
                                if (t && _.label < t[2]) {
                                    _.label = t[2];
                                    _.ops.push(op);
                                    break;
                                }
                                if (t[2]) _.ops.pop();
                                _.trys.pop();
                                continue;
                        }
                        op = body.call(thisArg, _);
                    } catch (e) {
                        op = [6, e];
                        y = 0;
                    } finally { f = t = 0; }
                    if (op[0] & 5) throw op[1];
                    return {value: op[0] ? op[1] : void 0, done: true};
                }
            };
            
            
            var Yaml = /** @class */ (function () {
                function Yaml(file, versionPath) {
                    this.file = file;
                    this.versionPath = versionPath;
                }
                
                /**
                 * Bumps the version in the package.json
                 *
                 * @param {!string} releaseType - The type of release
                 * @return {*}
                 */
                Yaml.prototype.bump = function (releaseType) {
                    return yaml_awaiter(this, void 0, void 0, function () {
                        var fileContent, yamlContent, oldVersion, newVersion, versionName;
                        return yaml_generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    fileContent = this.file.read();
                                    yamlContent = external_yaml_default().parse(fileContent) || {};
                                    oldVersion = GetObjectPath(yamlContent, this.versionPath);
                                    return [4 /*yield*/, bump(releaseType, oldVersion)
                                        // Update the file
                                    ];
                                case 1:
                                    newVersion = _a.sent();
                                    // Update the file
                                    if (oldVersion.isSome()) {
                                        versionName = this.versionPath.split('.').pop();
                                        (0, core_namespaceObject.info)("Bumped file \"" + this.file.filePath + "\" from \"" + oldVersion + "\" to \"" + newVersion + "\"");
                                        this.file.write(
                                            // We use replace instead of yaml.stringify so we can preserve white spaces and comments
                                            // Replace if version was used with single quotes
                                            fileContent.replace(versionName + ": '" + oldVersion + "'", versionName + ": '" + newVersion + "'").replace(// Replace if version was used with double quotes
                                                versionName + ": \"" + oldVersion + "\"", versionName + ": \"" + newVersion + "\"").replace(// Replace if version was used with no quotes
                                                versionName + ": " + oldVersion, versionName + ": " + newVersion));
                                    } else {
                                        // Update the content with the new version
                                        external_object_path_default().set(yamlContent, this.versionPath, newVersion);
                                        this.file.write(external_yaml_default().stringify(yamlContent));
                                    }
                                    return [2 /*return*/, newVersion];
                            }
                        });
                    });
                };
                return Yaml;
            }());
            
            
            ;// CONCATENATED MODULE: external "@iarna/toml"
            const toml_namespaceObject = require("@iarna/toml");
            ;
            var toml_default = /*#__PURE__*/__webpack_require__.n(toml_namespaceObject);
            ;// CONCATENATED MODULE: ./src/version/toml.ts
            var toml_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
                function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
                
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
                    
                    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
                    
                    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
                    
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };
            var toml_generator = (undefined && undefined.__generator) || function (thisArg, body) {
                var _ = {
                    label: 0, sent: function () {
                        if (t[0] & 1) throw t[1];
                        return t[1];
                    }, trys: [], ops: []
                }, f, y, t, g;
                return g = {
                    next: verb(0),
                    "throw": verb(1),
                    "return": verb(2)
                }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
                
                function verb(n) { return function (v) { return step([n, v]); }; }
                
                function step(op) {
                    if (f) throw new TypeError("Generator is already executing.");
                    while (_) try {
                        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                        if (y = 0, t) op = [op[0] & 2, t.value];
                        switch (op[0]) {
                            case 0:
                            case 1:
                                t = op;
                                break;
                            case 4:
                                _.label++;
                                return {value: op[1], done: false};
                            case 5:
                                _.label++;
                                y = op[1];
                                op = [0];
                                continue;
                            case 7:
                                op = _.ops.pop();
                                _.trys.pop();
                                continue;
                            default:
                                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                    _ = 0;
                                    continue;
                                }
                                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                    _.label = op[1];
                                    break;
                                }
                                if (op[0] === 6 && _.label < t[1]) {
                                    _.label = t[1];
                                    t = op;
                                    break;
                                }
                                if (t && _.label < t[2]) {
                                    _.label = t[2];
                                    _.ops.push(op);
                                    break;
                                }
                                if (t[2]) _.ops.pop();
                                _.trys.pop();
                                continue;
                        }
                        op = body.call(thisArg, _);
                    } catch (e) {
                        op = [6, e];
                        y = 0;
                    } finally { f = t = 0; }
                    if (op[0] & 5) throw op[1];
                    return {value: op[0] ? op[1] : void 0, done: true};
                }
            };
            
            
            var Toml = /** @class */ (function () {
                function Toml(file, versionPath) {
                    this.file = file;
                    this.versionPath = versionPath;
                }
                
                /**
                 * Bumps the version in the package.json
                 *
                 * @param {!string} releaseType - The type of release
                 * @return {*}
                 */
                Toml.prototype.bump = function (releaseType) {
                    return toml_awaiter(this, void 0, void 0, function () {
                        var fileContent, tomlContent, oldVersion, newVersion, versionName;
                        return toml_generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    fileContent = this.file.read();
                                    tomlContent = toml_default().parse(fileContent);
                                    oldVersion = GetObjectPath(tomlContent, this.versionPath);
                                    return [4 /*yield*/, bump(releaseType, oldVersion)
                                        // Update the file
                                    ];
                                case 1:
                                    newVersion = _a.sent();
                                    // Update the file
                                    if (oldVersion.isSome()) {
                                        versionName = this.versionPath.split('.').pop();
                                        (0, core_namespaceObject.info)("Bumped file \"" + this.file.filePath + "\" from \"" + oldVersion + "\" to \"" + newVersion + "\"");
                                        this.file.write(
                                            // We use replace instead of yaml.stringify so we can preserve white spaces and comments
                                            fileContent.replace(versionName + " = \"" + oldVersion + "\"", versionName + " = \"" + newVersion + "\""));
                                    } else {
                                        // Update the content with the new version
                                        external_object_path_default().set(tomlContent, this.versionPath, newVersion);
                                        this.file.write(toml_default().stringify(tomlContent));
                                    }
                                    return [2 /*return*/, newVersion];
                            }
                        });
                    });
                };
                return Toml;
            }());
            
            
            ;// CONCATENATED MODULE: external "git-semver-tags"
            const external_git_semver_tags_namespaceObject = require("git-semver-tags");
            ;
            var external_git_semver_tags_default = /*#__PURE__*/__webpack_require__.n(external_git_semver_tags_namespaceObject);
            ;// CONCATENATED MODULE: ./src/helpers/gitSemVerTags.ts
            
            
            function GitSemVerTags(tagPrefix) {
                return new Promise(function (r) {
                    external_git_semver_tags_default()({tagPrefix: tagPrefix}, function (err, tags) {
                        if (err) {
                            r((0, monads_namespaceObject.Err)(err));
                            return;
                        }
                        r((0, monads_namespaceObject.Ok)(tags));
                    });
                });
            }
            
            
            ;// CONCATENATED MODULE: ./src/version/git.ts
            var git_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
                function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
                
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
                    
                    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
                    
                    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
                    
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };
            var git_generator = (undefined && undefined.__generator) || function (thisArg, body) {
                var _ = {
                    label: 0, sent: function () {
                        if (t[0] & 1) throw t[1];
                        return t[1];
                    }, trys: [], ops: []
                }, f, y, t, g;
                return g = {
                    next: verb(0),
                    "throw": verb(1),
                    "return": verb(2)
                }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
                
                function verb(n) { return function (v) { return step([n, v]); }; }
                
                function step(op) {
                    if (f) throw new TypeError("Generator is already executing.");
                    while (_) try {
                        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                        if (y = 0, t) op = [op[0] & 2, t.value];
                        switch (op[0]) {
                            case 0:
                            case 1:
                                t = op;
                                break;
                            case 4:
                                _.label++;
                                return {value: op[1], done: false};
                            case 5:
                                _.label++;
                                y = op[1];
                                op = [0];
                                continue;
                            case 7:
                                op = _.ops.pop();
                                _.trys.pop();
                                continue;
                            default:
                                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                    _ = 0;
                                    continue;
                                }
                                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                    _.label = op[1];
                                    break;
                                }
                                if (op[0] === 6 && _.label < t[1]) {
                                    _.label = t[1];
                                    t = op;
                                    break;
                                }
                                if (t && _.label < t[2]) {
                                    _.label = t[2];
                                    _.ops.push(op);
                                    break;
                                }
                                if (t[2]) _.ops.pop();
                                _.trys.pop();
                                continue;
                        }
                        op = body.call(thisArg, _);
                    } catch (e) {
                        op = [6, e];
                        y = 0;
                    } finally { f = t = 0; }
                    if (op[0] & 5) throw op[1];
                    return {value: op[0] ? op[1] : void 0, done: true};
                }
            };
            
            
            function GitBump(releaseType, tagPrefix) {
                return git_awaiter(this, void 0, void 0, function () {
                    var result, r, updatedVersion;
                    return git_generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, GitSemVerTags(tagPrefix)];
                            case 1:
                                result = _a.sent();
                                r = result.map(function (tags) {
                                    var currentVersion = tags.length > 0 ? (0, monads_namespaceObject.Some)(tags.shift().replace(tagPrefix, '')) : monads_namespaceObject.None;
                                    return bump(releaseType, currentVersion);
                                });
                                if (r.isErr())
                                    return [2 /*return*/, r.map(function (_) { return ""; })];
                                return [4 /*yield*/, r.unwrap()];
                            case 2:
                                updatedVersion = _a.sent();
                                return [2 /*return*/, (0, monads_namespaceObject.Ok)(updatedVersion)];
                        }
                    });
                });
            }
            
            var GitType = /** @class */ (function () {
                function GitType(tagPrefix) {
                    this.tagPrefix = tagPrefix;
                }
                
                GitType.prototype.bump = function (releaseType) {
                    return git_awaiter(this, void 0, void 0, function () {
                        var v;
                        return git_generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    return [4 /*yield*/, GitBump(releaseType, this.tagPrefix)];
                                case 1:
                                    v = _a.sent();
                                    if (v.isErr()) {
                                        throw new Error(v.unwrapErr());
                                    }
                                    return [2 /*return*/, v.unwrap()];
                            }
                        });
                    });
                };
                return GitType;
            }());
            
            
            ;// CONCATENATED MODULE: ./src/version/index.ts
            
            
            var VersioningFactory = /** @class */ (function () {
                function VersioningFactory(filePath, versionPath, tagPrefix) {
                    this.filePath = filePath;
                    this.versionPath = versionPath;
                    this.tagPrefix = tagPrefix;
                }
                
                VersioningFactory.prototype.get = function (fileExtension) {
                    var file = new VersionFile(this.filePath);
                    switch (fileExtension.toLowerCase()) {
                        case 'json':
                            return (0, monads_namespaceObject.Some)(new Json(file, this.versionPath));
                        case 'yaml':
                        case 'yml':
                            return (0, monads_namespaceObject.Some)(new Yaml(file, this.versionPath));
                        case 'toml':
                            return (0, monads_namespaceObject.Some)(new Toml(file, this.versionPath));
                        case 'git':
                            return (0, monads_namespaceObject.Some)(new GitType(this.tagPrefix));
                        default:
                            return monads_namespaceObject.None;
                    }
                };
                return VersioningFactory;
            }());
            
            
            ;// CONCATENATED MODULE: external "@kirinnee/core"
            const external_kirinnee_core_namespaceObject = require("@kirinnee/core");
            ;
            ;// CONCATENATED MODULE: ./src/helpers/git.ts
            var helpers_git_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
                function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
                
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
                    
                    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
                    
                    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
                    
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };
            var helpers_git_generator = (undefined && undefined.__generator) || function (thisArg, body) {
                var _ = {
                    label: 0, sent: function () {
                        if (t[0] & 1) throw t[1];
                        return t[1];
                    }, trys: [], ops: []
                }, f, y, t, g;
                return g = {
                    next: verb(0),
                    "throw": verb(1),
                    "return": verb(2)
                }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
                
                function verb(n) { return function (v) { return step([n, v]); }; }
                
                function step(op) {
                    if (f) throw new TypeError("Generator is already executing.");
                    while (_) try {
                        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                        if (y = 0, t) op = [op[0] & 2, t.value];
                        switch (op[0]) {
                            case 0:
                            case 1:
                                t = op;
                                break;
                            case 4:
                                _.label++;
                                return {value: op[1], done: false};
                            case 5:
                                _.label++;
                                y = op[1];
                                op = [0];
                                continue;
                            case 7:
                                op = _.ops.pop();
                                _.trys.pop();
                                continue;
                            default:
                                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                    _ = 0;
                                    continue;
                                }
                                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                    _.label = op[1];
                                    break;
                                }
                                if (op[0] === 6 && _.label < t[1]) {
                                    _.label = t[1];
                                    t = op;
                                    break;
                                }
                                if (t && _.label < t[2]) {
                                    _.label = t[2];
                                    _.ops.push(op);
                                    break;
                                }
                                if (t[2]) _.ops.pop();
                                _.trys.pop();
                                continue;
                        }
                        op = body.call(thisArg, _);
                    } catch (e) {
                        op = [6, e];
                        y = 0;
                    } finally { f = t = 0; }
                    if (op[0] & 5) throw op[1];
                    return {value: op[0] ? op[1] : void 0, done: true};
                }
            };
            
            var assert = __webpack_require__(357);
            var Git = /** @class */ (function () {
                function Git(executor, branch, useGit) {
                    this.executor = executor;
                    this.branch = branch;
                    this.useGit = useGit;
                }
                
                Git.prototype.exec = function (command) {
                    return this.executor.Exec(command);
                };
                Git.prototype.config = function (prop, value) {
                    return this.exec("config " + prop + " \"" + value + "\"");
                };
                Git.prototype.add = function (file) {
                    return this.exec("add " + file);
                };
                Git.prototype.commit = function (message) {
                    return this.exec("commit -m \"" + message + "\"");
                };
                Git.prototype.pull = function (method) {
                    return helpers_git_awaiter(this, void 0, void 0, function () {
                        var args, shallow, s;
                        return helpers_git_generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    args = ['pull'];
                                    return [4 /*yield*/, this.isShallow()];
                                case 1:
                                    shallow = _a.sent();
                                    if (shallow.isErr()) {
                                        return [2 /*return*/, (0, monads_namespaceObject.Err)(shallow.unwrapErr())];
                                    }
                                    s = shallow.unwrap();
                                    if (s)
                                        args.push('--unshallow');
                                    args.push('--tags');
                                    args.push(method);
                                    return [2 /*return*/, this.exec(args.join(' '))];
                            }
                        });
                    });
                };
                Git.prototype.push = function () {
                    return this.exec("push origin " + this.branch + " --follow-tags");
                };
                Git.prototype.isShallow = function () {
                    return helpers_git_awaiter(this, void 0, void 0, function () {
                        var isShallow;
                        return helpers_git_generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!this.useGit)
                                        return [2 /*return*/, (0, monads_namespaceObject.Ok)(false)];
                                    return [4 /*yield*/, this.exec('rev-parse --is-shallow-repository')];
                                case 1:
                                    isShallow = _a.sent();
                                    return [2 /*return*/, isShallow.map(function (x) { return x.trim().replace('\n', '') === 'true'; })];
                            }
                        });
                    });
                };
                /**
                 * Updates the origin remote
                 *
                 * @param repo
                 * @return {Promise<>}
                 */
                Git.prototype.updateOrigin = function (repo) {
                    return this.exec("remote set-url origin " + repo);
                };
                /**
                 * Creates git tag
                 *
                 * @param tag
                 * @return {Promise<>}
                 */
                Git.prototype.createTag = function (tag) {
                    return this.exec("tag -a " + tag + " -m \"" + tag + "\"");
                };
                /**
                 * Validates the commands run
                 */
                Git.prototype.testHistory = function () {
                    if (!this.useGit) {
                        var _a = process.env, EXPECTED_TAG = _a.EXPECTED_TAG, SKIPPED_COMMIT = _a.SKIPPED_COMMIT;
                        var expectedCommands = [
                            'git config user.name "Conventional Changelog Action"',
                            'git config user.email "conventional.changelog.action@github.com"',
                            'git pull --tags --ff-only',
                        ];
                        if (!SKIPPED_COMMIT) {
                            expectedCommands.push('git add .');
                            expectedCommands.push("git commit -m \"chore(release): " + EXPECTED_TAG + "\"");
                        }
                        expectedCommands.push("git tag -a " + EXPECTED_TAG + " -m \"" + EXPECTED_TAG + "\"");
                        expectedCommands.push("git push origin " + this.branch + " --follow-tags");
                        assert.deepStrictEqual(this.executor.Commands(), expectedCommands);
                    }
                };
                return Git;
            }());
            
            
            ;// CONCATENATED MODULE: external "@actions/exec"
            const exec_namespaceObject = require("@actions/exec");
            ;
            ;// CONCATENATED MODULE: ./src/helpers/gitExecutor.ts
            var gitExecutor_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
                function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
                
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
                    
                    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
                    
                    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
                    
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };
            var gitExecutor_generator = (undefined && undefined.__generator) || function (thisArg, body) {
                var _ = {
                    label: 0, sent: function () {
                        if (t[0] & 1) throw t[1];
                        return t[1];
                    }, trys: [], ops: []
                }, f, y, t, g;
                return g = {
                    next: verb(0),
                    "throw": verb(1),
                    "return": verb(2)
                }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
                
                function verb(n) { return function (v) { return step([n, v]); }; }
                
                function step(op) {
                    if (f) throw new TypeError("Generator is already executing.");
                    while (_) try {
                        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                        if (y = 0, t) op = [op[0] & 2, t.value];
                        switch (op[0]) {
                            case 0:
                            case 1:
                                t = op;
                                break;
                            case 4:
                                _.label++;
                                return {value: op[1], done: false};
                            case 5:
                                _.label++;
                                y = op[1];
                                op = [0];
                                continue;
                            case 7:
                                op = _.ops.pop();
                                _.trys.pop();
                                continue;
                            default:
                                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                    _ = 0;
                                    continue;
                                }
                                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                    _.label = op[1];
                                    break;
                                }
                                if (op[0] === 6 && _.label < t[1]) {
                                    _.label = t[1];
                                    t = op;
                                    break;
                                }
                                if (t && _.label < t[2]) {
                                    _.label = t[2];
                                    _.ops.push(op);
                                    break;
                                }
                                if (t[2]) _.ops.pop();
                                _.trys.pop();
                                continue;
                        }
                        op = body.call(thisArg, _);
                    } catch (e) {
                        op = [6, e];
                        y = 0;
                    } finally { f = t = 0; }
                    if (op[0] & 5) throw op[1];
                    return {value: op[0] ? op[1] : void 0, done: true};
                }
            };
            
            
            var GitCommandExecutor = /** @class */ (function () {
                function GitCommandExecutor() {
                }
                
                GitCommandExecutor.prototype.Exec = function (command) {
                    var _this = this;
                    return new Promise(function (resolve) {
                        return gitExecutor_awaiter(_this, void 0, void 0, function () {
                            var execOutput, options, exitCode;
                            return gitExecutor_generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        execOutput = '';
                                        options = {
                                            listeners: {
                                                stdout: function (data) {
                                                    execOutput += data.toString();
                                                },
                                            },
                                        };
                                        return [4 /*yield*/, (0, exec_namespaceObject.exec)("git " + command, undefined, options)];
                                    case 1:
                                        exitCode = _a.sent();
                                        if (exitCode === 0) {
                                            resolve((0, monads_namespaceObject.Ok)(execOutput));
                                        } else {
                                            resolve((0, monads_namespaceObject.Err)("Command \"git " + command + "\" exited with code " + exitCode + "."));
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                };
                GitCommandExecutor.prototype.Commands = function () {
                    return [];
                };
                return GitCommandExecutor;
            }());
            var MockExecutor = /** @class */ (function () {
                function MockExecutor() {
                    this.commandsRun = [];
                }
                
                MockExecutor.prototype.Exec = function (command) {
                    var fullCommand = "git " + command;
                    console.log("Skipping \"" + fullCommand + "\" because of test env");
                    if (!fullCommand.includes('git remote set-url origin')) {
                        this.commandsRun.push(fullCommand);
                    }
                    return Promise.resolve((0, monads_namespaceObject.Ok)(""));
                };
                MockExecutor.prototype.Commands = function () {
                    return this.commandsRun;
                };
                return MockExecutor;
            }());
            
            
            ;// CONCATENATED MODULE: ./src/helpers/gitFactory.ts
            var gitFactory_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
                function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
                
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
                    
                    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
                    
                    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
                    
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };
            var gitFactory_generator = (undefined && undefined.__generator) || function (thisArg, body) {
                var _ = {
                    label: 0, sent: function () {
                        if (t[0] & 1) throw t[1];
                        return t[1];
                    }, trys: [], ops: []
                }, f, y, t, g;
                return g = {
                    next: verb(0),
                    "throw": verb(1),
                    "return": verb(2)
                }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
                
                function verb(n) { return function (v) { return step([n, v]); }; }
                
                function step(op) {
                    if (f) throw new TypeError("Generator is already executing.");
                    while (_) try {
                        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                        if (y = 0, t) op = [op[0] & 2, t.value];
                        switch (op[0]) {
                            case 0:
                            case 1:
                                t = op;
                                break;
                            case 4:
                                _.label++;
                                return {value: op[1], done: false};
                            case 5:
                                _.label++;
                                y = op[1];
                                op = [0];
                                continue;
                            case 7:
                                op = _.ops.pop();
                                _.trys.pop();
                                continue;
                            default:
                                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                    _ = 0;
                                    continue;
                                }
                                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                    _.label = op[1];
                                    break;
                                }
                                if (op[0] === 6 && _.label < t[1]) {
                                    _.label = t[1];
                                    t = op;
                                    break;
                                }
                                if (t && _.label < t[2]) {
                                    _.label = t[2];
                                    _.ops.push(op);
                                    break;
                                }
                                if (t[2]) _.ops.pop();
                                _.trys.pop();
                                continue;
                        }
                        op = body.call(thisArg, _);
                    } catch (e) {
                        op = [6, e];
                        y = 0;
                    } finally { f = t = 0; }
                    if (op[0] & 5) throw op[1];
                    return {value: op[0] ? op[1] : void 0, done: true};
                }
            };
            var _a;
            
            
            var _b = process.env, GITHUB_REPOSITORY = _b.GITHUB_REPOSITORY, GITHUB_REF = _b.GITHUB_REF, ENV = _b.ENV;
            var branch = (_a = GITHUB_REF === null || GITHUB_REF === void 0 ? void 0 : GITHUB_REF.replace('refs/heads/', '')) !== null && _a !== void 0 ? _a : "";
            var useGit = ENV !== 'dont-use-git';
            
            function InitializeGit() {
                return gitFactory_awaiter(this, void 0, void 0, function () {
                    var result;
                    return gitFactory_generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, initializeGit()];
                            case 1:
                                result = _a.sent();
                                if (result.isErr()) {
                                    (0, core_namespaceObject.error)(result.unwrapErr());
                                    throw result.unwrapErr();
                                }
                                return [2 /*return*/, result.unwrap()];
                        }
                    });
                });
            }
            
            function initializeGit() {
                return gitFactory_awaiter(this, void 0, void 0, function () {
                    var exec, githubToken, username, email, git, result1, result2, result3;
                    return gitFactory_generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                exec = useGit ? new GitCommandExecutor() : new MockExecutor();
                                githubToken = (0, core_namespaceObject.getInput)('github-token');
                                (0, core_namespaceObject.setSecret)(githubToken);
                                username = (0, core_namespaceObject.getInput)('git-user-name');
                                email = (0, core_namespaceObject.getInput)('git-user-email');
                                git = new Git(exec, branch, useGit);
                                return [4 /*yield*/, git.config('user.name', username)];
                            case 1:
                                result1 = _a.sent();
                                if (result1.isErr())
                                    return [2 /*return*/, (0, monads_namespaceObject.Err)(result1.unwrapErr())];
                                return [4 /*yield*/, git.config('user.email', email)];
                            case 2:
                                result2 = _a.sent();
                                if (result2.isErr())
                                    return [2 /*return*/, (0, monads_namespaceObject.Err)(result2.unwrapErr())];
                                return [4 /*yield*/, git.updateOrigin("https://x-access-token:" + githubToken + "@github.com/" + GITHUB_REPOSITORY + ".git")];
                            case 3:
                                result3 = _a.sent();
                                if (result3.isErr())
                                    return [2 /*return*/, (0, monads_namespaceObject.Err)(result3.unwrapErr())];
                                return [2 /*return*/, (0, monads_namespaceObject.Ok)(git)];
                        }
                    });
                });
            }
            
            ;// CONCATENATED MODULE: external "conventional-recommended-bump"
            const external_conventional_recommended_bump_namespaceObject = require("conventional-recommended-bump");
            ;
            var external_conventional_recommended_bump_default = /*#__PURE__*/__webpack_require__.n(external_conventional_recommended_bump_namespaceObject);
            ;// CONCATENATED MODULE: ./src/helpers/conventionalCommitRecommendation.ts
            
            
            var config = __webpack_require__(711);
            
            function ConventionalRecommendedBump(options) {
                return new Promise(function (r) {
                    var opts = {
                        tagPrefix: ForceUnwrap(options.tagPrefix),
                        config: ForceUnwrap(options.config.map(function (x) { return config(x); })),
                        preset: ForceUnwrap(options.preset),
                    };
                    external_conventional_recommended_bump_default()(opts, function (err, rec) {
                        if (err) {
                            r((0, monads_namespaceObject.Err)(err));
                            return;
                        }
                        r((0, monads_namespaceObject.Ok)(rec));
                    });
                });
            }
            
            
            ;// CONCATENATED MODULE: external "conventional-changelog"
            const external_conventional_changelog_namespaceObject = require("conventional-changelog");
            ;
            var external_conventional_changelog_default = /*#__PURE__*/__webpack_require__.n(external_conventional_changelog_namespaceObject);
            ;// CONCATENATED MODULE: ./src/helpers/generateChangelog.ts
            
            
            var convertConfig = __webpack_require__(711);
            
            function getChangelogStream(tagPrefix, preset, version, releaseCount, cfg) {
                var config = cfg == null ? convertConfig(cfg) : null;
                return external_conventional_changelog_default()({
                    preset: preset,
                    releaseCount: parseInt(releaseCount, 10),
                    tagPrefix: tagPrefix,
                    config: config,
                }, {
                    version: version,
                    currentTag: "" + tagPrefix + version,
                }, {}, config && config.parserOpts, config && config.writerOpts);
            }
            
            function generateStringChangelog(tagPrefix, preset, version, releaseCount, config) {
                return new Promise(function (resolve) {
                    var changelogStream = getChangelogStream(tagPrefix, preset, version, releaseCount, config);
                    var changelog = '';
                    changelogStream
                        .on('data', function (data) {
                            changelog += data.toString();
                        })
                        .on('end', function () { return resolve(changelog); });
                });
            }
            
            function generateFileChangelog(tagPrefix, preset, version, fileName, releaseCount, config) {
                return new Promise(function (resolve) {
                    var changelogStream = getChangelogStream(tagPrefix, preset, version, releaseCount, config);
                    changelogStream
                        .pipe(external_fs_namespaceObject.createWriteStream(fileName))
                        .on('finish', resolve);
                });
            }
            
            
            ;// CONCATENATED MODULE: ./src/index.ts
            var src_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
                function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
                
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
                    
                    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
                    
                    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
                    
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };
            var src_generator = (undefined && undefined.__generator) || function (thisArg, body) {
                var _ = {
                    label: 0, sent: function () {
                        if (t[0] & 1) throw t[1];
                        return t[1];
                    }, trys: [], ops: []
                }, f, y, t, g;
                return g = {
                    next: verb(0),
                    "throw": verb(1),
                    "return": verb(2)
                }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
                
                function verb(n) { return function (v) { return step([n, v]); }; }
                
                function step(op) {
                    if (f) throw new TypeError("Generator is already executing.");
                    while (_) try {
                        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                        if (y = 0, t) op = [op[0] & 2, t.value];
                        switch (op[0]) {
                            case 0:
                            case 1:
                                t = op;
                                break;
                            case 4:
                                _.label++;
                                return {value: op[1], done: false};
                            case 5:
                                _.label++;
                                y = op[1];
                                op = [0];
                                continue;
                            case 7:
                                op = _.ops.pop();
                                _.trys.pop();
                                continue;
                            default:
                                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                    _ = 0;
                                    continue;
                                }
                                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                    _.label = op[1];
                                    break;
                                }
                                if (op[0] === 6 && _.label < t[1]) {
                                    _.label = t[1];
                                    t = op;
                                    break;
                                }
                                if (t && _.label < t[2]) {
                                    _.label = t[2];
                                    _.ops.push(op);
                                    break;
                                }
                                if (t[2]) _.ops.pop();
                                _.trys.pop();
                                continue;
                        }
                        op = body.call(thisArg, _);
                    } catch (e) {
                        op = [6, e];
                        y = 0;
                    } finally { f = t = 0; }
                    if (op[0] & 5) throw op[1];
                    return {value: op[0] ? op[1] : void 0, done: true};
                }
            };
            
            
            var c = new external_kirinnee_core_namespaceObject.Kore();
            c.ExtendPrimitives();
            
            function handleVersioningByExtension(f, ext, releaseType) {
                return src_awaiter(this, void 0, void 0, function () {
                    return src_generator(this, function (_a) {
                        return [2 /*return*/, f.get(ext).match({
                            none: function () {
                                return Promise.resolve((0, monads_namespaceObject.Err)("File extension \"" + ext + "\" is not supported"));
                            },
                            some: function (val) {
                                return src_awaiter(this, void 0, void 0, function () {
                                    var newVersion;
                                    return src_generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                return [4 /*yield*/, val.bump(releaseType)];
                                            case 1:
                                                newVersion = _a.sent();
                                                return [2 /*return*/, (0, monads_namespaceObject.Ok)(newVersion)];
                                        }
                                    });
                                });
                            }
                        })];
                    });
                });
            }
            
            function run() {
                return src_awaiter(this, void 0, void 0, function () {
                    var conventionalConfigFile, gitCommitMessage_1, gitUserName, gitUserEmail, tagPrefix_1, preset_1,
                        preCommitFile_1, outputFile_1, releaseCount_1, versionFile_1, versionPath, skipVersionFile_1,
                        skipCommit_1, skipEmptyRelease_1, preChangelogGenerationFile_1, vff_1, git_1, method, result,
                        config_1, recommendationResult, error_1;
                    var _this = this;
                    return src_generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 5, , 6]);
                                conventionalConfigFile = Get('config-file-path');
                                gitCommitMessage_1 = (0, core_namespaceObject.getInput)('git-message');
                                gitUserName = (0, core_namespaceObject.getInput)('git-user-name');
                                gitUserEmail = (0, core_namespaceObject.getInput)('git-user-email');
                                tagPrefix_1 = Get('tag-prefix');
                                preset_1 = conventionalConfigFile.isNone() ? Get('preset') : monads_namespaceObject.None;
                                preCommitFile_1 = Get('pre-commit');
                                outputFile_1 = (0, core_namespaceObject.getInput)('output-file');
                                releaseCount_1 = (0, core_namespaceObject.getInput)('release-count');
                                versionFile_1 = (0, core_namespaceObject.getInput)('version-file');
                                versionPath = (0, core_namespaceObject.getInput)('version-path');
                                skipVersionFile_1 = (0, core_namespaceObject.getInput)('skip-version-file').toLowerCase() === 'true';
                                skipCommit_1 = (0, core_namespaceObject.getInput)('skip-commit').toLowerCase() === 'true';
                                skipEmptyRelease_1 = (0, core_namespaceObject.getInput)('skip-on-empty').toLowerCase() === 'true';
                                preChangelogGenerationFile_1 = Get('pre-changelog-generation');
                                (0, core_namespaceObject.info)("Using \"" + preset_1.unwrapOr('') + "\" preset");
                                (0, core_namespaceObject.info)("Using \"" + tagPrefix_1.unwrapOr('') + "\" as tag prefix");
                                (0, core_namespaceObject.info)("Using \"" + conventionalConfigFile.unwrapOr('') + "\" as config file");
                                (0, core_namespaceObject.info)("Using \"" + gitCommitMessage_1 + "\" as commit message");
                                (0, core_namespaceObject.info)("Using \"" + gitUserName + "\" as git user.name");
                                (0, core_namespaceObject.info)("Using \"" + gitUserEmail + "\" as git user.email");
                                (0, core_namespaceObject.info)("Using \"" + releaseCount_1 + "\" release count");
                                (0, core_namespaceObject.info)("Using \"" + versionFile_1 + "\" as version file");
                                (0, core_namespaceObject.info)("Using \"" + versionPath + "\" as version path");
                                (0, core_namespaceObject.info)("Using \"" + outputFile_1 + "\" as output file");
                                if (preCommitFile_1.isSome()) {
                                    (0, core_namespaceObject.info)("Using \"" + preCommitFile_1 + "\" as pre-commit script");
                                }
                                if (preChangelogGenerationFile_1.isSome()) {
                                    (0, core_namespaceObject.info)("Using \"" + preChangelogGenerationFile_1 + "\" as pre-changelog-generation script");
                                }
                                (0, core_namespaceObject.info)("Skipping empty releases is \"" + (skipEmptyRelease_1 ? 'enabled' : 'disabled') + "\"");
                                (0, core_namespaceObject.info)("Skipping the update of the version file is \"" + (skipVersionFile_1 ? 'enabled' : 'disabled') + "\"");
                                vff_1 = new VersioningFactory(versionFile_1, versionPath, tagPrefix_1.unwrapOr(''));
                                return [4 /*yield*/, InitializeGit()];
                            case 1:
                                git_1 = _a.sent();
                                (0, core_namespaceObject.info)('Pull to make sure we have the full git history');
                                method = (0, core_namespaceObject.getInput)('git-pull-method');
                                return [4 /*yield*/, git_1.pull(method)];
                            case 2:
                                result = _a.sent();
                                if (result.isErr()) {
                                    (0, core_namespaceObject.error)(result.unwrapErr());
                                    throw result.unwrapErr();
                                }
                                config_1 = conventionalConfigFile.andThen(RequireScript);
                                return [4 /*yield*/, ConventionalRecommendedBump({
                                    preset: preset_1,
                                    tagPrefix: tagPrefix_1,
                                    config: config_1
                                })];
                            case 3:
                                recommendationResult = _a.sent();
                                return [4 /*yield*/, recommendationResult.map(function (recommendation) {
                                    return src_awaiter(_this, void 0, void 0, function () {
                                        var GitHandleVersion, FileHandleVersion, newVersion, _a, gitTag,
                                            stringChangelog, cleanChangelog;
                                        var _this = this;
                                        return src_generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    (0, core_namespaceObject.info)("Recommended release type: " + recommendation.releaseType);
                                                    // If we have a reason also log it
                                                    if (recommendation.reason)
                                                        (0, core_namespaceObject.info)("Because: " + recommendation.reason);
                                                    GitHandleVersion = function () {
                                                        return src_awaiter(_this, void 0, void 0, function () {
                                                            var result;
                                                            var _a;
                                                            return src_generator(this, function (_b) {
                                                                switch (_b.label) {
                                                                    case 0:
                                                                        (0, core_namespaceObject.info)('Using GIT to determine the new version');
                                                                        return [4 /*yield*/, handleVersioningByExtension(vff_1, 'git', (_a = recommendation.releaseType) !== null && _a !== void 0 ? _a : "patch")];
                                                                    case 1:
                                                                        result = _b.sent();
                                                                        if (result.isErr()) {
                                                                            (0, core_namespaceObject.error)(result.unwrapErr());
                                                                            throw result.unwrapErr();
                                                                        }
                                                                        return [2 /*return*/, result.unwrap()];
                                                                }
                                                            });
                                                        });
                                                    };
                                                    FileHandleVersion = function () {
                                                        return src_awaiter(_this, void 0, void 0, function () {
                                                            var files, versioning, success, top;
                                                            return src_generator(this, function (_a) {
                                                                switch (_a.label) {
                                                                    case 0:
                                                                        files = versionFile_1.split(',').TrimAll();
                                                                        (0, core_namespaceObject.info)("Files to bump: " + files.join(', '));
                                                                        return [4 /*yield*/, Promise.all(files.map(function (file) {
                                                                            return GetFileExtension(file)
                                                                                .map(function (ext) {
                                                                                    var _a;
                                                                                    (0, core_namespaceObject.info)("Bumping version to file \"" + file + "\" with extension \"" + ext + "\"");
                                                                                    return handleVersioningByExtension(vff_1, ext, (_a = recommendation.releaseType) !== null && _a !== void 0 ? _a : "patch");
                                                                                });
                                                                        }))];
                                                                    case 1:
                                                                        versioning = _a.sent();
                                                                        success = versioning.filter(function (x) { return x.isOk(); }).map(function (x) { return x.unwrap(); });
                                                                        if (success.length == 0) {
                                                                            throw "no valid version file found";
                                                                        }
                                                                        return [4 /*yield*/, success[0]];
                                                                    case 2:
                                                                        top = _a.sent();
                                                                        return [2 /*return*/, top.unwrap()];
                                                                }
                                                            });
                                                        });
                                                    };
                                                    if (!(skipVersionFile_1 || skipCommit_1)) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, GitHandleVersion()];
                                                case 1:
                                                    _a = _b.sent();
                                                    return [3 /*break*/, 4];
                                                case 2:
                                                    return [4 /*yield*/, FileHandleVersion()];
                                                case 3:
                                                    _a = _b.sent();
                                                    _b.label = 4;
                                                case 4:
                                                    newVersion = _a;
                                                    gitTag = "" + tagPrefix_1 + newVersion;
                                                    return [4 /*yield*/, preChangelogGenerationFile_1.andThen(RequireScript).map(function (x) {
                                                        return src_awaiter(_this, void 0, void 0, function () {
                                                            var modifiedTag;
                                                            return src_generator(this, function (_a) {
                                                                switch (_a.label) {
                                                                    case 0:
                                                                        if (!x.preTagGeneration)
                                                                            return [2 /*return*/];
                                                                        return [4 /*yield*/, x.preTagGeneration(gitTag)];
                                                                    case 1:
                                                                        modifiedTag = _a.sent();
                                                                        if (modifiedTag) {
                                                                            (0, core_namespaceObject.info)("Using modified tag \"" + modifiedTag + "\"");
                                                                            gitTag = modifiedTag;
                                                                        }
                                                                        return [2 /*return*/];
                                                                }
                                                            });
                                                        });
                                                    })
                                                        // Generate the string changelog
                                                    ];
                                                case 5:
                                                    _b.sent();
                                                    return [4 /*yield*/, generateStringChangelog(tagPrefix_1.unwrapOr(''), preset_1.unwrapOr(''), newVersion, '1', config_1)];
                                                case 6:
                                                    stringChangelog = _b.sent();
                                                    (0, core_namespaceObject.info)('Changelog generated');
                                                    (0, core_namespaceObject.info)(stringChangelog);
                                                    cleanChangelog = stringChangelog.split('\n').slice(3).join('\n').trim();
                                                    if (skipEmptyRelease_1 && cleanChangelog === '') {
                                                        (0, core_namespaceObject.info)('Generated changelog is empty and skip-on-empty has been activated so we skip this step');
                                                        (0, core_namespaceObject.setOutput)('skipped', 'true');
                                                        return [2 /*return*/];
                                                    }
                                                    (0, core_namespaceObject.info)("New version: " + newVersion);
                                                    if (!(outputFile_1 !== 'false')) return [3 /*break*/, 8];
                                                    // Generate the changelog
                                                    return [4 /*yield*/, generateFileChangelog(tagPrefix_1.unwrapOr(''), preset_1.unwrapOr(''), newVersion, outputFile_1, releaseCount_1, config_1)];
                                                case 7:
                                                    // Generate the changelog
                                                    _b.sent();
                                                    _b.label = 8;
                                                case 8:
                                                    if (!!skipCommit_1) return [3 /*break*/, 12];
                                                    // Add changed files to git
                                                    return [4 /*yield*/, preCommitFile_1.andThen(RequireScript).map(function (x) {
                                                        return src_awaiter(_this, void 0, void 0, function () {
                                                            return src_generator(this, function (_a) {
                                                                switch (_a.label) {
                                                                    case 0:
                                                                        if (!x.preCommit)
                                                                            return [2 /*return*/];
                                                                        return [4 /*yield*/, x.preCommit({
                                                                            tag: gitTag,
                                                                            version: newVersion
                                                                        })];
                                                                    case 1:
                                                                        _a.sent();
                                                                        return [2 /*return*/];
                                                                }
                                                            });
                                                        });
                                                    })];
                                                case 9:
                                                    // Add changed files to git
                                                    _b.sent();
                                                    return [4 /*yield*/, git_1.add('.')];
                                                case 10:
                                                    _b.sent();
                                                    return [4 /*yield*/, git_1.commit(gitCommitMessage_1.replace('{version}', gitTag))];
                                                case 11:
                                                    _b.sent();
                                                    _b.label = 12;
                                                case 12:
                                                    // Create the new tag
                                                    return [4 /*yield*/, git_1.createTag(gitTag)];
                                                case 13:
                                                    // Create the new tag
                                                    _b.sent();
                                                    (0, core_namespaceObject.info)('Push all changes');
                                                    return [4 /*yield*/, git_1.push()
                                                        // Set outputs so other actions (for example actions/create-release) can use it
                                                    ];
                                                case 14:
                                                    _b.sent();
                                                    // Set outputs so other actions (for example actions/create-release) can use it
                                                    (0, core_namespaceObject.setOutput)('changelog', stringChangelog);
                                                    (0, core_namespaceObject.setOutput)('clean_changelog', cleanChangelog);
                                                    (0, core_namespaceObject.setOutput)('version', newVersion);
                                                    (0, core_namespaceObject.setOutput)('tag', gitTag);
                                                    (0, core_namespaceObject.setOutput)('skipped', 'false');
                                                    try {
                                                        // If we are running in test mode we use this to validate everything still runs
                                                        git_1.testHistory();
                                                    } catch (error) {
                                                        console.error(error);
                                                        (0, core_namespaceObject.setFailed)(error);
                                                    }
                                                    return [2 /*return*/];
                                            }
                                        });
                                    });
                                })];
                            case 4:
                                _a.sent();
                                return [3 /*break*/, 6];
                            case 5:
                                error_1 = _a.sent();
                                (0, core_namespaceObject.setFailed)(error_1);
                                return [3 /*break*/, 6];
                            case 6:
                                return [2 /*return*/];
                        }
                    });
                });
            }
            
            run();
            
        })();
        
        /******/
        return __webpack_exports__;
        /******/
    })()
        ;
});
