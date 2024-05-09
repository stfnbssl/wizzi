"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.job_4 = void 0;
const path_1 = __importDefault(require("path"));
const factory_1 = require("../factory");
var stepIttfPath = path_1.default.join(__dirname, '..', '..', 'src', 'jobs', 'ittf', 'step_4');
var stepResultsPath = path_1.default.join(__dirname, '..', '..', 'src', 'jobs', 'results', 'step_4');
function job_4() {
    (0, factory_1.createFsWizziFactory)({}, {
        items: [
            "./wizzi.plugin.js/index.js",
            "./wizzi.plugin.json/index.js",
        ],
        pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.plugins/packages",
    }, ((err, wf) => {
        const pman = wf.createProductionManager({}, {});
        pman.addProductionStepRequest({
            name: "Examples - step - 4",
            model: { cwd: stepIttfPath, src: "tableDto.js.ittf", schema: "js", contexts: [{
                        cwd: stepIttfPath, src: "schemaData.json.ittf", schema: "json", coll: {
                            name: 'tables',
                            itemName: "tableDef",
                            pathTemplateValues: [{
                                    attribute: "name",
                                    token: "Dto"
                                }]
                        }
                    }], transformers: [] },
            gen: { generator: "js/module" },
            options: { basedir: "" },
            dest: { folder: stepResultsPath, path: "{Dto}Dto", extension: ".js" },
            contexts: []
        });
        pman.run((err, result) => {
            console.log('err', err);
            if (err) {
                return;
            }
            result.forEach((item) => {
                console.log('Result', item.genContexts[0].getContent());
            });
            pman.persistToFile((err, result) => {
                console.log('err', err);
                if (err) {
                    return;
                }
                result.forEach((item) => {
                    console.log('Result', item);
                });
            });
        });
    }));
}
exports.job_4 = job_4;
//# sourceMappingURL=step_4.js.map