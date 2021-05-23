import {Git} from "./git";
import {GitCommandExecutor, MockExecutor} from "./gitExecutor";
import {error, getInput, setSecret} from "@actions/core";
import {Err, Ok, Result} from "@hqoss/monads";

const {GITHUB_REPOSITORY, GITHUB_REF, ENV} = process.env
const branch = GITHUB_REF?.replace('refs/heads/', '') ?? ""

const useGit = ENV !== 'dont-use-git'

export async function InitializeGit(): Promise<Git> {
    const result = await initializeGit();
    if (result.isErr()) {
        error(result.unwrapErr())
        throw result.unwrapErr();
    }
    return result.unwrap();
}

async function initializeGit(): Promise<Result<Git, string>> {
    const exec = useGit ? new GitCommandExecutor() : new MockExecutor();
    const githubToken = getInput('github-token')
    setSecret(githubToken);
    const username = getInput('git-user-name')
    const email = getInput('git-user-email')
    const git = new Git(exec, branch, useGit)
    const result1 = await git.config('user.name', username);
    if (result1.isErr()) return Err(result1.unwrapErr())
    const result2 = await git.config('user.email', email);
    if (result2.isErr()) return Err(result2.unwrapErr())
    const result3 = await git.updateOrigin(`https://x-access-token:${githubToken}@github.com/${GITHUB_REPOSITORY}.git`)
    if (result3.isErr()) return Err(result3.unwrapErr())
    
    return Ok(git);
}
