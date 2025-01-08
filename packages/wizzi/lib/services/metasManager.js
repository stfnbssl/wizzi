/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\services\metasManager.js.ittf
    utc time: Thu, 02 Jan 2025 12:51:28 GMT
*/
var verify = require('@wizzi/utils').verify;
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const log = require('../util/log')(module);
const file = require('@wizzi/utils').file;
const vfile = require('@wizzi/utils').vfile;
const fail = require('@wizzi/utils').fail;
var JsonComponents = require('@wizzi/repo').JsonComponents;
const wizziFactory = require('./wizziFactory');
const inmemoryMetaPlugin = require('./inmemoryMetaPlugin');
const errors = require('../errors');
const constants = require('../constants');
const packiUtils = require('./packiUtils');
const validation = require('./validation');
const existsSync = fs.existsSync || path.existsSync;
const realpathSync = fs.realpathSync;
const exists = fs.exists || path.exists;
const realpath = fs.realpath;
const stringify = require('json-stringify-safe');

const mdDisplayName = "wizzi.metasManager";

const {
    packiFilePrefix, 
    packiFilePrefixExtract, 
    metaProductionTempFolder, 
    metaProductionWizziFolder
 } = constants;

class MetasManager {
    constructor() {
        this.__type = 'MetasManager';
        this.__version = '0.8.45';
        this.packagePathCache = {};
        this.metaPlugins = [];
        this.providedProductions = [];
        this.globalContext = {};
    }
    /**
         params
         { options
         { wfPlugins
         [ items
         string pluginName
         string pluginsBaseFolder
         { metaPlugins
         [ items
         string pluginName
         string metaPluginsBaseFolder
         [ inMemoryItems
         {
         string name
         [ pluginMetaProductions
         :ref MetaProvidesProduction
         { metaPackiFiles
         :ref PackiFiles
         { globalContext
         { test
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
        if (verify.isNullOrUndefined(options.wfPlugins) === false) {
            if (verify.isObject(options.wfPlugins) === false) {
                return callback(error(
                    'InvalidArgument', 'initialize', { parameter: 'options.wfPlugins', message: 'The options.wfPlugins parameter must be an object. Received: ' + options.wfPlugins }
                ));
            }
        }
        if (verify.isNullOrUndefined(options.metaPlugins) === false) {
            if (verify.isObject(options.metaPlugins) === false) {
                return callback(error(
                    'InvalidArgument', 'initialize', { parameter: 'options.metaPlugins', message: 'The options.metaPlugins parameter must be an object. Received: ' + options.metaPlugins }
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
        }
        if (options.globalContext) {
            this.globalContext = Object.assign({}, this.globalContext, options.globalContext)
            ;
        }
        // used for creating on the fly a json factory
        this.wfPluginsOptions = options.wfPlugins;
        if (verify.isObject(this.wfPluginsOptions) == false) {
            this.wfPluginsOptions = {};
        }
        this.metaPluginsOptions = options.metaPlugins;
        if (options.verbose) {
            this.metaPluginsOptions.verbose = true;
            var date = new Date();
            var timeNow = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            console.log("[33m%s[0m", timeNow, "Starting ", this.__type, 'version', this.__version);
        }
        this.loadPlugins(this.metaPluginsOptions, (err, plugins) => {
            if (err) {
                console.log("[31m%s[0m", err);
                return callback(err);
            }
            const register = (i) => {
                if (i >= plugins.length) {
                    return callback(null, this);
                }
                var plugin = plugins[i];
                this.registerMetaPlugin(plugin, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    return register(++i);
                })
            }
            ;
            register(0);
        }
        )
    }
    loadPlugins(options, callback) {
        
        var pluginRequests = [];
        var plugins = [];
        if (options.items && options.items.length > 0) {
            var i, i_items=options.items, i_len=options.items.length, item;
            for (i=0; i<i_len; i++) {
                item = options.items[i];
                if (typeof (item) === "string") {
                    pluginRequests.push({
                        packagePath: item
                     })
                }
                else if (verify.isNotEmpty(item.packagePath)) {
                    pluginRequests.push(item)
                }
                else {
                    return callback(error('ParameterError', 'loadPlugins', 'Missing "packagePath" property in meta plugin request option'));
                }
            }
        }
        if (options.inMemoryItems && options.inMemoryItems.length > 0) {
            var i, i_items=options.inMemoryItems, i_len=options.inMemoryItems.length, item;
            for (i=0; i<i_len; i++) {
                item = options.inMemoryItems[i];
                const valid = validation.validateInMemoryMetaPlugin(item);
                if (valid.ok) {
                    pluginRequests.push(item)
                }
                else {
                    callback(error('ParameterError', 'loadPlugins', 'Invalid options requesting an inmemory meta plugin (see inner error)', valid.error))
                }
            }
        }
        var metaPluginsBaseFolder = options.metaPluginsBaseFolder || path.resolve(__dirname, '..', '..', '..');
        var packagePathCache = this.packagePathCache;
        
        function resolveNext(i) {
            
            // loog 'pluginRequests', pluginRequests
            if (i >= pluginRequests.length) {
                return callback(null, plugins);
            }
            var pluginRequest = pluginRequests[i];
            if (pluginRequest.hasOwnProperty("packagePath")) {
                return resolveModule(metaPluginsBaseFolder, pluginRequest.packagePath, function(err, moduleObject) {
                        if (err) {
                            return callback(err);
                        }
                        Object.keys(moduleObject).forEach(function(key) {
                            
                            // loog 'pluginRequest key', key
                            if (!pluginRequest.hasOwnProperty(key)) {
                                pluginRequest[key] = moduleObject[key];
                            }
                        })
                        pluginRequest.packageName = pluginRequest.packagePath;
                        pluginRequest.packagePath = moduleObject.packagePath;
                        if (options.verbose) {
                            var date = new Date();
                            var timeNow = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                            var spaces = new Array(timeNow.length+1).join(' ');
                            console.log("[33m%s[0m", timeNow, "Loaded meta plugin", pluginRequest.packageName, 'version', pluginRequest.version);
                            console.log("[33m%s[0m", spaces, 'meta productions: ', pluginRequest.provides.metaProductions.join(', '));
                        }
                        plugins.push(pluginRequest);
                        return resolveNext(++i);
                    });
            }
            else if (pluginRequest.hasOwnProperty("pluginMetaProductions")) {
                return resolveInMemory(pluginRequest, function(err, moduleObject) {
                        if (err) {
                            return callback(err);
                        }
                        if (options.verbose) {
                            var date = new Date();
                            var timeNow = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                            var spaces = new Array(timeNow.length+1).join(' ');
                            console.log("[33m%s[0m", timeNow, "Loaded meta plugin", moduleObject.name, 'version', moduleObject.version);
                        }
                        plugins.push(moduleObject);
                        return resolveNext(++i);
                    });
            }
            else {
                return resolveNext(++i);
            }
        }
        resolveNext(0);
        function resolveInMemory(inMemoryMetaPluginOptions, callback) {
            
            inmemoryMetaPlugin.createMetaPlugin(inMemoryMetaPluginOptions, function(err, moduleObject) {
                if (err) {
                    return callback(err);
                }
                return callback(null, moduleObject);
            })
        }
        function resolveModule(pluginsBaseFolder, modulePath, callback) {
            
            resolvePackage(pluginsBaseFolder, (modulePath + "/package.json"), function(err, packagePath) {
                var metadata = {};
                var packageMetadata;
                if (!err) {
                    try {
                        packageMetadata = (packagePath && require(packagePath).plugin) || {};
                    } 
                    catch (ex) {
                        return callback(error('PackageError', 'resolveModule', 'Error loading plugin package.json ' + packagePath + ', message: ' + ex.message));
                    } 
                }
                (function(next) {
                    if (err) {
                        var mp = verify.endsWith(modulePath, '.js') ? modulePath : modulePath + '.js';
                        resolvePackage(pluginsBaseFolder, mp, next);
                    }
                    else if (packagePath) {
                        next(null, path.dirname(packagePath))
                    }
                    else {
                        resolvePackage(pluginsBaseFolder, modulePath, next);
                    }
                })(function(err, modulePath) {
                    if (err) {
                        return callback(err);
                    }
                    var moduleObject;
                    try {
                        // load the module now
                        moduleObject = require(modulePath);
                        // loog 'wizzi.services.pluginManager.resolveModule: modulePath, moduleObject', modulePath, moduleObject
                    } 
                    catch (ex) {
                        return callback(error('ModuleError', 'resolveModule', 'Error loading plugin module ' + modulePath + ', message: ' + ex.message + '\n' + ex.stack));
                    } 
                    moduleObject.provides = (packageMetadata && packageMetadata.provides) || moduleObject.provides || [];
                    moduleObject.consumes = (packageMetadata && packageMetadata.consumes) || moduleObject.consumes || [];
                    moduleObject.packagePath = modulePath;
                    callback(null, moduleObject);
                })
                ;
            })
        }
        function resolvePackage(pluginsBaseFolder, packagePath, callback) {
            
            var originalBase = pluginsBaseFolder;
            
            if (!packagePathCache.hasOwnProperty(pluginsBaseFolder)) {
                packagePathCache[pluginsBaseFolder] = {};
            }
            var cache = packagePathCache[pluginsBaseFolder];
            if (cache.hasOwnProperty(packagePath)) {
                return callback(null, cache[packagePath]);
            }
            
            // local folder plugin module
            if (packagePath[0] === "." || packagePath[0] === "/") {
                var newPath = path.resolve(pluginsBaseFolder, packagePath);
                exists(newPath, function(exists) {
                    if (exists) {
                        realpath(newPath, function(err, newPath) {
                            if (err) {
                                return callback(err);
                            }
                            cache[packagePath] = newPath;
                            return callback(null, newPath);
                        })
                    }
                    else {
                        return callback(error('ENOENT', 'resolvePackage', "Can't find '" + newPath + "' ('" + packagePath + "' relative to '" + originalBase + "')"));
                    }
                })
            }
            // npm (node_modules folder) plugin module
            else {
                tryNext(pluginsBaseFolder);
            }
            function tryNext(base) {
                if (base == "/") {
                    return callback(error('ENOENT', 'resolvePackage', "Can't find '" + packagePath + "' relative to '" + originalBase + "'"));
                }
                var newPath = path.resolve(base, "node_modules", packagePath);
                exists(newPath, function(exists) {
                    if (exists) {
                        realpath(newPath, function(err, newPath) {
                            if (err) {
                                return callback(err);
                            }
                            cache[packagePath] = newPath;
                            return callback(null, newPath);
                        })
                    }
                    else {
                        var nextBase = path.resolve(base, '..');
                        if (nextBase === base) {
                            tryNext("/");
                        }
                        else {
                            tryNext(nextBase);
                        }
                    }
                })
            }
        }
    }
    /**
         Register a metaPlugin to this plugins manager
    */
    registerMetaPlugin(metaPluginModule, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'registerMetaPlugin', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isObject(metaPluginModule) === false) {
            return callback(error(
                'InvalidArgument', 'registerMetaPlugin', { parameter: 'metaPluginModule', message: 'The metaPluginModule parameter must be an object. Received: ' + metaPluginModule }
            ));
        }
        if (verify.isFunction(metaPluginModule.createMetaPlugin) === false) {
            return callback(error(
                'InvalidArgument', 'registerMetaPlugin', { parameter: 'metaPluginModule.createMetaPlugin', message: 'The metaPluginModule.createMetaPlugin parameter must be a function. Received: ' + metaPluginModule.createMetaPlugin }
            ));
        }
        metaPluginModule.createMetaPlugin({}, (err, metaPlugin) => {
            if (err) {
                console.log("[31m%s[0m", err);
                return callback(err);
            }
            var vld = this.validateMetaPlugin(metaPlugin);
            if (vld.__is_error) {
                return callback(vld);
            }
            metaPlugin.packageName = metaPluginModule.packageName;
            metaPlugin.packagePath = metaPluginModule.packagePath;
            this.metaPlugins.push(metaPlugin);
            var providesAdded = this.addPluginProvides(metaPlugin);
            if (providesAdded && providesAdded.__is_error) {
                console.log("[31m%s[0m", '__is_error ', providesAdded);
                return callback(providesAdded);
            }
            return callback(null);
        }
        )
    }
    validateMetaPlugin(metaPlugin) {
        if (verify.isObject(metaPlugin) === false) {
            return error(
                'InvalidArgument', 'validateMetaPlugin', { parameter: 'metaPlugin', message: 'The metaPlugin parameter must be an object. Received: ' + metaPlugin }
            );
        }
        
        var methodNames = [
            'getName', 
            'getFilename', 
            'getProvides', 
            'getMetaProductionStarter', 
            'getMetaProduction'
        ];
        var i, i_items=methodNames, i_len=methodNames.length, methodName;
        for (i=0; i<i_len; i++) {
            methodName = methodNames[i];
            if (verify.isFunction(metaPlugin[methodName]) == false) {
                return error('InvalidMetaPlugin', 'validateMetaPlugin', 'Missing method: ' + methodName);
            }
        }
        var providesProperties = [
            'metaProductions'
        ];
        var provides = metaPlugin.getProvides();
        var i, i_items=providesProperties, i_len=providesProperties.length, propName;
        for (i=0; i<i_len; i++) {
            propName = providesProperties[i];
            if (verify.isArray(provides[propName]) == false) {
                return error('InvalidMetaPlugin', 'validateMetaPlugin', 'Missing property: ' + propName + ' in provides object');
            }
        }
        return {
                __is_error: false
             };
    }
    addPluginProvides(metaPlugin) {
        if (verify.isObject(metaPlugin) === false) {
            return error(
                'InvalidArgument', 'addPluginProvides', { parameter: 'metaPlugin', message: 'The metaPlugin parameter must be an object. Received: ' + metaPlugin }
            );
        }
        if (verify.isObject(metaPlugin.provides) === false) {
            return error(
                'InvalidArgument', 'addPluginProvides', { parameter: 'metaPlugin.provides', message: 'The metaPlugin.provides parameter must be an object. Received: ' + metaPlugin.provides }
            );
        }
        if (verify.isArray(metaPlugin.provides.metaProductions) === false) {
            return error(
                'InvalidArgument', 'addPluginProvides', { parameter: 'metaPlugin.provides.metaProductions', message: 'The metaPlugin.provides.metaProductions parameter must be an array. Received: ' + metaPlugin.provides.metaProductions }
            );
        }
        var found;
        var i, i_items=metaPlugin.provides.metaProductions, i_len=metaPlugin.provides.metaProductions.length, item;
        for (i=0; i<i_len; i++) {
            item = metaPlugin.provides.metaProductions[i];
            found = _.find(this.providedProductions, {
                name: item
             })
            ;
            if (found) {
                return error('DuplicatedPluginResource', 'addPluginProvides', 'Production ' + item + ' already provided');
            }
            else {
                this.providedProductions.push({
                    name: item
                 })
            }
        }
    }
    availableProductions() {
        var ret = [];
        var i, i_items=this.providedProductions, i_len=this.providedProductions.length, item;
        for (i=0; i<i_len; i++) {
            item = this.providedProductions[i];
            ret.push(item.name);
        }
        return ret;
    }
    /**
         Search every metaPlugin registered to this MetasManager (to this WizziFactory)
         and build a packiFiles object with every meta parameters collection of the used MetaProduction.
         Uses the metaPlugin method getMetaContextDefsStarter to retrieve the meta parameters.
         The retrieved packiFiles filepaths are built this way:
         - metaCtxSchema/parameters/<ProductionName>/...
         - wzCtxSchema/parameters/<ProductionName>/...
         Each meta production must have an index.json.ittf file.
         return
         {
         { [Meta-production-name]
        
         | wzError
         params
         { options
         { metaCtx
         optional
         use<Meta-production-name>
         to filter metaproductions
    */
    getMetaParametersStarter(options, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'getMetaParametersStarter', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        var result = {};
        const search = (i) => {
            if (i >= this.metaPlugins.length) {
                return callback(null, result);
            }
            var metaPlugin = this.metaPlugins[i];
            metaPlugin.getMetaContextDefsStarter(options, (err, metaContextDefs) => {
                if (err) {
                    console.log("[31m%s[0m", err);
                    return callback(err);
                }
                for (var k in metaContextDefs) {
                    result[k] = metaContextDefs[k];
                }
                return search(++i);
            }
            )
        }
        ;
        search(0);
    }
    /**
         Search every metaPlugin registered to this MetasManager (to this WizziFactory)
         and build a packiFiles object with every meta ittf document of the used MetaProductions.
         Uses the metaPlugin method getMetaProductionStarter to retrieve the meta ittf documents.
         The retrieved packiFiles filepaths are built this way:
         - folderTemplates/<ProductionName><metaFilePath>
         - ittfDocumentTemplates/<ProductionName><metaFilePath>
         - plainDocuments/<ProductionName><metaFilePath>
         For each metaProduction used the returned packiFiles object must contain a meta ittf document
         with filePath 'folderTemplates/<ProductionName>/index.ittf.ittf'
         return
         | packifiles
         | wzError
         params
         { options
         { metaCtx
    */
    getMetaProductionStarter(options, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'getMetaProductionStarter', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        var result = {};
        const search = (i) => {
            if (i >= this.metaPlugins.length) {
                return callback(null, result);
            }
            var metaPlugin = this.metaPlugins[i];
            metaPlugin.getMetaProductionStarter({
                metaCtx: options.metaCtx || {}
             }, (err, metaProduction) => {
                if (err) {
                    console.log("[31m%s[0m", err);
                    return callback(err);
                }
                for (var k in metaProduction) {
                    result[k] = metaProduction[k];
                }
                return search(++i);
            }
            )
        }
        ;
        search(0);
    }
    /**
         Search every metaPlugin registered to this MetasManager (to this WizziFactory)
         and retrieve their pluginCategories and pluginMetaProductions objects
         params
         { options
         { metaCtx
         return
         {
         [ metaProductions
         string name
         [ categories
         [ categories
         string name
         [ productions
    */
    getCategoryAndMetaProductionStarter(options, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'getCategoryAndMetaProductionStarter', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        var result = [];
        const search = (i) => {
            if (i >= this.metaPlugins.length) {
                return callback(null, result);
            }
            var metaPlugin = this.metaPlugins[i];
            result.push({
                plugin: metaPlugin.name, 
                version: metaPlugin.version, 
                metaProductions: metaPlugin.provides.pluginMetaProductions, 
                categories: metaPlugin.provides.pluginCategories
             })
            return search(++i);
        }
        ;
        search(0);
    }
    /**
         Retrieve a meta production searching the metaPlugins
         registered to this metasManager
    */
    getMetaProduction(productionName, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'getMetaProduction', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isNotEmpty(productionName) === false) {
            return callback(error(
                'InvalidArgument', 'getMetaProduction', { parameter: 'productionName', message: 'The productionName parameter must be a string. Received: ' + productionName }
            ));
        }
        // loog mdDisplayName + '.getMetaProduction', productionName
        var found = null,
            foundInPlugin = null,
            pluginVersion = null,
            result = null;
        const search = (i) => {
            if (i >= this.metaPlugins.length) {
                const message = 'Cannot find meta production: ' + productionName + '\navailables meta productions: ' + this.availableMetaProductions().join(', ');
                log.error('getMetaProduction. ' + message);
                return callback(message);
            }
            var metaPlugin = this.metaPlugins[i];
            // loog mdDisplayName + 'Object.keys(metaPlugin)', Object.keys(metaPlugin)
            metaPlugin.getMetaProduction(productionName, (err, metaProduction) => {
                if (err) {
                    console.log("[31m%s[0m", err);
                    return callback(err);
                }
                if (metaProduction) {
                    return callback(null, metaProduction);
                }
                return search(++i);
            }
            )
        }
        ;
        search(0);
    }
    getProvidedMetas(callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'getProvidedMetas', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        // loog mdDisplayName + '.getProvidedMetas'
        var provides = {
            nodeModulePlugins: [
                
            ], 
            metaCategories: [
                
            ], 
            metaProductions: [
                
            ], 
            metaProductionSelectors: [
                
            ]
         };
        // loog '===================== >>>>>>>>>>>>>>>>>> this.metaPlugins.length', this.metaPlugins.length
        const search = (ndx) => {
            if (ndx >= this.metaPlugins.length) {
                return callback(null, provides);
            }
            var metaPlugin = this.metaPlugins[ndx];
            provides.nodeModulePlugins.push({
                name: metaPlugin.name, 
                version: metaPlugin.version, 
                categories: metaPlugin.provides.categories
             })
            // loog mdDisplayName + '.metaPlugin.provides', metaPlugin.provides
            var i, i_items=metaPlugin.provides.metaProductions, i_len=metaPlugin.provides.metaProductions.length, mp;
            for (i=0; i<i_len; i++) {
                mp = metaPlugin.provides.metaProductions[i];
                mp.plugin = metaPlugin.name;
                provides.metaProductions.push(mp)
                provides.metaProductionSelectors.push('use' + mp.name[0].toUpperCase() + mp.name.substring(1))
                var j, j_items=mp.categories, j_len=mp.categories.length, c1;
                for (j=0; j<j_len; j++) {
                    c1 = mp.categories[j];
                    var seen = false;
                    var k, k_items=provides.metaCategories, k_len=provides.metaCategories.length, c2;
                    for (k=0; k<k_len; k++) {
                        c2 = provides.metaCategories[k];
                        if (c1.name == c2.name) {
                            c2.productions.push({
                                name: mp.name, 
                                plugin: mp.plugin
                             })
                            seen = true;
                        }
                    }
                    if (seen == false) {
                        c1.productions = [
                            {
                                name: mp.name, 
                                plugin: mp.plugin
                             }
                        ];
                        provides.metaCategories.push(c1)
                    }
                }
            }
            search(++ndx);
        }
        ;
        search(0);
    }
    createJsonWizziFactoryAndJsonFs(wfPluginsOptions, packiFiles, callback) {
        const jsonDocuments = [];
        Object.keys(packiFiles).map((value) => {
            
            // loog mdDisplayName + '.createJsonWizziFactoryAndJsonFs.filePath', filePath
            if (packiFiles[value].type === 'CODE' && verify.isNotEmpty(packiFiles[value].contents)) {
                const filePath = packiUtils.ensurePackiFilePrefix(value);
                jsonDocuments.push({
                    path: filePath, 
                    content: packiFiles[value].contents
                 })
            }
        }
        )
        JsonComponents.createJsonFs(jsonDocuments, (err, jsonFs) => {
            if (err) {
                console.log("[31m%s[0m", err);
                return callback(err);
            }
            // loog mdDisplayName + '.createJsonWizziFactoryAndJsonFs jsonFs created'
            wizziFactory.createFactory({
                plugins: wfPluginsOptions, 
                repo: {
                    storeKind: 'json', 
                    storeJsonFs: jsonFs
                 }
             }, (err, wf) => {
                if (err) {
                    console.log("[31m%s[0m", err);
                    return callback(err);
                }
                // loog mdDisplayName + '.createJsonWizziFactoryAndJsonFs json wizzi factory created'
                callback(null, {
                    wf: wf, 
                    jsonFs: jsonFs
                 })
            }
            )
        }
        )
    }
}
module.exports = {
    createManager: function(options, callback) {
        var mm = new MetasManager();
        mm.initialize(options, callback)
    }
 };
function dumpStringified(message, value) {
    const dump = stringify(value, null, 2);
    console.log(message, dump, __filename);
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
        method: 'wizzi@0.8.45.metasManager.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}