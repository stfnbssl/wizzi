"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.artifact_gen_folder_1 = void 0;
const path_1 = __importDefault(require("path"));
const factory_1 = require("../factory");
var sourceFolderPath = path_1.default.join(__dirname, '..', '..', 'src', 'artifacts', 'ittf', 'folder_1');
var destFolderPath = path_1.default.join(__dirname, '..', '..', 'src', 'artifacts', 'ittf', 'output', 'folder_1');
function artifact_gen_folder_1() {
    (0, factory_1.createFsWizziFactory)({}, {
        items: [
            "./wizzi.plugin.js/index.js",
            "./wizzi.plugin.json/index.js",
            "./wizzi.plugin.html/index.js",
        ],
        pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.plugins/packages",
    }, ((err, wf) => {
        wf.generateFolderArtifacts(sourceFolderPath, {}, {
            destFolder: destFolderPath,
            useMultiPartContext: true
        }, ((err, result) => {
            console.log('err', err);
            console.log('result', result);
        }));
    }));
}
exports.artifact_gen_folder_1 = artifact_gen_folder_1;
//# sourceMappingURL=gen_folder_1.js.map