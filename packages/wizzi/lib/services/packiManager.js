/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\services\packiManager.js.ittf
    utc time: Tue, 21 Jan 2025 14:15:35 GMT
*/
var verify = require('@wizzi/utils').verify;
const pretty = require('@wizzi/utils').pretty;
const constants = require('../constants');
const packiUtils = require('./packiUtils');
const {
    packiFilePrefix
 } = constants;
class PackiManager {
    constructor() {
        this.__type = 'PackiManager';
        this.__version = '0.8.46';
    }
    /**
         Prettify the ittf code of a PackiFiles object
        
         params
         { files
         :ref PackiFiles
         callback
         { prettifiedFiles
         :ref PackiFiles
    */
    prettify(files, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'prettify', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        
        var prettifiedFiles = {};
        var items = Object.keys(files);
        var item_count = 0;
        (function nextItem() {
            var item = items[item_count++];
            if (!item) {
                return callback(null, prettifiedFiles);
            }
            if (files[item].type == "CODE") {
                pretty.prettifyIttfHtmlFromString(files[item].contents, function(err, ittfpretty) {
                    if (err) {
                        console.log("[31m%s[0m", err);
                    }
                    if (err) {
                        prettifiedFiles[item] = {
                            type: "CODE", 
                            contents: JSON.stringify(err, null, 4)
                         };
                    }
                    else {
                        prettifiedFiles[item] = {
                            type: "CODE", 
                            contents: ittfpretty
                         };
                    }
                    return process.nextTick(() => 
                            nextItem()
                        );
                })
            }
            else {
                return nextItem();
            }
        })();
    }
    generate(packiFiles, plugins, options, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'generate', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        
        if (!callback) {
            callback = options;
            options = {};
        }
        options = options || {};
        
        var wzJobDocumentUri = this.detectWzJob(packiFiles);
        if (wzJobDocumentUri) {
            this.generateByWzJob(packiFiles, wzJobDocumentUri, plugins, options, callback)
        }
        else {
            this.generateByFolder(packiFiles, plugins, options, callback)
        }
    }
    generateByWzJob(packiFiles, wzJobDocumentUri, plugins, options, callback) {
        packiUtils.createJsonWizziFactoryAndJsonFs(packiFiles, plugins, null, (err, wf_and_jsonFs) => {
            if (err) {
                console.log("[31m%s[0m", err);
                return callback(err);
            }
            var wf = wf_and_jsonFs.wf;
            var jsonFs = wf_and_jsonFs.jsonFs;
            wf.executeJob({
                name: 'fromPackiFilesJob', 
                path: packiFilePrefix + wzJobDocumentUri, 
                productionOptions: Object.assign({}, {
                    indentSpaces: 4, 
                    basedir: __dirname, 
                    verbose: 2
                 }, options.productionOptions || {}), 
                globalContext: options.globalContext || {}
             }, (err, result) => {
                if (err) {
                    console.log("[31m%s[0m", err);
                    return callback(err);
                }
                packiUtils.jsonFsToPackiFiles(jsonFs, (err, packiFilesAfterJobExecution) => {
                    if (err) {
                        console.log("[31m%s[0m", err);
                        return callback(err);
                    }
                    const generatedPackiFiles = packiUtils.getAddedFiles(packiFiles, packiFilesAfterJobExecution);
                    // loog 'wizzi.packiManager.generateByWzJob.generatedPackiFiles', generatedPackiFiles
                    return callback(null, generatedPackiFiles);
                }
                )
            }
            )
        }
        )
    }
    generateByFolder(packiFiles, plugins, options, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'generateByFolder', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        var genFolderSource = 'source';
        var genFolderDest = 'result';
        const factoryPackiFiles = packiUtils.mountToPackiFolder({}, packiFiles, genFolderSource);
        packiUtils.createJsonWizziFactoryAndJsonFs(factoryPackiFiles, plugins, null, (err, wf_and_jsonFs) => {
            if (err) {
                console.log("[31m%s[0m", err);
                return callback(err);
            }
            var wf = wf_and_jsonFs.wf;
            var jsonFs = wf_and_jsonFs.jsonFs;
            wf.generateFolderArtifacts(packiFilePrefix + genFolderSource, {
                modelRequestContext: options.modelRequestContext || {}, 
                artifactRequestContext: options.artifactRequestContext || {}
             }, {
                deep: true, 
                destFolder: packiFilePrefix + genFolderDest, 
                copyInclude: ['*'], 
                copyExclude: []
             }, (err, generatedFilePaths) => {
                if (err) {
                    console.log("[31m%s[0m", err);
                    return callback(err);
                }
                // loog 'generatedFilePaths', generatedFilePaths
                packiUtils.jsonFsToPackiFiles(jsonFs, (err, folderGeneratedPackiFiles) => {
                    if (err) {
                        console.log("[31m%s[0m", err);
                        return callback(err);
                    }
                    const generatedPackiFiles = packiUtils.unmountPackiFolder(folderGeneratedPackiFiles, genFolderDest);
                    // loog 'wizzi.packiManager.generateByFolder.generatedPackiFiles', generatedPackiFiles
                    return callback(null, generatedPackiFiles);
                }
                )
            }
            )
        }
        )
    }
    detectWzJob(packiFiles) {
        var items = Object.keys(packiFiles);
        var i, i_items=items, i_len=items.length, item;
        for (i=0; i<i_len; i++) {
            item = items[i];
            // loog 'detectWzJob', item, item.endsWith('.wzjob.ittf')
            if (item.endsWith('.wzjob.ittf')) {
                return item;
            }
        }
        return null;
    }
}
module.exports = {
    createManager: function createManager(options, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'createManager', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isObject(options) === false) {
            return callback(error(
                'InvalidArgument', 'createManager', { parameter: 'options', message: 'The options parameter must be an object. Received: ' + options }
            ));
        }
        var pm = new PackiManager();
        return callback(null, pm);
    }
 };
/**
  params
    string code
      # the error name or number
    string method
    string message
      # optional
    { innerError
      # optional
*/
function error(code, method, message, innerError) {
    var parameter = null;
    if (verify.isObject(message)) {
        parameter = message.parameter;
        message = message.message;
    }
    return verify.error(innerError, {
        name: ( verify.isNumber(code) ? 'Err-' + code : code ),
        method: 'wizzi@0.8.46.packiManager.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}