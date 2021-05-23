import {IGitExecutor} from "./gitExecutor";
import {Result} from "@hqoss/monads";

export declare class Git {
    private readonly branch;
    private readonly executor;
    private readonly useGit;
    
    constructor(executor: IGitExecutor, branch: string, useGit: boolean);
    
    exec(command: string): Promise<Result<string, string>>;
    
    config(prop: string, value: string): Promise<Result<string, string>>;
    
    add(file: string): Promise<Result<string, string>>;
    
    commit(message: string): Promise<Result<string, string>>;
    
    pull(method: string): Promise<Result<string, string>>;
    
    push(): Promise<Result<string, string>>;
    
    isShallow(): Promise<Result<boolean, string>>;
    
    /**
     * Updates the origin remote
     *
     * @param repo
     * @return {Promise<>}
     */
    updateOrigin(repo: string): Promise<Result<string, string>>;
    
    /**
     * Creates git tag
     *
     * @param tag
     * @return {Promise<>}
     */
    createTag(tag: string): Promise<Result<string, string>>;
    
    /**
     * Validates the commands run
     */
    testHistory(): void;
}
