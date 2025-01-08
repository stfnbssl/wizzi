import path from 'path'
import {fSystem, verify} from '@wizzi/utils'
import repo from '@wizzi/repo';
import {createStoreFactory} from '@wizzi/repo';
import mtree, {createLoadMTree, mocks} from '@wizzi/mtree';
import {jsWizzi} from '@wizzi/mtree'

var nittf = 4;
var sourceIttf = path.join(__dirname, '..', '..', 'src', 'jswizzi', 'ittf', 'ittf_' + nittf + '.ittf.ittf');
var destScript = path.join(__dirname, '..', '..', 'src', 'jswizzi', 'ittf', 'ittf_' + nittf + '.script.js');

export function load_jswizzi_1() {
    const file = fSystem.vfile();
    getFileSystemCreateStoreFn((err:any, createStore: repo.createStoreFn)=> {
        const loadMtree = createLoadMTree(createStore, {frontMatter: false, useCache: false, raw: false, mTreeBuildUpScript: true})
        createStore((err:any, store: repo.Store)=>{
            loadMtree(
                sourceIttf, 
                {
                    mTreeBuildUpContext: {},
                    __productionManager: mocks.getProductionManager(),
                    productionContext: mocks.createProductionContext(),
                    __ittfDocumentStore: store
                }, 
                (err: any, result: mtree.mTree)=> {
                    console.log("result", result);
                    file.write(destScript, (result as any).mTreeBuildUpScript);
            })
        })
    })
} 

/* 
    get repo.createStoreFn for `filesystem`
    see wizzi/services/storePool._initializeStoreService
*/
function getFileSystemCreateStoreFn(callback: repo.cb<repo.createStoreFn>) {
    createStoreFactory({
        storeKind: 'filesystem'
     }, function(err, storeFactory) {
        if (err) {
            console.log("[31m%s[0m", err);
            return callback(err, {} as repo.createStoreFn);
        }
        return callback(null, storeFactory);
    })
}

