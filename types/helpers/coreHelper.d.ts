import {InputOptions} from "@actions/core";
import {Option} from "@hqoss/monads";

declare function Get(name: string, options?: InputOptions): Option<string>;

export {Get};
