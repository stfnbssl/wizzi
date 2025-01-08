import path from 'path'
import {fSystem, verify} from '@wizzi/utils'
import repo from '@wizzi/repo';
import mtree, {createLoadMTree, mTreeLoadHistory, mocks, mtreeTests} from '@wizzi/mtree';

var sourceIttf = path.join(__dirname, '..', '..', 'src', 'mtree', 'ittf', 'ittf_throw.ittf.ittf');

export function load_mtree_script() {
    repo.createStoreFactory({
        storeKind: 'filesystem'
    }, (err: any, storeFn: repo.createStoreFn)=> {
        const loadMTree = createLoadMTree(storeFn, {mTreeBuildUpScript: true});
        storeFn((err:any, store: repo.Store)=> {
            loadMTree(sourceIttf, {
                mTreeBuildUpContext: {},
                __ittfDocumentStore: store,
                __productionManager: mocks.getProductionManager(),
                productionContext: mocks.getProductionManager().productionContext
            }, (err: any, result: mtree.mTree)=> {
                console.log(result);
            })
        })
    })
}
