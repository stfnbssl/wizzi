/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\production\manager.js.ittf
*/
'use strict';
// generated by v6-wizzi-js.artifacts.js.module.main
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var verify = require('wizzi-utils').verify;
var path = require('path');
var util = require('util');
var assert = require('assert');
var async = require('async');
var verify = require('wizzi-utils').verify;
var file = require('wizzi-utils').file;
var fail = require('wizzi-utils').fail;
var GenContext = require('../artifact/genContext');
var StringWriter = require('../util/stringWriter');
var log = require('../util/log')(module);
var options = require('./options');
var ProductionContext = require("./context").ProductionContext;
var GlobalModelInfo = require('../globalModel/globalModelInfo').GlobalModelInfo;
var ArtifactInfo = require('../artifact/artifactInfo').ArtifactInfo;
var Runner = require('./runner').Runner;
var PreLoader = require('./preLoader').PreLoader;
var WfjobLoader = require('./wfjobLoader').WfjobLoader;
var AsyncRecurseWfjobLoad = require('./wfjobLoader').AsyncRecurseWfjobLoad;
var ArtifactPersister = require('./persister').ArtifactPersister;
var thisWizziPackage = require('../../index');
// var legacy = require('../../legacy')
// var Logger = require('../services/logger')
//
//
var ProductionManager = (function () {
    function ProductionManager(wizziFactory, options) {
        _classCallCheck(this, ProductionManager);
        if (verify.isObject(wizziFactory) === false) {
            throw new Error(error(
                'InvalidArgument', 'ctor', { parameter: 'wizziFactory', message: 'The wizziFactory parameter must be an object. Received: ' + wizziFactory }
            ));
        }
        if (verify.isObject(options) === false) {
            throw new Error(error(
                'InvalidArgument', 'ctor', { parameter: 'options', message: 'The options parameter must be an object. Received: ' + options }
            ));
        }
        assert.strictEqual(wizziFactory.__type, 'WizziFactory', 'param wizziFactory must be of type WizziFactory');
        this.wizziFactory = wizziFactory;
        this.options = options;
        this.globalModelInfos = [];
        this.artifactInfos = [];
        this.artifactInfosFromWfJob = [];
        this.jobRequests = [];
        this.productionContext = new ProductionContext(options);
        this.wfjobLoadModel = null;
        log.setLevel(options.verbose || 0);
        this.___state = {
            models: {}, 
            pman: this, 
            pcx: this.productionContext
         };
        // set this.logger = new Logger()
        this.productionName = 'production';
    }
    //
    //
    ProductionManager.prototype.addGlobalModelRequest = function(globalModelInfoConfig) {
        if (verify.isObject(globalModelInfoConfig) === false) {
            return error(
                'InvalidArgument', 'addGlobalModelRequest', { parameter: 'globalModelInfoConfig', message: 'The globalModelInfoConfig parameter must be an object. Received: ' + globalModelInfoConfig }
            );
        }
        if (GlobalModelInfo.isGlobalModelConfig(globalModelInfoConfig)) {
            var globalModelInfo = new GlobalModelInfo(globalModelInfoConfig);
            globalModelInfo.initialize(this);
            this.globalModelInfos.push(globalModelInfo);
        }
        else {
            throw new Error("wizzi.production.productionManager.addGlobalModelRequest. The 'globalModelInfoConfig' parameter is not a valid global model info config: " + util.inspect(globalModelInfoConfig));
        }
    }
    //
    ProductionManager.prototype.addArtifactInfo = function(artifactInfoConfig) {
        if (verify.isObject(artifactInfoConfig) === false) {
            return error(
                'InvalidArgument', 'addArtifactInfo', { parameter: 'artifactInfoConfig', message: 'The artifactInfoConfig parameter must be an object. Received: ' + artifactInfoConfig }
            );
        }
        if (ArtifactInfo.isArtifactConfig(artifactInfoConfig)) {
            var artifactInfo = new ArtifactInfo(artifactInfoConfig);
            artifactInfo.initialize(this);
            this.artifactInfos.push(artifactInfo);
        }
        else if (ArtifactInfo.isArtifactInstance(artifactInfoConfig)) {
            artifactInfo.initialize(this);
            this.artifactInfos.push(artifactInfoConfig);
        }
        else {
            throw new Error('ProductionManager.addArtifactInfo is not an artifact info: ' + util.inspect(artifactInfoConfig));
        }
    }
    //
    ProductionManager.prototype.addArtifactRequest = function(artifactInfoConfig) {
        if (verify.isObject(artifactInfoConfig) === false) {
            return error(
                'InvalidArgument', 'addArtifactRequest', { parameter: 'artifactInfoConfig', message: 'The artifactInfoConfig parameter must be an object. Received: ' + artifactInfoConfig }
            );
        }
        if (ArtifactInfo.isArtifactConfig(artifactInfoConfig)) {
            var artifactInfo = new ArtifactInfo(artifactInfoConfig);
            artifactInfo.initialize(this);
            this.artifactInfos.push(artifactInfo);
        }
        else {
            throw new Error("wizzi.production.productionManager.addArtifactRequest. The 'artifactInfoConfig' parameter is not a valid artifact info config: " + util.inspect(artifactInfoConfig));
        }
    }
    //
    ProductionManager.prototype.addWfJob = function(wfJobConfig) {
        if (verify.isObject(wfJobConfig) === false) {
            return error(
                'InvalidArgument', 'addWfJob', { parameter: 'wfJobConfig', message: 'The wfJobConfig parameter must be an object. Received: ' + wfJobConfig }
            );
        }
        if (verify.isObject(wfJobConfig.options) === false) {
            return error(
                'InvalidArgument', 'addWfJob', { parameter: 'wfJobConfig.options', message: 'The wfJobConfig.options parameter must be an object. Received: ' + wfJobConfig.options }
            );
        }
        if (verify.isObject(wfJobConfig.options.wfjob) === false) {
            return error(
                'InvalidArgument', 'addWfJob', { parameter: 'wfJobConfig.options.wfjob', message: 'The wfJobConfig.options.wfjob parameter must be an object. Received: ' + wfJobConfig.options.wfjob }
            );
        }
        if (verify.isNotEmpty(wfJobConfig.options.wfjob.ittfDocumentUri) === false) {
            return error(
                'InvalidArgument', 'addWfJob', { parameter: 'wfJobConfig.options.wfjob.ittfDocumentUri', message: 'The wfJobConfig.options.wfjob.ittfDocumentUri parameter must be a string. Received: ' + wfJobConfig.options.wfjob.ittfDocumentUri }
            );
        }
        wfJobConfig.__pman = this;
        wfJobConfig.options = Object.assign({}, this.options, wfJobConfig.options || {})
        ;
        this.jobRequests.push(wfJobConfig);
    }
    //
    ProductionManager.prototype.addJobRequest = function(jobRequest) {
        if (verify.isObject(jobRequest) === false) {
            return error(
                'InvalidArgument', 'addJobRequest', { parameter: 'jobRequest', message: 'The jobRequest parameter must be an object. Received: ' + jobRequest }
            );
        }
        if (verify.isObject(jobRequest.wfjob) === false) {
            return error(
                'InvalidArgument', 'addJobRequest', { parameter: 'jobRequest.wfjob', message: 'The jobRequest.wfjob parameter must be an object. Received: ' + jobRequest.wfjob }
            );
        }
        if (verify.isNotEmpty(jobRequest.wfjob.ittfDocumentUri) === false) {
            return error(
                'InvalidArgument', 'addJobRequest', { parameter: 'jobRequest.wfjob.ittfDocumentUri', message: 'The jobRequest.wfjob.ittfDocumentUri parameter must be a string. Received: ' + jobRequest.wfjob.ittfDocumentUri }
            );
        }
        // loog 'wizzi.productionManager.addJobRequest.jobRequest', jobRequest
        jobRequest.__pman = this;
        jobRequest.options = Object.assign({}, this.options, jobRequest.options || {})
        ;
        this.jobRequests.push(jobRequest);
    }
    ProductionManager.prototype.initialize = function(callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'initialize', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        async.mapSeries(this.jobRequests, AsyncInitializeJobRequests.run, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            this.preLoad(callback)
        }
        )
    }
    ProductionManager.prototype.preLoad = function(callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'preLoad', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        async.mapSeries(this.globalModelInfos, AsyncGlobalModelPreLoader.run, (err, notUsed) => {
        
            if (err) {
                return callback(err);
            }
            async.mapSeries(this.artifactInfos, AsyncArtifactCollectionPreLoader.run, (err, notUsed) => {
            
                if (err) {
                    return callback(err);
                }
                callback(null);
            }
            )
        }
        )
    }
    ProductionManager.prototype.run = function(callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'run', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        var self = this;
        this.initialize(function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            // run artifact requests
            // loog 'wizzi.productionManager.self.artifactInfos.length', self.artifactInfos.length
            async.mapSeries(self.artifactInfos, AsyncRunner.run, function(err, result) {
                if (err) {
                    return callback(err);
                }
                self.artifactInfos = result;
                callback(null, result);
            })
        })
    }
    ProductionManager.prototype.terminate = function() {
        if (this.wizziFactory) {
            this.wizziFactory.terminate();
        }
    }
    ProductionManager.prototype.persistToFile = function(callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'persistToFile', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        // loog 'ProductionManager.persistToFile.this.artifactInfos.length', this.artifactInfos.length
        var self = this;
        async.mapSeries(this.artifactInfos, AsyncPersisterToFile.run, function(err, result) {
            // loog 'persistToFile err, result', err, result
            if (err) {
                return callback(err);
            }
            // loog 'ProductionManager.persistToFile.persisted artifacts', util.inspect(result, { depth: 1 })
            var i, i_items=self.artifactInfos, i_len=self.artifactInfos.length, ai;
            for (i=0; i<i_len; i++) {
                ai = self.artifactInfos[i];
                ai.terminate();
            }
            callback(null, result);
        })
    }
    ProductionManager.prototype.relPath = function(filepath) {
        return filepath.substr(this.options.basedir.length + 1);
    }
    ProductionManager.prototype.getLoadModel = function(schemaName) {
        if (verify.isNotEmpty(schemaName) === false) {
            return error(
                'InvalidArgument', 'getLoadModel', { parameter: 'schemaName', message: 'The schemaName parameter must be a string. Received: ' + schemaName }
            );
        }
        // loog 'wizzi.productionManager.getLoadModel.globalContextObject', this.globalContextObject
        return this.wizziFactory.getLoadModel(schemaName, this.globalContextObject);
    }
    ProductionManager.prototype.getSchemaDefinition = function(schemaName) {
        if (verify.isNotEmpty(schemaName) === false) {
            return error(
                'InvalidArgument', 'getSchemaDefinition', { parameter: 'schemaName', message: 'The schemaName parameter must be a string. Received: ' + schemaName }
            );
        }
        return this.wizziFactory.getSchemaDefinition(schemaName, this.globalContextObject);
    }
    ProductionManager.prototype.getModelTransformer = function(transformerName) {
        if (verify.isNotEmpty(transformerName) === false) {
            return error(
                'InvalidArgument', 'getModelTransformer', { parameter: 'transformerName', message: 'The transformerName parameter must be a string. Received: ' + transformerName }
            );
        }
        return this.wizziFactory.getModelTransformer(transformerName, this.globalContextObject);
    }
    ProductionManager.prototype.getArtifactGenerator = function(artifactName) {
        if (verify.isNotEmpty(artifactName) === false) {
            return error(
                'InvalidArgument', 'getArtifactGenerator', { parameter: 'artifactName', message: 'The artifactName parameter must be a string. Received: ' + artifactName }
            );
        }
        return this.wizziFactory.getArtifactGenerator(artifactName, this.globalContextObject);
    }
    ProductionManager.prototype.loadWfjob = function(ittfDocumentUri, context, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'loadWfjob', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(ittfDocumentUri) === false) {
            return callback(error(
                'InvalidArgument', 'loadWfjob', { parameter: 'ittfDocumentUri', message: 'The ittfDocumentUri parameter must be a string. Received: ' + ittfDocumentUri }
            ));
        }
        if (verify.isObject(context) === false) {
            return callback(error(
                'InvalidArgument', 'loadWfjob', { parameter: 'context', message: 'The context parameter must be an object. Received: ' + context }
            ));
        }
        // called by WfjobLoader
        // loog 'wizzi.production.productionManager.loadWfjob.ittfDocumentUri', ittfDocumentUri
        if (!this.wfjobLoadModel) {
            this.wfjobLoadModel = this.getLoadModel('wfjob')
            ;
            
            // loog 'wizzi.checked_call_set.__is_error ', this.wfjobLoadModel
            if (this.wfjobLoadModel && this.wfjobLoadModel.__is_error) {
                return callback(this.wfjobLoadModel);
            }
        }
        var ctx = this.wizziFactory.createLoadContext(context);
        // loog 'wizzi.production.productionManager.loadWfjob.ctx', ctx, this.wizziFactory.globalContext
        this.wfjobLoadModel(ittfDocumentUri, this.wizziFactory.createLoadContext(context), callback)
    }
    ProductionManager.prototype.aclStat = function(value) {
        if (typeof(value) === 'undefined') {
            return this.aclStatObject;
        }
        else {
            this.aclStatObject = value;
            this.productionContext.setAclStat(value);
        }
    }
    ProductionManager.prototype.globalContext = function(value) {
        if (typeof(value) === 'undefined') {
            return this.globalContextObject || {};
        }
        else {
            this.globalContextObject = value;
        }
    }
    ProductionManager.prototype.setStateModel = function(key, value) {
        this.___state.models[key] = value;
    }
    ProductionManager.prototype.getLogState = function() {
        var logState = {
            models: {}
         };
        // loog 'wizzi-factory/productionManager/state models length', this.___state.models.length
        for (var m in this.___state.models) {
            var mo = this.___state.models[m];
            var modelState = {};
            logState[m] = modelState;
            for (var k in mo) {
                // loog 'wizzi-factory/productionManager/state model prop', k
                
                // set modelState.ittfDocumentDatas = mo.loadHistory.ittfDocumentDatas
                if (mo.loadHistory) {
                    modelState.ittfSources = mo.loadHistory.getIttfDocuments();
                    var i, i_items=mo.loadHistory.ittfDocumentDatas, i_len=mo.loadHistory.ittfDocumentDatas.length, idm;
                    for (i=0; i<i_len; i++) {
                        idm = mo.loadHistory.ittfDocumentDatas[i];
                        var idm_o = mo.loadHistory.ittfDocumentDatas[idm];
                        delete idm_o.mTree
                        for (var idm_k in idm_o) {
                            // loog 'wizzi-factory/productionManager/state model loadHistory ittfDocumentData prop', idm_k
                        }
                    }
                    for (var z in mo.loadHistory) {
                        // loog 'wizzi-factory/productionManager/state model loadHistory prop', z
                    }
                    if (mo.loadHistory.ittfSources) {
                        for (var z in mo.loadHistory.ittfSources) {
                            // loog 'wizzi-factory/productionManager/state model ittfSources prop', z
                        }
                    }
                }
            }
        }
        return logState;
    }
    ProductionManager.prototype.go_generateArtifact = function(artifactName, artifactContext, wizziModelInstance, callback) {
        var self = this;
        var generator = this.getArtifactGenerator(artifactName);
        if (generator == null) {
            var msg = 'ProductionManager.go_generateArtifact cannot find generator for artifact: ' + artifactName;
            fail.warn(msg);
            throw new Error(msg);
        }
        var genContext = new GenContext({ options: options(null, { data: artifactContext.__data }) });
        new generator.gen(wizziModelInstance, genContext, function(err) {
            if (err) {
                var msg = util.inspect(err, { depth: null});
                fail.warn(msg);
                throw new Error(msg);
            }
            var sw = new StringWriter();
            genContext.toStream(sw);
            callback(null, sw.toString());
        });
    }
    ProductionManager.prototype.generateArtifact = function(schemaName, artifactName, ittfDocumentUri, modelContext, artifactContext, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'generateArtifact', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(schemaName) === false) {
            return callback(error(
                'InvalidArgument', 'generateArtifact', { parameter: 'schemaName', message: 'The schemaName parameter must be a string. Received: ' + schemaName }
            ));
        }
        if (verify.isNotEmpty(artifactName) === false) {
            return callback(error(
                'InvalidArgument', 'generateArtifact', { parameter: 'artifactName', message: 'The artifactName parameter must be a string. Received: ' + artifactName }
            ));
        }
        if (verify.isNotEmpty(ittfDocumentUri) === false) {
            return callback(error(
                'InvalidArgument', 'generateArtifact', { parameter: 'ittfDocumentUri', message: 'The ittfDocumentUri parameter must be a string. Received: ' + ittfDocumentUri }
            ));
        }
        if (verify.isObject(modelContext) === false) {
            return callback(error(
                'InvalidArgument', 'generateArtifact', { parameter: 'modelContext', message: 'The modelContext parameter must be an object. Received: ' + modelContext }
            ));
        }
        if (verify.isObject(artifactContext) === false) {
            return callback(error(
                'InvalidArgument', 'generateArtifact', { parameter: 'artifactContext', message: 'The artifactContext parameter must be an object. Received: ' + artifactContext }
            ));
        }
        var self = this;
        var loadModel = this.getLoadModel(schemaName);
        if (loadModel == null) {
            var msg = 'ProductionManager.generateArtifact cannot find loadModel for schema: ' + schemaName + ' for artifact ' + ittfDocumentUri;
            fail.warn(msg);
            throw new Error(msg);
        }
        if (!loadModel) {
            var msg = 'ProductionManager.generateArtifact. Missing load method in loadModel for schema: ' + schemaName + ' for artifact ' + ittfDocumentUri;
            fail.warn(msg);
            throw new Error(msg);
        }
        else {
            loadModel(ittfDocumentUri, modelContext, function(err, wizziModelInstance) {
                // loog 'ProductionManager.generateArtifact', err
                if (err) {
                    var msg = 'Error loading IttfDocument: ' + ittfDocumentUri + '\n' + util.inspect(err, { depth: null});
                    fail.warn(msg);
                    throw new Error(msg);
                }
                self.go_generateArtifact(artifactName, artifactContext, wizziModelInstance, callback)
            })
        }
    }
    return ProductionManager;
})();

// async run a wizzi job request
//
var AsyncInitializeJobRequests = {
    run: function(jobRequest, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isObject(jobRequest) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'jobRequest', message: 'The jobRequest parameter must be an object. Received: ' + jobRequest }
            ));
        }
        if (verify.isObject(jobRequest.__pman) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'jobRequest.__pman', message: 'The jobRequest.__pman parameter must be an object. Received: ' + jobRequest.__pman }
            ));
        }
        if (verify.isObject(jobRequest.wfjob) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'jobRequest.wfjob', message: 'The jobRequest.wfjob parameter must be an object. Received: ' + jobRequest.wfjob }
            ));
        }
        if (verify.isNotEmpty(jobRequest.wfjob.ittfDocumentUri) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'jobRequest.wfjob.ittfDocumentUri', message: 'The jobRequest.wfjob.ittfDocumentUri parameter must be a string. Received: ' + jobRequest.wfjob.ittfDocumentUri }
            ));
        }
        var pman = jobRequest.__pman;
        // loog 'AsyncInitializeJobRequests.pman.globalContext()', pman.globalContext()
        var wfjobIttfDocumentUri = jobRequest.wfjob.ittfDocumentUri;
        pman.productionName += '_' + path.basename(wfjobIttfDocumentUri);
        // loog 'wizzi.production.asyncInitializeJobRequests.productionName', pman.productionName
        // The wfjobLoader instance is created here and used
        // in any case of recursive request of `wfjob` executions.
        var wfjobLoader = new WfjobLoader(pman);
        var wfjobLoadRequest = {
            model: {
                src: wfjobIttfDocumentUri
             }, 
            wfjobLoader: wfjobLoader
         };
        AsyncRecurseWfjobLoad(wfjobLoadRequest, function(err, result) {
            if (err) {
                return callback(err);
            }
            // loog 'AsyncRecurseWfjobLoad.globalModelInfoConfigs', result.globalModelInfoConfigs.length, 'artifactInfoConfigs', result.artifactInfoConfigs.length
            var i, i_items=result.globalModelInfoConfigs, i_len=result.globalModelInfoConfigs.length, globalModelInfoConfig;
            for (i=0; i<i_len; i++) {
                globalModelInfoConfig = result.globalModelInfoConfigs[i];
                // loog 'wizzi.production.asyncInitializeJobRequests.globalModelInfoConfig', util.inspect(globalModelInfoConfig, { depth: 2 })
                globalModelInfoConfig.wfjob = wfjobIttfDocumentUri;
                if (pman.options.trace) {
                    console.log('ProductionManager.initialize.globalModelInfoConfig', globalModelInfoConfig.toString());
                }
                pman.addGlobalModelRequest(globalModelInfoConfig);
            }
            var i, i_items=result.artifactInfoConfigs, i_len=result.artifactInfoConfigs.length, artifactInfoConfig;
            for (i=0; i<i_len; i++) {
                artifactInfoConfig = result.artifactInfoConfigs[i];
                // loog 'wizzi.production.asyncInitializeJobRequests.artifactInfoConfig', util.inspect(artifactInfoConfig, { depth: 2 })
                artifactInfoConfig.wfjob = wfjobIttfDocumentUri;
                if (pman.options.trace) {
                    console.log('ProductionManager.initialize.artifactInfoConfig', artifactInfoConfig.toString());
                }
                pman.addArtifactRequest(artifactInfoConfig);
            }
            callback(null);
        })
    }
 };
// async global model pre loader
var AsyncGlobalModelPreLoader = {
    run: function(globalModelInfo, callback) {
        log.info('Started async global model preload: ' + globalModelInfo.name);
        var loader = new PreLoader(globalModelInfo);
        loader.runGlobalModel(function(err, modelInstance) {
            if (err) {
                err.modelInfo = globalModelInfo.toString();
                return callback(err);
            }
            log.info('Ended async global model preload: ' + globalModelInfo.name);
            callback(null, {
                exportName: globalModelInfo.exportName, 
                modelInstance: modelInstance
             })
        })
    }
 };
// async artifact collection pre loader
var AsyncArtifactCollectionPreLoader = {
    run: function(artifactInfo, callback) {
        // loog 'Started async artifact collection pre load', artifactInfo.collection
        log.info('Started async artifact collection pre load: ' + artifactInfo.collection);
        if (verify.isEmpty(artifactInfo.collection)) {
            return callback(null);
        }
        log.info('Started async artifact collection pre load: ' + artifactInfo.name);
        var preloader = new PreLoader(artifactInfo);
        preloader.runArtifactCollection(function(err, operResult) {
            if (err) {
                err.artifactInfo = artifactInfo.toString();
                return callback(err);
            }
            log.info('Ended async artifact collection pre load: ' + artifactInfo.name);
            callback(null, operResult);
        })
    }
 };
// async run an artifact production
var AsyncRunner = {
    run: function(artifactInfo, callback) {
        log.info('Started async run artifact: ' + artifactInfo.name);
        var runner = new Runner(artifactInfo);
        runner.run(function(err, operResult) {
            
            // set err.ProfuctionManagerAsyncRunnerStack = (new Error()).stack
            if (err) {
                err.artifactInfo = artifactInfo.toString();
                return callback(err);
            }
            log.info('Ended async run artifact: ' + artifactInfo.name);
            callback(null, operResult);
        })
    }, 
    runFrontMatter: function(artifactInfo, callback) {
        log.info('Started async runFrontMatter artifact: ' + artifactInfo.name);
        var runner = new Runner(artifactInfo);
        runner.runFrontMatter(function(err, operResult) {
            
            // set err.ProfuctionManagerAsyncRunnerStack = (new Error()).stack
            if (err) {
                err.artifactInfo = artifactInfo.toString();
                return callback(err);
            }
            log.info('Ended async runFrontMatter artifact: ' + artifactInfo.name);
            callback(null, operResult);
        })
    }
 };
// async persist one or more artifact productions
var AsyncPersisterToFile = {
    run: function(artifactInfo, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isObject(artifactInfo) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'artifactInfo', message: 'The artifactInfo parameter must be an object. Received: ' + artifactInfo }
            ));
        }
        if (verify.isObject(artifactInfo.productionManager) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'artifactInfo.productionManager', message: 'The artifactInfo.productionManager parameter must be an object. Received: ' + artifactInfo.productionManager }
            ));
        }
        // loog 'Started async persist to file artifact: ', artifactInfo.name
        var persister = new ArtifactPersister(artifactInfo);
        persister.toFile(function(err, operResult) {
            if (err) {
                return callback(err);
            }
            var i, i_items=operResult, i_len=operResult.length, oper;
            for (i=0; i<i_len; i++) {
                oper = operResult[i];
                log.info(oper.oper + ', ' + oper.status + ', ' + oper.item.filepath)
            }
            // loog 'Ended async persist to file artifact: ', artifactInfo.name
            callback(null, operResult);
        })
    }
 };
module.exports = ProductionManager;
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
        method: 'wizzi.productionManager.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}