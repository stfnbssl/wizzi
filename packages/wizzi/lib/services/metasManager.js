/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.v07\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\services\metasManager.js.ittf
*/
'use strict';
var verify = require('wizzi-utils').verify;
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const log = require('../util/log')(module);
const file = require('@wizzi/utils').file;
const vfile = require('@wizzi/utils').vfile;
const fail = require('@wizzi/utils').fail;
var JsonComponents = require('@wizzi/repo').JsonComponents;
const wizziFactory = require('./wizziFactory');
const errors = require('../errors');
const packiUtils = require('./packiUtils');
const existsSync = fs.existsSync || path.existsSync;
const realpathSync = fs.realpathSync;
const exists = fs.exists || path.exists;
const realpath = fs.realpath;
const stringify = require('json-stringify-safe');

const mdDisplayName = "wizzi.metasManager";

const packiFilePrefix = 'json:/';
const packiFilePrefixExtract = 'json:/';
const metaProductionTempFolder = '___temp';
const metaProductionDestFolder = '.wizzi';

class MetasManager {
    constructor() {
        this.packagePathCache = {};
        this.metaPlugins = [];
        this.providedProductions = [];
        this.globalContext = {};
    }
    //
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
        }
        if (options.globalContext) {
            this.globalContext = Object.assign({}, this.globalContext, options.globalContext)
            ;
        }
        console.log(mdDisplayName + '.initialize.globalContext', this.globalContext, __filename);
        // used for creating on the fly a json factory
        this.wfPluginsOptions = options.wfPlugins;
        if (verify.isObject(this.wfPluginsOptions) == false) {
            this.wfPluginsOptions = {};
        }
        this.metaPluginsOptions = options.metaPlugins;
        console.log(mdDisplayName + '.initialize.wfPluginsOptions', this.wfPluginsOptions, __filename);
        console.log(mdDisplayName + '.initialize.metaPluginsOptions', this.metaPluginsOptions, __filename);
        this.loadPlugins(this.metaPluginsOptions, (err, plugins) => {
        
            if (err) {
                return callback(err);
            }
            const register = (i) => {
            
                if (i >= plugins.length) {
                    return callback(null, this);
                }
                var plugin = plugins[i];
                console.log(mdDisplayName + 'Object.keys(plugin)', Object.keys(plugin), __filename);
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
        
        var itemsOptions = options.items;
        console.log(mdDisplayName + '.metaPluginsBaseFolder before', options.metaPluginsBaseFolder, __filename);
        console.log(mdDisplayName + '.__dirname', __dirname, __filename);
        var metaPluginsBaseFolder = options.metaPluginsBaseFolder || path.resolve(__dirname, '..', '..', '..');
        console.log(mdDisplayName + '.metaPluginsBaseFolder', metaPluginsBaseFolder, __filename);
        var packagePathCache = this.packagePathCache;
        
        function resolveNext(i) {
            
            // loog 'itemsOptions', itemsOptions
            if (i >= itemsOptions.length) {
                return callback(null, itemsOptions);
            }
            var plugin = itemsOptions[i];
            if (typeof (plugin) === "string") {
                plugin = itemsOptions[i] = {packagePath: plugin};
            }
            if (plugin.hasOwnProperty("packagePath") && !(plugin.hasOwnProperty("setup"))) {
                return resolveModule(metaPluginsBaseFolder, plugin.packagePath, function(err, moduleObject) {
                        if (err) {
                            return callback(err);
                        }
                        Object.keys(moduleObject).forEach(function(key) {
                            
                            // loog 'plugin key', key
                            if (!plugin.hasOwnProperty(key)) {
                                plugin[key] = moduleObject[key];
                            }
                        })
                        plugin.packageName = plugin.packagePath;
                        plugin.packagePath = moduleObject.packagePath;
                        return resolveNext(++i);
                    });
            }
            else {
                return resolveNext(++i);
            }
        }
        resolveNext(0);
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
    //
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
    //
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
        console.log(mdDisplayName + '.getMetaProduction', productionName, __filename);
        var found = null,
            foundInPlugin = null,
            pluginVersion = null,
            result = null;
        const search = (i) => {
        
            if (i >= this.metaPlugins.length) {
                const message = 'Cannot find model loader: ' + productionName + '\navailables meta productions: ' + this.availableMetaProductions().join(', ');
                log.error('getMetaProduction. ' + message);
                return callback(message);
            }
            var metaPlugin = this.metaPlugins[i];
            console.log(mdDisplayName + 'Object.keys(metaPlugin)', Object.keys(metaPlugin), __filename);
            metaPlugin.getMetaProduction(productionName, (err, metaProduction) => {
            
                if (err) {
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
    //
    getMetaProductionStarter(options, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'getMetaProductionStarter', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        console.log(mdDisplayName + '.getMetaProductionStarter', __filename);
        var result = {};
        const search = (i) => {
        
            if (i >= this.metaPlugins.length) {
                return callback(null, result);
            }
            var metaPlugin = this.metaPlugins[i];
            console.log(mdDisplayName + 'Object.keys(metaPlugin)', Object.keys(metaPlugin), __filename);
            metaPlugin.getMetaProductionStarter({
                metaCtx: options.metaCtx || {}
             }, (err, metaProduction) => {
            
                if (err) {
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
    execProductionFromFs(metaIttfFolder, metaVer, metaCtx, options, callback) {
        
        const folderTemplatesIndexPath = "folderTemplates/index.ittf.ittf";
        
        packiUtils.createPackifilesFromFs(metaIttfFolder, (err, metaPackiFiles) => {
        
            if (err) {
                return callback(err);
            }
            var dump = stringify(Object.keys(metaPackiFiles), null, 2);
            console.log(mdDisplayName, 'metaPackiFiles 1', dump, __filename);
            this.execProduction(metaPackiFiles, metaVer, metaCtx, options, callback)
        }
        )
    }
    execProduction(metaPackiFiles, metaVer, metaCtx, options, callback) {
        const folderTemplatesIndex = [
            "template root", 
            "    $", 
            "        var pkgPath = '" + (options.pkgPath || '') + "'", 
            "        var metaVer = '" + metaVer + "'"
        ];
        for (var k in metaPackiFiles) {
            if (k.startsWith("folderTemplates/")) {
                folderTemplatesIndex.push("    $include ./" + k.substring(16, k.length - 10))
                const newk = k.substring(0, 15) + '/t/' + k.substring(16);
                metaPackiFiles[newk] = metaPackiFiles[k];
                delete metaPackiFiles[k]
            }
            if (k.startsWith("ittfDocumentTemplates/")) {
                const newk = 't/' + k.substring(22);
                metaPackiFiles[newk] = metaPackiFiles[k];
                delete metaPackiFiles[k]
            }
        }
        metaPackiFiles[folderTemplatesIndexPath] = {
            type: "CODE", 
            contents: folderTemplatesIndex.join('\n')
         };
        dump = stringify(Object.keys(metaPackiFiles), null, 2)
        ;
        console.log(mdDisplayName, '.makeFromFs.metaPackiFiles 2', dump, __filename);
        dump = stringify(metaPackiFiles[folderTemplatesIndexPath], null, 2)
        ;
        console.log(mdDisplayName, '.makeFromFs.folderTemplates/index', dump, __filename);
        if (options.dumpMetaStartFolder) {
            packiUtils.writePackifiles(options.dumpMetaStartFolder, metaPackiFiles)
        }
        this.createJsonWizziFactoryAndJsonFs(this.wfPluginsOptions, metaPackiFiles, (err, wf_and_fsjson) => {
        
            if (err) {
                return callback(err);
            }
            wf_and_fsjson.wf.metaGenerate(packiFilePrefix + folderTemplatesIndexPath, {
                modelRequestContext: metaCtx
             }, {
                tempFolder: packiFilePrefix + metaProductionTempFolder, 
                destFolder: packiFilePrefix + metaProductionDestFolder
             }, (err, jsonFs) => {
            
                if (err) {
                    return callback(err);
                }
                console.log(mdDisplayName, '.makeFromFs.metaGenerate done', __filename);
                packiUtils.jsonFsToPackiFiles(wf_and_fsjson.jsonFs, '___temp', (err, tempPackiFiles) => {
                
                    if (err) {
                        return callback(err);
                    }
                    if (options.dumpProductionTempFolder) {
                        packiUtils.writePackifiles(options.dumpProductionTempFolder, tempPackiFiles)
                    }
                    packiUtils.jsonFsToPackiFiles(wf_and_fsjson.jsonFs, '.wizzi', (err, wizziPackiFiles) => {
                    
                        if (err) {
                            return callback(err);
                        }
                        if (options.dumpProductionDestFolder) {
                            packiUtils.writePackifiles(options.dumpProductionDestFolder, wizziPackiFiles)
                        }
                        return callback(null, metaPackiFiles);
                    }
                    )
                }
                )
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
        console.log(mdDisplayName + '.getProvidedMetas', __filename);
        var provides = {
            metaProductions: [
                
            ], 
            metaProductionSelectors: [
                
            ]
         };
        console.log('===================== >>>>>>>>>>>>>>>>>> this.metaPlugins.length', this.metaPlugins.length, __filename);
        const search = (ndx) => {
        
            if (ndx >= this.metaPlugins.length) {
                return callback(null, provides);
            }
            var metaPlugin = this.metaPlugins[ndx];
            console.log(mdDisplayName + '.metaPlugin.provides', metaPlugin.provides, __filename);
            var i, i_items=metaPlugin.provides.metaProductions, i_len=metaPlugin.provides.metaProductions.length, item;
            for (i=0; i<i_len; i++) {
                item = metaPlugin.provides.metaProductions[i];
                provides.metaProductions.push(item)
                provides.metaProductionSelectors.push('use' + item[0].toUpperCase() + item.substring(1))
            }
            search(++ndx);
        }
        ;
        search(0);
    }
    createJsonWizziFactoryAndJsonFs(wfPluginsOptions, packiFiles, callback) {
        const jsonDocuments = [];
        Object.keys(packiFiles).map((value) => {
        
            if (packiFiles[value].type === 'CODE' && verify.isNotEmpty(packiFiles[value].contents)) {
                const filePath = packiUtils.ensurePackiFilePrefix(value);
                console.log(mdDisplayName + '.createJsonWizziFactoryAndJsonFs.filePath', filePath, __filename);
                jsonDocuments.push({
                    path: filePath, 
                    content: packiFiles[value].contents
                 })
            }
        }
        )
        JsonComponents.createJsonFs(jsonDocuments, (err, jsonFs) => {
        
            if (err) {
                return callback(err);
            }
            console.log(mdDisplayName + '.createJsonWizziFactoryAndJsonFs jsonFs created', __filename);
            wizziFactory.createFactory({
                plugins: wfPluginsOptions, 
                repo: {
                    storeKind: 'json', 
                    storeJsonFs: jsonFs
                 }
             }, (err, wf) => {
            
                if (err) {
                    return callback(err);
                }
                console.log(mdDisplayName + '.createJsonWizziFactoryAndJsonFs json wizzi factory created', __filename);
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
        console.log('wizzi.metasManager.createManager.options', options, __filename);
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
        method: 'wizzi@0.8.5.metasManager.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
