"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.load_mtree_1 = void 0;
const path_1 = __importDefault(require("path"));
const repo_1 = __importDefault(require("@wizzi/repo"));
const mtree_1 = __importStar(require("@wizzi/mtree"));
var sourceIttf = path_1.default.join(__dirname, '..', '..', 'src', 'mtree', 'ittf', 'ittf_1.ittf.ittf');
function load_mtree_1() {
    repo_1.default.createStoreFactory({
        storeKind: 'filesystem'
    }, (err, storeFn) => {
        storeFn((err, store) => {
            mtree_1.mtreeTests.mTreeBrickProvider.createFromUri(sourceIttf, {
                mTreeBuildUpContext: {},
                __productionManager: mtree_1.mocks.getProductionManager(),
                productionContext: mtree_1.mocks.getProductionManager().productionContext,
                __ittfDocumentStore: store
            }, (err, createdProvider) => {
                console.log("result", Object.keys(createdProvider.getPrimaryMTreeBrick()));
            });
        });
    });
}
exports.load_mtree_1 = load_mtree_1;
/*
    see wizzi/services/storePool._initializeStoreService
*/
function createComposedMTree() {
    const mTreeLoadHistory = new mtree_1.default.mTreeLoadHistory();
    var retval = {
        uri: "test://",
        schema: "ittf",
        sourceKey: "s1",
        brickKey: "f1",
        loadHistory: mTreeLoadHistory,
        lines: [],
        nodes: [],
    };
    return retval;
}
//# sourceMappingURL=step_1.js.map