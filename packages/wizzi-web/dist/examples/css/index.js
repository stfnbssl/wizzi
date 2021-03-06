/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-web\.wizzi\ittf\examples\css\index.js.ittf
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
var cssgenerator = require('../../lib/artifacts/css2/document/gen/main');
function executeExample() {
    
    var ittfPath = path.join(__dirname, 'ittf');
    var i, i_items=getFiles(ittfPath,'css'), i_len=getFiles(ittfPath,'css').length, item;
    for (i=0; i<i_len; i++) {
        item = getFiles(ittfPath,'css')[i];
        item = item.substring(0, item.length - '.css.ittf'.length);
        console.log('item', item);
        execute(item);
    }
    
    function execute(name) {
        var ittfSource = path.join(__dirname, 'ittf', name + '.css.ittf');
        var cssOutput = path.join(__dirname, 'ittf', name + '.g.css');
        console.log('examples/css start loadModel', ittfSource);
        createWizziFactory({}, function(err, wf) {
            if (err) {
                console.log('err', err);
                console.log('err.toString()', err.toString());
                if (err.inner) {
                    console.log('err.inner.toString()', err.inner.toString());
                }
                throw err;
            }
            wf.loadModel('css', ittfSource, {}, function(err, wizziModel) {
                if (err) {
                    console.log('err', err);
                    console.log('err.toString()', err.toString());
                    if (err.inner) {
                        console.log('err.inner.toString()', err.inner.toString());
                    }
                    throw err;
                }
                // log 'examples/css result wizziModel.rules', wizziModel.rules
                var ctx = mocks.getGenContext(wf);
                cssgenerator.gen(wizziModel, ctx, function(err, ctxout) {
                    if (err) {
                        console.log('err', err);
                        console.log('err.toString()', err.toString());
                        if (err.inner) {
                            console.log('err.inner.toString()', err.inner.toString());
                        }
                        throw err;
                    }
                    console.log('ctxout begin ========', '\n' + ctxout.getContent(), '\nctxout end ============');
                    file.write(cssOutput, ctxout.getContent());
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
