"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.read_write_json = void 0;
const repo_1 = __importDefault(require("@wizzi/repo"));
function read_write_json() {
    const schema = 'ittf';
    const tempIttfDocumentUri = "c:/temp_1." + schema + '.ittf';
    const ittfContent = "Bye";
    var documents = [{
            path: tempIttfDocumentUri,
            content: ittfContent
        }];
    repo_1.default.JsonComponents.createJsonFs(documents, (err, jsonFs) => {
        repo_1.default.jsonfile({ jsonFs: jsonFs }, (err, vfile) => {
            const tempIttfDocumentUri = "c:/temp_2." + schema + '.ittf';
            vfile.write(tempIttfDocumentUri, "Hello", (err, result) => {
                console.log("result", result);
                console.log("jsonFs", JSON.stringify(jsonFs, null, 2));
                repo_1.default.createStoreFactory({
                    storeKind: 'json',
                    storeJsonFs: jsonFs
                }, (err, storeFn) => {
                    storeFn((err, store) => {
                        store.getModelContent(tempIttfDocumentUri, (err, content) => {
                            console.log("content " + tempIttfDocumentUri, content);
                        });
                    });
                });
            });
        });
    });
    /*
    repo.createStoreFactory({
        storeKind: 'json'
    }, (err:any, storeFn: repo.createStoreFn)=> {
        
    })
    */
}
exports.read_write_json = read_write_json;
//# sourceMappingURL=step_1.js.map