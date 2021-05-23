import { Option, Result } from "@hqoss/monads";
declare type SemVer = [number, number, number];
declare function SemVerValid(version: string): Result<string, string>;
declare function ToSemVer(version: string): Option<SemVer>;
export { SemVerValid, ToSemVer, SemVer };
