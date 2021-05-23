import {Err, None, Option, Result, Some} from "@hqoss/monads";
import * as fs from 'fs';

class PackageJson {
    private readonly path: string
    
    constructor(path: string) {
        this.path = path
    }
    
    get(): Promise<Result<object, string>> {
        const p = this.path;
        return new Promise<Result<object, string>>((resolve) => {
            fs.readFile(p, (err: NodeJS.ErrnoException | null, data: Buffer) => {
                if (err) {
                    resolve(Err(err.message))
                    return;
                }
                resolve(JSON.parse(data.toString("utf8")))
            })
        });
    }
    
    update(packageJson: object): Promise<Option<string>> {
        const p = this.path;
        return new Promise<Option<string>>((resolve) => {
            const data = JSON.stringify(packageJson, null, 2);
            fs.writeFile(p, data, (err: NodeJS.ErrnoException | null) => {
                if (err) resolve(Some(err.message))
                resolve(None)
            })
        });
    }
}

export {PackageJson}

