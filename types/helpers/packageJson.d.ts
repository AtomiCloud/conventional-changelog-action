import {Option, Result} from "@hqoss/monads";

declare class PackageJson {
    private readonly path;
    
    constructor(path: string);
    
    get(): Promise<Result<object, string>>;
    
    update(packageJson: object): Promise<Option<string>>;
}

export {PackageJson};
