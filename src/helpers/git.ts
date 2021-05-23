import {IGitExecutor} from "./gitExecutor";
import {Err, Ok, Result} from "@hqoss/monads";

const assert = require('assert')

export class Git {
	
	private readonly branch: string;
	private readonly executor: IGitExecutor;
	private readonly useGit: boolean;
	
	constructor(executor: IGitExecutor, branch: string, useGit: boolean) {
		this.executor = executor;
		this.branch = branch;
		this.useGit = useGit;
	}
	
	exec(command: string): Promise<Result<string, string>> {
		return this.executor.Exec(command);
	}
	
	config(prop: string, value: string): Promise<Result<string, string>> {
		return this.exec(`config ${prop} "${value}"`)
	}
	
	add(file: string): Promise<Result<string, string>> {
		return this.exec(`add ${file}`)
	}
	
	commit(message: string): Promise<Result<string, string>> {
		return this.exec(`commit -m "${message}"`)
	}
	
	async pull(method: string): Promise<Result<string, string>> {
		const args = ['pull']
		
		// Check if the repo is unshallow
		const shallow = await this.isShallow();
		if (shallow.isErr()) {
			return Err(shallow.unwrapErr())
		}
		const s = shallow.unwrap()
		if (s) args.push('--unshallow')
		args.push('--tags')
		args.push(method);
		
		return this.exec(args.join(' '))
	}
	
	push(): Promise<Result<string, string>> {
		return this.exec(`push origin ${this.branch} --follow-tags`)
	}
	
	async isShallow(): Promise<Result<boolean, string>> {
		if (!this.useGit) return Ok(false);
		const isShallow = await this.exec('rev-parse --is-shallow-repository')
		return isShallow.map(x => x.trim().replace('\n', '') === 'true');
	}
	
	/**
	 * Updates the origin remote
	 *
	 * @param repo
	 * @return {Promise<>}
	 */
	updateOrigin(repo: string): Promise<Result<string, string>> {
		return this.exec(`remote set-url origin ${repo}`)
	}
	
	/**
	 * Creates git tag
	 *
	 * @param tag
	 * @return {Promise<>}
	 */
	createTag(tag: string): Promise<Result<string, string>> {
		return this.exec(`tag -a ${tag} -m "${tag}"`)
	}
	
	/**
	 * Validates the commands run
	 */
	testHistory() {
		if (!this.useGit) {
			const {EXPECTED_TAG, SKIPPED_COMMIT} = process.env
			
			const expectedCommands = [
				'git config user.name "Conventional Changelog Action"',
				'git config user.email "conventional.changelog.action@github.com"',
				'git pull --tags --ff-only',
			]
			
			if (!SKIPPED_COMMIT) {
				expectedCommands.push('git add .')
				expectedCommands.push(`git commit -m "chore(release): ${EXPECTED_TAG}"`)
			}
			
			expectedCommands.push(`git tag -a ${EXPECTED_TAG} -m "${EXPECTED_TAG}"`)
			expectedCommands.push(`git push origin ${this.branch} --follow-tags`)
			
			assert.deepStrictEqual(
				this.executor.Commands(),
				expectedCommands,
			)
		}
	}
	
}
