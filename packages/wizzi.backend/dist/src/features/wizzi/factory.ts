/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\wizzi\factory.ts.ittf
    utc time: Sun, 25 Jul 2021 19:40:41 GMT
*/
import path from 'path';
import wizzi from 'wizzi';
import {JsonComponents, JsonDocumentDto, FsJson} from 'wizzi-repo';
import {packiFilePrefix} from '../config/env';
import {packiTypes} from '../packi';
import {config as appConfig} from '../config';
import {JsonWizziFactory, FilesystemWizziFactory} from './types';

const myname = 'features/wizzi/factory';

export function packiFilesToJsonDocuments(files: packiTypes.PackiFiles):  JsonDocumentDto[] {

    const jsonDocuments: JsonDocumentDto[] = [];
    Object.keys(files).map((value) => {
    
        if (files[value].type === 'CODE') {
            const filePath = ensurePackiFilePrefix(value);
            jsonDocuments.push({
                path: filePath, 
                content: files[value].contents
             })
        }
    }
    )
    return jsonDocuments;
}

export async function createFilesystemFactory(globalContext?: { 
    [k: string]: any;
}):  Promise<wizzi.WizziFactory> {

    const gc: { 
        [k: string]: any;
    } = {};
    if (appConfig.isWizziDev) {
        gc['isWizziStudio'] = true;
    }
    return new Promise((resolve, reject) => 
        
            wizzi.fsFactory({
                plugins: {
                    items: [
                        './wizzi-core/dist/index.js', 
                        './wizzi-js/dist/index.js', 
                        './wizzi-web/dist/index.js', 
                        './wizzi-meta/dist/index.js'
                    ], 
                    pluginsBaseFolder: 'C:/My/wizzi/stfnbssl/wizzi/packages'
                 }, 
                globalContext: Object.assign({}, gc, globalContext || {})
             }, function(err, wf) {
            
                if (err) {
                    return reject(err);
                }
                resolve(wf);
            })
        );
}

export async function createFsJsonAndFactory(files: packiTypes.PackiFiles):  Promise<JsonWizziFactory> {

    const plugins: string[] = [];
    const jsonDocuments: JsonDocumentDto[] = [];
    Object.keys(files).map((value) => {
    
        if (files[value].type === 'CODE' && files[value].contents && files[value].contents.length > 0) {
            const filePath = ensurePackiFilePrefix(value);
            jsonDocuments.push({
                path: filePath, 
                content: files[value].contents
             })
            const pluginList = pluginsFor(filePath);
            pluginList.forEach((item) => {
            
                if (plugins.indexOf(item) < 0) {
                    plugins.push(item);
                }
            }
            )
        }
    }
    )
    console.log(myname, 'createFactory', plugins, 'jsonDocuments.length', jsonDocuments.length);
    return new Promise((resolve, reject) => 
        
            JsonComponents.createFsJson(jsonDocuments, (err, fsJson) => {
            
                if (err) {
                    return reject(err);
                }
                wizzi.jsonFactory({
                    fsJson, 
                    plugins: {
                        items: [
                            './wizzi-core/dist/index.js', 
                            './wizzi-js/dist/index.js', 
                            './wizzi-web/dist/index.js', 
                            './wizzi-meta/dist/index.js'
                        ], 
                        pluginsBaseFolder: 'C:/My/wizzi/stfnbssl/wizzi/packages'
                     }
                 }, function(err, wf) {
                
                    if (err) {
                        return reject(err);
                    }
                    console.log(myname, 'createFactory', 'done');
                    resolve({
                        wf, 
                        fsJson
                     })
                })
            }
            )
        );
}

export async function createFsJson(files: packiTypes.PackiFiles):  Promise<FsJson> {

    const jsonDocuments: JsonDocumentDto[] = [];
    Object.keys(files).map((value) => {
    
        if (files[value].type === 'CODE') {
            const filePath = ensurePackiFilePrefix(value);
            jsonDocuments.push({
                path: filePath, 
                content: files[value].contents
             })
        }
    }
    )
    console.log('createFsJson', 'jsonDocuments.length', jsonDocuments.length);
    return new Promise((resolve, reject) => 
        
            JsonComponents.createFsJson(jsonDocuments, (err, result) => {
            
                if (err) {
                    return reject(err);
                }
                resolve(result);
            }
            )
        );
}

export async function extractGeneratedFiles(fsJson: FsJson):  Promise<packiTypes.PackiFiles> {

    const files: packiTypes.PackiFiles = {};
    return new Promise((resolve, reject) => 
        
            fsJson.toFiles({
                removeRoot: ''
             }, (err, rfiles) => {
            
                console.log('wizzi.factory.extractGeneratedFiles.rfiles', rfiles);
                console.log('wizzi.factory.extractGeneratedFiles.packiFilePrefix', packiFilePrefix);
                fsJson.toFiles({
                    removeRoot: packiFilePrefix
                 }, (err, result) => {
                
                    if (err) {
                        reject(err);
                    }
                    result.forEach((value) => {
                    
                        console.log('wizzi.factory.extractGeneratedFiles.value.fullPath', value.fullPath, value.fullPath.substr(packiFilePrefix.length));
                        if (value.relPath.endsWith('.ittf') == false) {
                            files[value.relPath] = {
                                type: 'CODE', 
                                contents: value.content as string, 
                                generated: true
                             };
                        }
                    }
                    )
                    resolve(files);
                }
                )
            }
            )
        );
}

const schemaPluginMap: { 
    [k: string]: string[];
} = {
    json: [
        'wizzi-core'
    ], 
    text: [
        'wizzi-core'
    ], 
    xml: [
        'wizzi-core'
    ], 
    ittf: [
        'wizzi-core'
    ], 
    wfjob: [
        'wizzi-core'
    ], 
    wfschema: [
        'wizzi-core'
    ], 
    js: [
        'wizzi-js'
    ], 
    ts: [
        'wizzi-js'
    ], 
    html: [
        'wizzi-web', 
        'wizzi-js', 
        'wizzi-core'
    ], 
    css: [
        'wizzi-web'
    ], 
    scss: [
        'wizzi-web'
    ], 
    graphql: [
        'wizzi-web'
    ], 
    vml: [
        'wizzi-web'
    ], 
    vue: [
        'wizzi-web'
    ]
 };

function pluginsFor(file: string):  string[] {

    const nameParts = path.basename(file).split('.');
    if (nameParts[nameParts.length - 1] === 'ittf') {
        return schemaPluginMap[nameParts[nameParts.length - 2]] || [];
    }
    return [];
}

export function ensurePackiFilePrefix(filePath: string) {

    return filePath.startsWith(packiFilePrefix) ? filePath : packiFilePrefix + filePath;
}
