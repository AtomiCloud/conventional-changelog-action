import { Option } from '@hqoss/monads';
declare function bump(releaseType: string, version: Option<string>): Promise<string>;
export { bump };
