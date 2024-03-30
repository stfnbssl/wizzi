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
exports.load_jswizzi_2 = void 0;
const path_1 = __importDefault(require("path"));
const repo_1 = __importDefault(require("@wizzi/repo"));
const mtree_1 = __importStar(require("@wizzi/mtree"));
const mtree_2 = require("@wizzi/mtree");
var sourceIttf = path_1.default.join(__dirname, '..', '..', 'src', 'jswizzi', 'ittf', 'ittf_3.ittf.ittf');
function load_jswizzi_2() {
    createComposedMTree((err, composedMTree) => {
        const productionContext = mtree_1.mocks.createProductionContext();
        const jsWizziScriptCoder = new mtree_2.jsWizzi.JsWizziScriptCoder();
        const jsWizziContext = new mtree_2.jsWizzi.JsWizziContext(composedMTree, productionContext, jsWizziScriptCoder);
        jsWizziContext.setGlobalValues({});
        const ctx = {
            counter: 0,
            brickKey: null,
            isCompile: false
        };
        const rootNode = composedMTree.nodes[0];
        jsWizziScriptCoder.w('// ' + ctx.startTime + '  by ' + __filename, rootNode);
        jsWizziScriptCoder.w('$.n(); // set the context state to NodeContext', rootNode);
        jsWizziScriptCoder.w('var $0 = {}; // the root node of the MTree buildup', rootNode);
        composedMTree.nodes.forEach(node => {
            mtree_1.default.mTreeBuildUpScripter.codify(node, 0, jsWizziScriptCoder, ctx);
        });
        console.log("jsWizziScriptCoder.toCode()", jsWizziScriptCoder.toCode());
        mtree_2.jsWizzi.JsWizziRunner.run(jsWizziScriptCoder.toCode(), jsWizziContext, {}, (err, result) => {
            if (err) {
                console.log("err", err);
            }
            else {
                jsWizziContext.set_NodeContext();
                var $0 = jsWizziContext.getValue('$0');
                console.log("$0", $0);
                mtree_1.mtreeUtils.node.dump($0.children);
            }
        });
    });
}
exports.load_jswizzi_2 = load_jswizzi_2;
/*
    see wizzi/services/storePool._initializeStoreService
*/
function createComposedMTree(callback) {
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
                callback(null, createdProvider.getPrimaryMTreeBrick());
            });
        });
    });
}
//# sourceMappingURL=step_3.js.map