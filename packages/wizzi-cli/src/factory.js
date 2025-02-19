/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\.wizzi\src\factory.js.ittf
    utc time: Tue, 21 Jan 2025 14:27:09 GMT
*/

const wizzi = require('@wizzi/factory');
const wizziUtils = require('@wizzi/utils');
const vfile = wizziUtils.vfile;
const packi = wizziUtils.packi;
const fSystem = wizziUtils.fSystem;

const packiFilePrefix = 'json:/';

function ensurePackiFilePrefix(filePath) {
    return filePath.startsWith(packiFilePrefix) ? filePath : packiFilePrefix + filePath;
}

const md = module.exports = {};

md.createWizziFactory = function(globalContext, extraPlugin, callback) {
    console.log("[33m%s[0m", 'extraPlugin', extraPlugin);
    wizzi.fsFactory({
        plugins: extraPlugin, 
        globalContext: globalContext || {}
     }, callback)
}
;
md.createJsonWizziFactoryAndJsonFs = function(packiFiles, extraPlugin, extraMetaPlugins, callback) {
    const jsonDocuments = [];
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
    wizzi.JsonComponents.createJsonFs(jsonDocuments, (err, jsonFs) => {
        if (err) {
            return callback(err);
        }
        wizzi.jsonFactory({
            jsonFs: jsonFs, 
            plugins: extraPlugin, 
            metaPlugins: extraMetaPlugins
         }, (err, wf) => {
            if (err) {
                return callback(err);
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
md.getDefaultPlugins = function() {
    return [
            "./wizzi.plugin.bin/index.js", 
            "./wizzi.plugin.css/index.js", 
            "./wizzi.plugin.docx/index.js", 
            "./wizzi.plugin.graphql/index.js", 
            "./wizzi.plugin.html/index.js", 
            "./wizzi.plugin.ittf/index.js", 
            "./wizzi.plugin.js/index.js", 
            "./wizzi.plugin.json/index.js", 
            "./wizzi.plugin.md/index.js", 
            "./wizzi.plugin.pandoc/index.js", 
            "./wizzi.plugin.pdf/index.js", 
            "./wizzi.plugin.ppt/index.js", 
            "./wizzi.plugin.prisma/index.js", 
            "./wizzi.plugin.text/index.js", 
            "./wizzi.plugin.toml/index.js", 
            "./wizzi.plugin.ts/index.js", 
            "./wizzi.plugin.svg/index.js", 
            "./wizzi.plugin.wzjob/index.js", 
            "./wizzi.plugin.wzschema/index.js", 
            "./wizzi.plugin.xml/index.js", 
            "./wizzi.plugin.yaml/index.js"
        ];
}
;
md.getDefaultPluginsBaseFolder = function() {
    return "C:/My/wizzi/stfnbssl/wizzi.plugins/packages";
}
;

md.createContextFromFile = function(filePath, previousContext, extraPlugin, callback) {
    const fInfo = fSystem.fileInfoByPath(filePath);
    if (fInfo.isIttfDocument) {
        if (fInfo.schema == 'json') {
            md.createWizziFactory({}, extraPlugin, (err, wf) => {
                if (err) {
                    return callback(err);
                }
                wf.loadModelAndGenerateArtifact(filePath, {
                    modelRequestContext: {
                        mTreeBuildupContext: previousContext || {}
                     }, 
                    artifactRequestContext: {
                        
                     }
                 }, null, (err, result) => {
                    if (err) {
                        console.log("[31m%s[0m", 'err', err);
                        throw new Error(err.message);
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
             })
        }
    }
    else {
        if (fInfo.mime == 'json') {
            vfile((err, vfileImpl) => {
                if (err) {
                    return callback(err);
                }
                vfileImpl.read(filePath, (err, result) => {
                    if (err) {
                        return callback(err);
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
             })
        }
    }
}
;