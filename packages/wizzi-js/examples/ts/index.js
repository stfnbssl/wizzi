/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\examples\ts\index.js.ittf
*/
'use strict';
var path = require('path');
var fs = require('fs');
var wizzi = null;
var wizziUtils = require('wizzi-utils');
var verify = wizziUtils.verify;
var file = wizziUtils.file;
var mocks = wizziUtils.mocks;
var mtree = require('wizzi-mtree');
var errors = wizziUtils.exampleErrors;
var stringify = require('json-stringify-safe');
function executeExample() {
    var ts_factory = require('../../lib/wizzi/models/ts-factory.g');
    var ts_artifact = require('../../lib/artifacts/ts/module/gen/main');
    
    var loadModel = ts_factory.createLoadModel(getWizziObject());
    
    var example_files = getFilesData(path.join(__dirname, 'ittf'), 'ts');
    var len_1 = example_files.length;
    function repeater_1(index_1) {
        if (index_1 === len_1) {
            return next_1();
        }
        var item_1 = example_files[index_1];
        console.log('======================================================================================');
        console.log(index_1 + 1, '/', len_1, '', 'file', item_1, __filename);
        console.log('--------------------------------------------------------------------------------------');
        execute(item_1.name, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            process.nextTick(function() {
                repeater_1(index_1 + 1);
            })
        })
    }
    repeater_1(0);
    function next_1() {
    }
    function execute(name, callback) {
        /**
            if (name != 'graphql') {
                return ;
            }
        */
        var ittfSource = path.join(__dirname, 'ittf', name + '.ts.ittf');
        var tsOutput = path.join(__dirname, 'ittf', name + '.g.ts');
        loadModel(ittfSource, getLoadModelContext({}), function(err, tsWizziModel) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            // loog 'tsWizziModel', stringify(tsWizziModel, null, 2)
            var ctx = new mocks.getGenContext();
            ts_artifact.gen(tsWizziModel, ctx, function(err, ctxout) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                console.log('ctxout', ctxout.getContent());
                file.write(tsOutput, ctxout.getContent())
                return callback(null, null);
            })
        })
    }
}
function getFiles(srcpath, schema) {
    return fs.readdirSync(srcpath).filter((file) => {
        
            return fs.lstatSync(path.join(srcpath, file)).isFile() && verify.endsWith(file, (schema === 'ittf' ? '.ittf' : '.' + schema + '.ittf'));
        }
        )
    ;
}
function getFilesData(srcpath, schema) {
    var files = fs.readdirSync(srcpath).filter((file) => {
    
        return fs.lstatSync(path.join(srcpath, file)).isFile() && verify.endsWith(file, '.' + schema + '.ittf');
    }
    )
    ;
    var ret = [];
    var i, i_items=files, i_len=files.length, file;
    for (i=0; i<i_len; i++) {
        file = files[i];
        ret.push({
            path: file, 
            name: file.substring(0, file.length - ('.' + schema + '.ittf').length), 
            fullPath: path.join(srcpath, file)
         })
    }
    return ret;
}
function createWizziFactory(globalContext, callback) {
    
    // The wizzi package will be a previous version from wizzi-mono/node_modules
    if (wizzi == null) {
        wizzi = require('wizzi');
    }
    console.log('"wizzi" package version', wizzi.version);
    wizzi.fsFactory({
        plugins: {
            
         }, 
        globalContext: globalContext || {}
     }, callback)
}
function getWizziObject(callback) {
    if (typeof(callback) === 'undefined') {
        return {
                loadMTree: mtree.createLoadMTree(mocks.repo.getCreateFilesystemStore(), {
                    useCache: false
                 }), 
                file: wizziUtils.file, 
                verify: wizziUtils.verify, 
                errors: errors
             };
    }
    else {
        createWizziFactory({}, (err, wf) => {
        
            if (err) {
                return callback(err);
            }
            return callback(null, {
                    loadMTree: mtree.createLoadMTree(mocks.repo.getCreateFilesystemStore(), {
                        useCache: false
                     }), 
                    file: wizziUtils.file, 
                    verify: wizziUtils.verify, 
                    errors: errors, 
                    wizziFactory: wf
                 });
        }
        )
    }
}
function getLoadModelContext(mtreeBuilUpContext) {
    return mocks.getLoadModelContext(mtreeBuilUpContext);
}
function executeWizziJob(wfjobDocumentUri, options) {
    options = options || {};
    options.plugins = options.plugins || [];
    options.globalContext = options.globalContext || {};
    var pluginsBaseFolder = null;
    var wfBaseFolder = null;
    var jobPlugins = [];
    if (options.plugins) {
        wfBaseFolder = options.wfBaseFolder;
        pluginsBaseFolder = options.pluginsBaseFolder;
        jobPlugins = options.plugins;
    }
    else {
        jobPlugins = [
            'wizzi-core', 
            'wizzi-js', 
            'wizzi-web'
        ];
    }
    if (wizzi == null) {
        wizzi = require('wizzi');
    }
    wizzi.executeWizziJob({
        user: 'stefi', 
        role: 'admin', 
        storeKind: 'filesystem', 
        config: {
            wfBaseFolder: wfBaseFolder, 
            pluginsBaseFolder: pluginsBaseFolder, 
            plugins: jobPlugins
         }, 
        job: {
            name: 'example ' + wfjobDocumentUri, 
            ittfDocumentUri: wfjobDocumentUri, 
            productionOptions: wizzi.productionOptions({
                indentSpaces: 4, 
                basedir: __dirname, 
                verbose: 2
             }), 
            globalContext: options.globalContext
         }
     }, function(err) {
        if (err) {
            wizzi.printWizziJobError(wfjobDocumentUri, err);
        }
    })
}
module.exports = executeExample;
if (require.main === module) {
    executeExample();
}