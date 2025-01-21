/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\production\context.js.ittf
    utc time: Tue, 21 Jan 2025 14:15:35 GMT
*/
// generated by wizzi.plugin.js.artifacts.js.module.gen.main
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var path = require('path');
var util = require('util');
var stringify = require('json-stringify-safe');
var file = require('@wizzi/utils').file;
var fail = require('@wizzi/utils').fail;
var runnerServer = null;
/**
     { options
     { dumps
     string dumpsBaseFolder
     { mTreeBuildUpJsWizziScript
     boolean dump
     string dumpsBaseFolder
*/
var ProductionContext = (function () {
    function ProductionContext(options) {
        _classCallCheck(this, ProductionContext);
        this.dump = false;
        this.dumps = options.dumps || {};
        this.ittfDocuments = {};
        this.ittfEvaluationScripts = {};
        this.mTrees = {};
        this.runningContextValues = {};
        this.newRunningContextValues = [];
        this.evaluatedMTrees = {};
        this.globalModels = {};
        this.artifactCollections = {};
        this.wizziModels = {};
        this.artifacts = [];
        if (runnerServer == null) {
            runnerServer = require('../services/runnerServer');
        }
        this.runnerServer = runnerServer.instance;
    }
    ProductionContext.prototype.setAclStat = function(aclstat) {
        this.aclstat = aclstat;
    }
    ProductionContext.prototype.addIttfDocument = function(uri, content) {
        if (this.ittfDocuments[uri]) {
            this.ittfDocuments[uri].cacheCount++;
        }
        else {
            this.ittfDocuments[uri] = {
                uri: uri, 
                content: content, 
                cacheCount: 0
             };
        }
    }
    ProductionContext.prototype.addMTreeBuildUpScript = function(uri, ittfEvalScript) {
        this.ittfEvaluationScripts[uri] = {
            uri: uri, 
            ittfEvalScript: ittfEvalScript
         };
        // loog '*=*=*=*= temporary wizzi.production.productionContext. this.dumps : ', this.dumps
        if (this.dumps && this.dumps.mTreeBuildUpJsWizziScript && this.dumps.mTreeBuildUpJsWizziScript.dump) {
            var dumpsFolder = this.dumps.mTreeBuildUpJsWizziScript.dumpsBaseFolder || this.dumps.dumpsBaseFolder;
            file.write(path.join(dumpsFolder, path.basename(uri) + '.js.dump'), ittfEvalScript.toCode())
        }
    }
    ProductionContext.prototype.addMixedMTree = function(uri, mTree) {
        if (this.dumps && this.dumps.mixedMTree && this.dumps.mixedMTree.dump) {
            var dumpsFolder = this.dumps.mixedMTree.dumpsBaseFolder || this.dumps.dumpsBaseFolder;
            file.write(path.join(dumpsFolder, (path.basename(uri) + '.mixed.mTree.dump')), mTree.dump())
        }
    }
    ProductionContext.prototype.addEvaluatedMTree = function(uri, mTree) {
        this.evaluatedMTrees[uri] = mTree.dump(true);
        if (this.dumps && this.dumps.evaluatedMTree && this.dumps.evaluatedMTree.dump) {
            var dumpsFolder = this.dumps.evaluatedMTree.dumpsBaseFolder || this.dumps.dumpsBaseFolder;
            file.write(path.join(dumpsFolder, path.basename(uri) + '.evaluated.mTree.dump'), this.evaluatedMTrees[uri])
        }
    }
    ProductionContext.prototype.addMTree = function(uri, loadHistory) {
        this.mTrees[uri] = {
            uri: uri, 
            loadHistory: loadHistory
         };
    }
    ProductionContext.prototype.addGlobalModel = function(uri, exportName, model) {
        this.globalModels[exportName] = model;
        this.wizziModels[uri] = {
            uri: uri, 
            exportName: exportName, 
            wizziModel: model
         };
    }
    ProductionContext.prototype.addArtifactCollection = function(productionStep, frontMatters) {
        // loog 'wizzi.ProductionContext.addArtifactCollection.artifactName', productionStep.name
        // loog 'wizzi.ProductionContext.addArtifactCollection.frontMatters', frontMatters
        var coll = this.artifactCollections[frontMatters.collection];
        if (!coll) {
            this.artifactCollections[frontMatters.collection] = [...frontMatters.items];
        }
        else {
            this.artifactCollections[frontMatters.collection] = [
                ...coll, 
                ...frontMatters.items
            ];
        }
    }
    ProductionContext.prototype.addWizziModel = function(uri, wizziModel) {
        this.wizziModels[uri] = {
            uri: uri, 
            wizziModel: wizziModel
         };
    }
    ProductionContext.prototype.addArtifact = function(artifact) {
        this.artifacts.push(artifact);
    }
    ProductionContext.prototype.getGlobalModels = function() {
        return this.globalModels;
    }
    ProductionContext.prototype.getArtifactCollections = function() {
        return {
                collection: this.artifactCollections
             };
    }
    ProductionContext.prototype.raiseIttfEvaluationScriptError = function(uri, exception) {
        var script = this.ittfEvaluationScripts[uri];
        if (script && script.ittfEvalScript && exception && exception.lineNumber) {
            var lines = script.ittfEvalScript.getErrorLines(exception).join('\n')
            ;
            exception.message = '\nError evaluating ittf in uri: ' + uri + '\n' + lines + '\n';
        }
        else {
            exception.message = '\nError evaluating ittf in uri: ' + uri + '\n' + exception.message + '\n';
        }
        fail.warn(exception);
        throw exception;
    }
    ProductionContext.prototype.onRunningContextValueChange = function(namePath, value) {
        console.log('onRunningContextValueChange', namePath, value);
        this.newRunningContextValues.push({
            namePath: namePath, 
            value: value
         })
    }
    ProductionContext.prototype.hasNewRunningContextValues = function() {
        return this.newRunningContextValues.length > 0;
    }
    ProductionContext.prototype.acceptNewRunningContextValues = function() {
        this.newRunningContextValues = [];
    }
    ProductionContext.prototype.setEvaluationContextValue = function(namePath, value) {
        if (!namePath) {
            return ;
        }
        var ss = namePath.split('.');
        if (ss.length < 2) {
            if (!checkEquals(this.runningContextValues[namePath], value)) {
                this.runningContextValues[namePath] = value;
                this.onRunningContextValueChange(namePath, value)
            }
            return ;
        }
        var obj = this.runningContextValues[ss[0]];
        // loog '1 - ss[0]', ss[0], !obj
        // loog 'ss[0], obj 1', ss[0], JSON.stringify(obj)
        if (!obj) {
            obj = this.runningContextValues[ss[0]] = {};
        }
        else {
            obj = this.runningContextValues[ss[0]];
        }
        var i = 1;
        while (i < ss.length - 1) {
            // loog 'i,ss[i],obj[ss[i]],JSON.stringify(this.runningContextValues)', i, ss[i], obj[ss[i]], JSON.stringify(this.runningContextValues)
            // loog '2 - ss[i]', i, ss[i], !obj[ss[i]]
            if (!obj[ss[i]]) {
                obj = obj[ss[i]] = {};
            }
            else {
                obj = obj[ss[i]];
            }
            // loog 'obj 4', JSON.stringify(obj)
            i++;
        }
        // loog 'obj 5', JSON.stringify(obj)
        // loog ss[i], obj[ss[i]], value
        // loog 'ProductionContext.runningContextValues', JSON.stringify(this.runningContextValues)
        // loog '3, ss[i], obj[ss[i]], value', ss[i], obj[ss[i]], value
        
        // loog '4 set'
        if (!checkEquals(obj[ss[i]], value)) {
            obj[ss[i]] = value;
            this.onRunningContextValueChange(namePath, value)
        }
        // loog 'ProductionContext.runningContextValues', JSON.stringify(this.runningContextValues)
    }
    ProductionContext.prototype.removeEvaluationContextValue = function(namePath) {
        throw new Error('ProductionContext.removeEvaluationContextValue not implemented yet');
    }
    ProductionContext.prototype.getEvaluationContextValue = function(namePath) {
        if (!namePath) {
            return ;
        }
        var ss = namePath.split('.');
        if (ss.length < 2) {
            return this.runningContextValues[namePath];
        }
        var obj = this.runningContextValues[ss[0]];
        // loog 'get obj 0', obj
        if (obj) {
            var i = 1;
            var found = true;
            while (i < ss.length - 1) {
                obj = obj[ss[i]];
                // loog 'get i,ss[i],obj', i, ss[i], obj
                if (!obj) {
                    found = false;
                    i = ss.length;
                }
                else {
                    i++;
                }
            }
            
            // loog 'get obj found', obj
            if (found) {
                return obj[ss[i]];
            }
        }
        return null;
    }
    return ProductionContext;
})();

function checkEquals(a, b) {
    if (a == null && b == null) {
        return true;
    }
    if (a == undefined && b == undefined) {
        return true;
    }
    return stringify(a) == stringify(b);
}

module.exports = {
    ProductionContext: ProductionContext
};