"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get = void 0;
const core_1 = require("@actions/core");
const monads_1 = require("@hqoss/monads");
function Get(name, options) {
    const opt = core_1.getInput(name, options);
    return (opt == null || opt == "") ? monads_1.None : monads_1.Some(opt);
}
exports.Get = Get;
//# sourceMappingURL=coreHelper.js.map