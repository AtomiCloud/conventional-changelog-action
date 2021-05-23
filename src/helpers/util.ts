import {Err, None, Ok, Option, Result, Some} from "@hqoss/monads";
import objectPath, {Path} from "object-path";

type FileExtension = "json" | "yaml" | "yml" | "toml" | "git"
type ReleaseType = "major" | "minor" | "patch"

function Wrap<T>(i?: T): Option<T> {
    return i == null ? None : Some(i)
}

function ForceUnwrap<T>(opt: Option<T>): T | undefined {
    return opt.isSome() ? opt.unwrap() : undefined;
}

function GetFileExtension(file: string): Result<FileExtension, string> {
    const ext = file.split('.').pop()
    if (ext == "" || ext == null) return Err('no file extension')
    
    if (['json', 'yaml', 'yml', 'toml', 'git'].Has(ext)) {
        return Ok(ext as FileExtension)
    }
    return Err(`Unknown file extension: ${ext}`)
    
}


function GetObjectPath<T>(object: object, path: Path): Option<T> {
    const r = objectPath.get<T | null>(object, path, null);
    if (r == null) {
        return None
    }
    return Some(r)
    
    
}


function ResultAll<T, E>(r: Result<T, E>[]): Result<T[], E[]> {
    const t: T[] = [];
    const e: E[] = [];
    
    r.Each(x => {
        if (x.isOk()) {
            t.push(x.unwrap())
        } else {
            e.push(x.unwrapErr())
        }
    })
    if (e.length > 0) {
        return Err(e)
    }
    return Ok(t)
}

function OptionAll<T>(r: Option<T>[]): Option<T[]> {
    const t: T[] = [];
    for (const key in r) {
        const actual = r[key];
        if (actual.isSome()) {
            t.push(actual.unwrap())
        } else {
            return None;
        }
        
        
    }
    return Some(t)
}

export {Wrap, ForceUnwrap, FileExtension, GetFileExtension, ReleaseType, GetObjectPath, ResultAll, OptionAll}
