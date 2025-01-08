import path from 'path'
import {fSystem, verify} from '@wizzi/utils';
import repo from '@wizzi/repo';
import mtree, {createLoadMTree, CreateLoadMTreeOptions, mTreeLoadHistory, mocks, mtreeTests, mtreeUtils} from '@wizzi/mtree';

var sourceIttfPath = path.join(__dirname, '..', '..', 'src', 'mtree', 'ittf');
var outputPath = path.join(__dirname, '..', '..', 'src', 'mtree', 'output');

const args = process.argv.slice(2); // Ignore the first two elements
console.log("Command-line arguments:", args);

export function load_dump_mtree(options: any) {
    var sourceIttf = path.join(sourceIttfPath, options.file + '.ittf.ittf' || 'ittf_throw.ittf.ittf');
    var createLoadMTreeOptions: CreateLoadMTreeOptions = {};
    if (options.outputFormat == 'script') { createLoadMTreeOptions.mTreeBuildUpScript = true;}
    console.log("load_dump_mtree", sourceIttf, createLoadMTreeOptions);
    repo.createStoreFactory({
        storeKind: 'filesystem'
    }, (err: any, storeFn: repo.createStoreFn)=> {
        const loadMTree = createLoadMTree(storeFn, createLoadMTreeOptions);
        storeFn((err:any, store: repo.Store)=> {
            loadMTree(sourceIttf, {
                mTreeBuildUpContext: {},
                __ittfDocumentStore: store,
                __productionManager: mocks.getProductionManager(),
                productionContext: mocks.getProductionManager().productionContext
            }, (err: any, result: mtree.mTree)=> {
                if (err) {
                    console.log(err);
                    return;
                }
                const file = fSystem.vfile();
                if (options.outputFormat == 'script') {
                    console.log(result);
                    file.write(path.join(outputPath, options.file + '.buildupscript.js'), (result as any).mTreeBuildUpScript);
                }
                else {
                    console.log(result.loadHistory.mTreeBrickDatas);
                    console.log(result.nodes);
                    mtreeUtils.node.dump(result.nodes);
                    file.write(path.join(outputPath, options.file + '.ittf'), mtreeUtils.node.getIttf(result.nodes, { showIds: false }))
            }
            })
        })
    })
}
