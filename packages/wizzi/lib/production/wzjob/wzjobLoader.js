/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\production\wzjob\wzjobLoader.js.ittf
    utc time: Tue, 21 Jan 2025 14:15:35 GMT
*/
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
     Async load a `wzjob` wizzi model and accumulate
     productionStepConfig elements.
     If the `wzjob` model contains "artifact" elements
     check that they have not already been added and add them to
     the productionStepConfigs collection.
     If the `wzjob` model contains 'artifact' elements with the
     "isWzJob" attribute check that they have not already been processed
     and add them to pendingWzjobRequests.
*/
var WzjobLoader = (function () {
    function WzjobLoader(productionManager) {
        _classCallCheck(this, WzjobLoader);
        this.productionManager = productionManager;
        this.globalModelInfoConfigs = [];
        this.pendingWzjobRequests = [];
        // FIXME checking pendingWzjobRequests should be enough. Why seenWzjobRequests?
        this.seenWzjobRequests = [];
        this.productionStepConfigs = [];
    }
    WzjobLoader.prototype.load = function(wzjobRequest, callback) {
        this.seenWzjobRequests.push(wzjobRequest);
        var ittfDocumentUri = verify.isAbsolutePath(wzjobRequest.model.src) ? wzjobRequest.model.src : path.join(wzjobRequest.model.cwd, wzjobRequest.model.src);
        // wzjobRequest.context has not been implemented yet
        // and probably it will never be.
        // Its properties should be produced by previous
        // executions in the wzjob load recursive process.
        // To pass a context to the wzjob mTree loader
        // we use the globalContext of the wizziFactory.
        var that = this;
        this.productionManager.loadWzjob(ittfDocumentUri, wzjobRequest.context || {}, function(err, wzjobModel) {
            if (err) {
                return callback(err);
            }
            that.processWzjobModel(wzjobModel);
            return callback(null, that);
        })
    }
    WzjobLoader.prototype.addGlobalModelInfoConfig = function(globalModelInfoConfig) {
        if (this._isGlobalModelInfoConfigAdded(globalModelInfoConfig) == false) {
            this.globalModelInfoConfigs.push(globalModelInfoConfig);
        }
    }
    WzjobLoader.prototype._isGlobalModelInfoConfigAdded = function(globalModelInfoConfig) {
        var i, i_items=this.globalModelInfoConfigs, i_len=this.globalModelInfoConfigs.length, item;
        for (i=0; i<i_len; i++) {
            item = this.globalModelInfoConfigs[i];
            if (this._areGlobalModelInfoConfigsEqual(item, globalModelInfoConfig)) {
                return true;
            }
        }
        return false;
    }
    WzjobLoader.prototype.addPendingWzjobRequest = function(productionStepConfig) {
        if (this._isWzjobSeen(productionStepConfig) == false) {
            this.pendingWzjobRequests.push(productionStepConfig);
        }
    }
    WzjobLoader.prototype._isWzjobSeen = function(productionStepConfig) {
        var i, i_items=this.seenWzjobRequests, i_len=this.seenWzjobRequests.length, item;
        for (i=0; i<i_len; i++) {
            item = this.seenWzjobRequests[i];
            if (this._areWzjobRequestsEqual(item, productionStepConfig)) {
                return true;
            }
        }
        return false;
    }
    WzjobLoader.prototype.addProductionStepConfig = function(productionStepConfig) {
        if (this._isProductionStepConfigAdded(productionStepConfig) == false) {
            this.productionStepConfigs.push(productionStepConfig);
        }
    }
    WzjobLoader.prototype._isProductionStepConfigAdded = function(productionStepConfig) {
        var i, i_items=this.productionStepConfigs, i_len=this.productionStepConfigs.length, item;
        for (i=0; i<i_len; i++) {
            item = this.productionStepConfigs[i];
            if (this._areProductionStepConfigsEqual(item, productionStepConfig)) {
                return true;
            }
        }
        return false;
    }
    WzjobLoader.prototype._areGlobalModelInfoConfigsEqual = function(a, b) {
        return a.exportName === b.exportName && a.src === b.src;
    }
    WzjobLoader.prototype._areWzjobRequestsEqual = function(a, b) {
        return a.model.cwd === b.model.cwd && a.model.src === b.model.src;
    }
    WzjobLoader.prototype._areProductionStepConfigsEqual = function(a, b) {
        return a.model.cwd === b.model.cwd && a.model.src === b.model.src && a.dest.baseFolder === b.dest.baseFolder && a.dest.folder === b.dest.folder && a.dest.path === b.dest.path && a.dest.extension === b.dest.extension && a.gen.generator === b.gen.generator;
    }
    WzjobLoader.prototype.processWzjobModel = function(wzjobModel) {
        /**
             Analizes a wizzi model of schema `wzjob`.
             TODO In the `wzjob` schema create an abstract element named `production-step` and derive from it:
             `artifact`, `model-dom`, `wzjob-ref`, `folder-gen`, ... .
             Creates a `wizzi/production/productionManager/ProductionStepConfig` object for each production step requested.
             Accumulates the requests calling the methods:
             . addPendingWzjobRequest
             . addProductionStepConfig
            
             Types of production step that can be requested in a `wzjob`
             . Wizzi Model artifact
             . Wizzi Model collection artifact
             . Code write artifact
             . Final artifact
             . Wizzi model DOM
             . Folder generation
             . Wzjob reference
            
             Production structure
             { wzjob
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
        var productionStepConfig;
        var i, i_items=wzjobModel.models, i_len=wzjobModel.models.length, wzjobModelElement;
        for (i=0; i<i_len; i++) {
            wzjobModelElement = wzjobModel.models[i];
            if (verify.isNotEmpty(wzjobModelElement.exportName)) {
                var globalModelInfoConfig = {
                    exportName: wzjobModelElement.exportName, 
                    src: wzjobModelElement.src, 
                    cwd: wzjobModel.modelsBaseFolder, 
                    schema: wzjobModelElement.schema, 
                    format: wzjobModelElement.format
                 };
                this.addGlobalModelInfoConfig(globalModelInfoConfig);
            }
        }
        var i, i_items=wzjobModel.productions, i_len=wzjobModel.productions.length, wzjobProductionElement;
        for (i=0; i<i_len; i++) {
            wzjobProductionElement = wzjobModel.productions[i];
            // loog 'wizzi.wzjobLoader.processWzjobModel.production', wzjobProductionElement.wzName, util.inspect(wzjobProductionElement, { depth: 2 })
            var j, j_items=wzjobProductionElement.lines, j_len=wzjobProductionElement.lines.length, wzjobLineElement;
            for (j=0; j<j_len; j++) {
                wzjobLineElement = wzjobProductionElement.lines[j];
                // loog 'wizzi.wzjobLoader.processWzjobModel.line', wzjobLineElement.wzName, util.inspect(wzjobLineElement, { depth: null })
                var k, k_items=wzjobLineElement.artifacts, k_len=wzjobLineElement.artifacts.length, wzjobArtifactElement;
                for (k=0; k<k_len; k++) {
                    wzjobArtifactElement = wzjobLineElement.artifacts[k];
                    // loog 'wizzi.wzjobLoader.processWzjobModel.artifact', util.inspect(wzjobArtifactElement, { depth: 1 })
                    
                    /**
                        * THIS IS A CODEWRITE artifact
                        * this artifact is generated by a code write generation
                    */
                    if (verify.isEmpty(wzjobArtifactElement.src)) {
                        productionStepConfig = {
                            name: wzjobArtifactElement.wzName, 
                            options: {}, 
                            contexts: [], 
                            gen: {
                                generator: wzjobArtifactElement.generator
                             }, 
                            dest: {
                                baseFolder: wzjobModel.destBaseFolder, 
                                folder: wzjobLineElement.destFolder || wzjobProductionElement.destFolder, 
                                path: wzjobArtifactElement.destPath, 
                                extension: wzjobArtifactElement.extension
                             }, 
                            collection: wzjobArtifactElement.collection, 
                            toString: function() {
                                return 'Artifact info config: ' + this.name + '/' + this.gen.generator;
                            }
                         };
                        var l, l_items=wzjobArtifactElement.modelRefs, l_len=wzjobArtifactElement.modelRefs.length, modelRef;
                        for (l=0; l<l_len; l++) {
                            modelRef = wzjobArtifactElement.modelRefs[l];
                            // loog 'WizziJob.getProductionStepConfigs.modelRef', modelRef.wzName, modelRef.collName, modelRef.modelCollections.length, util.inspect(modelRef, { depth: 2 })
                            var modelInfoConfig = this._createContextModelInfoConfig(wzjobModel, modelRef);
                            productionStepConfig.contexts.push(modelInfoConfig);
                        }
                    }
                    // This is a WIZZIMODEL artifact or WFJOB artifact
                    // loog 'WizziJob.getProductionStepConfigs.art', wzjobArtifactElement.wzName, wzjobLineElement.srcFolder, wzjobArtifactElement.src, wzjobArtifactElement.schema
                    else {
                        productionStepConfig = {
                            name: wzjobArtifactElement.wzName, 
                            options: {}, 
                            model: {
                                cwd: wzjobLineElement.cwdFolder, 
                                src: wzjobArtifactElement.src, 
                                ignore: wzjobArtifactElement.ignore, 
                                schema: wzjobArtifactElement.schema, 
                                format: wzjobArtifactElement.format, 
                                isCompile: wzjobArtifactElement.isCompile, 
                                contexts: [], 
                                transformers: this._getTransformerList(wzjobArtifactElement.transformers)
                             }, 
                            isWzJob: wzjobArtifactElement.isWzJob, 
                            isWzModelType: wzjobArtifactElement.isWzModelType, 
                            isWzModelToFolder: wzjobArtifactElement.isWzModelToFolder, 
                            gen: {
                                generator: wzjobArtifactElement.generator
                             }, 
                            dest: {
                                baseFolder: wzjobModel.destBaseFolder, 
                                folder: wzjobLineElement.destFolder || wzjobProductionElement.destFolder, 
                                path: wzjobArtifactElement.destPath, 
                                extension: wzjobArtifactElement.extension
                             }, 
                            collection: wzjobArtifactElement.collection, 
                            toString: function() {
                                return 'Artifact info config: ' + this.name + '/' + this.model.src + '/' + this.model.schema;
                            }
                         };
                        var l, l_items=wzjobArtifactElement.modelRefs, l_len=wzjobArtifactElement.modelRefs.length, modelRef;
                        for (l=0; l<l_len; l++) {
                            modelRef = wzjobArtifactElement.modelRefs[l];
                            // loog 'WizziJob.getProductionStepConfigs.modelRef', modelRef.wzName, modelRef.collName, modelRef.modelCollections.length, util.inspect(modelRef, { depth: 2 })
                            var modelInfoConfig = this._createContextModelInfoConfig(wzjobModel, modelRef);
                            productionStepConfig.model.contexts.push(modelInfoConfig);
                        }
                    }
                    // loog 'WizziJob.productionStepConfig', util.inspect(productionStepConfig, { depth: 1 })
                    if (wzjobArtifactElement.isWzJob) {
                        this.addPendingWzjobRequest(productionStepConfig);
                    }
                    else {
                        this.addProductionStepConfig(productionStepConfig);
                    }
                }
            }
        }
    }
    /**
         params
         { wzjobModelRefElement
         string wzName
         is the key for the wzjobModelElement
         string collName
         string collItemName
         [ collPathTemplateValues
         { collPathTemplateValue
    */
    WzjobLoader.prototype._createContextModelInfoConfig = function(wzjobModel, wzjobModelRefElement) {
        // model existence has already been verified loading the wzjobModel
        var wzjobModelElement = wzjobModel.getModel(wzjobModelRefElement.wzName);
        var modelInfoConfig = {
            exportName: wzjobModelRefElement.exportName, 
            src: this._getModelSrc(wzjobModel, wzjobModelElement.src, wzjobModelElement), 
            schema: wzjobModelElement.schema, 
            format: wzjobModelElement.format, 
            isCompile: wzjobModelElement.isCompile, 
            contexts: [], 
            transformers: this._getTransformerList(wzjobModelRefElement.transformers), 
            coll: null
         };
        
        // Single items of a collection contained in a WizziModelInstance may act as data contexts
        
        // of artifacts where each collection item generates a separate artifact.
        
        // The coll property specifies:
        
        // . name                the collection name
        
        // . itemName            the export name of the collection item when acting as a data context
        
        // . pathTemplateValues  the property names of the collection item that will be used to build
        
        // the destination path of the artifact
        if (wzjobModelRefElement.collName) {
            modelInfoConfig.coll = {
                name: wzjobModelRefElement.collName, 
                itemName: wzjobModelRefElement.collItemName, 
                pathTemplateValues: wzjobModelRefElement.collPathTemplateValues
             };
        }
        // recurse creation of context modelInfos
        var i, i_items=wzjobModelElement.modelRefs, i_len=wzjobModelElement.modelRefs.length, modelRef;
        for (i=0; i<i_len; i++) {
            modelRef = wzjobModelElement.modelRefs[i];
            modelInfoConfig.contexts.push(this._createContextModelInfoConfig(wzjobModel, modelRef))
        }
        return modelInfoConfig;
    }
    WzjobLoader.prototype._getArtifactModelSrc = function(cwd, src, node) {
        /**
             When 'src' is relative, the base path is the 'cwd' attribute
             declared on the wzjobLine element.
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
    WzjobLoader.prototype._getModelSrc = function(wzjobModel, src, node) {
        /**
             When 'src' is relative, the base path is the 'modelsBaseFolder'
             declared on the `wzjob` element.
        */
        if (verify.isAbsolutePath(src)) {
            return src;
        }
        else {
            if (verify.isString(wzjobModel.modelsBaseFolder)) {
                return path.join(wzjobModel.modelsBaseFolder, src);
            }
            else {
                return errorMsg('PathError', "The src attribute of the model element: " + src + ' is a relative path. A models-base-folder attribute is required on the wzjob element.', node);
            }
        }
    }
    WzjobLoader.prototype._getTransformerList = function(transformers) {
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
    return WzjobLoader;
})();

/**
     A `wzjob` model may contain the request for the execution
     of another `wzjob`. The accumulation of all the requested `productionStep`(s)
     is a recursive action.
    
     The same `wizzi/production/wzjob/WzjobLoader` instance is passed through
     the recursive loadings.
     It loads the `wzjob` requests and checks that wzjobs and
     productionSteps are processed once.
     (see methods _areWzjobRequestsEqual and _areProductionStepConfigsEqual for equality criteria)
    
     At the end of the recursion the WzjobLoader instance contains
     the `wizzi/production/ProductionStep` instances that have to be
     executed by the `wizzi/production/ProductionManager`.
    
*/
function AsyncRecurseWzjobLoad(wzjobRequest, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', 'AsyncRecurseWzjobLoad', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isObject(wzjobRequest) === false) {
        return callback(error(
            'InvalidArgument', 'AsyncRecurseWzjobLoad', { parameter: 'wzjobRequest', message: 'The wzjobRequest parameter must be an object. Received: ' + wzjobRequest }
        ));
    }
    if (verify.isObject(wzjobRequest.wzjobLoader) === false) {
        return callback(error(
            'InvalidArgument', 'AsyncRecurseWzjobLoad', { parameter: 'wzjobRequest.wzjobLoader', message: 'The wzjobRequest.wzjobLoader parameter must be an object. Received: ' + wzjobRequest.wzjobLoader }
        ));
    }
    console.log('=');
    console.log('= ========= wizzi.AsyncRecurseWzjobLoad. Start. wzjobRequest.model : ', wzjobRequest.model);
    console.log('=');
    var wzjobLoader = wzjobRequest.wzjobLoader;
    wzjobLoader.load(wzjobRequest, function(err, result) {
        if (err) {
            return callback(err);
        }
        console.log('=');
        console.log('= ========= wizzi.AsyncRecurseWzjobLoad. Results. ', 'seenWzjobRequests: ', result.seenWzjobRequests.length, ', globalModelInfoConfigs: ', result.globalModelInfoConfigs.length, ', productionStepConfigs: ', result.productionStepConfigs.length, ', pendingWzjobRequests: ', result.pendingWzjobRequests);
        console.log('=');
        
        // set the same wzjobLoader for any jobRequest
        
        // recurse
        if (result.pendingWzjobRequests.length > 0) {
            var jobRequests = result.pendingWzjobRequests;
            result.pendingWzjobRequests = [];
            var i, i_items=jobRequests, i_len=jobRequests.length, item;
            for (i=0; i<i_len; i++) {
                item = jobRequests[i];
                item.wzjobLoader = wzjobLoader;
            }
            async.map(jobRequests, AsyncRecurseWzjobLoad, function(err, result) {
                if (err) {
                    return callback(err);
                }
                return callback(null, wzjobLoader);
            })
        }
        else {
            return callback(null, wzjobLoader);
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
    WzjobLoader: WzjobLoader,
    AsyncRecurseWzjobLoad: AsyncRecurseWzjobLoad
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