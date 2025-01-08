/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\services\wizziFactory.js.ittf
    utc time: Thu, 02 Jan 2025 12:51:28 GMT
*/
var verify = require('@wizzi/utils').verify;

var util = require('util');
var path = require('path');
var stringify = require('json-stringify-safe');
var jsonDiff = require('json-diff');
var async = require('async');

var repo = require('@wizzi/repo');
var mtree = require('@wizzi/mtree');
var acl = require('../acl');
var productionOptions = require('../production/options');
var ProductionManager = null;
var GenContext = require('../production/artifact/genContext');
var verify = require('@wizzi/utils').verify;
var file = require('@wizzi/utils').file;
var packi = require('@wizzi/utils').packi;
var JsonComponents = require('@wizzi/repo').JsonComponents;
const packiUtils = require('./packiUtils');
var StringWriter = require('../util/stringWriter');
var constants = require('../constants');
var errors = require('../errors');
var log = require('../util/log')(module);
var PluginsManager = require('./pluginsManager');
var StorePool = require('./storePool');
var interpolateFilename = require('../util/interpolateFilename');
var buildCheatsheet = require('./cheatsheet').buildCheatsheet;
var bootModelUri = "../wizzi/models/bootstrap/wfschema-boot-model";
var bootModelDefUri = "../wizzi/models/bootstrap/wfschema-boot-modelDef";
var BootWizziSchema = null;
var ModelInfo = null;
var AsyncModelLoader = null;

const {
    packiFilePrefix, 
    packiFilePrefixExtract, 
    metaProductionTempFolder, 
    metaProductionWizziFolder
 } = constants;

var myname = 'wizzi.services.wizzifactory';

class WizziFactory {
    constructor(user, role) {
        this.__type = 'WizziFactory';
        this.__version = '0.8.45';
        this.user = user;
        this.role = role;
        this.storeKind = null;
        this.fileService = null;
        this.storePool = new StorePool(this);
        // loadMTree is a method of this class, we need an alias
        this.__loadMTree = null;
        // loadMTreeFrontMatter is a method of this class, we need an alias
        this.__loadMTreeFrontMatter = null;
        // loadMTreeRaw is a method of this class, we need an alias
        this.__loadMTreeRaw = null;
        // loadMTreeBuildUpScript is a method of this class, we need an alias
        this.__loadMTreeBuildUpScript = null;
        this.pluginsManager = null;
        this.modelLoaders = {};
        this.modelTransformers = {};
        this.artifactGenerators = {};
        this.wizzifiers = {};
        this.schemaDefinitions = {};
        this.cheatsheets = {};
        this.globalContext = {};
        this.metasManager = null;
        this.verbose = false;
    }
    /**
         params
         { options
         { repo
         string storeKind
         oneOf 'filesystem', 'mongodb', 'json'
         string storeUri
         # when storeKind == mongodb
         string storeBaseFolder
         # when storeKind == mongodb
         { storeJsonFs
         # when storeKind == json
         { storeJsonFsData
         # when storeKind == json
         { plugins
         [ items
         string pluginName
         string pluginsBaseFolder
         { metaPlugins
         [ items
         string pluginName
         string metaPluginsBaseFolder
         { globalContext
         { test
         string testOnlyMockBaseDir
         { dumps
         string dumpsBaseFolder
         { mTreeBuildUpJsWizziScript
         boolean dump
         string dumpsBaseFolder
    */
    initialize(options, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'initialize', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isObject(options) === false) {
            return callback(error(
                'InvalidArgument', 'initialize', { parameter: 'options', message: 'The options parameter must be an object. Received: ' + options }
            ));
        }
        if (verify.isObject(options.repo) === false) {
            return callback(error(
                'InvalidArgument', 'initialize', { parameter: 'options.repo', message: 'The options.repo parameter must be an object. Received: ' + options.repo }
            ));
        }
        if (verify.isNullOrUndefined(options.plugins) === false) {
            if (verify.isObject(options.plugins) === false) {
                return callback(error(
                    'InvalidArgument', 'initialize', { parameter: 'options.plugins', message: 'The options.plugins parameter must be an object. Received: ' + options.plugins }
                ));
            }
        }
        if (verify.isNullOrUndefined(options.globalContext) === false) {
            if (verify.isObject(options.globalContext) === false) {
                return callback(error(
                    'InvalidArgument', 'initialize', { parameter: 'options.globalContext', message: 'The options.globalContext parameter must be an object. Received: ' + options.globalContext }
                ));
            }
        }
        if (verify.isNullOrUndefined(options.test) === false) {
            if (verify.isObject(options.test) === false) {
                return callback(error(
                    'InvalidArgument', 'initialize', { parameter: 'options.test', message: 'The options.test parameter must be an object. Received: ' + options.test }
                ));
            }
        }
        if (options.test) {
            this.__is_test = true;
            this.testOptions = {
                dumps: options.test.dumps
             };
            this.testOnlyMockBaseDir = options.test.testOnlyMockBaseDir;
        }
        if (options.globalContext) {
            this.globalContext = Object.assign({}, this.globalContext, options.globalContext)
            ;
        }
        // loog 'wizzi.wizziFactory.initialize.globalContext', this.globalContext
        var repoOptions = options.repo;
        // can be used for creating on the fly a json factory
        // for loading models from text strings
        this.pluginsOptions = options.plugins;
        if (verify.isObject(this.pluginsOptions) == false) {
            this.pluginsOptions = {};
        }
        this.metaPluginsOptions = options.metaPlugins;
        this.storeKind = repoOptions.storeKind || 'filesystem';
        if (options.verbose) {
            this.verbose = true;
            var date = new Date();
            var timeNow = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            console.log("[33m%s[0m", timeNow, "Starting ", this.__type, 'version', this.__version);
        }
        var that = this;
        this.storePool.initialize(repoOptions, function(err, pool) {
            if (err) {
                return callback(err);
            }
            that.fileService = pool.fileService;
            that.createStore = pool.createStore;
            that.__loadMTree = mtree.createLoadMTree(that.createStore)
            ;
            
            // loog 'wizzi.checked_call_set.__is_error ', that.__loadMTree
            if (that.__loadMTree && that.__loadMTree.__is_error) {
                return callback(that.__loadMTree);
            }
            that.__loadMTreeFrontMatter = mtree.createLoadMTree(that.createStore, {
                frontMatter: true
             })
            ;
            
            // loog 'wizzi.checked_call_set.__is_error ', that.__loadMTreeFrontMatter
            if (that.__loadMTreeFrontMatter && that.__loadMTreeFrontMatter.__is_error) {
                return callback(that.__loadMTreeFrontMatter);
            }
            that.__loadMTreeRaw = mtree.createLoadMTree(that.createStore, {
                raw: true
             })
            ;
            
            // loog 'wizzi.checked_call_set.__is_error ', that.__loadMTreeRaw
            if (that.__loadMTreeRaw && that.__loadMTreeRaw.__is_error) {
                return callback(that.__loadMTreeRaw);
            }
            that.__loadMTreeBuildUpScript = mtree.createLoadMTree(that.createStore, {
                mTreeBuildUpScript: true
             })
            ;
            
            // loog 'wizzi.checked_call_set.__is_error ', that.__loadMTreeBuildUpScript
            if (that.__loadMTreeBuildUpScript && that.__loadMTreeBuildUpScript.__is_error) {
                return callback(that.__loadMTreeBuildUpScript);
            }
            that.createStore(function(err, store) {
                if (err) {
                    return callback(err);
                }
                that.store = store;
                that.pluginsOptions.verbose = options.verbose;
                PluginsManager.createManager(that.pluginsOptions, function(err, pluginsManager) {
                    if (err) {
                        return callback(err);
                    }
                    that.pluginsManager = pluginsManager;
                    // loog 'pluginsManager', pluginsManager
                    return callback(null, that);
                })
            })
        })
    }
    terminate() {
        this.storePool.close();
    }
    /**
         TODO
         This method is optimal to implement the
         replacement of wizzi.model.modelInfo(s) properties of
         'loadContext' with loaded wizzi models.
         But the method must become asynchronous !!!
         params
         { loadContext
         { mTreeBuildUpContext
    */
    createLoadContext(loadContext, productionManager) {
        
        
        // Already a valid request context
        if (verify.isObject(loadContext) && verify.isObject(loadContext.__productionManager)) {
            return loadContext;
        }
        
        var mTreeBuildUpContext = Object.assign({}, this.globalContext, loadContext.mTreeBuildUpContext);
        
        // loog 'wizzi.wizziFactory.createLoadContext.mTreeBuildUpContext', mTreeBuildUpContext
        
        if (!productionManager && loadContext.contextProductionManager) {
            productionManager = loadContext.contextProductionManager;
        }
        
        return {
                __productionManager: (productionManager ? productionManager : this.createProductionManager()), 
                mTreeBuildUpContext: mTreeBuildUpContext
             };
    }
    /**
         params
         { productionOptions
         integer indentSpaces
         default 4
         string basedir
         integer verbose
         default 2
         { dumps
         ...
         { globalContext
    */
    createProductionManager(userProductionOptions, globalContext) {
        if (verify.isNullOrUndefined(userProductionOptions) === false) {
            if (verify.isObject(userProductionOptions) === false) {
                return error(
                    'InvalidArgument', 'createProductionManager', { parameter: 'userProductionOptions', message: 'The userProductionOptions parameter must be an object. Received: ' + userProductionOptions }
                );
            }
        }
        if (verify.isNullOrUndefined(globalContext) === false) {
            if (verify.isObject(globalContext) === false) {
                return error(
                    'InvalidArgument', 'createProductionManager', { parameter: 'globalContext', message: 'The globalContext parameter must be an object. Received: ' + globalContext }
                );
            }
        }
        
        var options = productionOptions(userProductionOptions || {});
        if (this.__is_test) {
            options = Object.assign(options, this.testOptions)
            ;
        }
        // loog '*=*=*=*= temporary wizzi.wizziFactory.createProductionManager. options : ', options
        var ProductionManager = getProductionManager();
        var pman = new ProductionManager(this, options);
        
        // create and set aclStat
        var aclStat = new acl.AclStat(this.user, this.role);
        pman.aclStat(aclStat);
        
        // create and set the global context
        var globalContext = Object.assign({}, this.globalContext, globalContext || {});
        pman.globalContext(globalContext);
        return pman;
    }
    /**
         Async load a wizzi magical tree
        
         params
         string ittfDocumentUri
         { mTreeBuildUpContext
         callback
        
    */
    loadMTree(ittfDocumentUri, mTreeBuildUpContext, callback) {
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
        if (verify.isObject(mTreeBuildUpContext) === false) {
            return callback(error(
                'InvalidArgument', 'loadMTree', { parameter: 'mTreeBuildUpContext', message: 'The mTreeBuildUpContext parameter must be an object. Received: ' + mTreeBuildUpContext }
            ));
        }
        
        try {
            this.__loadMTree(ittfDocumentUri, this.createLoadContext({
                mTreeBuildUpContext: mTreeBuildUpContext
             }), callback)
        } 
        catch (ex) {
            return callback(error('WizziFactoryError', 'loadMTree', {
                    message: 'See inner error', 
                    parameter: {
                        ittfDocumentUri: ittfDocumentUri
                     }
                 }, ex));
        } 
    }
    
    loadMTreeFromText(ittfContent, mTreeBuildUpContext, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'loadMTreeFromText', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(ittfContent) === false) {
            return callback(error(
                'InvalidArgument', 'loadMTreeFromText', { parameter: 'ittfContent', message: 'The ittfContent parameter must be a string. Received: ' + ittfContent }
            ));
        }
        if (verify.isObject(mTreeBuildUpContext) === false) {
            return callback(error(
                'InvalidArgument', 'loadMTreeFromText', { parameter: 'mTreeBuildUpContext', message: 'The mTreeBuildUpContext parameter must be an object. Received: ' + mTreeBuildUpContext }
            ));
        }
        
        // loog 'wizzi.wizziFactory.loadMTreeFromText', ittfContent, mTreeBuildUpContext, callback
        this.createSingleTextSourceFactory(ittfContent, 'ittf', {}, function(err, result) {
            if (err) {
                return callback(err);
            }
            result.wizziFactory.loadMTree(result.ittfDocumentUri, mTreeBuildUpContext, callback)
        })
    }
    
    loadMTreeFromPacki(ittfDocumentUri, packiFiles, mTreeBuildUpContext, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'loadMTreeFromPacki', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(ittfDocumentUri) === false) {
            return callback(error(
                'InvalidArgument', 'loadMTreeFromPacki', { parameter: 'ittfDocumentUri', message: 'The ittfDocumentUri parameter must be a string. Received: ' + ittfDocumentUri }
            ));
        }
        if (verify.isObject(packiFiles) === false) {
            return callback(error(
                'InvalidArgument', 'loadMTreeFromPacki', { parameter: 'packiFiles', message: 'The packiFiles parameter must be an object. Received: ' + packiFiles }
            ));
        }
        if (verify.isObject(mTreeBuildUpContext) === false) {
            return callback(error(
                'InvalidArgument', 'loadMTreeFromPacki', { parameter: 'mTreeBuildUpContext', message: 'The mTreeBuildUpContext parameter must be an object. Received: ' + mTreeBuildUpContext }
            ));
        }
        
        // loog 'wizzi.wizziFactory.loadMTreeFromPacki', ittfDocumentUri, packiFiles, mTreeBuildUpContext
        
        this.createJsonFactoryAndJsonFs(packiFiles, {}, function(err, result) {
            if (err) {
                return callback(err);
            }
            result.wf.loadMTree(packi.ensurePackiFilePrefix(ittfDocumentUri), mTreeBuildUpContext, callback)
        })
    }
    
    /**
         Async load the front matter of an ITTF Document
        
         params
         string ittfDocumentUri
         callback
        
    */
    loadMTreeFrontMatter(ittfDocumentUri, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'loadMTreeFrontMatter', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(ittfDocumentUri) === false) {
            return callback(error(
                'InvalidArgument', 'loadMTreeFrontMatter', { parameter: 'ittfDocumentUri', message: 'The ittfDocumentUri parameter must be a string. Received: ' + ittfDocumentUri }
            ));
        }
        
        this.__loadMTreeFrontMatter(ittfDocumentUri, this.createLoadContext({}), callback)
    }
    /**
         Async load a raw ITTF Document
        
         params
         string ittfDocumentUri
         callback
        
    */
    loadMTreeRaw(ittfDocumentUri, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'loadMTreeRaw', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(ittfDocumentUri) === false) {
            return callback(error(
                'InvalidArgument', 'loadMTreeRaw', { parameter: 'ittfDocumentUri', message: 'The ittfDocumentUri parameter must be a string. Received: ' + ittfDocumentUri }
            ));
        }
        
        this.__loadMTreeRaw(ittfDocumentUri, this.createLoadContext({}), callback)
    }
    /**
         Async load the mTree debug info of an ITTF Document
        
         params
         string ittfDocumentUri
         callback
        
    */
    loadMTreeBuildUpScript(ittfDocumentUri, mTreeBuildUpContext, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'loadMTreeBuildUpScript', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(ittfDocumentUri) === false) {
            return callback(error(
                'InvalidArgument', 'loadMTreeBuildUpScript', { parameter: 'ittfDocumentUri', message: 'The ittfDocumentUri parameter must be a string. Received: ' + ittfDocumentUri }
            ));
        }
        if (verify.isObject(mTreeBuildUpContext) === false) {
            return callback(error(
                'InvalidArgument', 'loadMTreeBuildUpScript', { parameter: 'mTreeBuildUpContext', message: 'The mTreeBuildUpContext parameter must be an object. Received: ' + mTreeBuildUpContext }
            ));
        }
        
        this.__loadMTreeBuildUpScript(ittfDocumentUri, this.createLoadContext({
            mTreeBuildUpContext: mTreeBuildUpContext
         }), callback)
    }
    loadMTreeBuildUpScriptFromText(ittfContent, mTreeBuildUpContext, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'loadMTreeBuildUpScriptFromText', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(ittfContent) === false) {
            return callback(error(
                'InvalidArgument', 'loadMTreeBuildUpScriptFromText', { parameter: 'ittfContent', message: 'The ittfContent parameter must be a string. Received: ' + ittfContent }
            ));
        }
        if (verify.isObject(mTreeBuildUpContext) === false) {
            return callback(error(
                'InvalidArgument', 'loadMTreeBuildUpScriptFromText', { parameter: 'mTreeBuildUpContext', message: 'The mTreeBuildUpContext parameter must be an object. Received: ' + mTreeBuildUpContext }
            ));
        }
        
        // loog 'wizzi.wizziFactory.loadMTreeBuildUpScriptFromText', ittfContent, mTreeBuildUpContext, callback
        this.createSingleTextSourceFactory(ittfContent, 'ittf', {}, function(err, result) {
            if (err) {
                return callback(err);
            }
            result.wizziFactory.loadMTreeBuildUpScript(result.ittfDocumentUri, mTreeBuildUpContext, callback)
        })
    }
    loadMTreeBuildUpScriptFromPacki(ittfDocumentUri, packiFiles, mTreeBuildUpContext, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'loadMTreeBuildUpScriptFromPacki', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(ittfDocumentUri) === false) {
            return callback(error(
                'InvalidArgument', 'loadMTreeBuildUpScriptFromPacki', { parameter: 'ittfDocumentUri', message: 'The ittfDocumentUri parameter must be a string. Received: ' + ittfDocumentUri }
            ));
        }
        if (verify.isObject(packiFiles) === false) {
            return callback(error(
                'InvalidArgument', 'loadMTreeBuildUpScriptFromPacki', { parameter: 'packiFiles', message: 'The packiFiles parameter must be an object. Received: ' + packiFiles }
            ));
        }
        if (verify.isObject(mTreeBuildUpContext) === false) {
            return callback(error(
                'InvalidArgument', 'loadMTreeBuildUpScriptFromPacki', { parameter: 'mTreeBuildUpContext', message: 'The mTreeBuildUpContext parameter must be an object. Received: ' + mTreeBuildUpContext }
            ));
        }
        
        // loog 'wizzi.wizziFactory.loadMTreeBuildUpScriptFromPacki', ittfDocumentUri, packiFiles, mTreeBuildUpContext
        
        this.createJsonFactoryAndJsonFs(packiFiles, {}, function(err, result) {
            if (err) {
                return callback(err);
            }
            result.wf.loadMTreeBuildUpScript(packi.ensurePackiFilePrefix(ittfDocumentUri), mTreeBuildUpContext, callback)
        })
    }
    /**
         Retrieve a loadModel function by the model schema name.
         Model factories are searched in the PluginsManager.
         They are cached.
         return
         | func wizzi-plugin.modelFactory.loadModel
         | wzError NotFound
         params
         string schemaName
         { globalContext
         optional
         # A global context object can be used to add mTree buildup contex values
         # to those contained in the mTreeBuildUpContext parameter, every time
         # the returned loadModel function is called.
         string testOnlyMockBaseDir
         # used for test purposes
    */
    getLoadModel(schemaName, globalContext, testOnlyMockBaseDir) {
        if (verify.isNotEmpty(schemaName) === false) {
            return error(
                'InvalidArgument', 'getLoadModel', { parameter: 'schemaName', message: 'The schemaName parameter must be a string. Received: ' + schemaName }
            );
        }
        if (verify.isNullOrUndefined(globalContext) === false) {
            if (verify.isObject(globalContext) === false) {
                return error(
                    'InvalidArgument', 'getLoadModel', { parameter: 'globalContext', message: 'The globalContext parameter must be an object. Received: ' + globalContext }
                );
            }
        }
        
        // loog 'wizzi.services.wizziFactory.getLoadModel: globalContext, testOnlyMockBaseDir', globalContext, testOnlyMockBaseDir
        var loadModel = this.modelLoaders[schemaName] || null;
        
        // loog 'wizzi.wizziFactory.getLoadModel.schemaName,factory', schemaName, factory
        
        // loog 'wizzi.wizziFactory.getLoadModel.this.__loadMTree.loadHistory', this.__loadMTree.loadHistory
        
        // loog 'getLoadModel.loadModel', loadModel
        if (loadModel == null) {
            var factory = this.pluginsManager.getModelFactory(schemaName, (testOnlyMockBaseDir || this.testOnlyMockBaseDir));
            if (factory && factory.__is_error) {
                return factory;
            }
            loadModel = factory.createLoadModel({
                loadMTree: this.__loadMTree, 
                file: file, 
                verify: verify, 
                errors: errors, 
                wizziFactory: this
             }, globalContext)
            ;
            this.modelLoaders[schemaName] = loadModel;
        }
        return loadModel;
    }
    /**
         Retrieve a loadModelFromTree function by the model schema name.
         Model factories are searched in the PluginsManager.
         They are cached.
         return
         | func wizzi-plugin.modelFactory.loadModel
         | wzError NotFound
         params
         string schemaName
    */
    getLoadModelFromMTree(schemaName) {
        if (verify.isNotEmpty(schemaName) === false) {
            return error(
                'InvalidArgument', 'getLoadModelFromMTree', { parameter: 'schemaName', message: 'The schemaName parameter must be a string. Received: ' + schemaName }
            );
        }
        var loadModel = this.modelLoaders[schemaName + 'FromMTree'] || null;
        
        // loog 'wizzi.wizziFactory.getLoadModel.schemaName,factory', schemaName, factory
        
        // loog 'getLoadModel.loadModel', loadModel
        if (loadModel == null) {
            var factory = this.pluginsManager.getModelFactory(schemaName, null);
            if (factory && factory.__is_error) {
                return factory;
            }
            loadModel = factory.createLoadModel({
                loadMTree: this.__loadMTree, 
                file: file, 
                verify: verify, 
                errors: errors, 
                wizziFactory: this, 
                options: {
                    loadFromMTree: true
                 }
             }, {})
            ;
            this.modelLoaders[schemaName + 'FromMTree'] = loadModel;
        }
        return loadModel;
    }
    /**
         Async load a wizzi model
         params
         string schemaName
         string ittfDocumentUri
         { loadContext
         { mTreeBuildUpContext
         optional
         { globalContext
         optional
         { formatOptions
         optional
         boolean ittfSources
         # if true returns not the model but its ittf source documents.
         callback
    */
    loadModel(schemaName, ittfDocumentUri, loadContext, callback, testOnlyMockBaseDir) {
        
        if (typeof(callback) == 'undefined') {
            testOnlyMockBaseDir = null;
            callback = loadContext;
            loadContext = ittfDocumentUri;
            ittfDocumentUri = schemaName;
            schemaName = null;
        }
        
        if (typeof(callback) !== 'function') {
            throw new Error(error('InvalidArgument', 'loadModel', 'The callback parameter must be a function. Received: ' + callback));
        }
        if (schemaName == null) {
            schemaName = detectSchema(ittfDocumentUri);
            ;
            
            // loog 'wizzi.checked_call_set.__is_error ', schemaName
            if (schemaName && schemaName.__is_error) {
                return callback(schemaName);
            }
        }
        var resolved_ittfDocumentUri = verify.resolveToString(ittfDocumentUri);
        // loog 'resolved_ittfDocumentUri', resolved_ittfDocumentUri
        if (verify.isNotEmpty(resolved_ittfDocumentUri) === false) {
            return callback(error('InvalidArgument', 'loadModel', {
                    parameter: 'ittfDocumentUri', 
                    message: "'ittfDocumentUri' must be a not empty string. Received: " + util.inspect(ittfDocumentUri, { depth: null })
                 }));
        }
        else {
            ittfDocumentUri = resolved_ittfDocumentUri;
        }
        
        // loog 'wizzi.wizziFactory.loadModel: schemaName, ittfDocumentUri, testOnlyMockBaseDir', schemaName, ittfDocumentUri, testOnlyMockBaseDir
        
        loadContext = loadContext || {};
        
        var loadModel = this.getLoadModel(schemaName, loadContext.globalContext, testOnlyMockBaseDir);
        
        if (loadModel.__is_error) {
            loadModel.ittfDocumentUri = ittfDocumentUri;
            return callback(loadModel);
        }
        
        var that = this;
        try {
            loadModel(ittfDocumentUri, this.createLoadContext(loadContext), function(err, wizziModel) {
                if (err) {
                    return callback(err);
                }
                return callback(null, that.formatWizziModel(wizziModel, loadContext.formatOptions));
            })
        } 
        catch (ex) {
            return callback(error('WizziFactoryError', 'loadModel', {
                    message: 'See inner error', 
                    parameter: {
                        ittfDocumentUri: ittfDocumentUri
                     }
                 }, ex));
        } 
    }
    formatWizziModel(model, formatOptions) {
        if (!formatOptions) {
            return model;
        }
        var partial = false;
        var ret = {};
        if (formatOptions.ittfSources) {
            partial = true;
            ret.loadHistory = {};
            ret.loadHistory.ittfSources = model.loadHistory.ittfSources;
        }
        if (partial) {
            return ret;
        }
        else {
            return model;
        }
    }
    loadModelFromMtree(schemaName, mTree, loadContext, callback) {
        
        if (typeof(callback) == 'undefined') {
            callback = loadContext;
            loadContext = {};
        }
        // loog 'wizzi.wizziFactory.loadModelFromMtree 2', schemaName, mTree, mTree.nodes[0].children, loadContext, callback
        
        if (typeof(callback) !== 'function') {
            throw new Error(error('InvalidArgument', 'loadModelFromMtree', 'The callback parameter must be a function. Received: ' + callback));
        }
        
        var loadModel = this.getLoadModelFromMTree(schemaName);
        
        if (loadModel.__is_error) {
            loadModel.ittfDocumentUri = "Unavailable (loaded from mTree)";
            return callback(loadModel);
        }
        
        var that = this;
        try {
            loadModel(mTree, this.createLoadContext(loadContext || {}), function(err, wizziModel) {
                if (err) {
                    return callback(err);
                }
                return callback(null, that.formatWizziModel(wizziModel, loadContext.formatOptions));
            })
        } 
        catch (ex) {
            return callback(error('WizziFactoryError', 'loadModelFromMtree', {
                    message: 'See inner error', 
                    parameter: {
                        ittfDocumentUri: "Unavailable (loaded from mTree)"
                     }
                 }, ex));
        } 
    }
    /**
         Async load a wizzi model from a
         config object built programmatically
         params
         { modelConfig
         string src
         string cwd
         optional
         string schema
         optional
         string format
         optional
         string exportName
         optional - has meaning only for context models.
         [ contexts
         optional - each context has the same format of modelConfig
         [ transformers
         optional
         { formatOptions
         optional
         boolean ittfSources
         # if true returns not the model but its ittf source documents.
    */
    loadModelFromConfig(modelConfig, globalContext, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'loadModelFromConfig', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isObject(modelConfig) === false) {
            return callback(error(
                'InvalidArgument', 'loadModelFromConfig', { parameter: 'modelConfig', message: 'The modelConfig parameter must be an object. Received: ' + modelConfig }
            ));
        }
        if (verify.isNotEmpty(modelConfig.src) === false) {
            return callback(error(
                'InvalidArgument', 'loadModelFromConfig', { parameter: 'modelConfig.src', message: 'The modelConfig.src parameter must be a string. Received: ' + modelConfig.src }
            ));
        }
        if (verify.isNullOrUndefined(modelConfig.cwd) === false) {
            if (verify.isNotEmpty(modelConfig.cwd) === false) {
                return callback(error(
                    'InvalidArgument', 'loadModelFromConfig', { parameter: 'modelConfig.cwd', message: 'The modelConfig.cwd parameter must be a string. Received: ' + modelConfig.cwd }
                ));
            }
        }
        if (verify.isNullOrUndefined(modelConfig.schema) === false) {
            if (verify.isNotEmpty(modelConfig.schema) === false) {
                return callback(error(
                    'InvalidArgument', 'loadModelFromConfig', { parameter: 'modelConfig.schema', message: 'The modelConfig.schema parameter must be a string. Received: ' + modelConfig.schema }
                ));
            }
        }
        if (verify.isNullOrUndefined(modelConfig.format) === false) {
            if (verify.isNotEmpty(modelConfig.format) === false) {
                return callback(error(
                    'InvalidArgument', 'loadModelFromConfig', { parameter: 'modelConfig.format', message: 'The modelConfig.format parameter must be a string. Received: ' + modelConfig.format }
                ));
            }
        }
        if (verify.isNullOrUndefined(modelConfig.exportName) === false) {
            if (verify.isNotEmpty(modelConfig.exportName) === false) {
                return callback(error(
                    'InvalidArgument', 'loadModelFromConfig', { parameter: 'modelConfig.exportName', message: 'The modelConfig.exportName parameter must be a string. Received: ' + modelConfig.exportName }
                ));
            }
        }
        if (verify.isNullOrUndefined(modelConfig.contexts) === false) {
            if (verify.isArray(modelConfig.contexts) === false) {
                return callback(error(
                    'InvalidArgument', 'loadModelFromConfig', { parameter: 'modelConfig.contexts', message: 'The modelConfig.contexts parameter must be an array. Received: ' + modelConfig.contexts }
                ));
            }
        }
        if (verify.isNullOrUndefined(modelConfig.transformers) === false) {
            if (verify.isArray(modelConfig.transformers) === false) {
                return callback(error(
                    'InvalidArgument', 'loadModelFromConfig', { parameter: 'modelConfig.transformers', message: 'The modelConfig.transformers parameter must be an array. Received: ' + modelConfig.transformers }
                ));
            }
        }
        if (verify.isObject(globalContext) === false) {
            return callback(error(
                'InvalidArgument', 'loadModelFromConfig', { parameter: 'globalContext', message: 'The globalContext parameter must be an object. Received: ' + globalContext }
            ));
        }
        if (verify.isNullOrUndefined(globalContext.formatOptions) === false) {
            if (verify.isObject(globalContext.formatOptions) === false) {
                return callback(error(
                    'InvalidArgument', 'loadModelFromConfig', { parameter: 'globalContext.formatOptions', message: 'The globalContext.formatOptions parameter must be an object. Received: ' + globalContext.formatOptions }
                ));
            }
        }
        if (ModelInfo == null) {
            ModelInfo = require("../production/model/modelInfo").ModelInfo;
            AsyncModelLoader = require('../production/model/asyncModelLoader');
        }
        var mi = new ModelInfo(modelConfig);
        mi.productionManager(this.createProductionManager(null, globalContext))
        var that = this;
        try {
            AsyncModelLoader.load(mi, function(err, wizziModel) {
                if (err) {
                    return callback(err);
                }
                return callback(null, that.formatWizziModel(wizziModel, globalContext.formatOptions));
            })
        } 
        catch (ex) {
            return callback(error('WizziFactoryError', 'loadModelFromConfig', {
                    message: 'See inner error', 
                    parameter: {
                        
                     }
                 }, ex));
        } 
    }
    loadModelFromText(ittfContent, schema, loadContext, callback) {
        
        if (typeof(callback) == 'undefined') {
            callback = loadContext;
            loadContext = {};
        }
        // loog 'wizzi.wizziFactory.loadModelFromText', ittfContent, schema, loadContext, callback
        
        if (typeof(callback) !== 'function') {
            throw new Error(error('InvalidArgument', 'loadModelFromText', 'The callback parameter must be a function. Received: ' + callback));
        }
        this.createSingleTextSourceFactory(ittfContent, schema, {}, function(err, result) {
            if (err) {
                return callback(err);
            }
            result.wizziFactory.loadModel(schema, result.ittfDocumentUri, loadContext, callback)
        })
    }
    /**
         Retrieve a model transformer
         Model transformation are searched in the PluginsManager
         They are cached
    */
    getModelTransformer(transformerName, globalContext) {
        if (verify.isNotEmpty(transformerName) === false) {
            return error(
                'InvalidArgument', 'getModelTransformer', { parameter: 'transformerName', message: 'The transformerName parameter must be a string. Received: ' + transformerName }
            );
        }
        if (verify.isNullOrUndefined(globalContext) === false) {
            if (verify.isObject(globalContext) === false) {
                return error(
                    'InvalidArgument', 'getModelTransformer', { parameter: 'globalContext', message: 'The globalContext parameter must be an object. Received: ' + globalContext }
                );
            }
        }
        
        var transformer = this.modelTransformers[transformerName] || null;
        if (transformer == null) {
            transformer = this.pluginsManager.getModelTransformer(transformerName);
            ;
            if (transformer && transformer.__is_error) {
                return transformer;
            }
            if (verify.isFunction(transformer.setGlobalContext) && globalContext) {
                transformer.setGlobalContext(globalContext)
            }
            this.modelTransformers[transformerName] = transformer;
        }
        return transformer;
    }
    /**
         Async execute a model transformation
    */
    transformModel(model, transformerName, context, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'transformModel', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isObject(model) === false) {
            return callback(error(
                'InvalidArgument', 'transformModel', { parameter: 'model', message: 'The model parameter must be an object. Received: ' + model }
            ));
        }
        if (verify.isNotEmpty(transformerName) === false) {
            return callback(error(
                'InvalidArgument', 'transformModel', { parameter: 'transformerName', message: 'The transformerName parameter must be a string. Received: ' + transformerName }
            ));
        }
        if (verify.isObject(context) === false) {
            return callback(error(
                'InvalidArgument', 'transformModel', { parameter: 'context', message: 'The context parameter must be an object. Received: ' + context }
            ));
        }
        
        if (typeof(callback) !== 'function') {
            throw new Error(error('InvalidArgument', 'transformModel', 'The callback parameter must be a function. Received: ' + callback));
        }
        
        var transformer = this.getModelTransformer(transformerName);
        if (transformer.__is_error) {
            return callback(transformer);
        }
        
        context.wizziFactory = this;
        try {
            transformer.trans(model, context, callback)
        } 
        catch (ex) {
            return callback(error('WizziFactoryError', 'transformModel', {
                    message: 'See inner error', 
                    parameter: {
                        transformerName: transformerName
                     }
                 }, ex));
        } 
    }
    loadAndTransformModel(ittfDocumentUri, requestContext, transformName, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'loadAndTransformModel', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(ittfDocumentUri) === false) {
            return callback(error(
                'InvalidArgument', 'loadAndTransformModel', { parameter: 'ittfDocumentUri', message: 'The ittfDocumentUri parameter must be a string. Received: ' + ittfDocumentUri }
            ));
        }
        if (verify.isObject(requestContext) === false) {
            return callback(error(
                'InvalidArgument', 'loadAndTransformModel', { parameter: 'requestContext', message: 'The requestContext parameter must be an object. Received: ' + requestContext }
            ));
        }
        if (verify.isNullOrUndefined(requestContext.modelRequestContext) === false) {
            if (verify.isObject(requestContext.modelRequestContext) === false) {
                return callback(error(
                    'InvalidArgument', 'loadAndTransformModel', { parameter: 'requestContext.modelRequestContext', message: 'The requestContext.modelRequestContext parameter must be an object. Received: ' + requestContext.modelRequestContext }
                ));
            }
        }
        if (verify.isNullOrUndefined(requestContext.transformRequestContext) === false) {
            if (verify.isObject(requestContext.transformRequestContext) === false) {
                return callback(error(
                    'InvalidArgument', 'loadAndTransformModel', { parameter: 'requestContext.transformRequestContext', message: 'The requestContext.transformRequestContext parameter must be an object. Received: ' + requestContext.transformRequestContext }
                ));
            }
        }
        if (verify.isNotEmpty(transformName) === false) {
            return callback(error(
                'InvalidArgument', 'loadAndTransformModel', { parameter: 'transformName', message: 'The transformName parameter must be a string. Received: ' + transformName }
            ));
        }
        
        // loog 'wizzi.wizziFactory.loadAndTransformModel.requestContext.modelRequestContext', requestContext.modelRequestContext, 'transformRequestContext', requestContext.transformRequestContext
        
        var that = this;
        // load the wizzi model from an ittfDocument
        this.loadModel(ittfDocumentUri, {
            mTreeBuildUpContext: requestContext.modelRequestContext
         }, function(err, wizziModel) {
            if (err) {
                return callback(err);
            }
            // loog 'wizzi.wizziFactory.loadAndTransformModel', 'model loaded', wizziModel
            // the loaded wizzi model becomes the wizziModel of the transformation
            that.transformModel(wizziModel, transformName, requestContext.transformRequestContext || requestContext.modelRequestContext, callback)
        })
    }
    loadAndTransformModelAndGenerateArtifact(ittfDocumentUri, requestContext, transformName, artifactName, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'loadAndTransformModelAndGenerateArtifact', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(ittfDocumentUri) === false) {
            return callback(error(
                'InvalidArgument', 'loadAndTransformModelAndGenerateArtifact', { parameter: 'ittfDocumentUri', message: 'The ittfDocumentUri parameter must be a string. Received: ' + ittfDocumentUri }
            ));
        }
        if (verify.isObject(requestContext) === false) {
            return callback(error(
                'InvalidArgument', 'loadAndTransformModelAndGenerateArtifact', { parameter: 'requestContext', message: 'The requestContext parameter must be an object. Received: ' + requestContext }
            ));
        }
        if (verify.isNullOrUndefined(requestContext.modelRequestContext) === false) {
            if (verify.isObject(requestContext.modelRequestContext) === false) {
                return callback(error(
                    'InvalidArgument', 'loadAndTransformModelAndGenerateArtifact', { parameter: 'requestContext.modelRequestContext', message: 'The requestContext.modelRequestContext parameter must be an object. Received: ' + requestContext.modelRequestContext }
                ));
            }
        }
        if (verify.isNullOrUndefined(requestContext.transformRequestContext) === false) {
            if (verify.isObject(requestContext.transformRequestContext) === false) {
                return callback(error(
                    'InvalidArgument', 'loadAndTransformModelAndGenerateArtifact', { parameter: 'requestContext.transformRequestContext', message: 'The requestContext.transformRequestContext parameter must be an object. Received: ' + requestContext.transformRequestContext }
                ));
            }
        }
        if (verify.isNullOrUndefined(requestContext.artifactRequestContext) === false) {
            if (verify.isObject(requestContext.artifactRequestContext) === false) {
                return callback(error(
                    'InvalidArgument', 'loadAndTransformModelAndGenerateArtifact', { parameter: 'requestContext.artifactRequestContext', message: 'The requestContext.artifactRequestContext parameter must be an object. Received: ' + requestContext.artifactRequestContext }
                ));
            }
        }
        if (verify.isNotEmpty(transformName) === false) {
            return callback(error(
                'InvalidArgument', 'loadAndTransformModelAndGenerateArtifact', { parameter: 'transformName', message: 'The transformName parameter must be a string. Received: ' + transformName }
            ));
        }
        if (verify.isNotEmpty(artifactName) === false) {
            return callback(error(
                'InvalidArgument', 'loadAndTransformModelAndGenerateArtifact', { parameter: 'artifactName', message: 'The artifactName parameter must be a string. Received: ' + artifactName }
            ));
        }
        
        // loog 'wizzi.wizziFactory.loadAndTransformModelAndGenerateArtifact.requestContext.modelRequestContext', requestContext.modelRequestContext, 'transformRequestContext', requestContext.transformRequestContext, 'artifactRequestContext', requestContext.artifactRequestContext
        
        var that = this;
        // load the wizzi model from an ittfDocument
        this.loadModel(ittfDocumentUri, {
            mTreeBuildUpContext: requestContext.modelRequestContext
         }, function(err, wizziModel) {
            if (err) {
                return callback(err);
            }
            // loog 'wizzi.wizziFactory.loadAndTransformModelAndGenerateArtifact', 'model loaded', wizziModel
            // the loaded wizzi model becomes the wizziModel of the transformation
            that.transformModel(wizziModel, transformName, requestContext.transformRequestContext || requestContext.modelRequestContext, function(err, artifactModel) {
                if (err) {
                    return callback(err);
                }
                that.generateArtifact(artifactModel, ittfDocumentUri, artifactName, requestContext.artifactRequestContext, callback)
            })
        })
    }
    /**
         Retrieve an artifact generator
         Artifact generators are searched in the PluginsManager
         They are cached
    */
    getArtifactGenerator(artifactName, globalContext) {
        if (verify.isNotEmpty(artifactName) === false) {
            return error(
                'InvalidArgument', 'getArtifactGenerator', { parameter: 'artifactName', message: 'The artifactName parameter must be a string. Received: ' + artifactName }
            );
        }
        if (verify.isNullOrUndefined(globalContext) === false) {
            if (verify.isObject(globalContext) === false) {
                return error(
                    'InvalidArgument', 'getArtifactGenerator', { parameter: 'globalContext', message: 'The globalContext parameter must be an object. Received: ' + globalContext }
                );
            }
        }
        
        var generator = this.artifactGenerators[artifactName] || null;
        if (generator == null) {
            generator = this.pluginsManager.getArtifactGenerator(artifactName);
            ;
            if (generator && generator.__is_error) {
                return generator;
            }
            if (verify.isFunction(generator.setGlobalContext) && globalContext) {
                generator.setGlobalContext(globalContext)
            }
            this.artifactGenerators[artifactName] = generator;
        }
        return generator;
    }
    /**
         Async generate an artifact
        
         params
         { artifactModel
         # A wizzi model or POJO, the main context of the generation
         # May be null for artifacts of type 'code write'
         string ittfDocumentUri
         # For trace and documentation purposes
         string artifactName
         # The name for retrieving the artifact generation module
         { artifactRequestContext
         # context data for the artifact generator
         callback
         string generated artifact
    */
    generateArtifact(artifactModel, ittfDocumentUri, artifactName, artifactRequestContext, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'generateArtifact', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNullOrUndefined(artifactModel) === false) {
            if (verify.isArrayOrObject(artifactModel) === false) {
                return callback(error(
                    'InvalidArgument', 'generateArtifact', { parameter: 'artifactModel', message: 'The artifactModel parameter must be an array or an object. Received: ' + artifactModel }
                ));
            }
        }
        if (verify.isNotEmpty(ittfDocumentUri) === false) {
            return callback(error(
                'InvalidArgument', 'generateArtifact', { parameter: 'ittfDocumentUri', message: 'The ittfDocumentUri parameter must be a string. Received: ' + ittfDocumentUri }
            ));
        }
        if (verify.isNotEmpty(artifactName) === false) {
            return callback(error(
                'InvalidArgument', 'generateArtifact', { parameter: 'artifactName', message: 'The artifactName parameter must be a string. Received: ' + artifactName }
            ));
        }
        if (verify.isNullOrUndefined(artifactRequestContext) === false) {
            if (verify.isObject(artifactRequestContext) === false) {
                return callback(error(
                    'InvalidArgument', 'generateArtifact', { parameter: 'artifactRequestContext', message: 'The artifactRequestContext parameter must be an object. Received: ' + artifactRequestContext }
                ));
            }
        }
        
        // loog 'generateArtifact.artifactModel', artifactModel
        
        if (typeof(callback) === 'undefined') {
            callback = artifactRequestContext;
            artifactRequestContext = {};
        }
        if (!artifactRequestContext) {
            artifactRequestContext = {};
        }
        
        if (typeof(callback) !== 'function') {
            throw new Error(error('InvalidArgument', 'generateArtifact', 'The callback parameter must be a function. Received: ' + callback));
        }
        
        /**
            TODO (next wizzi factory versions)
             check_cb_object( artifactModel, generateArtifact ) cannot be done because
             artifactModel may be null for artifacts of type 'code write'.
             To check the match between artifact descriptors (wzjob/artifact) and
             artifact modules (lib/artifacts/schema/artifactName/main.js) could be helpfull.
        */
        
        var generator = this.getArtifactGenerator(artifactName);
        if (generator.__is_error) {
            generator.ittfDocumentUri = ittfDocumentUri;
            return callback(generator);
        }
        
        /**
            TODO productionOptions should come from production manager
        */
        // The `data` property of the productionOptions will be merged
        // to the `values` property of the GenContext.
        var genContext = new GenContext({
            options: productionOptions(artifactRequestContext, {
                data: artifactRequestContext
             }), 
            pman: this.createProductionManager()
         });
        // loog 'wizzi.wizziFactory.generateArtifact', artifactName, ittfDocumentUri
        try {
            generator.gen(artifactModel, genContext, function(err, result) {
                
                /**
                    * err.artifactName = artifactName
                    * err.artifactIttfDocumentUri = ittfDocumentUri
                    * 
                        * callback(err)
                */
                
                // 
                
                // loog 'wizzi.wizziFactory.generateArtifact', typeof(err), err, err.length, err.length && err.length > 0 && err[0]
                if (err) {
                    return callback(error('WizziFactoryError', 'generateArtifact', {
                            message: 'See inner error', 
                            parameter: {
                                artifactName: artifactName, 
                                artifactIttfDocumentUri: ittfDocumentUri
                             }
                         }, err));
                }
                var sw = new StringWriter();
                result.toStream(sw);
                callback(null, sw.toString());
            })
        } 
        catch (ex) {
            return callback(error('WizziFactoryError', 'generateArtifact', {
                    message: 'See inner error', 
                    parameter: {
                        artifactName: artifactName, 
                        artifactIttfDocumentUri: ittfDocumentUri
                     }
                 }, ex));
        } 
    }
    /**
         Loads a wizzi model from an IttfDocument and use it as
         the artifactModel for the artifact generation.
         params
         string ittfDocumentUri
         # the uri of the IttfDocument
         { requestContext
         { modelRequestContext
         # Context data for the wizzi model loading
         { artifactRequestContext
         # Context data for the artifact generation
         string artifactName
         function callback
    */
    loadModelAndGenerateArtifact(ittfDocumentUri, requestContext, artifactName, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'loadModelAndGenerateArtifact', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(ittfDocumentUri) === false) {
            return callback(error(
                'InvalidArgument', 'loadModelAndGenerateArtifact', { parameter: 'ittfDocumentUri', message: 'The ittfDocumentUri parameter must be a string. Received: ' + ittfDocumentUri }
            ));
        }
        if (verify.isObject(requestContext) === false) {
            return callback(error(
                'InvalidArgument', 'loadModelAndGenerateArtifact', { parameter: 'requestContext', message: 'The requestContext parameter must be an object. Received: ' + requestContext }
            ));
        }
        if (verify.isNullOrUndefined(requestContext.modelRequestContext) === false) {
            if (verify.isObject(requestContext.modelRequestContext) === false) {
                return callback(error(
                    'InvalidArgument', 'loadModelAndGenerateArtifact', { parameter: 'requestContext.modelRequestContext', message: 'The requestContext.modelRequestContext parameter must be an object. Received: ' + requestContext.modelRequestContext }
                ));
            }
        }
        if (verify.isNullOrUndefined(requestContext.artifactRequestContext) === false) {
            if (verify.isObject(requestContext.artifactRequestContext) === false) {
                return callback(error(
                    'InvalidArgument', 'loadModelAndGenerateArtifact', { parameter: 'requestContext.artifactRequestContext', message: 'The requestContext.artifactRequestContext parameter must be an object. Received: ' + requestContext.artifactRequestContext }
                ));
            }
        }
        if (verify.isNullOrUndefined(requestContext.productionManager) === false) {
            if (verify.isObject(requestContext.productionManager) === false) {
                return callback(error(
                    'InvalidArgument', 'loadModelAndGenerateArtifact', { parameter: 'requestContext.productionManager', message: 'The requestContext.productionManager parameter must be an object. Received: ' + requestContext.productionManager }
                ));
            }
        }
        
        // loog 'wizzi.wizziFactory.loadModelAndGenerateArtifact.requestContext.modelRequestContext', requestContext.modelRequestContext, 'artifactRequestContext', requestContext.artifactRequestContext
        
        if (artifactName == null || verify.isEmpty(artifactName)) {
            artifactName = this.mapIttfDocumentPathToDefaultArtifact(ittfDocumentUri)
            ;
        }
        if (verify.isEmpty(artifactName)) {
            return callback(error('InvalidArgument', 'loadModelAndGenerateArtifact', {
                    parameter: 'artifactName', 
                    message: 'The artifactName parameter must be a string. Received: ' + artifactName
                 }));
        }
        
        var that = this;
        // load the wizzi model from an ittfDocument
        try {
            this.loadModel(ittfDocumentUri, {
                mTreeBuildUpContext: requestContext.modelRequestContext, 
                contextProductionManager: requestContext.productionManager
             }, function(err, artifactModel) {
                if (err) {
                    return callback(err);
                }
                // loog 'wizzi.wizziFactory.loadModelAndGenerateArtifact', 'model loaded', artifactModel
                // the loaded wizzi model becomes the artifactModel of the artifact generation
                that.generateArtifact(artifactModel, ittfDocumentUri, artifactName, requestContext.artifactRequestContext, callback)
            })
        } 
        catch (ex) {
            return callback(error('WizziFactoryError', 'loadModelAndGenerateArtifact', {
                    message: 'See inner error', 
                    parameter: {
                        artifactName: artifactName, 
                        artifactIttfDocumentUri: ittfDocumentUri
                     }
                 }, ex));
        } 
    }
    loadModelAndGenerateArtifactFromText(ittfContent, requestContext, artifactName, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'loadModelAndGenerateArtifactFromText', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(ittfContent) === false) {
            return callback(error(
                'InvalidArgument', 'loadModelAndGenerateArtifactFromText', { parameter: 'ittfContent', message: 'The ittfContent parameter must be a string. Received: ' + ittfContent }
            ));
        }
        if (verify.isObject(requestContext) === false) {
            return callback(error(
                'InvalidArgument', 'loadModelAndGenerateArtifactFromText', { parameter: 'requestContext', message: 'The requestContext parameter must be an object. Received: ' + requestContext }
            ));
        }
        if (verify.isNullOrUndefined(requestContext.modelRequestContext) === false) {
            if (verify.isObject(requestContext.modelRequestContext) === false) {
                return callback(error(
                    'InvalidArgument', 'loadModelAndGenerateArtifactFromText', { parameter: 'requestContext.modelRequestContext', message: 'The requestContext.modelRequestContext parameter must be an object. Received: ' + requestContext.modelRequestContext }
                ));
            }
        }
        if (verify.isNullOrUndefined(requestContext.artifactRequestContext) === false) {
            if (verify.isObject(requestContext.artifactRequestContext) === false) {
                return callback(error(
                    'InvalidArgument', 'loadModelAndGenerateArtifactFromText', { parameter: 'requestContext.artifactRequestContext', message: 'The requestContext.artifactRequestContext parameter must be an object. Received: ' + requestContext.artifactRequestContext }
                ));
            }
        }
        if (verify.isNotEmpty(artifactName) === false) {
            return callback(error(
                'InvalidArgument', 'loadModelAndGenerateArtifactFromText', { parameter: 'artifactName', message: 'The artifactName parameter must be a string. Received: ' + artifactName }
            ));
        }
        
        // loog 'wizzi.wizziFactory.loadModelAndGenerateArtifactFromText', ittfContent, requestContext, artifactName, callback
        
        var ss = artifactName.split('/');
        var schema = ss[0];
        this.createSingleTextSourceFactory(ittfContent, schema, {}, function(err, result) {
            if (err) {
                return callback(err);
            }
            result.wizziFactory.loadModelAndGenerateArtifact(result.ittfDocumentUri, requestContext, artifactName, callback)
        })
    }
    loadModelAndGenerateArtifactFromPacki(ittfDocumentUri, packiFiles, requestContext, artifactName, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'loadModelAndGenerateArtifactFromPacki', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(ittfDocumentUri) === false) {
            return callback(error(
                'InvalidArgument', 'loadModelAndGenerateArtifactFromPacki', { parameter: 'ittfDocumentUri', message: 'The ittfDocumentUri parameter must be a string. Received: ' + ittfDocumentUri }
            ));
        }
        if (verify.isObject(packiFiles) === false) {
            return callback(error(
                'InvalidArgument', 'loadModelAndGenerateArtifactFromPacki', { parameter: 'packiFiles', message: 'The packiFiles parameter must be an object. Received: ' + packiFiles }
            ));
        }
        if (verify.isObject(requestContext) === false) {
            return callback(error(
                'InvalidArgument', 'loadModelAndGenerateArtifactFromPacki', { parameter: 'requestContext', message: 'The requestContext parameter must be an object. Received: ' + requestContext }
            ));
        }
        if (verify.isNullOrUndefined(requestContext.modelRequestContext) === false) {
            if (verify.isObject(requestContext.modelRequestContext) === false) {
                return callback(error(
                    'InvalidArgument', 'loadModelAndGenerateArtifactFromPacki', { parameter: 'requestContext.modelRequestContext', message: 'The requestContext.modelRequestContext parameter must be an object. Received: ' + requestContext.modelRequestContext }
                ));
            }
        }
        if (verify.isNullOrUndefined(requestContext.artifactRequestContext) === false) {
            if (verify.isObject(requestContext.artifactRequestContext) === false) {
                return callback(error(
                    'InvalidArgument', 'loadModelAndGenerateArtifactFromPacki', { parameter: 'requestContext.artifactRequestContext', message: 'The requestContext.artifactRequestContext parameter must be an object. Received: ' + requestContext.artifactRequestContext }
                ));
            }
        }
        if (verify.isNotEmpty(artifactName) === false) {
            return callback(error(
                'InvalidArgument', 'loadModelAndGenerateArtifactFromPacki', { parameter: 'artifactName', message: 'The artifactName parameter must be a string. Received: ' + artifactName }
            ));
        }
        
        // loog 'wizzi.wizziFactory.loadModelAndGenerateArtifactFromPacki', ittfDocumentUri, packiFiles, requestContext, artifactName, callback
        
        var ss = artifactName.split('/');
        var schema = ss[0];
        this.createJsonFactoryAndJsonFs(packiFiles, {}, function(err, result) {
            if (err) {
                return callback(err);
            }
            result.wf.loadModelAndGenerateArtifact(packi.ensurePackiFilePrefix(ittfDocumentUri), requestContext, artifactName, callback)
        })
    }
    /**
         Executes loadModelAndGenerateArtifact for each ITTF Document of a folder
         params
         string ittfFolderUri
         # the uri of the ITTF Documents folder
         { requestContext
         { modelRequestContext
         # Context data for the wizzi model loading
         { artifactRequestContext
         # Context data for the artifact generation
         { options
         boolean copyNonIttf
         boolean generateFragments
         boolean useMultiPartContext
         function callback
         returns
         [
         string generatedFilePath
    */
    generateFolderArtifacts(ittfFolderUri, requestContext, options, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'generateFolderArtifacts', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(ittfFolderUri) === false) {
            return callback(error(
                'InvalidArgument', 'generateFolderArtifacts', { parameter: 'ittfFolderUri', message: 'The ittfFolderUri parameter must be a string. Received: ' + ittfFolderUri }
            ));
        }
        if (verify.isObject(requestContext) === false) {
            return callback(error(
                'InvalidArgument', 'generateFolderArtifacts', { parameter: 'requestContext', message: 'The requestContext parameter must be an object. Received: ' + requestContext }
            ));
        }
        if (verify.isNullOrUndefined(requestContext.modelRequestContext) === false) {
            if (verify.isObject(requestContext.modelRequestContext) === false) {
                return callback(error(
                    'InvalidArgument', 'generateFolderArtifacts', { parameter: 'requestContext.modelRequestContext', message: 'The requestContext.modelRequestContext parameter must be an object. Received: ' + requestContext.modelRequestContext }
                ));
            }
        }
        if (verify.isNullOrUndefined(requestContext.artifactRequestContext) === false) {
            if (verify.isObject(requestContext.artifactRequestContext) === false) {
                return callback(error(
                    'InvalidArgument', 'generateFolderArtifacts', { parameter: 'requestContext.artifactRequestContext', message: 'The requestContext.artifactRequestContext parameter must be an object. Received: ' + requestContext.artifactRequestContext }
                ));
            }
        }
        if (verify.isObject(options) === false) {
            return callback(error(
                'InvalidArgument', 'generateFolderArtifacts', { parameter: 'options', message: 'The options parameter must be an object. Received: ' + options }
            ));
        }
        var modelRequestContext = requestContext.modelRequestContext || {};
        var fileCtx = Object.assign({}, modelRequestContext.fileCtx || {}, {
            dot: '.'
         });
        // loog 'wizzi.WizziFactory.generateFolderArtifacts.ittfFolderUri,fileCtx', ittfFolderUri, fileCtx
        // loog 'wizzi.wizzifactory.generateFolderArtifacts.object.keys(modelRequestContext)', Object.keys(modelRequestContext)
        try {
            repo.folderFilesInfoByPath(ittfFolderUri, this.fileService, options, (err, items) => {
                if (err) {
                    console.log("[31m%s[0m", err);
                    return callback(err);
                }
                async.mapSeries(items, (item, callback) => {
                    var okGenerate = item.isIttfDocument && (options.generateFragments || (!!item.isFragment == false));
                    
                    // loog 'wizzi.wizzifactory.generateFolderArtifacts.generating.item.fullPath', item.fullPath
                    if (okGenerate) {
                        if (item.fullPath == "json:/___template/__dot__wizzi/ittf/wizziMeta/folderTemplates/index.ittf.ittf.ittf") {
                            if (modelRequestContext.metaCtx && modelRequestContext.metaCtx.__wz_fsc) {
                                modelRequestContext.metaCtx.__wz_fsc.addDebugObject('file', '')
                            }
                        }
                        var artifactName = this.mapSchemaToDefaultArtifact(item.schema);
                        if (!artifactName || artifactName.length < 3) {
                            return callback(error('999', 'generateFolderArtifacts', "Default artifact not found for schema: " + item.schema));
                        }
                        if (options.useMultiPartContext) {
                            callback(null, {
                                isProduction: true, 
                                productionActionType: "loadModelAndGenerateArtifact", 
                                ittfDocumentUri: item.fullPath, 
                                artifactName: artifactName, 
                                gen: {
                                    generator: artifactName
                                 }, 
                                dest: {
                                    fullPath: path.join(options.destFolder, item.destRelPath)
                                 }
                             })
                        }
                        else {
                            this.loadModelAndGenerateArtifact(item.fullPath, {
                                modelRequestContext: modelRequestContext, 
                                artifactRequestContext: requestContext.artifactRequestContext
                             }, artifactName, (err, artifactText) => {
                                if (err) {
                                    console.log("[31m%s[0m", err);
                                    return callback(err);
                                }
                                this.fileService.write(path.join(options.destFolder, interpolateFilename(item.destRelPath, fileCtx)), artifactText, function(err, notUsed) {
                                    if (err) {
                                        return callback(err);
                                    }
                                    // loog 'generateFolderArtifacts.written', item.destRelPath
                                    // _ process.nextTick
                                    setTimeout(() => 
                                        callback(null, path.join(options.destFolder, item.destRelPath))
                                    , 0)
                                })
                            }
                            )
                        }
                    }
                    
                    // loog 'generateFolderArtifacts.copying', item.fullPath
                    else if (options.copyNonIttf && item.isIttfDocument == false) {
                        this.fileService.copyFile(item.fullPath, path.join(options.destFolder, interpolateFilename(item.destRelPath, fileCtx)), function(err, notUsed) {
                            if (err) {
                                return callback(err);
                            }
                            // _ process.nextTick
                            setTimeout(() => 
                                callback(null, path.join(options.destFolder, item.destRelPath))
                            , 0)
                        })
                    }
                    else {
                        callback(null)
                    }
                }
                , (err, result) => {
                    if (err) {
                        console.log("[31m%s[0m", 'Error in method wizzi.wizzifactory.generateFolderArtifacts');
                        console.log("[31m%s[0m", 'err', err);
                        return callback(err);
                    }
                    
                    // loog 'wizzi.wizzifactory.generateFolderArtifacts.productionStepConfigs', productionStepConfigs.length
                    if (options.useMultiPartContext) {
                        var productionStepConfigs = [];
                        var i, i_items=result, i_len=result.length, item;
                        for (i=0; i<i_len; i++) {
                            item = result[i];
                            if (item.isProduction) {
                                item.modelRequestContext = modelRequestContext;
                                item.artifactRequestContext = requestContext.artifactRequestContext;
                                item.fileCtx = fileCtx;
                                productionStepConfigs.push(item)
                            }
                        }
                        this.executeProductionSteps({
                            name: 'folder: ' + ittfFolderUri
                         }, productionStepConfigs, (err, result) => {
                            if (err) {
                                console.log("[31m%s[0m", err);
                                return callback(err);
                            }
                            return callback(null, result);
                        }
                        )
                    }
                    else {
                        return callback(null, result);
                    }
                }
                )
            }
            )
        } 
        catch (ex) {
            return callback(error('WizziFactoryError', 'generateFolderArtifacts', {
                    message: 'See inner error', 
                    parameter: {
                        ittfFolderUri: ittfFolderUri
                     }
                 }, ex));
        } 
    }
    /**
         Retrieve a schema definition in json format
         Schema definitions are searched in the PluginsManager
         They are cached
    */
    getSchemaDefinition(schemaName) {
        if (verify.isNotEmpty(schemaName) === false) {
            return error(
                'InvalidArgument', 'getSchemaDefinition', { parameter: 'schemaName', message: 'The schemaName parameter must be a string. Received: ' + schemaName }
            );
        }
        
        var schema = this.schemaDefinitions[schemaName] || null;
        if (schema == null) {
            schema = this.pluginsManager.getSchemaDefinition(schemaName);
            if (schema != null) {
                this.schemaDefinitions[schemaName] = schema;
            }
        }
        return schema;
    }
    /**
         Check if a wizzi schema has a wizzifier
         returns
         true|false
    */
    canWizzifySchema(schemaName) {
        if (verify.isNotEmpty(schemaName) === false) {
            return error(
                'InvalidArgument', 'canWizzifySchema', { parameter: 'schemaName', message: 'The schemaName parameter must be a string. Received: ' + schemaName }
            );
        }
        return this.pluginsManager.canWizzifySchema(schemaName);
    }
    /**
         Check if a file extension has a wizzifier
         returns
         true|false
    */
    canWizzify(extension) {
        if (verify.isNotEmpty(extension) === false) {
            return error(
                'InvalidArgument', 'canWizzify', { parameter: 'extension', message: 'The extension parameter must be a string. Received: ' + extension }
            );
        }
        return this.pluginsManager.canWizzify(extension);
    }
    /**
         Check if a file extension has a wizzifier and is a binary file
         returns
         true|false
    */
    wizzifierIsForBinaryFile(extension) {
        if (verify.isNotEmpty(extension) === false) {
            return error(
                'InvalidArgument', 'wizzifierIsForBinaryFile', { parameter: 'extension', message: 'The extension parameter must be a string. Received: ' + extension }
            );
        }
        return this.pluginsManager.wizzifierIsForBinaryFile(extension);
    }
    /**
         Retrieve a wizzifier
         Wizzifiers are searched in the PluginsManager
         They are cached
    */
    getWizzifier(extension) {
        if (verify.isNotEmpty(extension) === false) {
            return error(
                'InvalidArgument', 'getWizzifier', { parameter: 'extension', message: 'The extension parameter must be a string. Received: ' + extension }
            );
        }
        
        var wizzifier = this.wizzifiers[extension] || null;
        if (wizzifier == null) {
            wizzifier = this.pluginsManager.getWizzifier(extension);
            ;
            if (wizzifier && wizzifier.__is_error) {
                return wizzifier;
            }
            this.wizzifiers[extension] = wizzifier;
        }
        return wizzifier;
    }
    /**
         Async wizzify source code
        
         params
         string tobeWizzifiedUri
         # The file path to the source to be wizzified
         string schemaOrExtension
         # The name for retrieving the wizzifier
         callback
         string ittfText
    */
    getWizziIttf(tobeWizzifiedUri, schemaOrExtension, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'getWizziIttf', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(tobeWizzifiedUri) === false) {
            return callback(error(
                'InvalidArgument', 'getWizziIttf', { parameter: 'tobeWizzifiedUri', message: 'The tobeWizzifiedUri parameter must be a string. Received: ' + tobeWizzifiedUri }
            ));
        }
        if (verify.isNotEmpty(schemaOrExtension) === false) {
            return callback(error(
                'InvalidArgument', 'getWizziIttf', { parameter: 'schemaOrExtension', message: 'The schemaOrExtension parameter must be a string. Received: ' + schemaOrExtension }
            ));
        }
        
        if (typeof(callback) !== 'function') {
            throw new Error(error('InvalidArgument', 'getWizziIttf', 'The callback parameter must be a function. Received: ' + callback));
        }
        
        var wizzifier = this.getWizzifier(schemaOrExtension);
        if (wizzifier.__is_error) {
            wizzifier.schemaOrExtension = schemaOrExtension;
            return callback(wizzifier);
        }
        
        try {
            var tobeWizzifiedText = this.fileService.read(tobeWizzifiedUri);
        } 
        catch (ex) {
            return callback(error('WizziFactoryError', 'getWizziIttf', {
                    message: 'See inner error', 
                    parameter: {
                        schemaOrExtension: schemaOrExtension, 
                        tobeWizzifiedUri: tobeWizzifiedUri
                     }
                 }, ex));
        } 
        this.getWizziIttfFromText(tobeWizzifiedText, schemaOrExtension, callback)
    }
    /**
         Async wizzify source code
        
         params
         string tobeWizzifiedText
         # The source code to be wizzified
         string schemaOrExtension
         # The name for retrieving the wizzifier
         callback
         string ittfText
    */
    getWizziIttfFromText(tobeWizzifiedText, schemaOrExtension, options, callback) {
        if (verify.isNotEmpty(tobeWizzifiedText) === false) {
            return error(
                'InvalidArgument', 'getWizziIttfFromText', { parameter: 'tobeWizzifiedText', message: 'The tobeWizzifiedText parameter must be a string. Received: ' + tobeWizzifiedText }
            );
        }
        if (verify.isNotEmpty(schemaOrExtension) === false) {
            return error(
                'InvalidArgument', 'getWizziIttfFromText', { parameter: 'schemaOrExtension', message: 'The schemaOrExtension parameter must be a string. Received: ' + schemaOrExtension }
            );
        }
        
        if (typeof(callback) === 'undefined') {
            callback = options;
            options = {};
        }
        
        if (typeof(callback) !== 'function') {
            throw new Error(error('InvalidArgument', 'getWizziIttfFromText', 'The callback parameter must be a function. Received: ' + callback));
        }
        
        var wizzifier = this.getWizzifier(schemaOrExtension);
        if (wizzifier.__is_error) {
            wizzifier.schemaOrExtension = schemaOrExtension;
            return callback(wizzifier);
        }
        
        try {
            // the instance of the WizziFactory passed to the getWizziIttf function
            // could be used for wizzifying included wizzi schemas
            wizzifier.getWizziIttf(tobeWizzifiedText, {
                wf: this, 
                sourceFilepath: options.sourceFilepath
             }, function(err, result) {
                
                // loog 'wizzi.wizziFactory.getWizziIttf', typeof(err), err, err.length, err.length && err.length > 0 && err[0]
                if (err) {
                    return callback(error('WizziFactoryError', 'getWizziIttfFromText', {
                            message: 'See inner error', 
                            parameter: {
                                schemaOrExtension: schemaOrExtension
                             }
                         }, err));
                }
                callback(null, result);
            })
        } 
        catch (ex) {
            return callback(error('WizziFactoryError', 'getWizziIttfFromText', {
                    message: 'See inner error', 
                    parameter: {
                        schemaOrExtension: schemaOrExtension
                     }
                 }, ex));
        } 
    }
    /**
         Async wizzify source code and return the wizzified tree
        
         params
         string tobeWizzifiedUri
         # The source code to be wizzified
         string schemaOrExtension
         # The name for retrieving the wizzifier
         callback
         object ittfTree
    */
    getWizziTree(tobeWizzifiedUri, schemaOrExtension, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'getWizziTree', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(tobeWizzifiedUri) === false) {
            return callback(error(
                'InvalidArgument', 'getWizziTree', { parameter: 'tobeWizzifiedUri', message: 'The tobeWizzifiedUri parameter must be a string. Received: ' + tobeWizzifiedUri }
            ));
        }
        if (verify.isNotEmpty(schemaOrExtension) === false) {
            return callback(error(
                'InvalidArgument', 'getWizziTree', { parameter: 'schemaOrExtension', message: 'The schemaOrExtension parameter must be a string. Received: ' + schemaOrExtension }
            ));
        }
        
        if (typeof(callback) !== 'function') {
            throw new Error(error('InvalidArgument', 'getWizziTree', 'The callback parameter must be a function. Received: ' + callback));
        }
        
        try {
            var tobeWizzifiedText = this.fileService.read(tobeWizzifiedUri);
        } 
        catch (ex) {
            return callback(error('WizziFactoryError', 'getWizziTree', {
                    message: 'See inner error', 
                    parameter: {
                        schemaOrExtension: schemaOrExtension, 
                        tobeWizzifiedUri: tobeWizzifiedUri
                     }
                 }, ex));
        } 
        this.getWizziTreeFromText(tobeWizzifiedText, schemaOrExtension, callback)
    }
    /**
         Async wizzify source code and return the wizzified tree
        
         params
         string tobeWizzifiedText
         # The source code to be wizzified
         string schemaOrExtension
         # The name for retrieving the wizzifier
         callback
         string ittfText
    */
    getWizziTreeFromText(tobeWizzifiedText, schemaOrExtension, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'getWizziTreeFromText', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(tobeWizzifiedText) === false) {
            return callback(error(
                'InvalidArgument', 'getWizziTreeFromText', { parameter: 'tobeWizzifiedText', message: 'The tobeWizzifiedText parameter must be a string. Received: ' + tobeWizzifiedText }
            ));
        }
        if (verify.isNotEmpty(schemaOrExtension) === false) {
            return callback(error(
                'InvalidArgument', 'getWizziTreeFromText', { parameter: 'schemaOrExtension', message: 'The schemaOrExtension parameter must be a string. Received: ' + schemaOrExtension }
            ));
        }
        
        if (typeof(callback) !== 'function') {
            throw new Error(error('InvalidArgument', 'getWizziTreeFromText', 'The callback parameter must be a function. Received: ' + callback));
        }
        
        var wizzifier = this.getWizzifier(schemaOrExtension);
        if (wizzifier.__is_error) {
            wizzifier.schemaOrExtension = schemaOrExtension;
            return callback(wizzifier);
        }
        
        try {
            // the instance of the WizziFactory passed to the getWizziTree function
            // could be used for wizzifying included wizzi schemas
            wizzifier.getWizziTree(tobeWizzifiedText, {
                wf: this
             }, function(err, result) {
                
                // loog 'wizzi.wizziFactory.getWizziTreeFromText', typeof(err), err, err.length, err.length && err.length > 0 && err[0]
                if (err) {
                    return callback(error('WizziFactoryError', 'getWizziTreeFromText', {
                            message: 'See inner error', 
                            parameter: {
                                schemaOrExtension: schemaOrExtension
                             }
                         }, err));
                }
                callback(null, result);
            })
        } 
        catch (ex) {
            return callback(error('WizziFactoryError', 'getWizziTreeFromText', {
                    message: 'See inner error', 
                    parameter: {
                        schemaOrExtension: schemaOrExtension
                     }
                 }, ex));
        } 
    }
    /**
         Async get code AST from source code
        
         params
         string tobeWizzifiedUri
         # The source code to get the AST
         string schemaOrExtension
         # The name for retrieving the wizzifier
         callback
         object AST
    */
    getCodeAST(tobeWizzifiedUri, schemaOrExtension, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'getCodeAST', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(tobeWizzifiedUri) === false) {
            return callback(error(
                'InvalidArgument', 'getCodeAST', { parameter: 'tobeWizzifiedUri', message: 'The tobeWizzifiedUri parameter must be a string. Received: ' + tobeWizzifiedUri }
            ));
        }
        if (verify.isNotEmpty(schemaOrExtension) === false) {
            return callback(error(
                'InvalidArgument', 'getCodeAST', { parameter: 'schemaOrExtension', message: 'The schemaOrExtension parameter must be a string. Received: ' + schemaOrExtension }
            ));
        }
        
        if (typeof(callback) !== 'function') {
            throw new Error(error('InvalidArgument', 'getCodeAST', 'The callback parameter must be a function. Received: ' + callback));
        }
        
        try {
            var tobeWizzifiedText = this.fileService.read(tobeWizzifiedUri);
        } 
        catch (ex) {
            return callback(error('WizziFactoryError', 'getCodeAST', {
                    message: 'See inner error', 
                    parameter: {
                        schemaOrExtension: schemaOrExtension, 
                        tobeWizzifiedUri: tobeWizzifiedUri
                     }
                 }, ex));
        } 
        this.getCodeASTFromText(tobeWizzifiedText, schemaOrExtension, callback)
    }
    /**
         Async wizzify source code
        
         params
         string tobeWizzifiedText
         # The source code to be wizzified
         string schemaOrExtension
         # The name for retrieving the wizzifier
         callback
         string ittfText
    */
    getCodeASTFromText(tobeWizzifiedText, schemaOrExtension, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'getCodeASTFromText', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(tobeWizzifiedText) === false) {
            return callback(error(
                'InvalidArgument', 'getCodeASTFromText', { parameter: 'tobeWizzifiedText', message: 'The tobeWizzifiedText parameter must be a string. Received: ' + tobeWizzifiedText }
            ));
        }
        if (verify.isNotEmpty(schemaOrExtension) === false) {
            return callback(error(
                'InvalidArgument', 'getCodeASTFromText', { parameter: 'schemaOrExtension', message: 'The schemaOrExtension parameter must be a string. Received: ' + schemaOrExtension }
            ));
        }
        
        if (typeof(callback) !== 'function') {
            throw new Error(error('InvalidArgument', 'getCodeAST', 'The callback parameter must be a function. Received: ' + callback));
        }
        
        var wizzifier = this.getWizzifier(schemaOrExtension);
        if (wizzifier.__is_error) {
            wizzifier.schemaOrExtension = schemaOrExtension;
            return callback(wizzifier);
        }
        
        try {
            // the instance of the WizziFactory passed to the getCodeAST function
            // (at the moment?) is not used; it is simply for coherence with other wizzifier calls.
            wizzifier.getCodeAST(tobeWizzifiedText, {
                wf: this
             }, function(err, result) {
                
                // loog 'wizzi.wizziFactory.getCodeAST', typeof(err), err, err.length, err.length && err.length > 0 && err[0]
                if (err) {
                    return callback(error('WizziFactoryError', 'getCodeAST', {
                            message: 'See inner error', 
                            parameter: {
                                schemaOrExtension: schemaOrExtension
                             }
                         }, err));
                }
                callback(null, result);
            })
        } 
        catch (ex) {
            return callback(error('WizziFactoryError', 'getCodeAST', {
                    message: 'See inner error', 
                    parameter: {
                        schemaOrExtension: schemaOrExtension
                     }
                 }, ex));
        } 
    }
    /**
         Get the list of schemas with a cheatsheet
         returns
         [
         {
         string name
         schema name
    */
    getCheatsheetList() {
        return this.pluginsManager.getCheatsheetList();
    }
    /**
         Check if a wizzi schema has a cheatsheet
         params
         string schemaName
         returns
         true|false
    */
    hasCheatsheet(schemaName) {
        if (verify.isNotEmpty(schemaName) === false) {
            return error(
                'InvalidArgument', 'hasCheatsheet', { parameter: 'schemaName', message: 'The schemaName parameter must be a string. Received: ' + schemaName }
            );
        }
        return this.pluginsManager.hasCheatsheetFolder(schemaName);
    }
    /**
         Get the cheatsheet of a wizzi schema
         params
         string schemaName
         returns
         { cheatsheet
    */
    getCheatsheet(schemaName, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'getCheatsheet', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(schemaName) === false) {
            return callback(error(
                'InvalidArgument', 'getCheatsheet', { parameter: 'schemaName', message: 'The schemaName parameter must be a string. Received: ' + schemaName }
            ));
        }
        
        var cheatsheet = this.cheatsheets[schemaName] || null;
        if (cheatsheet) {
            return callback(null, cheatsheet);
        }
        if (!this.hasCheatsheet(schemaName)) {
            return callback(null, {
                    name: schemaName, 
                    elements: [
                        {
                            name: 'Unavailable', 
                            items: [
                                {
                                    schema: schemaName, 
                                    render: 'artifact', 
                                    fragments: [
                                        
                                    ], 
                                    ittf: 'Unavailable', 
                                    ittfWrapper: 'Unavailable'
                                 }
                            ]
                         }
                    ]
                 });
        }
        var that = this;
        this.pluginsManager.getCheatsheetFolder(schemaName, function(err, packiCheatsheetFolder) {
            if (err) {
                return callback(err);
            }
            // loog 'wizziFactory.getCheatsheet.packiCheatsheetFolder', Object.keys(packiCheatsheetFolder)
            buildCheatsheet(that, schemaName, packiCheatsheetFolder, function(err, cheatsheet) {
                if (err) {
                    return callback(err);
                }
                that.cheatsheets[schemaName] = cheatsheet;
                return callback(null, cheatsheet);
            })
        })
    }
    /**
         Wizzify source code, generate from wizzified and
         JSON compare original and resulting synthax trees
        
         params
         string tobeWizzifiedUri
         # The file path to the source to be wizzified
         string wizzifierName
         # The name for retrieving the wizzifier
         callback
         {
         wizziIttf
         jsonDiffs
    */
    wizzifyWithCompare(tobeWizzifiedText, wizzifierName, artifactName, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'wizzifyWithCompare', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(tobeWizzifiedText) === false) {
            return callback(error(
                'InvalidArgument', 'wizzifyWithCompare', { parameter: 'tobeWizzifiedText', message: 'The tobeWizzifiedText parameter must be a string. Received: ' + tobeWizzifiedText }
            ));
        }
        if (verify.isNotEmpty(wizzifierName) === false) {
            return callback(error(
                'InvalidArgument', 'wizzifyWithCompare', { parameter: 'wizzifierName', message: 'The wizzifierName parameter must be a string. Received: ' + wizzifierName }
            ));
        }
        if (verify.isNotEmpty(artifactName) === false) {
            return callback(error(
                'InvalidArgument', 'wizzifyWithCompare', { parameter: 'artifactName', message: 'The artifactName parameter must be a string. Received: ' + artifactName }
            ));
        }
        
        // loog 'wizziFactory.wizzifyWithCompare', wizzifierName, artifactName
        
        var wizzifier = this.getWizzifier(wizzifierName);
        if (wizzifier.__is_error) {
            wizzifier.wizzifierName = wizzifierName;
            return callback(wizzifier);
        }
        
        var sourceSyntax;
        var wizzifiedGeneratedSyntax;
        
        try {
            wizzifier.getWizziIttf(tobeWizzifiedText, {
                wf: this, 
                onSyntax: syntax => 
                    // loog 'wizzifyWithCompare', 'input syntax:\n', JSON.stringify(syntax, null, 2)
                    sourceSyntax = syntax
                
             }, (err, wizzified) => {
                if (err) {
                    console.log("[31m%s[0m", err);
                    return callback(err);
                }
                // loog 'wizzifyWithCompare', 'wizzified input:\n', wizzified
                this.loadModelAndGenerateArtifactFromText(wizzified, {}, artifactName, (err, generatedFromWizzified) => {
                    if (err) {
                        console.log("[31m%s[0m", err);
                        return callback(err);
                    }
                    // loog 'wizzifyWithCompare', 'generatedFromWizzified:\n', generatedFromWizzified
                    wizzifier.getWizziIttf(generatedFromWizzified, {
                        wf: this, 
                        onSyntax: syntax => 
                            // loog 'wizzifyWithCompare', 'output syntax:\n', JSON.stringify(syntax, null, 2)
                            wizzifiedGeneratedSyntax = syntax
                        
                     }, (err, wizzified2) => {
                        if (err) {
                            console.log("[31m%s[0m", err);
                            return callback(err);
                        }
                        // loog 'wizzifyWithCompare', 'wizzified output:\n', wizzified2
                        // loog 'wizzifyWithCompare', 'sourceSyntax:\n', sourceSyntax
                        // loog 'wizzifyWithCompare', 'wizzifiedGeneratedSyntax:\n', wizzifiedGeneratedSyntax
                        let rawDiff = jsonDiff.diff(sourceSyntax, wizzifiedGeneratedSyntax, {
                            full: false
                         });
                        // loog 'rawDiff', rawDiff
                        let prettyDiff = verify.replaceAll(JSON.stringify(rawDiff), /,\[" "]/g, '');
                        // loog 'prettyDiff', prettyDiff
                        if (rawDiff) {
                            callback(null, {
                                equals: false, 
                                diffs: rawDiff
                             })
                        }
                        else {
                            callback(null, {
                                equals: true
                             })
                        }
                    }
                    )
                }
                )
            }
            )
        } 
        catch (ex) {
            return callback(error('WizziFactoryError', 'wizzifyWithCompare', {
                    message: 'See inner error', 
                    parameter: {
                        wizzifierName: wizzifierName
                     }
                 }, ex));
        } 
    }
    /**
         From an IttfDocument of schema "wfschema"
         async generate:
         - a WizziModelType
         - a WizziModelFactory
         - a WizziModelType test module
         - a WizziModelType json documentation
         - a WizziModelType html documentation
    */
    generateModelDoms(wfschemaIttfDocumentUri, outputPackagePath, wfschemaName, mTreeBuildUpContext, options, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'generateModelDoms', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(wfschemaIttfDocumentUri) === false) {
            return callback(error(
                'InvalidArgument', 'generateModelDoms', { parameter: 'wfschemaIttfDocumentUri', message: 'The wfschemaIttfDocumentUri parameter must be a string. Received: ' + wfschemaIttfDocumentUri }
            ));
        }
        if (verify.isNotEmpty(outputPackagePath) === false) {
            return callback(error(
                'InvalidArgument', 'generateModelDoms', { parameter: 'outputPackagePath', message: 'The outputPackagePath parameter must be a string. Received: ' + outputPackagePath }
            ));
        }
        if (verify.isNotEmpty(wfschemaName) === false) {
            return callback(error(
                'InvalidArgument', 'generateModelDoms', { parameter: 'wfschemaName', message: 'The wfschemaName parameter must be a string. Received: ' + wfschemaName }
            ));
        }
        if (verify.isObject(mTreeBuildUpContext) === false) {
            return callback(error(
                'InvalidArgument', 'generateModelDoms', { parameter: 'mTreeBuildUpContext', message: 'The mTreeBuildUpContext parameter must be an object. Received: ' + mTreeBuildUpContext }
            ));
        }
        if (verify.isObject(options) === false) {
            return callback(error(
                'InvalidArgument', 'generateModelDoms', { parameter: 'options', message: 'The options parameter must be an object. Received: ' + options }
            ));
        }
        
        options = options || {};
        
        var wizziSchemaLabFolder = path.join(outputPackagePath, 'lib', 'wizzi', 'schemas', 'lab');
        var wizziModelFolder = path.join(outputPackagePath, 'lib', 'wizzi', 'models');
        
        var paths = {
            model: path.join(wizziModelFolder, wfschemaName + '-model.g.js'), 
            factory: path.join(wizziModelFolder, wfschemaName + '-factory.g.js'), 
            lab: path.join(wizziSchemaLabFolder, wfschemaName + '-test.g.js'), 
            jsondocs: path.join(wizziModelFolder, wfschemaName + '-schema.g.json'), 
            htmldocs: path.join(wizziModelFolder, wfschemaName + '-schema.g.html')
         };
        
        try {
            this.generateModelDomsArtifacts(wfschemaIttfDocumentUri, mTreeBuildUpContext, options, function(err, generatedArtifacts) {
                if (err) {
                    return callback(err);
                }
                file.write(paths.model, generatedArtifacts.model)
                log.success('Generated WizziModel: ' + paths.model);
                file.write(paths.factory, generatedArtifacts.factory)
                log.success('Generated WizziModelFactory: ' + paths.factory);
                file.write(paths.lab, generatedArtifacts.lab)
                log.success('Generated WizziModel test: ' + paths.lab);
                file.write(paths.jsondocs, generatedArtifacts.jsondocs)
                log.success('Generated WizziModel json docs: ' + paths.jsondocs);
                file.write(paths.htmldocs, generatedArtifacts.htmldocs)
                log.success('Generated WizziModel html docs: ' + paths.htmldocs);
                callback(null, {
                    modelPath: paths.model, 
                    factoryPath: paths.factory, 
                    jsondocsPath: paths.jsondocs, 
                    htmldocsPath: paths.htmldocs
                 })
            })
        } 
        catch (ex) {
            return callback(error('WizziFactoryError', 'generateModelDoms', {
                    message: 'See inner error', 
                    parameter: {
                        wfschemaIttfDocumentUri: wfschemaIttfDocumentUri
                     }
                 }, ex));
        } 
        /**
             generate the wizzi model type artifacts
             from an IttfDocument of schema "/wzschema"
        */
    }
    generateModelDomsArtifacts(wfschemaIttfDocumentUri, mTreeBuildUpContext, options, callback) {
        
        var loadContext = {
            mTreeBuildUpContext: mTreeBuildUpContext
         };
        
        var that = this;
        var schemaSchemaName = "wzschema";
        if (options.legacyVersion == '0.8') {
            schemaSchemaName = "wfschema";
        }
        
        log.info('starting async load of wizzi model from wfschemaIttfDocumentUri: ' + wfschemaIttfDocumentUri);
        this.loadModel(schemaSchemaName, wfschemaIttfDocumentUri, loadContext, function(err, schemaWizziModel) {
            if (err) {
                return callback(err);
            }
            let bootWizziModel = null;
            if (options.legacyVersion == '0.8') {
                if (BootWizziSchema == null) {
                    BootWizziSchema = require(bootModelUri).WizziSchema;
                }
                bootWizziModel = new BootWizziSchema(schemaWizziModel.wzName);
                bootWizziModel.loadFromWizziModel(schemaWizziModel);
            }
            else {
                bootWizziModel = schemaWizziModel;
            }
            log.info('starting the artifact generator ' + schemaSchemaName + '/model' + ', legacy version: ' + options.legacyVersion);
            that.generateArtifact(bootWizziModel, bootModelDefUri, schemaSchemaName + '/model', loadContext, function(err, wizziModelArtifact) {
                if (err) {
                    return callback(err);
                }
                log.info('starting the artifact generator ' + schemaSchemaName + '/factory');
                that.generateArtifact(bootWizziModel, bootModelDefUri, schemaSchemaName + '/factory', loadContext, function(err, wizziFactoryArtifact) {
                    if (err) {
                        return callback(err);
                    }
                    log.info('starting the artifact generator ' + schemaSchemaName + '/test');
                    that.generateArtifact(bootWizziModel, bootModelDefUri, schemaSchemaName + '/test', loadContext, function(err, wizziTestArtifact) {
                        if (err) {
                            return callback(err);
                        }
                        that.transformModel(bootWizziModel, schemaSchemaName + '/json_docs', loadContext, function(err, wizziDocsObject) {
                            if (err) {
                                return callback(err);
                            }
                            var jsondocsJson = stringify(wizziDocsObject, null, 2);
                            log.info('starting the artifact generator ' + schemaSchemaName + '/html_docs');
                            that.generateArtifact(wizziDocsObject, bootModelDefUri, schemaSchemaName + '/html_docs', loadContext, function(err, wizziHtmlDocsArtifact) {
                                if (err) {
                                    return callback(err);
                                }
                                callback(null, {
                                    model: wizziModelArtifact, 
                                    factory: wizziFactoryArtifact, 
                                    test: wizziTestArtifact, 
                                    jsondocs: jsondocsJson, 
                                    htmldocs: wizziHtmlDocsArtifact
                                 })
                            })
                        })
                    })
                })
            })
        })
    }
    /**
         Executes a set of production steps
        
         params
         { productionStepsRequest
         { productionOptions
         { globalContext
         [ productionSteps
        
    */
    executeProductionSteps(productionStepsRequest, productionStepConfigs, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'executeProductionSteps', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isArray(productionStepConfigs) === false) {
            return callback(error(
                'InvalidArgument', 'executeProductionSteps', { parameter: 'productionStepConfigs', message: 'The productionStepConfigs parameter must be an array. Received: ' + productionStepConfigs }
            ));
        }
        
        // loog 'wizzi.wizziFactory.executeProductionSteps', productionStepConfigs.length
        
        var pman = this.createProductionManager(productionStepsRequest.productionOptions, productionStepsRequest.globalContext);
        if (pman && pman.__is_error) {
            console.log("[31m%s[0m", '__is_error ', pman);
            return callback(pman);
        }
        
        var i, i_items=productionStepConfigs, i_len=productionStepConfigs.length, ps;
        for (i=0; i<i_len; i++) {
            ps = productionStepConfigs[i];
            // loog 'ps.fileCtx', ps.fileCtx
            var notUsed = pman.addProductionStepRequest({
                ittfDocumentProduction: ps
             });
            if (notUsed && notUsed.__is_error) {
                console.log("[31m%s[0m", '__is_error ', notUsed);
                return callback(notUsed);
            }
        }
        
        try {
            pman.run(function(err, result) {
                if (err) {
                    return callback(err);
                }
                log.success('wizzi.wizziFactory.executeProductionSteps.' + productionStepsRequest.name + ' run completed');
                pman.persistToFile(function(err, persistResult) {
                    if (err) {
                        return callback(err);
                    }
                    log.success('wizzi.wizziFactory.executeProductionSteps.' + productionStepsRequest.name + ' persistToFile completed');
                    var result = {
                        persistResult: persistResult, 
                        productionContext: pman.productionContext
                     };
                    pman.terminate();
                    return callback(null, result);
                })
            })
        } 
        catch (ex) {
            return callback(error('WizziFactoryError', 'executeProductionSteps', {
                    message: 'See inner error', 
                    parameter: {
                        productionStepsName: productionStepsRequest.name
                     }
                 }, ex));
        } 
    }
    /**
         Execute a wizzi job
        
         params
         { jobRequest type 1
         string name
         string path
         # path to the `wzjob` ittf document that the wizzi.production.programManager will load.
         { productionOptions
         { globalContext
         { jobRequest type 2
         { wzjobModel
         # `wzjob` wizzi model, built programmatically or previously loaded
         { productionOptions
         { globalContext
        
    */
    executeJob(jobRequest, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'executeJob', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isObject(jobRequest) === false) {
            return callback(error(
                'InvalidArgument', 'executeJob', { parameter: 'jobRequest', message: 'The jobRequest parameter must be an object. Received: ' + jobRequest }
            ));
        }
        if (verify.isObject(jobRequest.productionOptions) === false) {
            return callback(error(
                'InvalidArgument', 'executeJob', { parameter: 'jobRequest.productionOptions', message: 'The jobRequest.productionOptions parameter must be an object. Received: ' + jobRequest.productionOptions }
            ));
        }
        
        console.log("[33m%s[0m", 'wizzi.wizziFactory.executeJob.jobRequest', jobRequest);
        
        
        // jobRequest type 1
        if (verify.isNotEmpty(jobRequest.path)) {
            this._executeJob_by_path(jobRequest, callback)
        }
        // jobRequest type 2
        else {
            this._executeJob_by_wzjobModel(jobRequest, callback)
        }
    }
    _executeJob_by_path(jobRequest, callback) {
        var that = this;
        this.storePool.get(function(err, store) {
            if (err) {
                return callback(err);
            }
            store.documentExists(jobRequest.path, function(err, exists) {
                if (err) {
                    return callback(err);
                }
                // loog 'exists', exists
                if (!exists) {
                    return callback(error('NotFound', '_executeJob_by_path', 'Cannot find wzjob ittf document: ' + jobRequest.path));
                }
                else {
                    console.log('wizzi.wizziFactory._executeJob_by_path,jobRequest.globalContext', jobRequest.globalContext);
                    var pman = that.createProductionManager(jobRequest.productionOptions, jobRequest.globalContext);
                    if (pman && pman.__is_error) {
                        console.log("[31m%s[0m", '__is_error ', pman);
                        return callback(pman);
                    }
                    
                    var notUsed = pman.addWzjobRequest({
                        wzjob: {
                            ittfDocumentUri: jobRequest.path
                         }
                     });
                    if (notUsed && notUsed.__is_error) {
                        console.log("[31m%s[0m", '__is_error ', notUsed);
                        return callback(notUsed);
                    }
                    
                    console.log('wizzi.wizziFactory._executeJob_by_path,pman.globalContext()', pman.globalContext());
                    
                    try {
                        pman.run(function(err, result) {
                            if (err) {
                                return callback(err);
                            }
                            log.success('wizzi.wizziFactory.executeJob.' + jobRequest.name + ' run completed');
                            pman.persistToFile(function(err, persistResult) {
                                if (err) {
                                    return callback(err);
                                }
                                log.success('wizzi.wizziFactory.executeJob.' + jobRequest.name + ' persistToFile completed');
                                var result = {
                                    persistResult: persistResult, 
                                    productionContext: pman.productionContext
                                 };
                                pman.terminate();
                                return callback(null, result);
                            })
                        })
                    } 
                    catch (ex) {
                        return callback(error('WizziFactoryError', '_executeJob_by_path', {
                                message: 'See inner error', 
                                parameter: {
                                    wzjobIttfDocumentUri: jobRequest.path
                                 }
                             }, ex));
                    } 
                }
            })
        })
    }
    _executeJob_by_wzjobModel(jobRequest, callback) {
        throw new Error('wizzi.wizziFactory._executeJob_by_wzjobModel not implemented.');
    }
    /**
         Execute a meta generation
         The current instance should be a json factory
         return
         | packifiles
         | wzError
         params
         string ittfMetaFilePath
         { context
         { modelRequestContext
         { metaCtx
         { options
         string tempFolder
         string destFolder
         string copyInclude
         optional
         default ['*']
         string copyExclude
         optional
         default []
         returns
         [
         string generatedFilePath
    */
    metaGenerate(ittfMetaFilePath, context, options, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'metaGenerate', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(ittfMetaFilePath) === false) {
            return callback(error(
                'InvalidArgument', 'metaGenerate', { parameter: 'ittfMetaFilePath', message: 'The ittfMetaFilePath parameter must be a string. Received: ' + ittfMetaFilePath }
            ));
        }
        if (verify.isObject(context) === false) {
            return callback(error(
                'InvalidArgument', 'metaGenerate', { parameter: 'context', message: 'The context parameter must be an object. Received: ' + context }
            ));
        }
        if (verify.isObject(options) === false) {
            return callback(error(
                'InvalidArgument', 'metaGenerate', { parameter: 'options', message: 'The options parameter must be an object. Received: ' + options }
            ));
        }
        
        var tempFolder = options.tempFolder;
        var resolved_tempFolder = verify.resolveToString(tempFolder);
        // loog 'resolved_tempFolder', resolved_tempFolder
        if (verify.isNotEmpty(resolved_tempFolder) === false) {
            return callback(error('InvalidArgument', 'metaGenerate.options', {
                    parameter: 'tempFolder', 
                    message: "'tempFolder' must be a not empty string. Received: " + util.inspect(tempFolder, { depth: null })
                 }));
        }
        else {
            tempFolder = resolved_tempFolder;
        }
        var destFolder = options.destFolder;
        var resolved_destFolder = verify.resolveToString(destFolder);
        // loog 'resolved_destFolder', resolved_destFolder
        if (verify.isNotEmpty(resolved_destFolder) === false) {
            return callback(error('InvalidArgument', 'metaGenerate.options', {
                    parameter: 'destFolder', 
                    message: "'destFolder' must be a not empty string. Received: " + util.inspect(destFolder, { depth: null })
                 }));
        }
        else {
            destFolder = resolved_destFolder;
        }
        
        
        if (ittfMetaFilePath.toLowerCase().endsWith('.ittf.ittf') == false) {
            return callback(error('InvalidArgument', 'metaGenerate', {
                    parameter: 'ittfMetaFilePath', 
                    message: "'ittfMetaFilePath' must have a Wizzi Schema of type 'ittf'. Received: " + ittfMetaFilePath
                 }));
        }
        
        const fileService = this.fileService;
        const that = this;
        
        
        this.loadModel('ittf', ittfMetaFilePath, {
            mTreeBuildUpContext: context.modelRequestContext
         }, (err, metaFileModel) => {
            if (err) {
                console.log("[31m%s[0m", err);
                return callback(err);
            }
            var f_count = 0;
            (function next() {
                var child = metaFileModel.children[f_count++];
                
                /**
                    * The tempFolder is ready
                    * Go with the final generation into destFolder
                    * The current instance should be a json factory
                */
                if (!child) {
                    return that.getPackiFilesFromJsonFactory('', (err, readyPackiFiles) => {
                            if (err) {
                                console.log("[31m%s[0m", err);
                                return callback(err);
                            }
                            if (context.modelRequestContext.metaCtx.__wz_fsc) {
                                context.modelRequestContext.metaCtx.__wz_fsc.addDebugObject('packi', 'wf_metaGenerate_ready', readyPackiFiles)
                            }
                            that.generateFolderArtifacts(tempFolder, {
                                modelRequestContext: context.modelRequestContext, 
                                artifactRequestContext: context.artifactRequestContext || context.modelRequestContext
                             }, {
                                deep: true, 
                                destFolder: destFolder, 
                                generateFragments: true, 
                                copyInclude: options.copyInclude || ['*'], 
                                copyExclude: options.copyExclude || [], 
                                useMultiPartContext: true
                             }, (err, result) => {
                                if (err) {
                                    console.log("[31m%s[0m", err);
                                    return callback(err);
                                }
                                return callback(null, result);
                            }
                            )
                        }
                        );
                }
                if (child.name == '$file') {
                    try {
                        processIttfFile(child, tempFolder, (err, notUsed) => {
                            if (err) {
                                console.log("[31m%s[0m", err);
                                return callback(err);
                            }
                            next();
                        }
                        )
                    } 
                    catch (ex) {
                        return callback(error('WizziFactoryError', 'metaGenerate', {
                                message: 'Processing $file. See inner error', 
                                parameter: {
                                    outputFileName: child.value
                                 }
                             }, ex));
                    } 
                }
                else if (child.name == '$plain') {
                    try {
                        processPlainFile(child, tempFolder, (err, notUsed) => {
                            if (err) {
                                console.log("[31m%s[0m", err);
                                return callback(err);
                            }
                            next();
                        }
                        )
                    } 
                    catch (ex) {
                        return callback(error('WizziFactoryError', 'metaGenerate', {
                                message: 'Processing $plain. See inner error', 
                                parameter: {
                                    outputFileName: child.value
                                 }
                             }, ex));
                    } 
                }
                else {
                    next();
                }
            })();
        }
        )
        function processIttfFile(node, tempFolder, callback) {
            var outputPath = path.join(tempFolder, node.value);
            var sb = [];
            var i, i_items=node.children, i_len=node.children.length, child;
            for (i=0; i<i_len; i++) {
                child = node.children[i];
                processIttfContent(sb, child, 0)
            }
            fileService.write(outputPath, sb.join('\n'), callback)
        }
        function processIttfContent(sb, node, indent) {
            sb.push(new Array(indent).join(' ') + decode(node.name) + ' ' + decode(node.value))
            var i, i_items=node.children, i_len=node.children.length, child;
            for (i=0; i<i_len; i++) {
                child = node.children[i];
                processIttfContent(sb, child, indent + 4)
            }
        }
        function processPlainFile(node, tempFolder, callback) {
            var outputPath = path.join(tempFolder, node.value);
            if (node.children.length == 1 && node.children[0].name == '$from') {
                fileService.read(packiFilePrefix + node.children[0].value, (err, content) => {
                    if (err) {
                        console.log("[31m%s[0m", err);
                        return callback(err);
                    }
                    fileService.write(outputPath, content, callback)
                }
                )
            }
            else {
                return callback(error('WizziFactoryError', 'metaGenerate', {
                        message: 'Missing $from node processing $plain file.', 
                        parameter: {
                            outputFileName: node.value
                         }
                     }));
            }
        }
        function decode(text) {
            text = verify.replaceAll(text, "$", "$");
            return verify.replaceAll(text, "£'('£", "(");
        }
    }
    /**
         Execute a meta production
         . retrieve the MetasManager instantiated by this WizziFactory
         . call the getMetaProductionStarter method of the MetasManager to scan the metaPlugins and retrieve
         a packiFiles object with every meta ittf document of the used MetaProductions
         . build and add to the received packiFiles object an index meta ittf document
         containing the $include of the 'folderTemplates/<ProductionName>/index.ittf.ittf' document
         of every used MetaProduction.
         . create a new json WizziFactory based on the received packiFiles object
         . call the WizziFactory.metaGenerate method on the new json WizziFactory.
         . returns a packiFiles object with the full content of the json WizziFactory
         file system: meta ittf documents, tempProductionFolder and wizziProductionFolder.
         . the wizziProductionFolder contains the resulting WizziProduction that will be persisted by the calling agent.
         return
         | packifiles
         | wzError
         params
         { options
         { metaCtx
         { globalContext
         { paths
         string tempProductionFolder
         optional
         string wizziProductionFolder
         optional
         [ productions
         optional
         {
         string name
         { folderTemplates
         :ref PackiFiles
         { ittfDocumentTemplates
         :ref PackiFiles
         { plainDocuments
         :ref PackiFiles
         :optional
    */
    executeMetaProduction(options, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'executeMetaProduction', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        
        const folderTemplatesIndexPath = "folderTemplates/index.ittf.ittf";
        
        this.getMetasManager({}, (err, mm) => {
            if (err) {
                console.log("[31m%s[0m", err);
                return callback(err);
            }
            mm.getMetaProductionStarter({
                metaCtx: options.metaCtx
             }, (err, metaPackiFiles) => {
                if (err) {
                    console.log("[31m%s[0m", err);
                    return callback(err);
                }
                if (options.metaCtx.__wz_fsc) {
                    options.metaCtx.__wz_fsc.addDebugObject('packi', 'wf_metaProduction_input', metaPackiFiles)
                }
                metaPackiFiles[folderTemplatesIndexPath] = {
                    type: "CODE", 
                    contents: this.prepareFilesAndGetFolderTemplatesIndex(metaPackiFiles, {
                        pkgPath: null, 
                        metaVer: null
                     })
                 };
                if (options.metaCtx.__wz_fsc) {
                    options.metaCtx.__wz_fsc.addDebugObject('packi', 'wf_metaProduction_input_prepared', metaPackiFiles)
                }
                this.createJsonFactoryAndJsonFs(metaPackiFiles, {
                    globalContext: options.globalContext || {}
                 }, (err, wf_and_jsonFs) => {
                    if (err) {
                        console.log("[31m%s[0m", err);
                        return callback(err);
                    }
                    console.log("[31m%s[0m", 'options.paths && options.paths.metaProductionTempFolder', options.paths && options.paths.metaProductionTempFolder);
                    console.log("[31m%s[0m", 'metaProductionTempFolder', metaProductionTempFolder);
                    const tempFolder = (options.paths && options.paths.metaProductionTempFolder) || metaProductionTempFolder;
                    const destFolder = (options.paths && options.paths.metaProductionWizziFolder) || metaProductionWizziFolder;
                    wf_and_jsonFs.wf.metaGenerate(packiFilePrefix + folderTemplatesIndexPath, {
                        modelRequestContext: {
                            metaCtx: options.metaCtx
                         }
                     }, {
                        tempFolder: packiFilePrefix + tempFolder, 
                        destFolder: packiFilePrefix + destFolder
                     }, (err, generatedFilePaths) => {
                        if (err) {
                            console.log("[31m%s[0m", err);
                            return callback(err);
                        }
                        packiUtils.jsonFsToPackiFiles(wf_and_jsonFs.jsonFs, destFolder, (err, wizziPackiFiles) => {
                            if (err) {
                                console.log("[31m%s[0m", err);
                                return callback(err);
                            }
                            if (options.metaCtx.__wz_fsc) {
                                options.metaCtx.__wz_fsc.addDebugObject('packi', 'wf_metaProduction_output', wizziPackiFiles)
                            }
                            return callback(null, wizziPackiFiles);
                        }
                        )
                    }
                    )
                }
                )
            }
            )
        }
        )
    }
    /**
         Prepare the file structure to allow includes
         of ittfDocumentTemplates files by folderTemplates files
         and create the folderTemplates index file
         for a given set of meta packiFiles.
         ittfDocumentTemplates folders become subfolders of the top tFolder of the metaPackiFiles.
         The object metaPackiFiles is modified in place.
         return
         | string fileContent
         params
         { metaPackiFiles
         { options
         string pkgPath
         optional
         string metaVer
         optional
    */
    prepareFilesAndGetFolderTemplatesIndex(metaPackiFiles, options) {
        const pkgPath = options.pkgPath || '';
        const metaVer = options.metaVer || '0_0_1';
        const folderTemplatesIndex = [
            "template root", 
            "    $", 
            "        var pkgPath = '" + pkgPath + "'", 
            "        var metaVer = '" + metaVer + "'"
        ];
        for (var k in metaPackiFiles) {
            if (k.startsWith("folderTemplates/")) {
                if (k.indexOf("/t/") < 0) {
                    folderTemplatesIndex.push("    $include ./" + k.substring(16, k.length - 10))
                }
                const newk = k.substring(0, 15) + '/t/' + k.substring(16);
                metaPackiFiles[newk] = metaPackiFiles[k];
                delete metaPackiFiles[k]
            }
            else if (k.startsWith("ittfDocumentTemplates/")) {
                const newk = 't/' + k.substring(22);
                metaPackiFiles[newk] = metaPackiFiles[k];
                delete metaPackiFiles[k]
            }
            else if (k.startsWith("plainDocuments/")) {
                const newk = k.substring(16);
            }
        }
        return folderTemplatesIndex.join('\n');
    }
    getMetasManager(globalContext, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'getMetasManager', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        
        if (this.metasManager) {
            return callback(null, this.metasManager);
        }
        var metasManager = require('./metasManager');
        metasManager.createManager({
            metaPlugins: this.metaPluginsOptions, 
            globalContext: globalContext || {}, 
            verbose: this.verbose
         }, (err, metasManager) => {
            if (err) {
                console.log("[31m%s[0m", err);
                return callback(err);
            }
            this.metasManager = metasManager;
            return callback(null, this.metasManager);
        }
        )
    }
    getProvidedMetas(callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'getProvidedMetas', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        this.getMetasManager({}, (err, mm) => {
            if (err) {
                console.log("[31m%s[0m", err);
                return callback(err);
            }
            mm.getProvidedMetas((err, providedMetas) => {
                if (err) {
                    console.log("[31m%s[0m", err);
                    return callback(err);
                }
                return callback(null, providedMetas);
            }
            )
        }
        )
    }
    /**
         Retrieve the parameters for a given set of meta productions
         return
         | func wizzi-plugin.modelFactory.loadModel
         | wzError NotFound
         params
         { options
         { metaCtx
         bool use<MetaProductionName>
    */
    getMetaParameters(options, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'getMetaParameters', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        // loog 'wizziFactory.getMetaParameters.options', options
        this.getMetasManager({}, (err, mm) => {
            if (err) {
                console.log("[31m%s[0m", err);
                return callback(err);
            }
            mm.getMetaParametersStarter(options || {}, (err, metaParameters) => {
                if (err) {
                    console.log("[31m%s[0m", err);
                    return callback(err);
                }
                return callback(null, metaParameters);
            }
            )
        }
        )
    }
    getMetaProductions(options, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'getMetaProductions', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        this.getMetasManager({}, (err, mm) => {
            if (err) {
                console.log("[31m%s[0m", err);
                return callback(err);
            }
            mm.getMetaProductionStarter(options | {}, (err, metaProductions) => {
                if (err) {
                    console.log("[31m%s[0m", err);
                    return callback(err);
                }
                return callback(null, metaProductions);
            }
            )
        }
        )
    }
    getCategoriesAndMetaProductions(options, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'getCategoriesAndMetaProductions', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        this.getMetasManager({}, (err, mm) => {
            if (err) {
                console.log("[31m%s[0m", err);
                return callback(err);
            }
            mm.getCategoryAndMetaProductionStarter(options | {}, (err, categoriesAndMetaProductions) => {
                if (err) {
                    console.log("[31m%s[0m", err);
                    return callback(err);
                }
                return callback(null, categoriesAndMetaProductions);
            }
            )
        }
        )
    }
    getProvidedMetas(callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'getProvidedMetas', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        this.getMetasManager({}, (err, mm) => {
            if (err) {
                console.log("[31m%s[0m", err);
                return callback(err);
            }
            mm.getProvidedMetas((err, providedMetas) => {
                if (err) {
                    console.log("[31m%s[0m", err);
                    return callback(err);
                }
                return callback(null, providedMetas);
            }
            )
        }
        )
    }
    /**
         Writes the content of a Wizzi Model of schema `ittf`
         into a PackiFiles object, processing the $file and $plain Ittf Commands.
         The current instance should be a json factory
         params
         { ittfModel
         { options
         string baseDestFolder
         returns
         | packifiles
         | wzError
    */
    ittfModelToFolder(ittfModel, options, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'ittfModelToFolder', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isObject(ittfModel) === false) {
            return callback(error(
                'InvalidArgument', 'ittfModelToFolder', { parameter: 'ittfModel', message: 'The ittfModel parameter must be an object. Received: ' + ittfModel }
            ));
        }
        if (verify.isObject(options) === false) {
            return callback(error(
                'InvalidArgument', 'ittfModelToFolder', { parameter: 'options', message: 'The options parameter must be an object. Received: ' + options }
            ));
        }
        
        if (this.storeKind != 'json') {
            var packiFiles = {};
            return this.createJsonFactoryAndJsonFs(packiFiles, {}, (err, wfJsonFs) => {
                    if (err) {
                        console.log("[31m%s[0m", err);
                        return callback(err);
                    }
                    wfJsonFs.wf.ittfModelToFolder(ittfModel, options, callback)
                }
                );
        }
        
        const baseDestFolder = packiFilePrefix + (options.baseDestFolder || "");
        // loog 'baseDestFolder', baseDestFolder, options.baseDestFolder
        const fileService = this.fileService;
        var f_count = 0;
        var that = this;
        (function next() {
            var child = ittfModel.children[f_count++];
            
            /**
                * The baseDestFolder is ready
            */
            if (!child) {
                return that.getPackiFilesFromJsonFactory('', (err, readyPackiFiles) => {
                        if (err) {
                            console.log("[31m%s[0m", err);
                            return callback(err);
                        }
                        return callback(null, readyPackiFiles);
                    }
                    );
            }
            if (child.name == '$file') {
                try {
                    processIttfFile(child, baseDestFolder, (err, notUsed) => {
                        if (err) {
                            console.log("[31m%s[0m", err);
                            return callback(err);
                        }
                        next();
                    }
                    )
                } 
                catch (ex) {
                    return callback(error('WizziFactoryError', 'ittfModelToFolder', {
                            message: 'Processing $file. See inner error', 
                            parameter: {
                                outputFileName: child.value
                             }
                         }, ex));
                } 
            }
            else if (child.name == '$plain') {
                try {
                    processPlainFile(child, baseDestFolder, (err, notUsed) => {
                        if (err) {
                            console.log("[31m%s[0m", err);
                            return callback(err);
                        }
                        next();
                    }
                    )
                } 
                catch (ex) {
                    return callback(error('WizziFactoryError', 'ittfModelToFolder', {
                            message: 'Processing $plain. See inner error', 
                            parameter: {
                                outputFileName: child.value
                             }
                         }, ex));
                } 
            }
            else {
                next();
            }
        })();
        function processIttfFile(node, baseDestFolder, callback) {
            var outputPath = path.join(baseDestFolder, node.value);
            var sb = [];
            var i, i_items=node.children, i_len=node.children.length, child;
            for (i=0; i<i_len; i++) {
                child = node.children[i];
                processIttfContent(sb, child, 0)
            }
            fileService.write(outputPath, sb.join('\n'), callback)
        }
        function processIttfContent(sb, node, indent) {
            sb.push(new Array(indent).join(' ') + decode(node.name) + ' ' + decode(node.value))
            var i, i_items=node.children, i_len=node.children.length, child;
            for (i=0; i<i_len; i++) {
                child = node.children[i];
                processIttfContent(sb, child, indent + 4)
            }
        }
        function processPlainFile(node, baseDestFolder, callback) {
            var outputPath = path.join(baseDestFolder, node.value);
            if (node.children.length == 1 && node.children[0].name == '$from') {
                fileService.read(packiFilePrefix + node.children[0].value, (err, content) => {
                    if (err) {
                        console.log("[31m%s[0m", err);
                        return callback(err);
                    }
                    fileService.write(outputPath, content, callback)
                }
                )
            }
            else {
                return callback(error('WizziFactoryError', 'ittfModelToFolder', {
                        message: 'Missing $from node processing $plain file.', 
                        parameter: {
                            outputFileName: node.value
                         }
                     }));
            }
        }
        function decode(text) {
            text = verify.replaceAll(text, "$", "$");
            return verify.replaceAll(text, "£'('£", "(");
        }
    }
    /**
         This allows model loadings and generations from text strings
         params
         string ittfContent
         string schema
         { options
         { globalContext
         optional
         returns
         {
         { wizziFactory
         :ref WizziFactory
         string ittfDocumentUri
        
    */
    createSingleTextSourceFactory(ittfContent, schema, options, callback) {
        if (verify.isNotEmpty(ittfContent) === false) {
            return error(
                'InvalidArgument', 'createSingleTextSourceFactory', { parameter: 'ittfContent', message: 'The ittfContent parameter must be a string. Received: ' + ittfContent }
            );
        }
        if (verify.isNotEmpty(schema) === false) {
            return error(
                'InvalidArgument', 'createSingleTextSourceFactory', { parameter: 'schema', message: 'The schema parameter must be a string. Received: ' + schema }
            );
        }
        if (typeof callback === 'undefined') {
            callback = options;
            options = {};
        }
        if (typeof(callback) !== 'function') {
            throw new Error(error('InvalidArgument', 'WizziFactory.createSingleTextSourceFactory', 'The callback parameter must be a function. Received: ' + callback));
        }
        var tempIttfDocumentUri = "c:/basefolder/temp." + schema + '.ittf';
        var documents = [
            {
                path: tempIttfDocumentUri, 
                content: ittfContent
             }
        ];
        try {
            JsonComponents.createJsonFsData(documents, (err, jsonFsData) => {
                if (err) {
                    console.log("[31m%s[0m", err);
                    return callback(err);
                }
                options.jsonFsData = jsonFsData;
                this.createJsonFactory(options, function(err, wf) {
                    if (err) {
                        return callback(err);
                    }
                    return callback(null, {
                            wizziFactory: wf, 
                            ittfDocumentUri: tempIttfDocumentUri
                         });
                })
            }
            )
        } 
        catch (ex) {
            return callback(error('WizziFactoryError', 'createSingleTextSourceFactory', {
                    message: 'See inner error', 
                    parameter: {
                        
                     }
                 }, ex));
        } 
    }
    /**
         Creates a json factory and its json file system from a packiFiles object
         params
         { packiFiles
         { options
         { globalContext
         optional
         returns
         {
         { wf
         :ref WizziFactory
         { jsonFs
         :ref @wizzi/repo/JsonFs
        
    */
    createJsonFactoryAndJsonFs(packiFiles, options, callback) {
        
        const jsonDocuments = [];
        Object.keys(packiFiles).map((key) => {
            if (packiFiles[key].type === 'CODE' && verify.isNotEmpty(packiFiles[key].contents)) {
                const filePath = packiUtils.ensurePackiFilePrefix(key);
                jsonDocuments.push({
                    path: filePath, 
                    content: packiFiles[key].contents
                 })
            }
        }
        )
        JsonComponents.createJsonFs(jsonDocuments, (err, jsonFs) => {
            if (err) {
                console.log("[31m%s[0m", err);
                return callback(err);
            }
            options.jsonFs = jsonFs;
            this.createJsonFactory(options, (err, wf) => {
                if (err) {
                    console.log("[31m%s[0m", err);
                    return callback(err);
                }
                callback(null, {
                    wf: wf, 
                    jsonFs: jsonFs
                 })
            }
            )
        }
        )
    }
    /**
         Creates an internal JSON factory
         with same factory plugins as this, and no meta plugins.
         params
         { options
         one-of
         { jsonFs
         :ref @wizzi/repo/JsonFs
         { jsonFsData
         :ref @wizzi/repo/JsonFsData
         { globalContext
         optional
    */
    createJsonFactory(options, callback) {
        
        var wf = new WizziFactory(this.user, this.role);
        
        wf.initialize({
            repo: {
                storeKind: 'json', 
                storeJsonFs: options.jsonFs, 
                storeJsonFsData: options.jsonFsData
             }, 
            plugins: this.pluginsOptions, 
            globalContext: options.globalContext || {}
         }, callback)
    }
    getPackiFilesFromJsonFactory(destFolder, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'getPackiFilesFromJsonFactory', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (this.storePool.getKind() == 'json') {
            packiUtils.jsonFsToPackiFiles(this.storePool.getJsonFs(), destFolder, callback)
        }
        else {
            callback(error('InvalidOperation', 'getPackiFilesFromJsonFactory', 'This instance is not a json factory', this.storePool.kind))
        }
    }
    /**
         Creates a fs factory
         with same factory plugins as this, and no meta plugins.
         params
         { options
         bool reuse
         { globalContext
         optional
    */
    createFsFactory(options, callback) {
        
        if (options && options.reuse && this.storeKind == 'filesystem') {
            return callback(null, this);
        }
        
        var wf = new WizziFactory(this.user, this.role);
        
        wf.initialize({
            repo: {
                storeKind: 'filesystem'
             }, 
            plugins: this.pluginsOptions, 
            globalContext: options.globalContext || {}
         }, callback)
    }
    getInfo() {
        return {
                user: this.user, 
                role: this.role, 
                storeKind: this.storeKind, 
                store: this.store.getInfo(), 
                pluginsManager: this.pluginsManager.getInfo(), 
                globalContext: this.globalContext, 
                __is_test: this.__is_test, 
                testOptions: this.testOptions
             };
    }
    getProvidedCheatsheetFolders() {
        var info = this.getInfo();
        return info.pluginsManager.providedCheatsheetFolders;
    }
    mapIttfDocumentPathToSchema(ittfDocumentPath) {
        return this.pluginsManager.mapIttfDocumentPathToSchema(ittfDocumentPath);
    }
    mapIttfDocumentPathToDefaultArtifact(ittfDocumentPath) {
        return this.pluginsManager.mapIttfDocumentPathToDefaultArtifact(ittfDocumentPath);
    }
    mapIttfDocumentPathToPluginDependencies(ittfDocumentPath) {
        return this.pluginsManager.mapIttfDocumentPathToPluginDependencies(ittfDocumentPath);
    }
    mapExtensionToSchema(extension) {
        return this.pluginsManager.mapExtensionToSchema(extension);
    }
    mapSchemaToDefaultArtifact(schema) {
        return this.pluginsManager.mapSchemaToDefaultArtifact(schema);
    }
    getSchemaArtifacts(schema) {
        return this.pluginsManager.getSchemaArtifacts(schema);
    }
    mapArtifactToContentType(artifactName) {
        return this.pluginsManager.mapArtifactToContentType(artifactName);
    }
    mapSchemaToRootTag(schema) {
        return this.pluginsManager.mapSchemaToRootTag(schema);
    }
}
function detectSchema(ittfDocumentUri) {
    if (verify.isNotEmpty(ittfDocumentUri) === false) {
        return error(
            'InvalidArgument', 'detectSchema', { parameter: 'ittfDocumentUri', message: 'The ittfDocumentUri parameter must be a string. Received: ' + ittfDocumentUri }
        );
    }
    
    var parts = path.basename(ittfDocumentUri).split('.');
    if (parts.length < 3) {
        return error('InvalidIttfDocumentUri', 'detectSchema', 'IttfDocumentUri basename must contain at least 3 parts separated by a dot. Received: ' + path.basename(ittfDocumentUri) + ' in IttfDocumentUri: ' + ittfDocumentUri);
    }
    var ittf = parts[parts.length-1];
    if (ittf.toLowerCase() != 'ittf') {
        return error('InvalidIttfDocumentUri', 'detectSchema', 'IttfDocumentUri extension must be ".ittf". Received: ' + ittf + ' in IttfDocumentUri: ' + ittfDocumentUri);
    }
    return parts[parts.length-2];
}
function getProductionManager() {
    if (ProductionManager == null) {
        ProductionManager = require('../production/manager');
    }
    return ProductionManager;
}
var DEFAULT_ARTIFACTS = {
    css: 'css/document', 
    graphql: 'graphql/docs', 
    html: 'html/document', 
    js: 'js/module', 
    json: 'json/document', 
    scss: 'scss/document', 
    text: 'text/document', 
    ts: 'ts/module', 
    xml: 'xml/document', 
    ittf: 'ittf/document', 
    vtt: 'vtt/document', 
    vue: 'vue/document'
 };
function getDefaultArtifact(schema) {
    return DEFAULT_ARTIFACTS[schema];
}
module.exports = {
    createFactory: function(user, role, options, callback) {
        // loog 'wizzi.wizziFactory.createFactory.options', options
        
        // no ACL required
        if (typeof(callback) === 'undefined' && typeof(options) === 'undefined') {
            options = user;
            callback = role;
        }
        // loog 'wizzi.wizziFactory.createFactory.globalContext', options.globalContext
        var wf = new WizziFactory();
        wf.initialize(options, callback)
    }
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
        method: 'wizzi@0.8.45.wizziFactory.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}