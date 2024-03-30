"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.job_3 = void 0;
const path_1 = __importDefault(require("path"));
const factory_1 = require("../factory");
var stepIttfPath = path_1.default.join(__dirname, '..', '..', 'src', 'jobs', 'ittf', 'step_3');
var stepResultsPath = path_1.default.join(__dirname, '..', '..', 'src', 'jobs', 'results', 'step_3');
function job_3() {
    (0, factory_1.createFsWizziFactory)({}, {
        items: [
            "./wizzi.plugin.html/index.js",
            "./wizzi.plugin.json/index.js",
        ],
        pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.plugins/packages",
    }, ((err, wf) => {
        const pman = wf.createProductionManager({}, {});
        pman.addArtifactRequest({
            name: "Examples - step - 3a",
            model: { cwd: stepIttfPath, src: "first.html.ittf", schema: "html", contexts: [], transformers: [] },
            gen: { generator: "html/document" },
            options: { basedir: "" },
            dest: { folder: stepResultsPath, path: path_1.default.join(stepResultsPath, 'first.html'), extension: ".html" },
            contexts: []
        });
        pman.addArtifactRequest({
            name: "Examples - step - 3b",
            model: {
                cwd: stepIttfPath,
                src: "forms.html.ittf",
                schema: "html",
                contexts: [{
                        cwd: stepIttfPath,
                        src: "formsData.json.ittf",
                        schema: "json",
                        exportName: "data"
                    }],
                transformers: []
            },
            gen: { generator: "html/document" },
            options: { basedir: "" },
            dest: { folder: stepResultsPath, path: path_1.default.join(stepResultsPath, 'forms.html'), extension: ".html" },
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
exports.job_3 = job_3;
//# sourceMappingURL=step_3.js.map