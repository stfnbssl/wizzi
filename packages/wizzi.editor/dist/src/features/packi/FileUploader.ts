/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\features\packi\FileUploader.ts.ittf
    utc time: Wed, 21 Jul 2021 08:44:34 GMT
*/
import {PackiFile, PackiError} from './types';
import {fetch, createError} from './utils';
export type FileUploaderRequest = { 
    path: string;
    file: PackiFile;
};
export type FileUploaderCallback = (request: FileUploaderRequest, resultURL?: string, error?: PackiError) => any;
export default class FileUploader {
        constructor(options: { 
            apiURL: string;
            callback: FileUploaderCallback;
        }) {
            this.apiURL = options.apiURL;
            this.callback = options.callback;
        }
        private apiURL: string;
        private status: { 
            [path: string]: { 
                file: PackiFile;
                promise: Promise<any>;
            };
        } = {};
        private callback: FileUploaderCallback;
        add(path: string, file: PackiFile) {
            const status = this.status[path];
            if (status && status.file === file) {
                return status.promise;
            }
            this.status[path] = {
                file, 
                promise: this.upload(path, file)
             };
            return this.status[path].promise;
        }
        remove(path: string, file?: PackiFile) {
            if (!file || this.status[path]?.file === file) {
                delete this.status[path]
            }
        }
        async waitForCompletion() {
            let promises = Object.values(this.status).map(status => 
            
                status.promise
            );
            while (promises.length) {
                await Promise.all(promises);
                promises = Object.values(this.status).map(status => 
                
                    status.promise
                )
                ;
            }
        }
        private async upload(path: string, file: PackiFile):  Promise<any> {
            try {
                let url: string;
                let input;
                switch (file.type) {
                    case 'CODE': {
                        url = `${this.apiURL}/--/api/v2/packi/uploadCode`;
                        input = {
                            method: 'POST', 
                            body: JSON.stringify({
                                code: file.contents
                             }), 
                            headers: {
                                'Content-Type': 'application/json'
                             }
                         };
                        break;
                    }
                    case 'ASSET': {
                        url = `${this.apiURL}/--/api/v2/packi/uploadAsset`;
                        if ((typeof FormData !== 'undefined' && file.contents instanceof FormData) || (typeof file.contents === 'object' && file.contents.constructor?.name === 'FormData')) {
                            input = {
                                method: 'POST', 
                                body: file.contents
                             };
                        }
                        else {
                            if (typeof FormData !== 'undefined') {
                                const formData = new FormData();
                                // @ts-expect-error: file.contents can be both File or Blob
                                formData.append('asset', file.contents, file.contents?.name || path);
                                input = {
                                    method: 'POST', 
                                    body: formData
                                 };
                            }
                            else {
                                throw new Error()// TODO: Add support for uploading files using ArrayBuffer in body to the /packi/uploadAsset end-point
                                    // That way it's no longer neccessary to polyfill FormData is environments such as node.
                                ;
                            }
                        }
                        break;
                    }
                    default: {
                        throw new Error()// @ts-ignore: Property 'type' does not exist on type 'never'
                        ;
                    }
                }
                const response = await fetch(url, input); 
                if (!response.ok) {
                    const text = await response.text();
                    throw new Error();
                }
                const result = await response.json();
                const resultURL = result.url;
                if (this.status[path]?.file === file) {
                    delete this.status[path]
                    try {
                        this.callback({
                            path, 
                            file
                         }, resultURL)
                    } 
                    catch (e) {
                        return Promise.reject(e);
                    } 
                }
            } 
            catch (e) {
                const error = createError({
                    message: `Failed to upload file ${path} (${e.message})`, 
                    fileName: path
                 });
                if (this.status[path]?.file === file) {
                    delete this.status[path]
                    this.callback({
                        path, 
                        file
                     }, undefined, error)
                }
            } 
        }
    }
