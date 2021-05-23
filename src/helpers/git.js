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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Git = void 0;
const monads_1 = require("@hqoss/monads");
const assert = require('assert');
class Git {
    constructor(executor, branch, useGit) {
        this.executor = executor;
        this.branch = branch;
        this.useGit = useGit;
    }
    exec(command) {
        return this.executor.Exec(command);
    }
    config(prop, value) {
        return this.exec(`config ${prop} "${value}"`);
    }
    add(file) {
        return this.exec(`add ${file}`);
    }
    commit(message) {
        return this.exec(`commit -m "${message}"`);
    }
    pull(method) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = ['pull'];
            // Check if the repo is unshallow
            const shallow = yield this.isShallow();
            if (shallow.isErr()) {
                return monads_1.Err(shallow.unwrapErr());
            }
            const s = shallow.unwrap();
            if (s)
                args.push('--unshallow');
            args.push('--tags');
            args.push(method);
            return this.exec(args.join(' '));
        });
    }
    push() {
        return this.exec(`push origin ${this.branch} --follow-tags`);
    }
    isShallow() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.useGit)
                return monads_1.Ok(false);
            const isShallow = yield this.exec('rev-parse --is-shallow-repository');
            return isShallow.map(x => x.trim().replace('\n', '') === 'true');
        });
    }
    /**
     * Updates the origin remote
     *
     * @param repo
     * @return {Promise<>}
     */
    updateOrigin(repo) {
        return this.exec(`remote set-url origin ${repo}`);
    }
    /**
     * Creates git tag
     *
     * @param tag
     * @return {Promise<>}
     */
    createTag(tag) {
        return this.exec(`tag -a ${tag} -m "${tag}"`);
    }
    /**
     * Validates the commands run
     */
    testHistory() {
        if (!this.useGit) {
            const { EXPECTED_TAG, SKIPPED_COMMIT } = process.env;
            const expectedCommands = [
                'git config user.name "Conventional Changelog Action"',
                'git config user.email "conventional.changelog.action@github.com"',
                'git pull --tags --ff-only',
            ];
            if (!SKIPPED_COMMIT) {
                expectedCommands.push('git add .');
                expectedCommands.push(`git commit -m "chore(release): ${EXPECTED_TAG}"`);
            }
            expectedCommands.push(`git tag -a ${EXPECTED_TAG} -m "${EXPECTED_TAG}"`);
            expectedCommands.push(`git push origin ${this.branch} --follow-tags`);
            assert.deepStrictEqual(this.executor.Commands(), expectedCommands);
        }
    }
}
exports.Git = Git;
//# sourceMappingURL=git.js.map