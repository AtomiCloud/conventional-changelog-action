import {Err, Ok, Result} from "@hqoss/monads";
import {exec} from "@actions/exec";

interface IGitExecutor {
	
	Exec(command: string): Promise<Result<string, string>>;
	
	Commands(): string[]
}

class GitCommandExecutor implements IGitExecutor {
	Exec(command: string): Promise<Result<string, string>> {
		return new Promise(async (resolve) => {
			let execOutput: string = ''
			const options = {
				listeners: {
					stdout: (data: Buffer) => {
						execOutput += data.toString()
					},
				},
			}
			const exitCode = await exec(`git ${command}`, undefined, options)
			if (exitCode === 0) {
				resolve(Ok(execOutput))
			} else {
				resolve(Err(`Command "git ${command}" exited with code ${exitCode}.`))
			}
		})
	}
	
	Commands(): string[] {
		return [];
	}
	
}

class MockExecutor implements IGitExecutor {
	
	private commandsRun: string[] = []
	
	Exec(command: string): Promise<Result<string, string>> {
		const fullCommand = `git ${command}`
		
		console.log(`Skipping "${fullCommand}" because of test env`)
		
		if (!fullCommand.includes('git remote set-url origin')) {
			this.commandsRun.push(fullCommand)
		}
		return Promise.resolve(Ok(""))
	}
	
	Commands(): string[] {
		return this.commandsRun;
	}
	
}

export {IGitExecutor, GitCommandExecutor, MockExecutor}
