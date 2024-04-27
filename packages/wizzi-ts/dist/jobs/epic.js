"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.job_epic = void 0;
const path_1 = __importDefault(require("path"));
const factory_1 = require("../factory");
var jobPath = path_1.default.join(__dirname, '..', '..', 'src', 'jobs', 'ittf', 'epic.wfjob.ittf');
function job_epic() {
    (0, factory_1.createFsWizziFactory)({}, {
        items: [
            "./wizzi.plugin.ts/index.js",
            "./wizzi.plugin.json/index.js",
            "./wizzi.plugin.wfjob/index.js",
        ],
        pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.plugins/packages",
    }, ((err, wf) => {
        wf.executeJob({
            name: 'Job2 example',
            path: jobPath,
            productionOptions: {
                indentSpaces: 4,
                basedir: __dirname,
                verbose: 2
            },
            globalContext: {
                options: {
                    destFolder: 'output/epic'
                }
            }
        }, ((err, result) => {
            console.log('err', err);
            console.log('result', result);
        }));
    }));
}
exports.job_epic = job_epic;
//# sourceMappingURL=epic.js.map