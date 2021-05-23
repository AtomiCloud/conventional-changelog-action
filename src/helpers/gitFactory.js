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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitializeGit = void 0;
const git_1 = require("./git");
const gitExecutor_1 = require("./gitExecutor");
const core_1 = require("@actions/core");
const monads_1 = require("@hqoss/monads");
const { GITHUB_REPOSITORY, GITHUB_REF, ENV } = process.env;
const branch = (_a = GITHUB_REF === null || GITHUB_REF === void 0 ? void 0 : GITHUB_REF.replace('refs/heads/', '')) !== null && _a !== void 0 ? _a : "";
const useGit = ENV !== 'dont-use-git';
function InitializeGit() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield initializeGit();
        if (result.isErr()) {
            core_1.error(result.unwrapErr());
            throw result.unwrapErr();
        }
        return result.unwrap();
    });
}
exports.InitializeGit = InitializeGit;
function initializeGit() {
    return __awaiter(this, void 0, void 0, function* () {
        const exec = useGit ? new gitExecutor_1.GitCommandExecutor() : new gitExecutor_1.MockExecutor();
        const githubToken = core_1.getInput('github-token');
        core_1.setSecret(githubToken);
        const username = core_1.getInput('git-user-name');
        const email = core_1.getInput('git-user-email');
        const git = new git_1.Git(exec, branch, useGit);
        const result1 = yield git.config('user.name', username);
        if (result1.isErr())
            return monads_1.Err(result1.unwrapErr());
        const result2 = yield git.config('user.email', email);
        if (result2.isErr())
            return monads_1.Err(result2.unwrapErr());
        const result3 = yield git.updateOrigin(`https://x-access-token:${githubToken}@github.com/${GITHUB_REPOSITORY}.git`);
        if (result3.isErr())
            return monads_1.Err(result3.unwrapErr());
        return monads_1.Ok(git);
    });
}
//# sourceMappingURL=gitFactory.js.map