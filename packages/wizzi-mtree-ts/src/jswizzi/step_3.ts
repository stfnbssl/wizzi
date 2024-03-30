import path from 'path'
import {fSystem, verify} from '@wizzi/utils'
import repo from '@wizzi/repo';
import {createStoreFactory} from '@wizzi/repo';
import mtree, {createLoadMTree, mocks, mtreeUtils, mtreeTests} from '@wizzi/mtree';
import {jsWizzi} from '@wizzi/mtree'

var sourceIttf = path.join(__dirname, '..', '..', 'src', 'jswizzi', 'ittf', 'ittf_3.ittf.ittf');

export function load_jswizzi_2() {
    createComposedMTree((err:any, composedMTree: mtree.mTreeBrick) => {
        const productionContext = mocks.createProductionContext();
        const jsWizziScriptCoder = new jsWizzi.JsWizziScriptCoder()
        const jsWizziContext = new jsWizzi.JsWizziContext(composedMTree, productionContext, jsWizziScriptCoder)
        jsWizziContext.setGlobalValues({});
        const ctx: mtree.mTreeBuildUpScripterContext = { 
            counter: 0,
            brickKey: null,
            isCompile: false
        }
        const rootNode = composedMTree.nodes[0];
        jsWizziScriptCoder.w('// ' + ctx.startTime + '  by ' + __filename, rootNode);
        jsWizziScriptCoder.w('$.n(); // set the context state to NodeContext', rootNode);
        jsWizziScriptCoder.w('var $0 = {}; // the root node of the MTree buildup', rootNode)
        composedMTree.nodes.forEach(node=>{
            mtree.mTreeBuildUpScripter.codify(node, 0, jsWizziScriptCoder, ctx)  
        })
        console.log("jsWizziScriptCoder.toCode()", jsWizziScriptCoder.toCode());
        jsWizzi.JsWizziRunner.run(jsWizziScriptCoder.toCode(), jsWizziContext, {}, (err:any, result:any) => {
            if (err) {
                console.log("err", err);
            } else {
                jsWizziContext.set_NodeContext();
                var $0 = jsWizziContext.getValue('$0');
                console.log("$0", $0);
                mtreeUtils.node.dump($0.children);
            }
        })
    })
} 

/* 
    see wizzi/services/storePool._initializeStoreService
*/
function createComposedMTree(callback: mtree.cb<mtree.mTreeBrick>) : void {
    repo.createStoreFactory({
        storeKind: 'filesystem'
    }, (err: any, storeFn: repo.createStoreFn)=> {
        storeFn((err:any, store: repo.Store)=> {
            mtreeTests.mTreeBrickProvider.createFromUri(sourceIttf, {
                mTreeBuildUpContext: {},
                __productionManager: mocks.getProductionManager(),
                productionContext: mocks.getProductionManager().productionContext,
                __ittfDocumentStore: store
            }, (err:any, createdProvider: mtreeTests.mTreeBrickProvider)=> {
                console.log("result", Object.keys(createdProvider.getPrimaryMTreeBrick()));
                callback(null, createdProvider.getPrimaryMTreeBrick());
            })
        })
    })
}

