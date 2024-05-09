"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.load_mtree_script = void 0;
const path_1 = __importDefault(require("path"));
const repo_1 = __importDefault(require("@wizzi/repo"));
const mtree_1 = require("@wizzi/mtree");
var sourceIttf = path_1.default.join(__dirname, '..', '..', 'src', 'mtree', 'ittf', 'ittf_throw.ittf.ittf');
function load_mtree_script() {
    repo_1.default.createStoreFactory({
        storeKind: 'filesystem'
    }, (err, storeFn) => {
        const loadMTree = (0, mtree_1.createLoadMTree)(storeFn, { mTreeBuildUpScript: true });
        storeFn((err, store) => {
            loadMTree(sourceIttf, {
                mTreeBuildUpContext: {},
                __ittfDocumentStore: store,
                __productionManager: mtree_1.mocks.getProductionManager(),
                productionContext: mtree_1.mocks.getProductionManager().productionContext
            }, (err, result) => {
                console.log(result);
            });
        });
    });
}
exports.load_mtree_script = load_mtree_script;
//# sourceMappingURL=step_2.js.map