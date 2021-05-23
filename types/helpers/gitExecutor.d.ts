import {Result} from "@hqoss/monads";

interface IGitExecutor {
    Exec(command: string): Promise<Result<string, string>>;
    
    Commands(): string[];
}

declare class GitCommandExecutor implements IGitExecutor {
    Exec(command: string): Promise<Result<string, string>>;
    
    Commands(): string[];
}

declare class MockExecutor implements IGitExecutor {
    private commandsRun;
    
    Exec(command: string): Promise<Result<string, string>>;
    
    Commands(): string[];
}

export {IGitExecutor, GitCommandExecutor, MockExecutor};
