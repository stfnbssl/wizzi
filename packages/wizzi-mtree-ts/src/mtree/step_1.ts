import path from 'path'
import {fSystem, verify} from '@wizzi/utils'
import repo from '@wizzi/repo';
import mtree, {createLoadMTree, mTreeLoadHistory, mocks, mtreeTests} from '@wizzi/mtree';

var sourceIttf = path.join(__dirname, '..', '..', 'src', 'mtree', 'ittf', 'ittf_1.ittf.ittf');

export function load_mtree_1() {
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
            })
        })
    })
}

/* 
    see wizzi/services/storePool._initializeStoreService
*/
function createComposedMTree() : mtree.mTreeBrick {
    const mTreeLoadHistory = new mtree.mTreeLoadHistory();
    var retval: mtree.mTreeBrick = {
        uri: "test://",
        schema: "ittf",
        sourceKey: "s1",
        brickKey: "f1",
        loadHistory: mTreeLoadHistory,
        lines: [],
        nodes: [],
    }
    return retval;
}