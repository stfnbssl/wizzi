/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\production\preLoader.js.ittf
    utc time: Thu, 02 Jan 2025 12:51:28 GMT
*/
// generated by wizzi.plugin.js.artifacts.js.module.gen.main
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var assert = require('assert');
var path = require('path');
var util = require('util');
var verify = require('@wizzi/utils').verify;
var log = require('../util/log')(module);
var Runner = require('./runner').Runner;

// The PreLoader is called by the ProductionManager (AsyncGlobalModelPreLoader.run and
// AsyncArtifactCollectionPreLoader.run), in the preload step.
// It executes the pre load of global models and front matter data of artifact models,
// and adds them to the ProductionContext instance.

var PreLoader = (function () {
    function PreLoader(loadInfo) {
        _classCallCheck(this, PreLoader);
        this.loadInfo = loadInfo;
        this.productionManager = loadInfo.productionManager;
        this.productionContext = this.productionManager.productionContext;
        this.wizziFactory = this.productionManager.wizziFactory;
    }
    PreLoader.prototype.runGlobalModel = function(callback) {
        // loadInfo alias of ModelInfo
        // loog 'wizzi.production.preLoader.runGlobalModel.start', this.loadInfo
        this.wizziFactory.loadModel(this.loadInfo.schema, this.loadInfo.srcFullPath(), {
            mTreeBuildUpContext: {}, 
            globalContext: {}
         }, (err, wizziModel) => {
            if (err) {
                console.log("[31m%s[0m", err);
                return callback(err);
            }
            this.productionContext.addGlobalModel(this.loadInfo.srcFullPath(), this.loadInfo.exportName, wizziModel)
            return callback(null, wizziModel);
        }
        )
    }
    PreLoader.prototype.runArtifactCollection = function(callback) {
        // loadInfo alias of ProductionStep
        // loog 'wizzi.production.preLoader.runArtifact.start.productionStep.name', this.loadInfo.name
        AsyncRunner.runFrontMatter(this.loadInfo, (err, result) => {
            if (err) {
                console.log("[31m%s[0m", err);
                return callback(err);
            }
            // loog 'wizzi.production.preLoader.runArtifact.runFrontMatter.result', result
            this.productionContext.addArtifactCollection(this.loadInfo, result)
            return callback(null, result);
        }
        )
    }
    return PreLoader;
})();

/**
    async run a production step
     from a productionStep object
*/
var AsyncRunner = {
    run: function(productionStep, callback) {
        // _ log.info('Started async run artifact: ' + productionStep.name)
        var runner = new Runner(productionStep);
        runner.run(function(err, operResult) {
            
            // set err.ProfuctionManagerAsyncRunnerStack = (new Error()).stack
            if (err) {
                err.productionStep = productionStep.toString();
                return callback(err);
            }
            // _ log.info('Ended async run artifact: ' + productionStep.name)
            callback(null, operResult);
        })
    }, 
    runFrontMatter: function(productionStep, callback) {
        // _ log.info('Started async runFrontMatter artifact: ' + productionStep.name)
        var runner = new Runner(productionStep);
        runner.runFrontMatter(function(err, operResult) {
            
            // set err.ProfuctionManagerAsyncRunnerStack = (new Error()).stack
            if (err) {
                err.productionStep = productionStep.toString();
                return callback(err);
            }
            // _ log.info('Ended async runFrontMatter artifact: ' + productionStep.name)
            callback(null, operResult);
        })
    }
 };

module.exports = {
    PreLoader: PreLoader
};