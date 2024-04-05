"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.artifact_1 = void 0;
const path_1 = __importDefault(require("path"));
const factory_1 = require("../factory");
var artifactPath = path_1.default.join(__dirname, '..', '..', 'src', 'artifacts', 'ittf', 'js', 'step_1.js.ittf');
function artifact_1() {
    (0, factory_1.createFsWizziFactory)({}, {
        items: [
            "./wizzi.plugin.js/index.js",
        ],
        pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.plugins/packages",
    }, ((err, wf) => {
        wf.loadModel('js', artifactPath, {}, ((err, result) => {
            console.log('err', err);
            console.log('result', result);
        }));
    }));
}
exports.artifact_1 = artifact_1;
//# sourceMappingURL=step_1.js.map