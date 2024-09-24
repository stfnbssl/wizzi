"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.job_1 = void 0;
const path_1 = __importDefault(require("path"));
const factory_1 = require("../factory");
var jobPath = path_1.default.join(__dirname, '..', '..', 'src', 'jobs', 'ittf', 'step_1.wzjob.ittf');
function job_1() {
    (0, factory_1.createFsWizziFactory)({}, {
        items: [
            "./wizzi.plugin.js/index.js",
            "./wizzi.plugin.wzjob/index.js",
        ],
        pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.plugins/packages",
    }, ((err, wf) => {
        wf.executeJob({
            name: 'Job1 example',
            path: jobPath,
            productionOptions: {
                indentSpaces: 4,
                basedir: __dirname,
                verbose: 2
            },
            globalContext: {
                options: {
                    destFolder: 'output'
                }
            }
        }, ((err, result) => {
            console.log('err', err);
            console.log('result', result);
        }));
    }));
}
exports.job_1 = job_1;
//# sourceMappingURL=step_1.js.map