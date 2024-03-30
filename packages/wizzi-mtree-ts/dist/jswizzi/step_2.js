"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.load_jswizzi_1 = void 0;
const path_1 = __importDefault(require("path"));
const utils_1 = require("@wizzi/utils");
const repo_1 = require("@wizzi/repo");
const mtree_1 = require("@wizzi/mtree");
var sourceIttf = path_1.default.join(__dirname, '..', '..', 'src', 'jswizzi', 'ittf', 'ittf_2.ittf.ittf');
var destScript = path_1.default.join(__dirname, '..', '..', 'src', 'jswizzi', 'ittf', 'ittf_2.script.js');
function load_jswizzi_1() {
    const file = utils_1.fSystem.vfile();
    getFileSystemCreateStoreFn((err, createStore) => {
        const loadMtree = (0, mtree_1.createLoadMTree)(createStore, { frontMatter: false, useCache: false, raw: false, mTreeBuildUpScript: true });
        createStore((err, store) => {
            loadMtree(sourceIttf, {
                mTreeBuildUpContext: {},
                __productionManager: mtree_1.mocks.getProductionManager(),
                productionContext: mtree_1.mocks.createProductionContext(),
                __ittfDocumentStore: store
            }, (err, result) => {
                console.log("result", result);
                file.write(destScript, result.mTreeBuildUpScript);
            });
        });
    });
}
exports.load_jswizzi_1 = load_jswizzi_1;
/*
    get repo.createStoreFn for `filesystem`
    see wizzi/services/storePool._initializeStoreService
*/
function getFileSystemCreateStoreFn(callback) {
    (0, repo_1.createStoreFactory)({
        storeKind: 'filesystem'
    }, function (err, storeFactory) {
        if (err) {
            console.log("[31m%s[0m", err);
            return callback(err, {});
        }
        return callback(null, storeFactory);
    });
}
//# sourceMappingURL=step_2.js.map