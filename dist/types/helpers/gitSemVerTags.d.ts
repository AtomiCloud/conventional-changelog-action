import { Result } from "@hqoss/monads";
declare function GitSemVerTags(tagPrefix: string): Promise<Result<string[], string>>;
export { GitSemVerTags };
