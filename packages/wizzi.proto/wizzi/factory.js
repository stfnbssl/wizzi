const path = require('path');
const wizzi = require('wizzi');
const wizziRepo = require('wizzi-repo');
const packiFilePrefix = 'json://';

let md;
module.exports = md = {
    packiFilesToJsonDocuments: function packiFilesToJsonDocuments(files) {
        const jsonDocuments = [];
        Object.keys(files).map((value) => {
        
            if (files[value].type === 'CODE') {
                const filePath = md.ensurePackiFilePrefix(value);
                jsonDocuments.push({
                    path: filePath, 
                    content: files[value].contents
                })
            }
        })
        return jsonDocuments;
    },
    createFsJsonAndFactory: async function (files) {
        const plugins = [];
        const jsonDocuments = [];
        Object.keys(files).map((value) => {
        
            if (files[value].type === 'CODE' && files[value].contents && files[value].contents.length > 0) {
                const filePath = md.ensurePackiFilePrefix(value);
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
        })
        console.log('createFactory', plugins, 'jsonDocuments.length', jsonDocuments.length);
        return new Promise((resolve, reject) => 
            
                wizziRepo.JsonComponents.createFsJson(jsonDocuments, (err, fsJson) => {
                
                    if (err) {
                        return reject(err);
                    }
                    wizzi.jsonFactory({
                        fsJson, 
                        plugins: {
                            items: [
                                'wizzi-core', 
                                'wizzi-js', 
                                'wizzi-web', 
                                /*
                                './wizzi-core/dist/index.js', 
                                './wizzi-js/dist/index.js', 
                                './wizzi-web/dist/index.js', 
                                './wizzi-meta/dist/index.js'
                                */
                            ], 
                            // pluginsBaseFolder: 'C:/My/wizzi/stfnbssl/wizzi/packages'
                        }
                    }, function(err, wf) {
                        if (err) {
                            return reject(err);
                        }
                        resolve({
                            wf, 
                            fsJson
                        })
                    })
                }
                )
            );
        },
    createFsJson: async function createFsJson(files) {
        const jsonDocuments = [];
        Object.keys(files).map((value) => {
            if (files[value].type === 'CODE') {
                const filePath = md.ensurePackiFilePrefix(value);
                jsonDocuments.push({
                    path: filePath, 
                    content: files[value].contents
                })
            }
        })
        console.log('createFsJson', 'jsonDocuments.length', jsonDocuments.length);
        return new Promise((resolve, reject) => 
            
                wizziRepo.JsonComponents.createFsJson(jsonDocuments, (err, result) => {
                
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                }
                )
            );
    },
    extractGeneratedFiles: async function extractGeneratedFiles(fsJson) {
    const files = {};
    return new Promise((resolve, reject) => 
            fsJson.toFiles({
                removeRoot: packiFilePrefix
            }, (err, result) => {
            
                if (err) {
                    reject(err);
                }
                result.forEach((value) => {
                
                    if (value.relPath.endsWith('.ittf') == false) {
                        files[value.relPath] = {
                            type: 'CODE', 
                            contents: value.content, 
                            generated: true
                        };
                    }
                }
                )
                resolve(files);
            })
        );
    },
    ensurePackiFilePrefix: function (filePath) {
        return filePath.startsWith(packiFilePrefix) ? filePath : packiFilePrefix + filePath;
    }
}

const schemaPluginMap = {
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

function pluginsFor(file) {
    const nameParts = path.basename(file).split('.');
    if (nameParts[nameParts.length - 1] === 'ittf') {
        return schemaPluginMap[nameParts[nameParts.length - 2]] || [];
    }
    return [];
}

