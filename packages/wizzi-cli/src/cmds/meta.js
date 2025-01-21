/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\.wizzi\src\cmds\meta.js.ittf
    utc time: Mon, 20 Jan 2025 19:30:35 GMT
*/

const path = require('path');
const wizzi = require('@wizzi/factory');
const wizziUtils = require('@wizzi/utils');
const file = wizziUtils.file;
const verify = wizziUtils.verify;
const config = require('../utils/config');
const help = require('./help');
const commons = require('./commons');
const factory = require('../factory');

const kCommandName = "meta";

module.exports = (args) => {
    const name = args._[1];
    const configPath = args.c || args.config;
    
    const checker = new commons.commandChecker(kCommandName);
    
    if (verify.isEmpty(name)) {
        checker.checkNotEmpty(configPath, 'configPath', {
            message: 'Meta name is also missing'
         })
        checker.checkFile(checker.configPath, 'configPath')
    }
    // do this to inform checker of the parameter
    else {
        checker.checkNotEmpty(name, 'metaName')
    }
    if (checker.metaName) {
        checker.checkNotEmpty(config.getPath(name, 'meta'), 'configPath', {
            message: 'The config file for the meta production named "' + name + '" has not be found'
         })
    }
    if (!checker.isValid()) {
        return checker.checkOut();
    }
    
    const configInstance = require(checker.configPath);
    
    // loog 'wizzi.cli.meta.metaConfigInstance', configInstance
    checker.checkNotEmpty(configInstance.pluginsBaseFolder, 'pluginsBaseFolder', {
        message: "in config file " + checker.configPath
     })
    checker.checkArrayNotEmpty(configInstance.plugins, 'pluginsItems', {
        message: "in config file " + checker.configPath
     })
    checker.checkNotEmpty(configInstance.metaPluginsBaseFolder, 'metaPluginsBaseFolder', {
        message: "in config file " + checker.configPath
     })
    checker.checkArrayNotEmpty(configInstance.metaPlugins, 'metaPluginsItems', {
        message: "in config file " + checker.configPath
     })
    checker.checkFile(configInstance.metaCtxPath, {
        message: 'Meta context path'
     })
    if (!checker.checkOut()) {
        return ;
    }
    generateMeta(configInstance.metaCtxPath, configInstance.destPath, {
        items: checker.pluginsItems, 
        pluginsBaseFolder: checker.pluginsBaseFolder
     }, {
        items: checker.metaPluginsItems, 
        metaPluginsBaseFolder: checker.metaPluginsBaseFolder
     }, configInstance.globalContext, (err, result) => {
        if (err) {
            console.log("[31m%s[0m", "");
            console.log("[31m%s[0m", "");
            console.log("[31m%s[0m", err);
            console.log("[31m%s[0m", "");
            console.log("[31m%s[0m", "");
        }
        else {
            console.log("[32m%s[0m", "");
            console.log("[32m%s[0m", "");
            console.log("[32m%s[0m", 'Meta production execution done');
            console.log("[32m%s[0m", "");
            console.log("[32m%s[0m", "");
        }
    }
    )
}
;
function generateMeta(metaCtxPath, destPath, pluginsInfo, metaPluginsInfo, globalContext, callback) {
    loadMetaContext(metaCtxPath, pluginsInfo, (err, metaCtx) => {
        if (err) {
            return callback(err);
        }
        console.log("[32m%s[0m", JSON.stringify(metaCtx, null, 4));
        factory.createJsonWizziFactoryAndJsonFs({}, pluginsInfo, metaPluginsInfo, (err, wf_and_jsonFs) => {
            if (err) {
                return callback(err);
            }
            metaCtx.__wz_fsc = new wizzi.FactoryServiceContext();
            wf_and_jsonFs.wf.executeMetaProduction({
                metaCtx: metaCtx, 
                paths: {
                    metaProductionTempFolder: '___template', 
                    metaProductionWizziFolder: '.wizzi'
                 }, 
                globalContext: globalContext
             }, (err, wizziPackiFiles) => {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw err;
                    return ;
                }
                // loog 'wizzi.cli.meta.result.wizziPackiFiles.keys', Object.keys(wizziPackiFiles)
                metaCtx.__wz_fsc.dumpDebugObjects({
                    kind: 'packi', 
                    destFolder: path.join(__dirname, 'dumps', 'packi')
                 })
                writePackifiles(destPath, wizziPackiFiles)
            }
            )
        }
        )
    }
    )
}
function loadMetaContext(metaCtxPath, pluginsInfo, callback) {
    factory.createWizziFactory({}, pluginsInfo, (err, wf) => {
        if (err) {
            return callback(err);
        }
        wf.loadModel('json', metaCtxPath, {
            mTreeBuildupContext: {
                metaCtx: {
                    
                 }
             }
         }, (err, wizziModel) => {
            if (err) {
                return callback(err);
            }
            return callback(null, wizziModel);
        }
        )
    }
    )
}
function writePackifiles(folderPath, packiFiles) {
    for (var k in packiFiles) {
        file.write(path.join(folderPath, k), packiFiles[k].contents)
    }
}