/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\production\wfjobLoader.js.ittf
    utc time: Fri, 26 Apr 2024 16:45:47 GMT
*/
'use strict';
// generated by wizzi.plugin.js.artifacts.js.module.gen.main
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var verify = require('@wizzi/utils').verify;
var path = require('path');
var util = require('util');
var assert = require('assert');
var async = require('async');
var verify = require('@wizzi/utils').verify;
/**
     Async load a 'wfjob' wizzi model and accumulate
     artifactInfoConfig elements.
     If the 'wfjob' model contains "artifact" elements
     check that they have not already been added and add them to
     the artifactInfoConfigs collection.
     If the 'wfjob' model contains 'artifact' elements with the
     "isWfJob" attribute check that they have not already been processed
     and add them to pendingWfjobRequests.
*/
var WfjobLoader = (function () {
    function WfjobLoader(productionManager) {
        _classCallCheck(this, WfjobLoader);
        this.productionManager = productionManager;
        this.globalModelInfoConfigs = [];
        this.pendingWfjobRequests = [];
        // FIXME checking pendingWfjobRequests should be enough. Why seenWfjobRequests?
        this.seenWfjobRequests = [];
        this.artifactInfoConfigs = [];
    }
    WfjobLoader.prototype.load = function(wfjobRequest, callback) {
        this.seenWfjobRequests.push(wfjobRequest);
        var ittfDocumentUri = verify.isAbsolutePath(wfjobRequest.model.src) ? wfjobRequest.model.src : path.join(wfjobRequest.model.cwd, wfjobRequest.model.src);
        // wfjobRequest.context has not been implemented yet
        // and probably it will never be.
        // Its properties should be produced by previous
        // executions in the wfjob load recursive process.
        // To pass a context to the wfjob mTree loader
        // we use the globalContext of the wizziFactory.
        var that = this;
        this.productionManager.loadWfjob(ittfDocumentUri, wfjobRequest.context || {}, function(err, wfjobModel) {
            if (err) {
                return callback(err);
            }
            that.processWfjobModel(wfjobModel);
            return callback(null, that);
        })
    }
    WfjobLoader.prototype.addGlobalModelInfoConfig = function(globalModelInfoConfig) {
        if (this._isGlobalModelInfoConfigAdded(globalModelInfoConfig) == false) {
            this.globalModelInfoConfigs.push(globalModelInfoConfig);
        }
    }
    WfjobLoader.prototype._isGlobalModelInfoConfigAdded = function(globalModelInfoConfig) {
        var i, i_items=this.globalModelInfoConfigs, i_len=this.globalModelInfoConfigs.length, item;
        for (i=0; i<i_len; i++) {
            item = this.globalModelInfoConfigs[i];
            if (this._areGlobalModelInfoConfigsEqual(item, globalModelInfoConfig)) {
                return true;
            }
        }
        return false;
    }
    WfjobLoader.prototype.addPendingWfjobRequest = function(artifactInfoConfig) {
        if (this._isWfjobSeen(artifactInfoConfig) == false) {
            this.pendingWfjobRequests.push(artifactInfoConfig);
        }
    }
    WfjobLoader.prototype._isWfjobSeen = function(artifactInfoConfig) {
        var i, i_items=this.seenWfjobRequests, i_len=this.seenWfjobRequests.length, item;
        for (i=0; i<i_len; i++) {
            item = this.seenWfjobRequests[i];
            if (this._areWfjobRequestsEqual(item, artifactInfoConfig)) {
                return true;
            }
        }
        return false;
    }
    WfjobLoader.prototype.addArtifactInfoConfig = function(artifactInfoConfig) {
        if (this._isArtifactInfoConfigAdded(artifactInfoConfig) == false) {
            this.artifactInfoConfigs.push(artifactInfoConfig);
        }
    }
    WfjobLoader.prototype._isArtifactInfoConfigAdded = function(artifactInfoConfig) {
        var i, i_items=this.artifactInfoConfigs, i_len=this.artifactInfoConfigs.length, item;
        for (i=0; i<i_len; i++) {
            item = this.artifactInfoConfigs[i];
            if (this._areArtifactInfoConfigsEqual(item, artifactInfoConfig)) {
                return true;
            }
        }
        return false;
    }
    WfjobLoader.prototype._areGlobalModelInfoConfigsEqual = function(a, b) {
        return a.exportName === b.exportName && a.src === b.src;
    }
    WfjobLoader.prototype._areWfjobRequestsEqual = function(a, b) {
        return a.model.cwd === b.model.cwd && a.model.src === b.model.src;
    }
    WfjobLoader.prototype._areArtifactInfoConfigsEqual = function(a, b) {
        return a.model.cwd === b.model.cwd && a.model.src === b.model.src && a.dest.baseFolder === b.dest.baseFolder && a.dest.folder === b.dest.folder && a.dest.path === b.dest.path && a.dest.extension === b.dest.extension && a.gen.generator === b.gen.generator;
    }
    WfjobLoader.prototype.processWfjobModel = function(wfjobModel) {
        /**
             Analizes a wizzi model of schema `wfjob`.
             Creates a wizzi.productionManager.artifactInfoConfig object for each artifact production request.
             Accumulates the requests calling the methods:
             . addPendingWfjobRequest(artifactInfoConfig)
             . addArtifactInfoConfig(artifactInfoConfig)
            
             There are four types of artifacts
             .1 Wizzi Model artifact
             .2 Wizzi Model collection artifact
             .3 Code write artifact
             .4 Wfjob artifact
             Production structure
             { wfjob
             [ productions
             { production
             string destFolder
             [ lines
             { line
             string cwdFolder
             string destFolder
             [ artifacts
             { artifact
             string src
             The path to the primary source document of the artifact.
             If relative, the base path is the "cwdFolder" of the parent line.
             If the artifact is a code write artifact the "src" attribute must not be declared.
             string destPath
             The artifact source file path "src" is the default relative destination path
             of the generated artifact. When set, this attribute overrides the default.
             It may be an absolute path.
             If the artifact is a code write generation the "destPath" attribute must be declared.
        */
        var artifactInfoConfig;
        var i, i_items=wfjobModel.models, i_len=wfjobModel.models.length, wfjobModelElement;
        for (i=0; i<i_len; i++) {
            wfjobModelElement = wfjobModel.models[i];
            if (verify.isNotEmpty(wfjobModelElement.exportName)) {
                var globalModelInfoConfig = {
                    exportName: wfjobModelElement.exportName, 
                    src: wfjobModelElement.src, 
                    cwd: wfjobModel.modelsBaseFolder, 
                    schema: wfjobModelElement.schema, 
                    format: wfjobModelElement.format
                 };
                this.addGlobalModelInfoConfig(globalModelInfoConfig);
            }
        }
        var i, i_items=wfjobModel.productions, i_len=wfjobModel.productions.length, wfjobProductionElement;
        for (i=0; i<i_len; i++) {
            wfjobProductionElement = wfjobModel.productions[i];
            // loog 'wizzi.wfjobLoader.processWfjobModel.production', wfjobProductionElement.wzName, util.inspect(wfjobProductionElement, { depth: 2 })
            var j, j_items=wfjobProductionElement.lines, j_len=wfjobProductionElement.lines.length, wfjobLineElement;
            for (j=0; j<j_len; j++) {
                wfjobLineElement = wfjobProductionElement.lines[j];
                // loog 'wizzi.wfjobLoader.processWfjobModel.line', wfjobLineElement.wzName, util.inspect(wfjobLineElement, { depth: null })
                var k, k_items=wfjobLineElement.artifacts, k_len=wfjobLineElement.artifacts.length, wfjobArtifactElement;
                for (k=0; k<k_len; k++) {
                    wfjobArtifactElement = wfjobLineElement.artifacts[k];
                    // loog 'wizzi.wfjobLoader.processWfjobModel.artifact', util.inspect(wfjobArtifactElement, { depth: 1 })
                    
                    /**
                        * THIS IS A CODEWRITE artifact
                        * this artifact is generated by a code write generation
                    */
                    if (verify.isEmpty(wfjobArtifactElement.src)) {
                        artifactInfoConfig = {
                            name: wfjobArtifactElement.wzName, 
                            options: {}, 
                            contexts: [], 
                            gen: {
                                generator: wfjobArtifactElement.generator
                             }, 
                            dest: {
                                baseFolder: wfjobModel.destBaseFolder, 
                                folder: wfjobLineElement.destFolder || wfjobProductionElement.destFolder, 
                                path: wfjobArtifactElement.destPath, 
                                extension: wfjobArtifactElement.extension
                             }, 
                            collection: wfjobArtifactElement.collection, 
                            toString: function() {
                                return 'Artifact info config: ' + this.name + '/' + this.gen.generator;
                            }
                         };
                        var l, l_items=wfjobArtifactElement.modelRefs, l_len=wfjobArtifactElement.modelRefs.length, modelRef;
                        for (l=0; l<l_len; l++) {
                            modelRef = wfjobArtifactElement.modelRefs[l];
                            // loog 'WizziJob.getArtifactInfoConfigs.modelRef', modelRef.wzName, modelRef.collName, modelRef.modelCollections.length, util.inspect(modelRef, { depth: 2 })
                            var modelInfoConfig = this._createContextModelInfoConfig(wfjobModel, modelRef);
                            artifactInfoConfig.contexts.push(modelInfoConfig);
                        }
                    }
                    // This is a WIZZIMODEL artifact or WFJOB artifact
                    // loog 'WizziJob.getArtifactInfoConfigs.art', wfjobArtifactElement.wzName, wfjobLineElement.srcFolder, wfjobArtifactElement.src, wfjobArtifactElement.schema
                    else {
                        artifactInfoConfig = {
                            name: wfjobArtifactElement.wzName, 
                            options: {}, 
                            model: {
                                cwd: wfjobLineElement.cwdFolder, 
                                src: wfjobArtifactElement.src, 
                                ignore: wfjobArtifactElement.ignore, 
                                schema: wfjobArtifactElement.schema, 
                                format: wfjobArtifactElement.format, 
                                isCompile: wfjobArtifactElement.isCompile, 
                                contexts: [], 
                                transformers: this._getTransformerList(wfjobArtifactElement.transformers)
                             }, 
                            isWfJob: wfjobArtifactElement.isWfJob, 
                            isWfModelType: wfjobArtifactElement.isWfModelType, 
                            gen: {
                                generator: wfjobArtifactElement.generator
                             }, 
                            dest: {
                                baseFolder: wfjobModel.destBaseFolder, 
                                folder: wfjobLineElement.destFolder || wfjobProductionElement.destFolder, 
                                path: wfjobArtifactElement.destPath, 
                                extension: wfjobArtifactElement.extension
                             }, 
                            collection: wfjobArtifactElement.collection, 
                            toString: function() {
                                return 'Artifact info config: ' + this.name + '/' + this.model.src + '/' + this.model.schema;
                            }
                         };
                        var l, l_items=wfjobArtifactElement.modelRefs, l_len=wfjobArtifactElement.modelRefs.length, modelRef;
                        for (l=0; l<l_len; l++) {
                            modelRef = wfjobArtifactElement.modelRefs[l];
                            // loog 'WizziJob.getArtifactInfoConfigs.modelRef', modelRef.wzName, modelRef.collName, modelRef.modelCollections.length, util.inspect(modelRef, { depth: 2 })
                            var modelInfoConfig = this._createContextModelInfoConfig(wfjobModel, modelRef);
                            artifactInfoConfig.model.contexts.push(modelInfoConfig);
                        }
                    }
                    // loog 'WizziJob.artifactInfoConfig', util.inspect(artifactInfoConfig, { depth: 1 })
                    if (wfjobArtifactElement.isWfJob) {
                        this.addPendingWfjobRequest(artifactInfoConfig);
                    }
                    else {
                        this.addArtifactInfoConfig(artifactInfoConfig);
                    }
                }
            }
        }
    }
    /**
         params
         { wfjobModelRefElement
         string wzName
         is the key for the wfjobModelElement
         string collName
         string collItemName
         [ collPathTemplateValues
         { collPathTemplateValue
    */
    WfjobLoader.prototype._createContextModelInfoConfig = function(wfjobModel, wfjobModelRefElement) {
        // model existence has already been verified loading the wfjobModel
        var wfjobModelElement = wfjobModel.getModel(wfjobModelRefElement.wzName);
        var modelInfoConfig = {
            exportName: wfjobModelRefElement.exportName, 
            src: this._getModelSrc(wfjobModel, wfjobModelElement.src, wfjobModelElement), 
            schema: wfjobModelElement.schema, 
            format: wfjobModelElement.format, 
            isCompile: wfjobModelElement.isCompile, 
            contexts: [], 
            transformers: this._getTransformerList(wfjobModelRefElement.transformers), 
            coll: null
         };
        
        // Single items of a collection contained in a WizziModelInstance may act as data contexts
        
        // of artifacts where each collection item generates a separate artifact.
        
        // The coll property specifies:
        
        // . name                the collection name
        
        // . itemName            the export name of the collection item when acting as a data context
        
        // . pathTemplateValues  the property names of the collection item that will be used to build
        
        // the destination path of the artifact
        if (wfjobModelRefElement.collName) {
            modelInfoConfig.coll = {
                name: wfjobModelRefElement.collName, 
                itemName: wfjobModelRefElement.collItemName, 
                pathTemplateValues: wfjobModelRefElement.collPathTemplateValues
             };
        }
        // recurse creation of context modelInfos
        var i, i_items=wfjobModelElement.modelRefs, i_len=wfjobModelElement.modelRefs.length, modelRef;
        for (i=0; i<i_len; i++) {
            modelRef = wfjobModelElement.modelRefs[i];
            modelInfoConfig.contexts.push(this._createContextModelInfoConfig(wfjobModel, modelRef))
        }
        return modelInfoConfig;
    }
    WfjobLoader.prototype._getArtifactModelSrc = function(cwd, src, node) {
        /**
             When 'src' is relative, the base path is the 'cwd' attribute
             declared on the wfjobLine element.
        */
        if (verify.isAbsolutePath(src)) {
            return src;
        }
        else {
            if (verify.isString(cwd)) {
                return path.join(cwd, src);
            }
            else {
                return errorMsg('PathError', "The src attribute of the artifact element: " + src + ' is a relative path. A cwd attribute is required on the line element.', node);
            }
        }
    }
    WfjobLoader.prototype._getModelSrc = function(wfjobModel, src, node) {
        /**
             When 'src' is relative, the base path is the 'modelsBaseFolder'
             declared on the 'wfjob' element.
        */
        if (verify.isAbsolutePath(src)) {
            return src;
        }
        else {
            if (verify.isString(wfjobModel.modelsBaseFolder)) {
                return path.join(wfjobModel.modelsBaseFolder, src);
            }
            else {
                return errorMsg('PathError', "The src attribute of the model element: " + src + ' is a relative path. A models-base-folder attribute is required on the wfjob element.', node);
            }
        }
    }
    WfjobLoader.prototype._getTransformerList = function(transformers) {
        var ret = [];
        var i, i_items=transformers, i_len=transformers.length, item;
        for (i=0; i<i_len; i++) {
            item = transformers[i];
            ret.push({
                name: item.wzName, 
                dumpFile: item.dumpFile
             })
        }
        return ret;
    }
    return WfjobLoader;
})();

/**
     A 'wfjob' model may contain the request for the execution
     of another wfjob. The accumulation of all the requested artifacts
     must be a recursive action.
    
     The same wizzi.production.WfjobLoader instance is passed through
     the recursive loadings.
     It loads the `wfjob` requests and checks that wfjobs and
     wfjobArtifactModels are processed once.
     (see methods _areWfjobRequestsEqual and _areArtifactInfoConfigsEqual for equality criteria)
    
     At the end of the recursion the WfjobLoader instance contains
     the wizzi.artifact.artifactInfo instances that have to be
     executed by the wizzi.production.productionManager.
    
*/
function AsyncRecurseWfjobLoad(wfjobRequest, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', 'AsyncRecurseWfjobLoad', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isObject(wfjobRequest) === false) {
        return callback(error(
            'InvalidArgument', 'AsyncRecurseWfjobLoad', { parameter: 'wfjobRequest', message: 'The wfjobRequest parameter must be an object. Received: ' + wfjobRequest }
        ));
    }
    if (verify.isObject(wfjobRequest.wfjobLoader) === false) {
        return callback(error(
            'InvalidArgument', 'AsyncRecurseWfjobLoad', { parameter: 'wfjobRequest.wfjobLoader', message: 'The wfjobRequest.wfjobLoader parameter must be an object. Received: ' + wfjobRequest.wfjobLoader }
        ));
    }
    console.log('=');
    console.log('= ========= wizzi.AsyncRecurseWfjobLoad. Start. wfjobRequest.model : ', wfjobRequest.model);
    console.log('=');
    var wfjobLoader = wfjobRequest.wfjobLoader;
    wfjobLoader.load(wfjobRequest, function(err, result) {
        if (err) {
            return callback(err);
        }
        console.log('=');
        console.log('= ========= wizzi.AsyncRecurseWfjobLoad. Results. ', 'seenWfjobRequests: ', result.seenWfjobRequests.length, ', globalModelInfoConfigs: ', result.globalModelInfoConfigs.length, ', artifactInfoConfigs: ', result.artifactInfoConfigs.length, ', pendingWfjobRequests: ', result.pendingWfjobRequests);
        console.log('=');
        
        // set the same wfjobLoader for any jobRequest
        
        // recurse
        if (result.pendingWfjobRequests.length > 0) {
            var jobRequests = result.pendingWfjobRequests;
            result.pendingWfjobRequests = [];
            var i, i_items=jobRequests, i_len=jobRequests.length, item;
            for (i=0; i<i_len; i++) {
                item = jobRequests[i];
                item.wfjobLoader = wfjobLoader;
            }
            async.map(jobRequests, AsyncRecurseWfjobLoad, function(err, result) {
                if (err) {
                    return callback(err);
                }
                return callback(null, wfjobLoader);
            })
        }
        else {
            return callback(null, wfjobLoader);
        }
    })
}
function errorMsg(code, message, node) {
    message = node ? new errors.NodeError(message, node).toString() : message;
    return {
            __is_error: true, 
            code: code, 
            message: message
         };
}

module.exports = {
    WfjobLoader: WfjobLoader,
    AsyncRecurseWfjobLoad: AsyncRecurseWfjobLoad
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
        method: '.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
