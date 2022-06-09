/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-web\.wizzi\ittf\examples\vtt\index.js.ittf
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
var vttfactory = require('../../lib/wizzi/models/vtt-factory.g');
var vttgenerator = require('../../lib/artifacts/vtt/document/gen/main');
function executeExample() {
    
    var loadModel = vttfactory.createLoadModel(getWizziObject());
    
    var ittfPath = path.join(__dirname, 'ittf');
    var i, i_items=getFiles(ittfPath,'vtt'), i_len=getFiles(ittfPath,'vtt').length, item;
    for (i=0; i<i_len; i++) {
        item = getFiles(ittfPath,'vtt')[i];
        item = item.substring(0, item.length - '.vtt.ittf'.length);
        console.log('item', item);
        execute(item);
    }
    
    function execute(name) {
        var ittfSource = path.join(__dirname, 'ittf', name + '.vtt.ittf');
        var vttOutput = path.join(__dirname, 'ittf', name + '.g.vtt');
        loadModel(ittfSource, {
            __productionManager: mocks.getProductionManager()
        }, function(err, wizziModel) {
            if (err) {
                console.log('-------------------------------------------------------------------');
                console.log('--- Test error ----------------------------------------------------');
                console.log('err', err);
                console.log('err.toString()', err.toString());
                if (err.inner) {
                    console.log('err.inner.toString()', err.inner.toString());
                }
                console.log('-------------------------------------------------------------------');
                console.log('-------------------------------------------------------------------');
                throw 'Test error';
            }
            console.log('vtt wizziModel', JSON.stringify(wizziModel.toJson(), null, 2));
            var ctx = mocks.getGenContext();
            vttgenerator.gen(wizziModel, ctx, function(err, ctxout) {
                if (err) {
                    console.log('-------------------------------------------------------------------');
                    console.log('--- Test error ----------------------------------------------------');
                    console.log('err', err);
                    console.log('err.toString()', err.toString());
                    if (err.inner) {
                        console.log('err.inner.toString()', err.inner.toString());
                    }
                    console.log('-------------------------------------------------------------------');
                    console.log('-------------------------------------------------------------------');
                    throw 'Test error';
                }
                console.log('ctxout', ctxout.getContent());
            })
        })
    }
}
function getFiles(srcpath, schema) {
    return fs.readdirSync(srcpath).filter((file) => {
            return fs.lstatSync(path.join(srcpath, file)).isFile() && verify.endsWith(file, (schema === 'ittf' ? '.ittf' : '.' + schema + '.ittf'));
        })
    ;
}
function getFilesData(srcpath, schema) {
    var files = fs.readdirSync(srcpath).filter((file) => {
        return fs.lstatSync(path.join(srcpath, file)).isFile() && verify.endsWith(file, '.' + schema + '.ittf');
    })
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
    if (wizzi == null) {
        // The wizzi package will be a previous version from wizzi-mono/node_modules
        wizzi = require('wizzi');
    }
    console.log('"wizzi" package version', wizzi.version);
    wizzi.fsnoaclFactory({
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
        })
    }
}
function getLoadModelContext(mtreeBuilUpContext) {
    return mocks.getLoadModelContext(mtreeBuilUpContext);
}
function executeWizziJob(wfjobDocumentUri, options) {
    options = options || {};
    options.plugins = options.plugins || [];
    options.globalContext = options.globalContext || {};
    var jobPlugins = [
        'wizzi-core', 
        'wizzi-meta', 
        'wizzi-js', 
        'wizzi-web'
    ];
    var i, i_items=options.plugins, i_len=options.plugins.length, item;
    for (i=0; i<i_len; i++) {
        item = options.plugins[i];
        jobPlugins.push(item);
    }
    if (wizzi == null) {
        wizzi = require('wizzi');
    }
    wizzi.executeWizziJob({
        user: 'stefi', 
        role: 'admin', 
        storeKind: 'filesystem', 
        config: {
            wfBaseFolder: 'c:/my/wizzi/v5', 
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
            wizzi.printWizziJobError($name, err);
        }
    })
}
module.exports = executeExample;
if (require.main === module) {
    executeExample();
}
