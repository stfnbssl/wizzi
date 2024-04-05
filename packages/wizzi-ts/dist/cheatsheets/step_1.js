"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cheat_1 = void 0;
const factory_1 = require("../factory");
function cheat_1() {
    (0, factory_1.createFsWizziFactory)({}, {
        items: [
            "./wizzi.plugin.ittf/index.js",
        ],
        pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.plugins/packages",
    }, ((err, wf) => {
        wf.getCheatsheet("ittf", ((err, result) => {
            console.log('err', err);
            console.log('result', result);
        }));
    }));
}
exports.cheat_1 = cheat_1;
//# sourceMappingURL=step_1.js.map