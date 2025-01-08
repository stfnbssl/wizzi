'use strict';

import path from 'path'
import wizzi from "@wizzi/factory";
import {packi, fSystem} from '@wizzi/utils';
import wizziRepo, { JsonFs } from '@wizzi/repo';
import { ParameterChecker } from './ParametersChecker';

// const packi.packiFilePrefix = 'json:/';

function ensurePackiFilePrefix(filePath: string) {
    return filePath.startsWith(packi.filePrefix) ? filePath : packi.filePrefix + filePath;
}

export function createFsWizziFactory(globalContext: any, extraPlugins: wizzi.PluginsOptions, callback: wizzi.cb<wizzi.WizziFactory>) {
    console.log("[33m%s[0m", 'extraPlugin', extraPlugins);
    wizzi.fsFactory({
        repo: { storeKind: "filesystem"},
        plugins: extraPlugins, 
        globalContext: globalContext || {}
     }, callback)
}

export function createJsonWizziFactoryAndJsonFs(packiFiles: packi.PackiFiles, extraPlugins: wizzi.PluginsOptions, 
    extraMetaPlugins: wizzi.PluginsOptions, callback: wizzi.cb<wizzi.JsonWizziFactoryAndJsonFs|null>) {
    const jsonDocuments: wizziRepo.JsonDocumentDto[] = [];
    console.log('createJsonWizziFactoryAndJsonFs', __filename);
    Object.keys(packiFiles).map((value) => {
    
        if (packiFiles[value].type === 'CODE' && packiFiles[value].contents && packiFiles[value].contents.length > 0) {
            const filePath = ensurePackiFilePrefix(value);
            jsonDocuments.push({
                path: filePath, 
                content: packiFiles[value].contents
             })
        }
    }
    )
    wizziRepo.JsonComponents.createJsonFs(jsonDocuments, (err, jsonFs) => {
    
        if (err) {
            return callback(err, null);
        }
        if (jsonFs == undefined) {
            return callback(err, null);
        }
        wizzi.jsonFactory({
            jsonFs: jsonFs, 
            plugins: extraPlugins, 
            metaPlugins: extraMetaPlugins
         }, (err, wf?: wizzi.WizziFactory) => {
            if (err || !wf) {
                return callback(err, null);
            }
            callback(null, {
                wf: wf, 
                jsonFs: jsonFs
             })
        }
        )
    }
    )
}
;

export function loadContexts(contextFiles: [string], plugins:wizzi.PluginsOptions, checker: ParameterChecker, callback: wizzi.cb<{[path: string]: any}>): void {
    
    contextFiles.map(contextFile =>{
        checker.checkFile(contextFile, contextFile)
    })
    if (!checker.isValid()) {
        return callback(null, {
                __is_checkerError: true
        });
    }
    const progressiveContext: {[path: string]: any} = {};
    function doLoadContext(ndx: number) {
        const contextFile = contextFiles[ndx];
        if (!contextFile) {
            console.log('progressiveContext', progressiveContext, __filename);
            return callback(null, progressiveContext);
        }
        createContextFromFile(checker.values[contextFile] as string, progressiveContext, plugins, (err, context) => {
            if (err) {
                return callback(err, {});
            }
            const fileBasename = path.basename(contextFile);
            const contextName = fileBasename.split('.')[0];
            progressiveContext[contextName] = context;
            checker.checkNotNullOrUndefined(context, contextName, {
                message: "loaded context from " + contextFile
             })
            doLoadContext(ndx + 1)
        }
        )
    }
    doLoadContext(0)
}

export function createContextFromFile(filePath: string, previousContext: any, extraPlugins: wizzi.PluginsOptions, callback: wizzi.cb<any>) {
    const fInfo = fSystem.fileInfoByPath(filePath);
    if (fInfo.isIttfDocument) {
        if (fInfo.schema == 'json') {
            createFsWizziFactory({}, extraPlugins, (err: null, wf: wizzi.WizziFactory) => {
                if (err) {
                    return callback(err, null);
                }
                wf.loadModelAndGenerateArtifact(filePath, {
                    modelRequestContext: previousContext || {}, 
                    artifactRequestContext: {}
                 }, "json/module", (err, result) => {
                
                    if (err) {
                        console.log("[31m%s[0m", 'err', err);
                        throw new Error(err.message);
                    }
                    if (result == undefined) {
                        throw new Error("");
                    }
                    console.log('result', result, __filename);
                    callback(null, JSON.parse(result))
                }
                )
            }
            )
        }
        else {
            callback({
                __is_error: true, 
                message: 'Wizzi schema of context file ' + filePath + ' not managed'
             }, null)
        }
    }
    else {
        if (fInfo.extension == 'json') {
            fSystem.vfile({storeName: 'filesystem'}, (err: any, vfileImpl: fSystem.VFile) => {
                if (err) {
                    return callback(err, null);
                }
                vfileImpl.read(filePath, (err, result) => {
                
                    if (err) {
                        return callback(err, null);
                    }
                    callback(null, JSON.parse(result))
                }
                )
            }
            )
        }
        else {
            callback({
                __is_error: true, 
                message: 'Mime type of context file ' + filePath + ' not managed'
             }, null)
        }
    }
}

export function wizzifyFolder(wf: wizzi.WizziFactory, sourceFolder: string, destFolder: string, callback: wizzi.cb<null>) {
    // console.log('wizzifyFolder.sourceFolder', sourceFolder, __filename);
    // console.log('wizzifyFolder.destFolder', destFolder, __filename);
    fSystem.vfile({storeName: 'filesystem'}, (err: any, vfileImpl: fSystem.VFile) => {
        vfileImpl.getFiles(sourceFolder, {
            deep: true, 
            documentContent: false
            }, (err, files) => {
            if (err) { return callback(err, null); }
            // console.log('wizzifyFolder.sourceFiles', files.length, __filename);
            function run(i: number): void {
                if (!files[i]) {
                    return callback(null, null);
                }
                var sourcePath = files[i].fullPath;
                try {
                    var wizzifyName = getWizzifyExtension(sourcePath);
                    if (!wf.canWizzify(wizzifyName)) {
                        console.log(i+1, '/', files.length, sourcePath,'has no wizzifier', __filename);
                        return vfileImpl.copyFile(sourcePath, path.join(destFolder, files[i].relPath), (err, result) => {
                                if (err) {
                                    console.log("[31m%s[0m", 'copying file', sourcePath);
                                    console.log("[31m%s[0m", err);
                                    return run(i+1);
                                }
                                console.log(i+1, '/', files.length, sourcePath, 'copied', __filename);
                                return run(i+1);
                            }
                            );
                    }
                    var destPath = path.join(destFolder, files[i].relPath + '.ittf');
                    vfileImpl.read(sourcePath, (err:any, content: string) => {
                        wf.getWizziIttfFromText(content, wizzifyName, (err: any, result: string) => {
                            if (err) {
                                console.log("[31m%s[0m", 'on file', sourcePath);
                                console.log("[31m%s[0m", err);
                                return process.nextTick(() => 
                                    run(i+1)
                                );
                            }
                            vfileImpl.write(destPath, result, (err: any, vfileImpl: fSystem.VFile) => {
                                console.log('Done. Wizzify file', destPath, __filename);
                                return process.nextTick(() => 
                                        run(i+1)
                                    );
                                }
                                )
                            }
                        )
                    })
                } 
                catch (ex: any) {
                    console.log("[31m%s[0m", 'in file', sourcePath, 'message', ex.message);
                    process.nextTick(() => 
                        run(i+1)
                    )
                } 
            }
            run(0);
        }
        )
    }
    )
}

function getWizzifyExtension(sourcePath: string) {
    return path.extname(sourcePath).substring(1);
}
