/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\root\index.js.ittf
    utc time: Thu, 11 Jan 2024 15:48:37 GMT
*/
'use strict';
var verify = require('wizzi-utils').verify;
var loader = require('./lib/loader');

var md = module.exports = {};
/**
    
     params
     function createStore
     api-ref wizzi-repo.createStore
     { options
     boolean useCache
     boolean frontMatter
     boolean raw
     boolean mTreeBuildupScript
    
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
    var mTreeBuildupScript = options.mTreeBuildupScript || false;
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
            if (verify.isNullOrUndefined(loadContext.mTreeBuildupContext) === false) {
                if (verify.isObject(loadContext.mTreeBuildupContext) === false) {
                    return callback(error(
                        'InvalidArgument', 'loadMTree', { parameter: 'loadContext.mTreeBuildupContext', message: 'The loadContext.mTreeBuildupContext parameter must be an object. Received: ' + loadContext.mTreeBuildupContext }
                    ));
                }
            }
            // loog 'wizzi-mtree.loadMTree.loadContext', loadContext
            if (!useCache || !ittfDocumentStore) {
                createStore(function(err, store) {
                    if (err) {
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
                    else if (mTreeBuildupScript) {
                        loader.loadMTreeBuildupScript(ittfDocumentUri, loadContext, callback)
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
                else if (mTreeBuildupScript) {
                    loader.loadMTreeBuildupScript(ittfDocumentUri, loadContext, callback)
                }
                else {
                    loader.loadMTree(ittfDocumentUri, loadContext, callback)
                }
            }
        };
}
;
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
