import path from 'path'
import {fSystem, verify} from '@wizzi/utils'
import repo from "@wizzi/repo"

export function read_write_json() {
    
    const schema = 'ittf'
    const tempIttfDocumentUri = "c:/temp_1." + schema + '.ittf'
    const ittfContent = "Bye"
    var documents = [{
        path: tempIttfDocumentUri,
        content: ittfContent
    }]
    
    repo.JsonComponents.createJsonFs(
        documents,
        (err:any, jsonFs: repo.JsonFs) => {
            repo.jsonfile({jsonFs: jsonFs}, (err: any, vfile: fSystem.VFile)=>{
                const tempIttfDocumentUri = "c:/temp_2." + schema + '.ittf'
                vfile.write(tempIttfDocumentUri, "Hello", (err:any, result:any)=>{
                    console.log("result", result);
                    console.log("jsonFs", JSON.stringify(jsonFs, null, 2));
                    repo.createStoreFactory({
                        storeKind: 'json',
                        storeJsonFs: jsonFs
                    }, (err:any, storeFn: repo.createStoreFn)=> {
                        storeFn((err:any, store: repo.Store)=> {
                            store.getModelContent(tempIttfDocumentUri, (err:any, content:string)=> {
                                console.log("content " + tempIttfDocumentUri, content);
                            })
                        })
                })
            })
        })
    })

    /*
    repo.createStoreFactory({
        storeKind: 'json'
    }, (err:any, storeFn: repo.createStoreFn)=> {
        
    })
    */
}
