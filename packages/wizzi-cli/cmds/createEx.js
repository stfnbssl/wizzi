/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.11
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\.wizzi\cmds\createEx.js.ittf
*/
'use strict';
const path = require('path');
const wizzi = require('wizzi');
const wizziUtils = require('wizzi-utils');
const verify = wizziUtils.verify;
const vfile = wizziUtils.vfile;
const templator = require('./templator');
var file = vfile();
var templateGroups = [
    'ts-express', 
    'ts-client'
];
module.exports = (options) => {

    options = options || {};
    if (templateGroups.indexOf(options.templateGroup) < 0) {
        throw new Error('createEx. Unknown template group: ' + options.templateGroup);
    }
    console.log('createEx.options', options, __filename);
    var templatorFolderPath = path.join(__dirname, '..', 'resources', 'create', 'templators', options.templateGroup);
    var templatorContextPath = path.join(templatorFolderPath, 'contexts', options.template + '.json.ittf');
    console.log('templatorContextPath', templatorContextPath, __filename);
    var templatorIndex = path.join(templatorFolderPath, 'index.ittf.ittf');
    console.log('templatorIndex', templatorIndex, __filename);
    var tempTemplate = path.join(__dirname, '..', 'resources', 'create', 'templates', '__temp', options.templateGroup, options.template);
    console.log('tempTemplate', tempTemplate, __filename);
    wizzi.model(path.join(templatorContextPath), {
        cliCtx: {
            pkgName: options.pkgName, 
            description: options.pkgName
         }
     }, (err, cliCtx) => {
    
        if (err) {
            console.log("[31m%s[0m", 'createEx.load context.error:', err);
            return ;
        }
        console.log('createEx.cliCtx', cliCtx, __filename);
        templator(templatorIndex, tempTemplate, cliCtx)
        
        var fileCtx = {};
        if (options.template == "wizzi/plugin") {
            cliCtx.wizzi_plugin_type = options.wizzi_plugin_type;
            cliCtx.Schemas = [
                {
                    name: options.wizzi_plugin_schema
                 }
            ];
            fileCtx.schema = options.wizzi_plugin_schema;
        }
        
        console.log('createEx.before genFolder.cliCtx', cliCtx, __filename);
        
        return wizzi.genFolder(tempTemplate, {
                cliCtx: cliCtx, 
                fileCtx: fileCtx
             }, {
                destFolder: options.destPath ? options.destPath : path.join('C:/My/wizzi/stfnbssl/wizzi.meta.demos/packages', options.pkgName), 
                copyInclude: ['*'], 
                copyExclude: []
             }, function(err, genFolderResult) {
                if (err) {
                    console.log("[31m%s[0m", 'Test error >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                    console.log("[31m%s[0m", 'err', err);
                    throw new Error(err.message);
                }
                console.log('genFolderResult', genFolderResult, __filename);
                return ;
            });
    }
    )
}
;
