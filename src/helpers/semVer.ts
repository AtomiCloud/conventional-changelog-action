import {Err, Ok, Option, Result} from "@hqoss/monads";
import {valid} from "semver";

type SemVer = [number, number, number];

function SemVerValid(version: string): Result<string, string> {
	if (valid(version)) return Ok(version)
	return Err("invalid server");
}

function ToSemVer(version: string): Option<SemVer> {
	return SemVerValid(version)
		.map(x => x
			.split('.')
			.map(x => parseInt(x, 10)) as SemVer
		)
		.ok();
}

export {SemVerValid, ToSemVer, SemVer}
