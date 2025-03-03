/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\root\index.js.ittf
    utc time: Tue, 21 Jan 2025 14:15:35 GMT
*/
var verify = require('@wizzi/utils').verify;
var util = require('util');
var path = require('path');
var chalk = require('chalk');
var async = require('async');
var stringify = require('json-stringify-safe');

var verify = require('@wizzi/utils').verify;
var log = require('./lib/util/log')(module);
var acl = require('./lib/acl');
var ProductionManager = require('./lib/production/manager');
var Filesystem = require('./lib/io/filesystem');
var wizziFactory = require('./lib/services/wizziFactory');
var metasManager = require('./lib/services/metasManager');
var packiManager = require('./lib/services/packiManager');

var md = module.exports = {};
md.version = "0.8.46";
md.file = require('@wizzi/utils').file;
md.verify = verify;
md.config = require('@wizzi/utils').config;
md.genContext = require('./lib/production/artifact/genContext');
md.acl = acl;
md.productionOptions = require('./lib/production/options');
md.Filesystem = Filesystem;
md.JsonComponents = require('@wizzi/repo').JsonComponents;
md.FactoryServiceContext = require('./lib/services/factoryServiceContext');
md.constants = require('./lib/constants');
md.errors = require('./lib/errors');

/**
     params
     { options
     { repo
     string storeKind
     oneOf filesystem, mongodb, localstorage
     { plugins
     [ items
     string pluginName
     string
     { globalContext
     { dumps
     string dumpsBaseFolder
     { mTreeBuildUpScript
     boolean dump
     string dumpsBaseFolder
*/
md.createFactory = function createFactory(options, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', 'createFactory', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isObject(options) === false) {
        return callback(error(
            'InvalidArgument', 'createFactory', { parameter: 'options', message: 'The options parameter must be an object. Received: ' + options }
        ));
    }
    
    // check_cb( callback, createFactory )
    // check_cb_object( options, createFactory )
    
    wizziFactory.createFactory(options, callback)
}
;

/**
     params
     string userid
     string role
     { options
     { repo
     string storeKind
     oneOf filesystem, mongodb, localstorage
     { plugins
     [ items
     string pluginName
     string
     { globalContext
     { dumps
     string dumpsBaseFolder
     { mTreeBuildUpScript
     boolean dump
     string dumpsBaseFolder
*/
md.createAclFactory = function createAclFactory(userid, role, options, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', 'createAclFactory', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isNotEmpty(userid) === false) {
        return callback(error(
            'InvalidArgument', 'createAclFactory', { parameter: 'userid', message: 'The userid parameter must be a string. Received: ' + userid }
        ));
    }
    if (verify.isNotEmpty(role) === false) {
        return callback(error(
            'InvalidArgument', 'createAclFactory', { parameter: 'role', message: 'The role parameter must be a string. Received: ' + role }
        ));
    }
    if (verify.isObject(options) === false) {
        return callback(error(
            'InvalidArgument', 'createAclFactory', { parameter: 'options', message: 'The options parameter must be an object. Received: ' + options }
        ));
    }
    
    // check_cb( callback, createFactory )
    // check_cb_object( options, createFactory )
    
    wizziFactory.createFactory(userid, role, options, callback)
}
;

md.fsFactory = function(options, callback) {
    
    if (typeof(callback) === 'undefined') {
        callback = options;
        options = {};
    }
    
    if (verify.isFunction(callback) == false) {
        throw new Error(error(101, 'createFactory', "Parameter 'callback' must be a function. Received: " + util.inspect(callback, { depth: null })));
    }
    if (verify.isObject(options) == false) {
        return callback(error(101, 'createFactory', "Parameter 'options' must be an object. Received: " + util.inspect(options, { depth: null })));
    }
    
    options.repo = {
        storeKind: 'filesystem'
     };
    md.createFactory(options, callback)
}
;
md.fsFactory = md.fsFactory;

md.dbFactory = function(storeUri, storeBaseFolder, options, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isNotEmpty(storeUri) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'storeUri', message: 'The storeUri parameter must be a string. Received: ' + storeUri }
        ));
    }
    if (verify.isNotEmpty(storeBaseFolder) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'storeBaseFolder', message: 'The storeBaseFolder parameter must be a string. Received: ' + storeBaseFolder }
        ));
    }
    if (verify.isObject(options) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'options', message: 'The options parameter must be an object. Received: ' + options }
        ));
    }
    
    // loog 'wizzi.index.dbFactory.storeUri,storeBaseFolder', storeUri, storeBaseFolder
    
    options.repo = {
        storeKind: 'mongodb', 
        storeUri: storeUri, 
        storeBaseFolder: storeBaseFolder
     };
    md.createFactory(options, callback)
}
;
md.mongoFactory = md.dbFactory;

md.jsonFactory = function(options, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isObject(options) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'options', message: 'The options parameter must be an object. Received: ' + options }
        ));
    }
    if (verify.isObject(options.jsonFs) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'options.jsonFs', message: 'The options.jsonFs parameter must be an object. Received: ' + options.jsonFs }
        ));
    }
    
    // loog 'wizzi.index.jsonFactory.jsonFs', options.jsonFs
    
    options.repo = {
        storeKind: 'json', 
        storeJsonFs: options.jsonFs
     };
    md.createFactory(options, callback)
}
;
md.jsonFactory = md.jsonFactory;


md.metasManager = function(options, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isObject(options) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'options', message: 'The options parameter must be an object. Received: ' + options }
        ));
    }
    metasManager.createManager(options, callback)
}
;

md.packiManager = function(options, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isObject(options) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'options', message: 'The options parameter must be an object. Received: ' + options }
        ));
    }
    packiManager.createManager(options, callback)
}
;

/**
     startRunnerServer is async.
     Can be used at startup to load wizzi models, that is an async process,
     implementing the onStart and onPrepare callbacks in the wizzifile.
     During an mTree evaluation the calls to runnerServer
     must be sync. Both $.api(name, query) and $.model(name, query)
     are sync methods that operate on wizzi models or POJO
     previously loaded and/or prepared.
*/
md.startRunnerServer = function(options, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isObject(options) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'options', message: 'The options parameter must be an object. Received: ' + options }
        ));
    }
    if (verify.isNullOrUndefined(options.user) === false) {
        if (verify.isNotEmpty(options.user) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'options.user', message: 'The options.user parameter must be a string. Received: ' + options.user }
            ));
        }
    }
    if (verify.isNullOrUndefined(options.role) === false) {
        if (verify.isNotEmpty(options.role) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'options.role', message: 'The options.role parameter must be a string. Received: ' + options.role }
            ));
        }
    }
    var runnerServerCWD = (options.cwd || process.cwd());
    md.loadWizzifile(options, function(err, wizzifile) {
        if (err) {
            return callback(err);
        }
        if (!wizzifile) {
            return callback(null);
        }
        else {
            md.wizzifile = wizzifile;
            if (md.wizzifile.onConfig) {
                md.wizzifile.onConfig(md.config, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    var RunnerServer = require('./lib/services/runnerServer');
                    RunnerServer.init(runnerServerCWD, options.user, options.role)
                    if (md.wizzifile.onStart) {
                        md.wizzifile.onStart(RunnerServer.instance, md.config, function(err, notUsed) {
                            if (err) {
                                return callback(err);
                            }
                            if (md.wizzifile.onPrepare) {
                                RunnerServer.instance.callOnPrepare(md.wizzifile, md.config, function(err, notUsed) {
                                    if (err) {
                                        return callback(err);
                                    }
                                    console.log(chalk.yellow('WIZZI RUNNER SERVER STARTED ON FOLDER ' + runnerServerCWD));
                                    return callback(null);
                                })
                            }
                            else {
                                console.log(chalk.yellow('WIZZI RUNNER SERVER STARTED ON FOLDER ' + runnerServerCWD));
                                return callback(null);
                            }
                        })
                    }
                    else {
                        console.log(chalk.yellow('WIZZI RUNNER SERVER STARTED ON FOLDER ' + runnerServerCWD));
                        return callback(null);
                    }
                })
            }
            else {
                console.log(chalk.yellow('Method wizzifile.onConfig NOT FOUND. RUNNER SERVER NOT STARTED.'));
                return callback(null);
            }
        }
    })
}
;
md.loadWizzifile = function(options, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isObject(options) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'options', message: 'The options parameter must be an object. Received: ' + options }
        ));
    }
    if (options.wizzifile) {
        return callback(null, options.wizzifile);
    }
    else {
        var runnerServerCWD = (options.cwd || process.cwd());
        var wizziFilePath = path.join(runnerServerCWD, 'wizzifile.js');
        if (md.file.isFile(wizziFilePath)) {
            md.wizzifile = require(wizziFilePath);
            console.log(chalk.yellow('WIZZI FILE FOUND on path: ' + wizziFilePath));
            return callback(null, md.wizzifile);
        }
        else {
            console.log(chalk.yellow('WIZZI FILE NOT FOUND. RUNNER SERVER NOT STARTED.'));
            return callback(null);
        }
    }
}
;
/**
     params
     { request
     string storeKind
     default filesystem
     { config
     string wfBaseFolder
     string storeUri
     # when storeKind == 'mongodb'
     string storeBaseFolder
     # when storeKind == 'mongodb'
     string pluginsBaseFolder
     [ plugins
     string name
     { job
     string name
     # label for messages
     string ittfDocumentUri
     # `wzjob` model primary ittf document
     { productionOptions
     integer indentSpaces
     default 4
     string basedir
     TODO explain where used
     integer verbose
     default 2
     { dumps
     # dumps to files of transient objects for debug purposes
     string dumpsBaseFolder
     { mTreeBuildUpJsWizziScript
     boolean dump
     string dumpsBaseFolder
     { mixedMTree
     boolean dump
     string dumpsBaseFolder
     { evaluatedMTree
     boolean dump
     string dumpsBaseFolder
     { globalContext
     # Every wizzi factory loading, transformation and generation
     # executed by this job
     # will have the properties of this object injected in its context
     # at the global level.
*/
md.executeWizziJob = function(request, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isObject(request) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'request', message: 'The request parameter must be an object. Received: ' + request }
        ));
    }
    if (verify.isObject(request.config) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'request.config', message: 'The request.config parameter must be an object. Received: ' + request.config }
        ));
    }
    if (verify.isArray(request.config.plugins) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'request.config.plugins', message: 'The request.config.plugins parameter must be an array. Received: ' + request.config.plugins }
        ));
    }
    if (verify.isObject(request.job) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'request.job', message: 'The request.job parameter must be an object. Received: ' + request.job }
        ));
    }
    
    // check_cb( callback, executeWizziJob )
    // check_cb_object( request, executeWizziJob )
    // check_cb_object( request.config, executeWizziJob )
    // check_cb_object( request.job, executeWizziJob )
    
    var storeKind = request.storeKind || 'filesystem';
    var jobName = request.job.name;
    
    console.log('=');
    console.log('======== v0.7.6.wizzi.executeWizziJob ===== Start job: ' + jobName + ' =============');
    console.log('- Executor module path ', __filename);
    console.log('- Job source path ', request.job.ittfDocumentUri);
    console.log('- storeKind', storeKind);
    if (request.config.wfBaseFolder) {
        console.log('- wfBaseFolder', request.config.wfBaseFolder);
    }
    if (request.config.storeUri) {
        console.log('- storeUri', request.config.storeUri);
    }
    if (request.config.storeBaseFolder) {
        console.log('- storeBaseFolder', request.config.storeBaseFolder);
    }
    
    var requestConfig = Object.assign({}, request.config);
    
    var wfBaseFolder = requestConfig.wfBaseFolder;
    
    // FIXME property wfBaseFolder in module wizzi/config
    
    // should be part of the wizzi.wizziFactory instance.
    
    // Find where it is referenced.
    if (wfBaseFolder && wfBaseFolder.length > 0) {
        md.config.set('wfBaseFolder', wfBaseFolder);
    }
    
    console.log('- plugins');
    var plugins = [];
    var i, i_items=requestConfig.plugins, i_len=requestConfig.plugins.length, item;
    for (i=0; i<i_len; i++) {
        item = requestConfig.plugins[i];
        if (plugins.indexOf(item) < 0) {
            plugins.push(item);
            console.log('  ', item);
        }
    }
    console.log('- pluginsBaseFolder', requestConfig.pluginsBaseFolder || process.cwd());
    
    wizziFactory.createFactory({
        repo: {
            storeKind: storeKind, 
            storeUri: requestConfig.storeUri, 
            storeBaseFolder: requestConfig.storeBaseFolder
         }, 
        plugins: {
            items: plugins, 
            pluginsBaseFolder: requestConfig.pluginsBaseFolder || process.cwd()
         }, 
        globalContext: request.job.globalContext || {}
     }, executeWizziJob_step2(request.job, callback))
}
;
function executeWizziJob_step2(jobRequest, callback) {
    return function(err, wizziFactoryInstance) {
            if (err) {
                return callback(err);
            }
            var jobName = jobRequest.name;
            var jobPath = jobRequest.ittfDocumentUri;
            
            console.log('=');
            console.log('======== v0.7.6.wizzi.executeWizziJob_step2 ===== job: ' + jobName + ' =============');
            console.log('=');
            
            var pman = wizziFactoryInstance.createProductionManager(jobRequest.productionOptions, jobRequest.globalContext);
            if (pman && pman.__is_error) {
                console.log("[31m%s[0m", '__is_error ', pman);
                return callback(pman);
            }
            
            var notUsed = pman.addWzjobRequest({
                wzjob: {
                    ittfDocumentUri: jobPath
                 }
             });
            if (notUsed && notUsed.__is_error) {
                console.log("[31m%s[0m", '__is_error ', notUsed);
                return callback(notUsed);
            }
            
            pman.run(function(err, result) {
                if (err) {
                    console.log("[31m%s[0m", 'executeWizziJob_step2.error', err);
                    err.wizziJob = jobName;
                    err.wizziJobStep = 'Running job';
                    err.wizziJobIttfSourceUri = jobPath;
                    return callback(err);
                }
                console.log("[32m%s[0m", '=');
                console.log("[32m%s[0m", '======== v0.7.6.wizzi.executeWizziJob. Job: ' + jobName + '. Run completed');
                console.log("[32m%s[0m", '=');
                pman.persistToFile(function(err, result) {
                    if (err) {
                        err.wizziJob = jobName;
                        err.wizziJobStep = 'Persisting to file';
                        err.wizziJobIttfSourceUri = jobPath;
                        return callback(err);
                    }
                    console.log("[32m%s[0m", '=');
                    console.log("[32m%s[0m", '======== v0.7.6.wizzi.executeWizziJob. Job: ' + jobName + '.  PersistToFile completed');
                    console.log("[32m%s[0m", '=');
                    pman.terminate();
                    if (callback) {
                        callback(null, result);
                    }
                })
            })
        };
}
md.printWizziJobError = function(jobName, err) {
    err.WizziIndexStack = (new Error()).stack;
    console.log("[31m%s[0m", "\n");
    console.log("[31m%s[0m", "====================================================================================================\n");
    console.log("[31m%s[0m", "FATAL ERROR : v0.7.6.executing wizzi instance job: " + jobName);
    console.log("[31m%s[0m", "\n");
    console.log("[31m%s[0m", "Error message:\n");
    console.log("[31m%s[0m", err.message + "\n");
    console.log("[31m%s[0m", "Error details:\n");
    console.log("[31m%s[0m", err + "\n");
    console.log("[31m%s[0m", "FATAL ERROR - END\n");
    console.log("[31m%s[0m", "====================================================================================================\n");
    console.log("[31m%s[0m", "\n");
    process.exit(999);
}
;
/**
     PARAMS
     { request
     string storeKind
     default filesystem
     { configOptions
     { wfschema
     string name
     string ittfDocumentUri
     string outputPackageFolder
*/
md.generateWizziModelDom = function(request, callback) {
    
    if (verify.isFunction(callback) == false) {
        throw new Error(error(101, 'generateWizziModelDom', "Parameter 'callback' must be a function. Received: " + util.inspect(callback, { depth: null })));
    }
    if (verify.isObject(request) == false) {
        return callback(error(101, 'generateWizziModelDom', "Parameter 'request' must be an object. Received: " + util.inspect(request, { depth: null })));
    }
    if (verify.isObject(request.configOptions) == false) {
        return callback(error(101, 'generateWizziModelDom', "Parameter 'request.configOptions' must be an object. Received: " + util.inspect(request.configOptions, { depth: null })));
    }
    if (verify.isObject(request.wfschema) == false) {
        return callback(error(101, 'generateWizziModelDom', "Parameter 'request.wfschema' must be an object. Received: " + util.inspect(request.wfschema, { depth: null })));
    }
    // TODO implement jsWizzi : _.toIdentifier(varName)
    // TODO check_cb_not_empty( request.wfschema.name, generateWizziModelDom )
    // TODO check_cb_not_empty( request.wfschema.ittfDocumentUri, generateWizziModelDom )
    // TODO check_cb_not_empty( request.wfschema.outputPackageFolder, generateWizziModelDom )
    
    var storeKind = request.storeKind || 'filesystem';
    
    request.wfschema.mTreeBuildUpContext = Object.assign({}, request.wfschema.mTreeBuildUpContext);
    request.globalContext = Object.assign({}, request.globalContext);
    
    console.log('wizzi.generateWizziModelDom');
    console.log('- storeKind', storeKind);
    console.log('- configOptions', request.configOptions);
    console.log('- wfschema.name', request.wfschema.name);
    console.log('- wfschema.ittfDocumentUri', request.wfschema.ittfDocumentUri);
    console.log('- wfschema.outputPackageFolder', request.wfschema.outputPackageFolder);
    
    var repoUri = request.configOptions.repoUri;
    var repoBaseFolder = request.configOptions.repoBaseFolder;
    
    var plugins = [];
    if (request.configOptions.plugins) {
        var i, i_items=request.configOptions.plugins, i_len=request.configOptions.plugins.length, item;
        for (i=0; i<i_len; i++) {
            item = request.configOptions.plugins[i];
            if (plugins.indexOf(item) < 0) {
                plugins.push(item);
            }
        }
    }
    else {
        plugins.push('wizzi-core');
    }
    console.log('- plugins', plugins);
    for (var k in request.wfschema.mTreeBuildUpContext) {
        console.log('- wfschemaContext property', k);
    }
    for (var k in request.globalContext) {
        console.log('- globalContext property', k);
    }
    
    wizziFactory.createFactory({
        repo: {
            storeKind: storeKind
         }, 
        plugins: {
            items: plugins, 
            pluginsBaseFolder: request.configOptions.pluginsBaseFolder || process.cwd()
         }, 
        globalContext: request.globalContext
     }, function(err, wizziFactory) {
        if (err) {
            return callback(err);
        }
        // Now we can generate the wizzi model types
        // They will be written in the folder passed as second parameter.
        console.log(chalk.yellow('STARTING WIZZI MODEL TYPES GENERATION FOR SCHEMA ' + request.wfschema.name));
        wizziFactory.generateModelDoms(request.wfschema.ittfDocumentUri, request.wfschema.outputPackageFolder, request.wfschema.name, request.wfschema.mTreeBuildUpContext, {
            legacyVersion: request.configOptions.legacyVersion
         }, function(err, result) {
            if (err) {
                return callback(err);
            }
            console.log(chalk.green('WIZZI MODEL TYPES GENERATED FOR SCHEMA ' + request.wfschema.name));
            return callback(null, request.wfschema.name);
        })
    })
}
;

function DEFAULT_PLUGINS() {
    return [
            'wizzi-core', 
            'wizzi-js', 
            'wizzi-web'
        ];
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
var DEFAULT_ARTIFACTS_FROM_SCHEMA_ROOT = {
    css: 'css/document', 
    graphql: 'graphql/docs', 
    html: 'html/document', 
    module: 'js/module', 
    '{': 'json/document', 
    '[': 'json/document', 
    scss: 'scss/document', 
    text: 'text/document', 
    xml: 'xml/document', 
    vtt: 'vtt/document', 
    vue: 'vue/document'
 };
var DEFAULT_MIME = {
    css: 'css', 
    graphql: 'graphql', 
    html: 'html', 
    js: 'js', 
    json: 'json', 
    scss: 'scss', 
    text: 'text', 
    ts: 'ts', 
    xml: 'xml', 
    ittf: 'ittf', 
    vtt: 'vtt', 
    vue: 'vue'
 };
md.createFactoryLight = function(options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    var pluginItems = DEFAULT_PLUGINS().concat(options.plugins || []);
    md.fsFactory({
        plugins: {
            items: pluginItems
         }, 
        globalContext: options.globalContext || {}
     }, callback)
}
;
md.createJsonFactoryLight = function(options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    var pluginItems = options.noPlugins ? [] : DEFAULT_PLUGINS().concat(options.plugins || []);
    md.jsonFactory({
        plugins: {
            items: pluginItems
         }, 
        jsonFs: options.jsonFs, 
        globalContext: options.globalContext || {}
     }, callback)
}
;
/**
     { options
     boolean raw
     { globalContext
*/
//
// params
//
// string ittfDocumentPath
// { context
// optional, used by all methods
// { options
// [ plugins?
// string plugin-name
// optional, used by all methods
// { globalContext?
// optional, used by all methods
// boolean raw?
// optional, used by md.mtree()
// default false
// string artifactName?
// required by md.gen() and md.genFromText()
// { artifactContext?
// optional, used by md.gen() and md.genFromText()
// string outputPackagePath
// required by md.schema()
// string name
// optional, used by md.job()
// number verbose?
// optional, used by md.job()
// default 2
// number indentedSpaces?
// optional, used by md.job()
// default 4
// { jobContext?
// optional, used by md.job()
// string legacyVersion
// optional, used by md.generateWizziSchema()
// default null
// callback
//
md.loadMTree = function(ittfDocumentPath, context, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    if (typeof callback === 'undefined') {
        callback = context;
        context = {};
    }
    var name, schema;
    if (verify.isObject(ittfDocumentPath)) {
    }
    else {
        var ittfInfo = ittfDocumentInfoByPath(ittfDocumentPath);
        if (ittfInfo.is_error) {
            return callback(ittfInfo);
        }
        name = ittfInfo.name;
        schema = ittfInfo.schema;
    }
    md.createFactoryLight(options, function(err, wf) {
        if (err) {
            return callback(err);
        }
        if (options.raw) {
            wf.loadMTreeRaw(ittfDocumentPath, callback)
        }
        else {
            wf.loadMTree(ittfDocumentPath, context, callback)
        }
    })
}
;
md.mtree = md.loadMTree;
/**
     { options
     boolean raw
     { globalContext
*/
//
// params
//
// [ documents
// required
// {
// string path
// string content
// { context
// optional, used by all methods
// { options
// [ plugins?
// string plugin-name
// optional, used by all methods
// { globalContext?
// optional, used by all methods
// boolean raw?
// optional, used by md.mtree()
// default false
// string artifactName?
// required by md.gen() and md.genFromText()
// { artifactContext?
// optional, used by md.gen() and md.genFromText()
// string outputPackagePath
// required by md.schema()
// string name
// optional, used by md.job()
// number verbose?
// optional, used by md.job()
// default 2
// number indentedSpaces?
// optional, used by md.job()
// default 4
// { jobContext?
// optional, used by md.job()
// callback
//
md.loadMTreeFromText = function(ittfContent, context, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    if (typeof callback === 'undefined') {
        callback = context;
        context = {};
    }
    // loog 'md.loadMTreeFromText.options', options
    var schema;
    if (verify.isNotEmpty(options.artifactName)) {
        var ss = options.artifactName.split('/');
        schema = ss[0];
    }
    else {
        schema = options.schemaName || options.schema;
    }
    // A basefolder is required
    var tempIttfUri = "c:/basefolder/temp." + schema + '.ittf';
    var documents = [
        {
            path: tempIttfUri, 
            content: ittfContent
         }
    ];
    md.JsonComponents.createJsonFs(documents, function(err, jsonFs) {
        if (err) {
            return callback(err);
        }
        options.jsonFs = jsonFs;
        md.createJsonFactoryLight(options, function(err, wf) {
            if (err) {
                return callback(err);
            }
            var ittfDocumentPath = tempIttfUri;
            if (options.raw) {
                wf.loadMTreeRaw(ittfDocumentPath, callback)
            }
            else {
                wf.loadMTree(ittfDocumentPath, context, callback)
            }
        })
    })
}
;
md.mtreeFromText = md.loadMTreeFromText;
/**
     { options
     { globalContext
*/
//
// params
//
// string ittfDocumentPath
// { context
// optional, used by all methods
// { options
// [ plugins?
// string plugin-name
// optional, used by all methods
// { globalContext?
// optional, used by all methods
// boolean raw?
// optional, used by md.mtree()
// default false
// string artifactName?
// required by md.gen() and md.genFromText()
// { artifactContext?
// optional, used by md.gen() and md.genFromText()
// string outputPackagePath
// required by md.schema()
// string name
// optional, used by md.job()
// number verbose?
// optional, used by md.job()
// default 2
// number indentedSpaces?
// optional, used by md.job()
// default 4
// { jobContext?
// optional, used by md.job()
// string legacyVersion
// optional, used by md.generateWizziSchema()
// default null
// callback
//
md.loadMTreeDebug = function(ittfDocumentPath, context, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    if (typeof callback === 'undefined') {
        callback = context;
        context = {};
    }
    var name, schema;
    if (verify.isObject(ittfDocumentPath)) {
    }
    else {
        var ittfInfo = ittfDocumentInfoByPath(ittfDocumentPath);
        if (ittfInfo.is_error) {
            return callback(ittfInfo);
        }
        name = ittfInfo.name;
        schema = ittfInfo.schema;
    }
    md.createFactoryLight(options, function(err, wf) {
        if (err) {
            return callback(err);
        }
        wf.loadMTreeBuildUpScript(ittfDocumentPath, context, callback)
    })
}
;
md.mtreeDebug = md.loadMTreeDebug;
/**
     { options
     { globalContext
*/
//
// params
//
// [ documents
// required
// {
// string path
// string content
// { context
// optional, used by all methods
// { options
// [ plugins?
// string plugin-name
// optional, used by all methods
// { globalContext?
// optional, used by all methods
// boolean raw?
// optional, used by md.mtree()
// default false
// string artifactName?
// required by md.gen() and md.genFromText()
// { artifactContext?
// optional, used by md.gen() and md.genFromText()
// string outputPackagePath
// required by md.schema()
// string name
// optional, used by md.job()
// number verbose?
// optional, used by md.job()
// default 2
// number indentedSpaces?
// optional, used by md.job()
// default 4
// { jobContext?
// optional, used by md.job()
// callback
//
md.loadMTreeDebugFromText = function(ittfContent, context, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    if (typeof callback === 'undefined') {
        callback = context;
        context = {};
    }
    // loog 'md.loadMTreeDebugFromText.options', options
    var schema;
    if (verify.isNotEmpty(options.artifactName)) {
        var ss = options.artifactName.split('/');
        schema = ss[0];
    }
    else {
        schema = options.schemaName || options.schema;
    }
    // A basefolder is required
    var tempIttfUri = "c:/basefolder/temp." + schema + '.ittf';
    var documents = [
        {
            path: tempIttfUri, 
            content: ittfContent
         }
    ];
    md.JsonComponents.createJsonFs(documents, function(err, jsonFs) {
        if (err) {
            return callback(err);
        }
        options.jsonFs = jsonFs;
        md.createJsonFactoryLight(options, function(err, wf) {
            if (err) {
                return callback(err);
            }
            var ittfDocumentPath = tempIttfUri;
            wf.loadMTreeBuildUpScript(ittfDocumentPath, context, callback)
        })
    })
}
;
md.mtreeDebugFromText = md.loadMTreeDebugFromText;
/**
     params
     string ittfDocumentPath
     or
     { modelDescription
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
     optional - has the same format of modelConfig
     [ transformers
     optional
     { formatOptions
     optional
     boolean ittfSources
     # if true returns not the model but its ittf source documents.
     { globalContext
*/
//
// params
//
// string ittfDocumentPath
// { context
// optional, used by all methods
// { options
// [ plugins?
// string plugin-name
// optional, used by all methods
// { globalContext?
// optional, used by all methods
// boolean raw?
// optional, used by md.mtree()
// default false
// string artifactName?
// required by md.gen() and md.genFromText()
// { artifactContext?
// optional, used by md.gen() and md.genFromText()
// string outputPackagePath
// required by md.schema()
// string name
// optional, used by md.job()
// number verbose?
// optional, used by md.job()
// default 2
// number indentedSpaces?
// optional, used by md.job()
// default 4
// { jobContext?
// optional, used by md.job()
// string legacyVersion
// optional, used by md.generateWizziSchema()
// default null
// callback
//
md.loadModel = function(ittfDocumentPath, context, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    if (typeof callback === 'undefined') {
        callback = context;
        context = {};
    }
    var name, schema;
    if (verify.isObject(ittfDocumentPath)) {
    }
    else {
        var ittfInfo = ittfDocumentInfoByPath(ittfDocumentPath);
        if (ittfInfo.is_error) {
            return callback(ittfInfo);
        }
        name = ittfInfo.name;
        schema = ittfInfo.schema;
    }
    md.createFactoryLight(options, function(err, wf) {
        if (err) {
            return callback(err);
        }
        if (verify.isObject(ittfDocumentPath)) {
            wf.loadModelFromConfig(ittfDocumentPath, ittfDocumentPath.globalContext || {}, callback)
        }
        else {
            wf.loadModel(schema, ittfDocumentPath, {
                mTreeBuildUpContext: context, 
                globalContext: {}
             }, callback)
        }
    })
}
;
md.model = md.loadModel;
//
// params
//
// string ittfDocumentPath
// { context
// optional, used by all methods
// { options
// [ plugins?
// string plugin-name
// optional, used by all methods
// { globalContext?
// optional, used by all methods
// boolean raw?
// optional, used by md.mtree()
// default false
// string artifactName?
// required by md.gen() and md.genFromText()
// { artifactContext?
// optional, used by md.gen() and md.genFromText()
// string outputPackagePath
// required by md.schema()
// string name
// optional, used by md.job()
// number verbose?
// optional, used by md.job()
// default 2
// number indentedSpaces?
// optional, used by md.job()
// default 4
// { jobContext?
// optional, used by md.job()
// string legacyVersion
// optional, used by md.generateWizziSchema()
// default null
// callback
//
md.transformModel = function(ittfDocumentPath, context, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    if (typeof callback === 'undefined') {
        callback = context;
        context = {};
    }
    var name, schema;
    if (verify.isObject(ittfDocumentPath)) {
    }
    else {
        var ittfInfo = ittfDocumentInfoByPath(ittfDocumentPath);
        if (ittfInfo.is_error) {
            return callback(ittfInfo);
        }
        name = ittfInfo.name;
        schema = ittfInfo.schema;
    }
    md.createFactoryLight(options, function(err, wf) {
        if (err) {
            return callback(err);
        }
        if (verify.isString(context.transformName) == false) {
            return callback({
                    is_error: true, 
                    message: "wizzi.transformModel operation requires a transformName string in the context object"
                 });
        }
        md.loadModel(ittfDocumentPath, context, options, function(err, wizziModel) {
            if (err) {
                return callback(err);
            }
            wf.transformModel(wizziModel, context.transformName, context, callback)
        })
    })
}
;
md.trans = md.transformModel;
/**
     params
     string ittfDocumentPath
*/
//
// params
//
// [ documents
// required
// {
// string path
// string content
// { context
// optional, used by all methods
// { options
// [ plugins?
// string plugin-name
// optional, used by all methods
// { globalContext?
// optional, used by all methods
// boolean raw?
// optional, used by md.mtree()
// default false
// string artifactName?
// required by md.gen() and md.genFromText()
// { artifactContext?
// optional, used by md.gen() and md.genFromText()
// string outputPackagePath
// required by md.schema()
// string name
// optional, used by md.job()
// number verbose?
// optional, used by md.job()
// default 2
// number indentedSpaces?
// optional, used by md.job()
// default 4
// { jobContext?
// optional, used by md.job()
// callback
//
md.loadModelFromText = function(ittfContent, context, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    if (typeof callback === 'undefined') {
        callback = context;
        context = {};
    }
    // loog 'md.loadModelFromText.options', options
    var schema;
    if (verify.isNotEmpty(options.artifactName)) {
        var ss = options.artifactName.split('/');
        schema = ss[0];
    }
    else {
        schema = options.schemaName || options.schema;
    }
    // A basefolder is required
    var tempIttfUri = "c:/basefolder/temp." + schema + '.ittf';
    var documents = [
        {
            path: tempIttfUri, 
            content: ittfContent
         }
    ];
    md.JsonComponents.createJsonFs(documents, function(err, jsonFs) {
        if (err) {
            return callback(err);
        }
        options.jsonFs = jsonFs;
        md.createJsonFactoryLight(options, function(err, wf) {
            if (err) {
                return callback(err);
            }
            var ittfDocumentPath = tempIttfUri;
            wf.loadModel(schema, ittfDocumentPath, {
                mTreeBuildUpContext: context, 
                globalContext: {}
             }, callback)
        })
    })
}
;
md.modelFromText = md.loadModelFromText;
/**
     { options
     { artifactContext
     { globalContext
*/
//
// params
//
// string ittfDocumentPath
// { context
// optional, used by all methods
// { options
// [ plugins?
// string plugin-name
// optional, used by all methods
// { globalContext?
// optional, used by all methods
// boolean raw?
// optional, used by md.mtree()
// default false
// string artifactName?
// required by md.gen() and md.genFromText()
// { artifactContext?
// optional, used by md.gen() and md.genFromText()
// string outputPackagePath
// required by md.schema()
// string name
// optional, used by md.job()
// number verbose?
// optional, used by md.job()
// default 2
// number indentedSpaces?
// optional, used by md.job()
// default 4
// { jobContext?
// optional, used by md.job()
// string legacyVersion
// optional, used by md.generateWizziSchema()
// default null
// callback
//
md.generateArtifact = function(ittfDocumentPath, context, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    if (typeof callback === 'undefined') {
        callback = context;
        context = {};
    }
    var name, schema;
    if (verify.isObject(ittfDocumentPath)) {
    }
    else {
        var ittfInfo = ittfDocumentInfoByPath(ittfDocumentPath);
        if (ittfInfo.is_error) {
            return callback(ittfInfo);
        }
        name = ittfInfo.name;
        schema = ittfInfo.schema;
    }
    md.createFactoryLight(options, function(err, wf) {
        if (err) {
            return callback(err);
        }
        if (verify.isObject(ittfDocumentPath)) {
            var artifactName = options.artifactName || DEFAULT_ARTIFACTS_FROM_SCHEMA_ROOT[ittfDocumentPath.wzElement];
            wf.generateArtifact(ittfDocumentPath, 'unavailable', artifactName, options.artifactContext || {}, callback)
        }
        else {
            var artifactName = options.artifactName || getDefaultArtifact(schema);
            wf.loadModelAndGenerateArtifact(ittfDocumentPath, {
                modelRequestContext: context, 
                artifactRequestContext: options.artifactContext
             }, artifactName, callback)
        }
    })
}
;
md.gen = md.generateArtifact;
md.artifact = md.generateArtifact;
/**
     { options
     { artifactContext
     { globalContext
*/
//
// params
//
// [ documents
// required
// {
// string path
// string content
// { context
// optional, used by all methods
// { options
// [ plugins?
// string plugin-name
// optional, used by all methods
// { globalContext?
// optional, used by all methods
// boolean raw?
// optional, used by md.mtree()
// default false
// string artifactName?
// required by md.gen() and md.genFromText()
// { artifactContext?
// optional, used by md.gen() and md.genFromText()
// string outputPackagePath
// required by md.schema()
// string name
// optional, used by md.job()
// number verbose?
// optional, used by md.job()
// default 2
// number indentedSpaces?
// optional, used by md.job()
// default 4
// { jobContext?
// optional, used by md.job()
// callback
//
md.generateArtifactFromText = function(ittfContent, context, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    if (typeof callback === 'undefined') {
        callback = context;
        context = {};
    }
    // loog 'md.generateArtifactFromText.options', options
    var schema;
    if (verify.isNotEmpty(options.artifactName)) {
        var ss = options.artifactName.split('/');
        schema = ss[0];
    }
    else {
        schema = options.schemaName || options.schema;
    }
    // A basefolder is required
    var tempIttfUri = "c:/basefolder/temp." + schema + '.ittf';
    var documents = [
        {
            path: tempIttfUri, 
            content: ittfContent
         }
    ];
    md.JsonComponents.createJsonFs(documents, function(err, jsonFs) {
        if (err) {
            return callback(err);
        }
        options.jsonFs = jsonFs;
        md.createJsonFactoryLight(options, function(err, wf) {
            if (err) {
                return callback(err);
            }
            var artifactName = options.artifactName || getDefaultArtifact(schema);
            var ittfDocumentPath = tempIttfUri;
            wf.loadModelAndGenerateArtifact(ittfDocumentPath, {
                modelRequestContext: context, 
                artifactRequestContext: options.artifactContext
             }, artifactName, callback)
        })
    })
}
;
md.genFromText = md.generateArtifactFromText;
//
// params
//
// string ittfDocumentPath
// { context
// optional, used by all methods
// { options
// [ plugins?
// string plugin-name
// optional, used by all methods
// { globalContext?
// optional, used by all methods
// boolean raw?
// optional, used by md.mtree()
// default false
// string artifactName?
// required by md.gen() and md.genFromText()
// { artifactContext?
// optional, used by md.gen() and md.genFromText()
// string outputPackagePath
// required by md.schema()
// string name
// optional, used by md.job()
// number verbose?
// optional, used by md.job()
// default 2
// number indentedSpaces?
// optional, used by md.job()
// default 4
// { jobContext?
// optional, used by md.job()
// string legacyVersion
// optional, used by md.generateWizziSchema()
// default null
// callback
//
md.generateWizziSchema = function(ittfDocumentPath, context, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    if (typeof callback === 'undefined') {
        callback = context;
        context = {};
    }
    var name, schema;
    if (verify.isObject(ittfDocumentPath)) {
    }
    else {
        var ittfInfo = ittfDocumentInfoByPath(ittfDocumentPath);
        if (ittfInfo.is_error) {
            return callback(ittfInfo);
        }
        name = ittfInfo.name;
        schema = ittfInfo.schema;
    }
    md.createFactoryLight(options, function(err, wf) {
        if (err) {
            return callback(err);
        }
        wf.generateModelDoms(ittfDocumentPath, options.outputPackagePath, name, context, {
            legacyVersion: options.legacyVersion
         }, callback)
    })
}
;
md.schema = md.generateWizziSchema;
/**
     { options
     string name
     integer indentSpaces
     integer verbose
     { jobContext
     { globalContext
*/
//
// params
//
// string ittfDocumentPath
// { context
// optional, used by all methods
// { options
// [ plugins?
// string plugin-name
// optional, used by all methods
// { globalContext?
// optional, used by all methods
// boolean raw?
// optional, used by md.mtree()
// default false
// string artifactName?
// required by md.gen() and md.genFromText()
// { artifactContext?
// optional, used by md.gen() and md.genFromText()
// string outputPackagePath
// required by md.schema()
// string name
// optional, used by md.job()
// number verbose?
// optional, used by md.job()
// default 2
// number indentedSpaces?
// optional, used by md.job()
// default 4
// { jobContext?
// optional, used by md.job()
// string legacyVersion
// optional, used by md.generateWizziSchema()
// default null
// callback
//
md.executeWizziJob2 = function(ittfDocumentPath, context, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    if (typeof callback === 'undefined') {
        callback = context;
        context = {};
    }
    var name, schema;
    if (verify.isObject(ittfDocumentPath)) {
    }
    else {
        var ittfInfo = ittfDocumentInfoByPath(ittfDocumentPath);
        if (ittfInfo.is_error) {
            return callback(ittfInfo);
        }
        name = ittfInfo.name;
        schema = ittfInfo.schema;
    }
    md.createFactoryLight(options, function(err, wf) {
        if (err) {
            return callback(err);
        }
        wf.executeJob({
            name: options.name || name, 
            path: ittfDocumentPath, 
            productionOptions: md.productionOptions({
                indentSpaces: options.indentSpaces || 4, 
                basedir: __dirname, 
                verbose: options.verbose || 2
             }), 
            modelContext: context, 
            jobContext: options.jobContext || {}
         }, callback)
    })
}
;
md.job = md.executeWizziJob2;
/**
     { options
     string destFolder
     { globalContext
*/
//
// params
//
// string ittfDocumentPath
// { context
// optional, used by all methods
// { options
// [ plugins?
// string plugin-name
// optional, used by all methods
// { globalContext?
// optional, used by all methods
// boolean raw?
// optional, used by md.mtree()
// default false
// string artifactName?
// required by md.gen() and md.genFromText()
// { artifactContext?
// optional, used by md.gen() and md.genFromText()
// string outputPackagePath
// required by md.schema()
// string name
// optional, used by md.job()
// number verbose?
// optional, used by md.job()
// default 2
// number indentedSpaces?
// optional, used by md.job()
// default 4
// { jobContext?
// optional, used by md.job()
// string legacyVersion
// optional, used by md.generateWizziSchema()
// default null
// callback
//
md.generateFolderArtifacts = function(ittfDocumentPath, context, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    if (typeof callback === 'undefined') {
        callback = context;
        context = {};
    }
    var name, schema;
    if (verify.isObject(ittfDocumentPath)) {
    }
    else {
    }
    md.createFactoryLight(options, function(err, wf) {
        if (err) {
            return callback(err);
        }
        var ittfFolderPath = ittfDocumentPath;
        options = options || {};
        if (options.deep !== false) {
            options.deep = true;
        }
        wf.generateFolderArtifacts(ittfFolderPath, {
            modelRequestContext: context, 
            artifactRequestContext: options.artifactContext
         }, options, callback)
    })
}
;
md.genFolder = md.generateFolderArtifacts;
md.artifactsFolder = md.generateFolderArtifacts;
function getDefaultArtifact(schema) {
    return DEFAULT_ARTIFACTS[schema];
}
// TODO this must be done in wizzi-repo on the store filesystem
// let it be here to start development
function folderFilesInfoByPath(folderPath, fileService, callback) {
    fileService.getFilesAsync(folderPath, {
        deep: true
     }, function(err, files) {
        if (err) {
            return callback(err);
        }
        var result = [];
        var i, i_items=files, i_len=files.length, f;
        for (i=0; i<i_len; i++) {
            f = files[i];
            result.push(fileInfoByPath(f.fullPath, folderPath))
        }
        return callback(null, result);
    })
}
function ittfDocumentInfoByPath(filePath) {
    var result = fileInfoByPath(filePath);
    if (result.isIttfDocument) {
        return result;
    }
    else {
        return {
                is_error: true, 
                message: 'The file is not an ittfdocument: ' + result.fullPath
             };
    }
}
function fileInfoByPath(filePath, baseFolder) {
    if (typeof baseFolder === 'undefined') {
        baseFolder = path.dirname(filePath);
    }
    filePath = normalize(filePath);
    var basename = path.basename(filePath);
    var dirname = path.dirname(filePath);
    var relFolder = path.dirname(filePath).length > baseFolder.length ? path.dirname(filePath).substr(baseFolder.length + 1) : '';
    var fileUri = filePath.substr();
    var ss = basename.split('.');
    if (ss[ss.length-1] === 'ittf') {
        var name = verify.replaceAll(ss.slice(0, ss.length-2).join('.'), '__dot__', '.');
        var schema = ss[ss.length-2];
        var mime = DEFAULT_MIME[schema] || schema;
        return {
                name: name, 
                basename: basename, 
                isIttfDocument: true, 
                isFragment: filePath.indexOf('/t/') > -1, 
                schema: schema, 
                mime: mime, 
                relFolder: relFolder, 
                fullPath: filePath, 
                destBasename: name + '.' + mime, 
                destRelPath: relFolder.length > 0 ? verify.replaceAll(relFolder, '__dot__', '.') + '/' + name + '.' + mime : name + '.' + mime
             };
    }
    else {
        var name = verify.replaceAll(basename, '__dot__', '.');
        return {
                name: name, 
                basename: basename, 
                isIttfDocument: false, 
                schema: null, 
                mime: ss[ss.length-1], 
                relFolder: relFolder, 
                fullPath: filePath, 
                destBasename: basename, 
                destRelPath: relFolder.length > 0 ? verify.replaceAll(relFolder, '__dot__', '.') + '/' + name : name
             };
    }
}
function normalize(filepath) {
    return verify.replaceAll(filepath, '\\', '/');
}
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
        method: 'wizzi.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}