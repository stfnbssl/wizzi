/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-web\.wizzi\examples\scss\index.js.ittf
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
var scssfactory = require('../../lib/wizzi/models/scss-factory.g');
var scssgenerator = require('../../lib/artifacts/scss/document/gen/main');
function executeExample() {
    
    var ittfPath = path.join(__dirname, 'ittf');
    var i, i_items=getFiles(ittfPath,'scss'), i_len=getFiles(ittfPath,'scss').length, item;
    for (i=0; i<i_len; i++) {
        item = getFiles(ittfPath,'scss')[i];
        item = item.substring(0, item.length - '.scss.ittf'.length);
        console.log('item', item);
        execute(item);
    }
    
    function execute(name) {
        var ittfSource = path.join(__dirname, 'ittf', name + '.scss.ittf');
        var scssOutput = path.join(__dirname, 'ittf', name + '.g.scss');
        if (wizzi == null) {
            wizzi = require('wizzi');
        }
        console.log('examples/scss start loadModel', ittfSource);
        wizzi.fsFactory({
            plugins: {
                items: [
                    'wizzi-web'
                ]
             }
         }, function(err, wf) {
            if (err) {
                throw err;
            }
            wf.loadModel('scss', ittfSource, {}, function(err, wizziModel) {
                if (err) {
                    throw err;
                }
                console.log('examples/scss result wizziModel.rules', wizziModel.rules);
                var ctx = mocks.getGenContext(wf);
                scssgenerator.gen(wizziModel, ctx, function(err, ctxout) {
                    if (err) {
                        console.log("[31m%s[0m", '-------------------------------------------------------------------');
                        console.log("[31m%s[0m", '--- Test error ----------------------------------------------------');
                        console.log("[31m%s[0m", 'err', err);
                        console.log("[31m%s[0m", 'err.toString()', err.toString());
                        if (err.inner) {
                            console.log("[31m%s[0m", 'err.inner.toString()', err.inner.toString());
                        }
                        console.log("[31m%s[0m", '-------------------------------------------------------------------');
                        console.log("[31m%s[0m", '-------------------------------------------------------------------');
                        throw 'Test error';
                    }
                    console.log('ctxout begin ========', '\n' + ctxout.getContent(), '\nctxout end ============');
                    file.write(scssOutput, ctxout.getContent())
                })
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