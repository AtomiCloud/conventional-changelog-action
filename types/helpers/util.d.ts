import {Option, Result} from "@hqoss/monads";
import {Path} from "object-path";

declare type FileExtension = "json" | "yaml" | "yml" | "toml" | "git";
declare type ReleaseType = "major" | "minor" | "patch";

declare function Wrap<T>(i?: T): Option<T>;

declare function ForceUnwrap<T>(opt: Option<T>): T | undefined;

declare function GetFileExtension(file: string): Result<FileExtension, string>;

declare function GetObjectPath<T>(object: object, path: Path): Option<T>;

declare function ResultAll<T, E>(r: Result<T, E>[]): Result<T[], E[]>;

declare function OptionAll<T>(r: Option<T>[]): Option<T[]>;

export {Wrap, ForceUnwrap, FileExtension, GetFileExtension, ReleaseType, GetObjectPath, ResultAll, OptionAll};
