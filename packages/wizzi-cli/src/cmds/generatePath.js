/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\.wizzi\src\cmds\generatePath.js.ittf
    utc time: Mon, 20 Jan 2025 19:30:35 GMT
*/
const path = require('path');
const wizziUtils = require('@wizzi/utils');
const file = wizziUtils.file;
const verify = wizziUtils.verify;
const wizzi = require('@wizzi/factory');
const config = require('../utils/config');
const factory = require('../factory');
const commons = require('./commons');

const kCommandName = "main";

module.exports = (args) => {
    
    const checker = new commons.commandChecker(kCommandName);
    
    const currentDir = process.cwd();
    
    let sourcePath = args.source || args.s;
    let destPath = args.dest || args.d;
    
    let configInstance = null;
    
    checker.checkFile(sourcePath, 'sourcePath')
    checker.checkFile(destPath, 'destPath', {
        parentFolderMustExist: true
     })
    if (args.config || args.c) {
        checker.checkFile(path.join(currentDir, (args.config || args.c) + '.config.js'), "configPath")
        if (checker.isValid()) {
            configInstance = require(checker.configPath);
        }
        else {
            return checker.checkOut();
        }
        
        checker.checkNotEmpty(configInstance.pluginsBaseFolder, 'pluginsBaseFolder', {
            message: "in config file " + checker.configPath
         })
        checker.checkArrayNotEmpty(configInstance.plugins, 'pluginsItems', {
            message: "in config file " + checker.configPath
         })
    }
    if (!checker.isValid()) {
        return checker.checkOut();
    }
    if (checker.sourcePath_is_folder && !checker.destPath_is_folder && !checker.destPath_parent_only_exists) {
        checker.optionError('Source path is a folder, destination path cannot be a filename: ' + checker.destPath)
        return checker.checkOut();
    }
    
    // At this point this cannot be invalid
    if (!checker.sourcePath_is_folder && checker.destPath_is_folder) {
        checker.checkFile(path.join(destPath, path.basename(sourcePath).substr(0, path.basename(sourcePath).length - 5)), 'destPath', {
            parentFolderMustExist: true
         })
    }
    if (verify.isArray(args.ctx) || verify.isNotEmpty(args.ctx)) {
        if (!checker.isValid()) {
            return ;
        }
    }
    else {
        if (!checker.checkOut()) {
            return ;
        }
    }
    
    const contextFiles = [];
    
    // TODO create context
    if (verify.isArray(args.ctx)) {
        var i, i_items=args.ctx, i_len=args.ctx.length, item;
        for (i=0; i<i_len; i++) {
            item = args.ctx[i];
            contextFiles.push(item)
        }
    }
    else if (verify.isNotEmpty(args.ctx)) {
        contextFiles.push(args.ctx)
    }
    loadContexts(contextFiles, {
        items: checker.pluginsItems || factory.getDefaultPlugins(), 
        pluginsBaseFolder: checker.pluginsBaseFolder || factory.getDefaultPluginsBaseFolder()
     }, checker, (err, context) => {
        if (err) {
            console.log("[31m%s[0m", 'err', err);
            throw new Error(err.message);
        }
        if (context.__is_checkerError) {
            return checker.checkOut();
        }
        
        checker.checkOut();
        
        factory.createWizziFactory({}, {
            items: checker.pluginsItems || factory.getDefaultPlugins(), 
            pluginsBaseFolder: checker.pluginsBaseFolder || factory.getDefaultPluginsBaseFolder()
         }, (err, wf) => {
            if (err) {
                console.log("[31m%s[0m", 'err', err);
                throw new Error(err.message);
            }
            if (checker.sourcePath_is_folder) {
                wf.generateFolderArtifacts(checker.sourcePath, {
                    modelRequestContext: context || {}, 
                    artifactRequestContext: {
                        
                     }
                 }, {
                    destFolder: checker.destPath
                 }, (err, result) => {
                    if (err) {
                        console.log("[31m%s[0m", 'err', err);
                        throw new Error(err.message);
                    }
                    console.log("[32m%s[0m", '');
                    console.log("[32m%s[0m", '');
                    console.log("[32m%s[0m", 'Folder artifacts generation done, see', checker.destPath + ' file');
                    console.log("[32m%s[0m", '');
                    console.log("[32m%s[0m", '');
                }
                )
            }
            else {
                wf.loadModelAndGenerateArtifact(checker.sourcePath, {
                    modelRequestContext: context || {}, 
                    artifactRequestContext: {
                        
                     }
                 }, null, (err, result) => {
                    if (err) {
                        console.log("[31m%s[0m", 'err', err);
                        throw new Error(err.message);
                    }
                    console.log('result', result, __filename);
                    file.write(checker.destPath, result)
                    console.log("[32m%s[0m", '');
                    console.log("[32m%s[0m", '');
                    console.log("[32m%s[0m", 'Single artifact generation done, see', checker.destPath + ' file');
                    console.log("[32m%s[0m", '');
                    console.log("[32m%s[0m", '');
                }
                )
            }
        }
        )
    }
    )
}
;
function loadContexts(contextFiles, plugins, checker, callback) {
    
    var i, i_items=contextFiles, i_len=contextFiles.length, contextFile;
    for (i=0; i<i_len; i++) {
        contextFile = contextFiles[i];
        checker.checkFile(contextFile, contextFile)
    }
    if (!checker.isValid()) {
        return callback(null, {
                __is_checkerError: true
             });
    }
    
    const progressiveContext = {};
    function doLoadContext(ndx) {
        const contextFile = contextFiles[ndx];
        if (!contextFile) {
            console.log('progressiveContext', progressiveContext, __filename);
            return callback(null, progressiveContext);
        }
        factory.createContextFromFile(checker[contextFile], progressiveContext, plugins, (err, context) => {
            if (err) {
                return callback(err);
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