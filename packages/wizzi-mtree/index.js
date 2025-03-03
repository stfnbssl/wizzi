/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\root\index.js.ittf
    utc time: Thu, 02 Jan 2025 09:17:36 GMT
*/
var verify = require('@wizzi/utils').verify;
var loader = require('./lib/loader');
var mocks = require('./lib/mocks');
var JsWizziRunner = require('./lib/jswizzi/jsWizziRunner');
var JsWizziContext = require('./lib/jswizzi/jsWizziContext');
var JsWizziScriptCoder = require('./lib/jswizzi/jsWizziScriptCoder');
var mTreeLoadHistory = require('./lib/loader/loadHistory');
var mTreeBuildUpScripter = require('./lib/loader/mTreeBuildUpScripter');

var md = module.exports = {};
md.version = "0.8.32";
/**
    
     params
     function createStore
     api-ref wizzi-repo.createStore
     { options
     boolean useCache
     boolean frontMatter
     boolean raw
     boolean mTreeBuildUpScript
    
*/
md.createLoadMTree = function createLoadMTree(createStore, options) {
    if (verify.isFunction(createStore) === false) {
        return error(
            'InvalidArgument', 'createLoadMTree', { parameter: 'createStore', message: 'The createStore parameter must be a function. Received: ' + createStore }
        );
    }
    if (verify.isNullOrUndefined(options) === false) {
        if (verify.isObject(options) === false) {
            return error(
                'InvalidArgument', 'createLoadMTree', { parameter: 'options', message: 'The options parameter must be an object. Received: ' + options }
            );
        }
    }
    options = options || {};
    var useCache = options.useCache || false;
    var frontMatter = options.frontMatter || false;
    var raw = options.raw || false;
    var mTreeBuildUpScript = options.mTreeBuildUpScript || false;
    var ittfDocumentStore;
    return function loadMTree(ittfDocumentUri, loadContext, callback) {
            if (typeof(callback) !== 'function') {
                throw new Error(
                    error('InvalidArgument', 'loadMTree', 'The callback parameter must be a function. Received: ' + callback)
                );
            };
            if (verify.isNotEmpty(ittfDocumentUri) === false) {
                return callback(error(
                    'InvalidArgument', 'loadMTree', { parameter: 'ittfDocumentUri', message: 'The ittfDocumentUri parameter must be a string. Received: ' + ittfDocumentUri }
                ));
            }
            if (verify.isObject(loadContext) === false) {
                return callback(error(
                    'InvalidArgument', 'loadMTree', { parameter: 'loadContext', message: 'The loadContext parameter must be an object. Received: ' + loadContext }
                ));
            }
            if (verify.isObject(loadContext.__productionManager) === false) {
                return callback(error(
                    'InvalidArgument', 'loadMTree', { parameter: 'loadContext.__productionManager', message: 'The loadContext.__productionManager parameter must be an object. Received: ' + loadContext.__productionManager }
                ));
            }
            if (verify.isObject(loadContext.__productionManager.productionContext) === false) {
                return callback(error(
                    'InvalidArgument', 'loadMTree', { parameter: 'loadContext.__productionManager.productionContext', message: 'The loadContext.__productionManager.productionContext parameter must be an object. Received: ' + loadContext.__productionManager.productionContext }
                ));
            }
            if (verify.isObject(loadContext.__productionManager.productionContext.aclstat) === false) {
                return callback(error(
                    'InvalidArgument', 'loadMTree', { parameter: 'loadContext.__productionManager.productionContext.aclstat', message: 'The loadContext.__productionManager.productionContext.aclstat parameter must be an object. Received: ' + loadContext.__productionManager.productionContext.aclstat }
                ));
            }
            if (verify.isNullOrUndefined(loadContext.mTreeBuildUpContext) === false) {
                if (verify.isObject(loadContext.mTreeBuildUpContext) === false) {
                    return callback(error(
                        'InvalidArgument', 'loadMTree', { parameter: 'loadContext.mTreeBuildUpContext', message: 'The loadContext.mTreeBuildUpContext parameter must be an object. Received: ' + loadContext.mTreeBuildUpContext }
                    ));
                }
            }
            // loog 'wizzi-mtree.loadMTree.loadContext', loadContext
            if (!useCache || !ittfDocumentStore) {
                createStore(function(err, store) {
                    if (err) {
                        console.log("[31m%s[0m", err);
                        return callback(err);
                    }
                    ittfDocumentStore = store;
                    loadContext.__ittfDocumentStore = store;
                    if (frontMatter) {
                        loader.loadMTreeFrontMatter(ittfDocumentUri, loadContext, callback)
                    }
                    else if (raw) {
                        loader.loadMTreeRaw(ittfDocumentUri, loadContext, callback)
                    }
                    else if (mTreeBuildUpScript) {
                        loader.loadMTreeBuildUpScript(ittfDocumentUri, loadContext, callback)
                    }
                    else {
                        loader.loadMTree(ittfDocumentUri, loadContext, callback)
                    }
                })
            }
            else {
                loadContext.__ittfDocumentStore = ittfDocumentStore;
                if (frontMatter) {
                    loader.loadMTreeFrontMatter(ittfDocumentUri, loadContext, callback)
                }
                else if (raw) {
                    loader.loadMTreeRaw(ittfDocumentUri, loadContext, callback)
                }
                else if (mTreeBuildUpScript) {
                    loader.loadMTreeBuildUpScript(ittfDocumentUri, loadContext, callback)
                }
                else {
                    loader.loadMTree(ittfDocumentUri, loadContext, callback)
                }
            }
        };
}
;
md.mTreeLoadHistory = mTreeLoadHistory;
md.mTreeBuildUpScripter = mTreeBuildUpScripter;
md.jsWizzi = {
    JsWizziRunner: JsWizziRunner, 
    JsWizziContext: JsWizziContext, 
    JsWizziScriptCoder: JsWizziScriptCoder
 };
md.mtreeUtils = {
    node: require('./lib/utils/node')
 };
md.mtreeTests = {
    mTreeBrickProvider: require('./lib/loader/mTreeBrickProvider'), 
    liner: require('./lib/loader/liner'), 
    nodifier: require('./lib/loader/nodifier'), 
    includer: require('./lib/loader/includer'), 
    mixer: require('./lib/loader/mixer'), 
    appender: require('./lib/loader/appender'), 
    evaluator: require('./lib/loader/evaluator')
 };
md.mocks = mocks;
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
        method: 'wizzi.mtree.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}