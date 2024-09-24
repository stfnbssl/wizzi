"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.artifact_2 = void 0;
const path_1 = __importDefault(require("path"));
const factory_1 = require("../factory");
var artifactPath = path_1.default.join(__dirname, '..', '..', 'src', 'artifacts', 'ittf', 'json', 'step_1.json.ittf');
var artifactDataPath = path_1.default.join(__dirname, '..', '..', 'src', 'artifacts', 'ittf', 'json', 'step_1_data.json.ittf');
function artifact_2() {
    (0, factory_1.createFsWizziFactory)({}, {
        items: [
            "./wizzi.plugin.json/index.js",
        ],
        pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.plugins/packages",
    }, ((err, wf) => {
        wf.loadModelAndGenerateArtifact(artifactDataPath, {}, "json/document", ((err, result) => {
            console.log('err', err);
            console.log('result', result);
            wf.loadModelAndGenerateArtifact(artifactPath, {
                modelRequestContext: {
                    mTreeBuildUpContext: {
                        data: JSON.parse(result)
                    }
                }
            }, "json/document", ((err, result) => {
                console.log('err', err);
                console.log('result', result);
            }));
        }));
    }));
}
exports.artifact_2 = artifact_2;
//# sourceMappingURL=step_2.js.map