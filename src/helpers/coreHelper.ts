import {getInput, InputOptions} from "@actions/core";
import {None, Option, Some} from "@hqoss/monads";

function Get(name: string, options?: InputOptions): Option<string> {
	const opt = getInput(name, options);
	return (opt == null || opt == "") ? None : Some(opt);
}

export {Get}
