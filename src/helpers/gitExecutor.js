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
exports.MockExecutor = exports.GitCommandExecutor = void 0;
const monads_1 = require("@hqoss/monads");
const exec_1 = require("@actions/exec");
class GitCommandExecutor {
    Exec(command) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            let execOutput = '';
            const options = {
                listeners: {
                    stdout: (data) => {
                        execOutput += data.toString();
                    },
                },
            };
            const exitCode = yield exec_1.exec(`git ${command}`, undefined, options);
            if (exitCode === 0) {
                resolve(monads_1.Ok(execOutput));
            }
            else {
                resolve(monads_1.Err(`Command "git ${command}" exited with code ${exitCode}.`));
            }
        }));
    }
    Commands() {
        return [];
    }
}
exports.GitCommandExecutor = GitCommandExecutor;
class MockExecutor {
    constructor() {
        this.commandsRun = [];
    }
    Exec(command) {
        const fullCommand = `git ${command}`;
        console.log(`Skipping "${fullCommand}" because of test env`);
        if (!fullCommand.includes('git remote set-url origin')) {
            this.commandsRun.push(fullCommand);
        }
        return Promise.resolve(monads_1.Ok(""));
    }
    Commands() {
        return this.commandsRun;
    }
}
exports.MockExecutor = MockExecutor;
//# sourceMappingURL=gitExecutor.js.map