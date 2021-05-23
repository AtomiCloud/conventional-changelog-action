import {Option} from '@hqoss/monads';
import {Get} from "./coreHelper";
import {Wrap} from "./util";
import {RequireScript} from "./requireScript";
import {SemVer, ToSemVer} from "./semVer";

type PreVersionHook = (oldVersion: string) => Promise<string>

function bumpLogic(releaseType: string, version: Option<string>): SemVer {
	const fallbackValue = Get('fallback-version')
		.andThen(ToSemVer)
		.unwrapOr([0, 1, 0])
	
	return version.andThen(ToSemVer).unwrapOr(fallbackValue);
	
}

function ExtractScriptFunction(a: any): Option<PreVersionHook> {
	return Wrap(a.preVersionGeneration);
}

function GetPreVersionHook(): Option<PreVersionHook> {
	return Get('pre-changelog-generation')
		.andThen(RequireScript)
		.andThen(ExtractScriptFunction)
}

async function bump(releaseType: string, version: Option<string>): Promise<string> {
	const [major, minor, patch] = bumpLogic(releaseType, version);
	const v = `${major}.${minor}.${patch}`
	return await GetPreVersionHook()
		.map(async hook => await hook(v))
		.unwrapOr(Promise.resolve(v))
}

export {bump}
