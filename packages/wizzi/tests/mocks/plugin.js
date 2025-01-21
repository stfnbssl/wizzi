/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\tests\mocks\plugin.js.ittf
    utc time: Tue, 21 Jan 2025 14:15:37 GMT
*/
// generated by wizzi.plugin.js.artifacts.js.module.gen.main
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };


var util = require('util');
var path = require('path');
var stringify = require('json-stringify-safe');

var md = module.exports = {};
md.name = 'mock1-plugin';

/**
     FactoryPlugin class
*/
var FactoryPlugin = (function () {
    function FactoryPlugin(wizziPackage, provides) {
        _classCallCheck(this, FactoryPlugin);
        this.file = wizziPackage.file;
        this.provides = provides;
        this.modelFactories = {};
        this.modelTransformers = {};
        this.artifactGenerators = {};
        this.schemaDefinitions = {};
    }
    FactoryPlugin.prototype.initialize = function(options, callback) {
        // TODO
        return callback(null);
    }
    FactoryPlugin.prototype.getName = function() {
        return 'mock1-plugin';
    }
    FactoryPlugin.prototype.getFilename = function() {
        return __filename;
    }
    FactoryPlugin.prototype.getProvides = function() {
        return this.provides;
    }
    /**
         Retrieve a WizziModelFactory by its wfschema name
         searching the loader in this WizziPackage.
         No search up in "node_modules" folders.
    */
    FactoryPlugin.prototype.getModelFactory = function(schemaName, mockBaseDir) {
        // loog 'wizzi.tests.plugin.getModelFactory: schemaName, mockBaseDir', schemaName, mockBaseDir
        var factory = this.modelFactories[schemaName] || null;
        if (factory == null) {
            var models = require('./wizziModels');
            factory = this.getMockFactory(schemaName, mockBaseDir)
            ;
            this.modelFactories[schemaName] = factory;
        }
        return factory;
    }
    FactoryPlugin.prototype.getMockFactory = function(schemaName, mockBaseDir) {
        return {
                createLoadModel: function() {
                    var mockWizziModels = require('./wizziModels');
                    var models = mockWizziModels.getModels(schemaName, mockBaseDir);
                    return function(ittfDocumentUri, context, callback) {
                            if (models[ittfDocumentUri]) {
                                callback(null, models[ittfDocumentUri])
                            }
                            // loog 'wizzi.tests.plugin.createLoadModel', ittfDocumentUri, models
                            else {
                                callback({
                                    __is_error: true, 
                                    message: 'Wizzi model not found. IttfDocumentUri: ' + ittfDocumentUri
                                 })
                            }
                        };
                }
             };
    }
    /**
         retrieve a ModelTransformer by its name
         searching the loader in this WizziPackage
         No search up in "node_modules" folders.
    */
    FactoryPlugin.prototype.getModelTransformer = function(transformerName) {
        
        // loog 'wizzi.tests.plugin.getModelTransformer transformerName: ' + transformerName
        var transformer = this.modelTransformers[transformerName] || null;
        
        // loog 'wizzi.tests.plugin.getModelTransformer transformers: ' + transformers
        
        // loog 'wizzi.tests.plugin.getModelTransformer transformer: ' + transformer
        if (transformer == null) {
            var transformers = require('./transformers');
            transformer = transformers.getTransformer(transformerName)
            ;
            this.modelTransformers[transformerName] = transformer;
        }
        return transformer;
    }
    /**
         Retrieve an ArtifactGenerator by its name
         Generators are searched in this WizziPackage
         No search up in "node_modules" folders.
    */
    FactoryPlugin.prototype.getArtifactGenerator = function(generationName) {
        
        var generator = this.artifactGenerators[generationName] || null;
        if (generator == null) {
            var generators = require('./generators');
            generator = generators.getGenerator(generationName)
            ;
            this.artifactGenerators[generationName] = generator;
        }
        return generator;
    }
    /**
         Retrieve a WizziSchema definition in JSON format
         searching the loader in this WizziPackage.
         No search up in "node_modules" folders.
    */
    FactoryPlugin.prototype.getSchemaDefinition = function(schemaName) {
        var definition = this.schemaDefinitions[schemaName] || null;
        if (definition == null) {
            var definitions = require('./definitions');
            definition = definitions.getSchemaDefinition(schemaName)
            ;
            this.schemaDefinitions[schemaName] = definition;
        }
        return definition;
    }
    return FactoryPlugin;
})();


function error(code, message) {
    return {
            __is_error: true, 
            source: 'mock1-plugin/FactoryPlugin', 
            code: code, 
            message: message
         };
}

module.exports = {
    provides: {
        schemas: [
            'tests'
        ], 
        modelTransformers: [
            'tests/trans1'
        ], 
        artifactGenerators: [
            'tests/gen1'
        ]
     }, 
    createFactoryPlugin: function(wizziPackage, options, callback) {
        var plugin = new FactoryPlugin(wizziPackage, this.provides);
        plugin.initialize(options, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            return callback(null, plugin);
        })
    }
 };
