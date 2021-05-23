import {error, info} from "@actions/core";
import * as path from 'path';
import * as fs from 'fs';
import {None, Option, Some} from "@hqoss/monads";

function RequireScript(file: string): Option<any> {
	const fileLocation = path.resolve(process.cwd(), file)
	// Double check the script exists before loading it
	if (fs.existsSync(fileLocation)) {
		info(`Loading "${fileLocation}" script`)
		return Some(require(fileLocation))
	}
	error(`Tried to load "${fileLocation}" script but it does not exists!`)
	return None
}

export {RequireScript}
