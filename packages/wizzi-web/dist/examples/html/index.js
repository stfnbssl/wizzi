/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-web\.wizzi\ittf\examples\html\index.js.ittf
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
var htmlfactory = require('../../lib/wizzi/models/html-factory.g');
var htmlgenerator = require('../../lib/artifacts/html/document/gen/main');
function executeExample() {
    
    function getLoadModelAndWizziObject(callback) {
        getWizziObject((err, wo) => {
            if (err) {
                return callback(err);
            }
            callback(null, {
                loadModel: htmlfactory.createLoadModel(wo), 
                wizziObject: wo
            });
        });
    }
    
    var ittfPath = path.join(__dirname, 'ittf');
    var i, i_items=getFiles(ittfPath,'html'), i_len=getFiles(ittfPath,'html').length, item;
    for (i=0; i<i_len; i++) {
        item = getFiles(ittfPath,'html')[i];
        item = item.substring(0, item.length - '.html.ittf'.length);
        console.log('item', item);
        execute(item);
    }
    
    function execute(name) {
        var ittfSource = path.join(__dirname, 'ittf', name + '.html.ittf');
        var htmlOutput = path.join(__dirname, 'ittf', name + '.g.html');
        getLoadModelAndWizziObject(function(err, result) {
            if (err) {
                console.log('err', err);
                console.log('err.toString()', err.toString());
                if (err.inner) {
                    console.log('err.inner.toString()', err.inner.toString());
                }
                throw err;
            }
            result.loadModel(ittfSource, {
                __productionManager: mocks.getProductionManager()
            }, function(err, htmlWizziModel) {
                if (err) {
                    console.log('err', err);
                    console.log('err.toString()', err.toString());
                    if (err.inner) {
                        console.log('err.inner.toString()', err.inner.toString());
                    }
                    throw err;
                }
                console.log('htmlWizziModel', htmlWizziModel);
                var ctx = mocks.getGenContext(result.wizziObject.wizziFactory);
                htmlgenerator.gen(htmlWizziModel, ctx, function(err, ctxout) {
                    if (err) {
                        console.log('err', err);
                        console.log('err.toString()', err.toString());
                        if (err.inner) {
                            console.log('err.inner.toString()', err.inner.toString());
                        }
                        throw err;
                    }
                    console.log('ctxout', ctxout.getContent());
                    file.write(htmlOutput, ctxout.getContent());
                });
            });
        });
    }
}
function createWizziFactory(globalContext, callback) {
    if (wizzi == null) {
        wizzi = require('../../../../wizzi/dist/index');
    }
    console.log('"wizzi" package version', wizzi.version);
    wizzi.fsnoaclFactory({
        plugins: {
            items: [
                './index.js'
            ], 
            pluginsBaseFolder: path.resolve(__dirname, '..', '..')
        }, 
        globalContext: globalContext || {}
    }, callback);
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
        });
    }
    return ret;
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
        });
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
    });
}
module.exports = executeExample;
if (require.main === module) {
    executeExample();
}
