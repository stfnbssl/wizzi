/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\examples\tau\.wizzi\src\features\wizzi\productions.js.ittf
    utc time: Mon, 22 Feb 2021 12:45:40 GMT
*/
'use strict';
import path from 'path';
import fs from 'fs';
import wizzi from 'wizzi';
import wizziUtils from 'wizzi-utils';
var {
    ittfDocumentScanner, 
    folderBrowse, 
    IttfMTreeState, 
    FolderBrowseResult
} = wizziUtils;
import {config} from '../config/index.js';
import {createFilesystemFactory} from './factory.js';
export async function loadModelFs(filePath, context) {
    return new Promise(async (resolve, reject) => {
            const schemaName = schemaFromFilePath(filePath);
            if (!schemaName) {
                return reject('File is not a known ittf document: ' + filePath);
            }
            const wf = await createFilesystemFactory();
            wf.loadModel(schemaName, filePath, {
                mTreeBuildUpContext: context
            }, (err, result) => {
                if (err) {
                    return reject(err);
                }
                // console.log('Generated artifact', result);
                resolve(result);
            })
        });
}
export async function generateArtifactFs(filePath, context) {
    return new Promise(async (resolve, reject) => {
            const generator = generatorFor(filePath);
            if (generator) {
                console.log('using artifact generator', generator);
                const wf = await createFilesystemFactory();
                wf.loadModelAndGenerateArtifact(filePath, {
                    modelRequestContext: context || {}
                }, generator, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    console.log('Generated artifact', result);
                    resolve({
                        artifactContent: result, 
                        sourcePath: filePath, 
                        artifactGenerator: generator
                    })
                })
            }
            else {
                reject('No artifact generator available for document ' + filePath);
            }
        });
}
export async function scanIttfDocumentFs(filePath, rootFolder) {
    return new Promise((resolve, reject) =>
            ittfDocumentScanner.scan(filePath, {
                rootFolder
            }, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            }));
}
export async function scanIttfFolderFs(filePath, rootFolder) {
    return new Promise((resolve, reject) =>
            folderBrowse.scan(filePath, {
                rootFolder
            }, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            }));
}
export async function inferAndLoadContextFs(filePath, exportName) {
    return new Promise((resolve, reject) => {
            const pf = parseFilePath(filePath);
            if (pf.isIttfDocument && pf.schema !== 'json') {
                var twinJsonPath = path.join(path.dirname(filePath), pf.seedname + '.json.ittf');
                if (fs.existsSync(twinJsonPath)) {
                    loadModelFs(twinJsonPath, {}).then((model) =>
                        resolve({
                            [exportName]: model
                        })).catch((err) =>
                        reject(err))
                }
                else {
                    resolve({});
                }
            }
            else {
                resolve({});
            }
        });
}
const schemaModuleMap = {
    css: 'css/document', 
    graphql: 'graphql/document', 
    ittf: 'ittf/document', 
    js: 'js/module', 
    json: 'json/document', 
    html: 'html/document', 
    scss: 'scss/document', 
    svg: 'svg/document', 
    text: 'text/document', 
    ts: 'ts/module', 
    vml: 'vml/document', 
    vue: 'vue/document', 
    xml: 'xml/document'
};
function generatorFor(filePath) {
    const pf = parseFilePath(filePath);
    if (pf.isIttfDocument) {
        return schemaModuleMap[pf.schema];
    }
    return undefined;
}
function schemaFromFilePath(filePath) {
    const pf = parseFilePath(filePath);
    if (pf.isIttfDocument) {
        return pf.schema;
    }
    return undefined;
}
export function parseFilePath(filePath) {
    const nameParts = path.basename(filePath).split('.');
    if (nameParts[nameParts.length - 1] === 'ittf') {
        return {
                isIttfDocument: true, 
                schema: nameParts[nameParts.length - 2], 
                seedname: nameParts.slice(0, -2).join('.')
            };
    }
    else {
        return {
                isIttfDocument: false, 
                schema: nameParts[nameParts.length - 1], 
                seedname: nameParts.slice(0, -1).join('.')
            };
    }
}
