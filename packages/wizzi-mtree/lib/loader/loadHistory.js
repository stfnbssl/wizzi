/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\lib\loader\loadHistory.js.ittf
    utc time: Thu, 02 Jan 2025 09:17:36 GMT
*/
// generated by wizzi.plugin.js.artifacts.js.module.gen.main
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var util = require('util');
var MTreeBrickProvider = null;
var utilsErrors = require('@wizzi/utils').errors;
/**
     One mTree loading uses 1 mTreeBrickProvider and 1 loadHistory.
    
     The loadHistory keeps tracks of the ittf documents loaded
     for building one mTree. Once loaded, ittf documents become mTreeBricks,
     that may be reused many times for the same mTree and always are cloned.
     Every cloned mTreeBrick has its own evalContext.
     The loadHistory assigns source keys to ittf documents, loaded once, and
     mTreeBrick keys to every cloned mTreeBricks.
     It also checks the mix and include call chain to prevent recursion.
    
     ittfDocumentDatas: Map
     key: sourceKey
     item object:
     string ittfDocumentUri
     string content
     string sourceKey
    
     mTreeBrickDatas: Map
     key: brickKey
     item object:
     string ittfDocumentUri
     string schema
     { mTreeBrick (cloned)      // mTreeBrick is created by the mTreeBrickProvider
     $mixerBrickKey:String    // key of the mixer mTreeBrickData
     // set by the lib/loader/mixer
     $args:String             // args of the mixin call
     // set by the lib/loader/mixer
     $params:String           // params received by the mixed mTreeBrick
     byRefParams:Array        // params passed by reference
     parseFragmentParamsValues:Function  // calculates the values
     { evalContext
     string sourceKey
     string brickKey
    
     [ callChain
     {
     string mixerUri
     string mixedUri
    
*/
var LoadHistory = (function () {
    function LoadHistory() {
        _classCallCheck(this, LoadHistory);
        this.__type = 'LoadHistory';
        this.ittfDocumentDatas = {};
        this.mTreeBrickDatas = {};
        this.sourceCount = 0;
        this.modelCount = 0;
        this.nodeCount = 0;
        this.callChain = [];
        this.contextsFromMTreeBuildUpScriptAst = null;
    }
    LoadHistory.prototype.addIttfDocument = function(ittfDocumentUri, textContent) {
        var sourceKey = 'f' + ++this.sourceCount;
        var ittfDocumentData = {
            ittfDocumentUri: ittfDocumentUri, 
            sourceKey: sourceKey, 
            content: textContent
         };
        this.ittfDocumentDatas[sourceKey] = ittfDocumentData;
        return ittfDocumentData;
    }
    LoadHistory.prototype.addMTreeBrick = function(ittfDocumentUri, schema, mTreeBrickCloned, options) {
        var sourceKey = this.getSourceKey(ittfDocumentUri);
        if (options.include) {
            return {
                    sourceKey: sourceKey, 
                    brickKey: options.includerBrickKey
                 };
        }
        var brickKey = 'f' + ++this.modelCount;
        var mTreeBrickData = {
            ittfDocumentUri: ittfDocumentUri, 
            schema: schema, 
            sourceKey: sourceKey, 
            brickKey: brickKey, 
            mTreeBrick: mTreeBrickCloned, 
            evalContext: null
         };
        this.mTreeBrickDatas[brickKey] = mTreeBrickData;
        return mTreeBrickData;
    }
    LoadHistory.prototype.getMTreeBrickData = function(brickKey) {
        return this.mTreeBrickDatas[brickKey];
    }
    LoadHistory.prototype.getIttfDocumentUri = function(sourceKey) {
        var ittfDocumentData = this.ittfDocumentDatas[sourceKey];
        return ittfDocumentData ? ittfDocumentData.ittfDocumentUri : 'Source ittfDocumentUri unavailable';
    }
    LoadHistory.prototype.getIttfDocumentContent = function(sourceKey) {
        var ittfDocumentData = this.ittfDocumentDatas[sourceKey];
        return ittfDocumentData ? ittfDocumentData.content : 'Source content unavailable';
    }
    LoadHistory.prototype.getSourceKey = function(ittfDocumentUri) {
        for (var k in this.ittfDocumentDatas) {
            if (this.ittfDocumentDatas[k].ittfDocumentUri === ittfDocumentUri) {
                return k;
            }
        }
        return null;
    }
    LoadHistory.prototype.getIttfDocuments = function() {
        var ret = {};
        for (var k in this.ittfDocumentDatas) {
            var ittfDocumentData = this.ittfDocumentDatas[k];
            ret[this.getIttfDocumentUri(ittfDocumentData.sourceKey)] = {
                sourceKey: ittfDocumentData.sourceKey
             };
        }
        return ret;
    }
    LoadHistory.prototype.findNodeById = function(nodeId) {
        for (var k in this.mTreeBrickDatas) {
            var mTreeBrickData = this.mTreeBrickDatas[k];
            var mTreeNode = mTreeBrickData.mTreeBrick.findNodeById(nodeId);
            if (mTreeNode) {
                return {
                        mTreeNode: mTreeNode, 
                        brickKey: mTreeBrickData.brickKey, 
                        mTreeBrick: mTreeBrickData.mTreeBrick
                     };
            }
        }
        return null;
    }
    LoadHistory.prototype.getNewNodeId = function() {
        return ++this.nodeCount;
    }
    LoadHistory.prototype.enterFragmentCall = function(mixerUri, mixedUri) {
        this.callChain.push({
            mixerUri: mixerUri, 
            mixedUri: mixedUri
         })
    }
    LoadHistory.prototype.exitFragmentCall = function() {
        this.callChain.pop();
    }
    LoadHistory.prototype.checkForRecursion = function() {
        for (var i = 0; i < this.callChain.length; i++) {
            if (this.callChain[i].mixerUri == this.callChain[i].mixedUri) {
                return true;
            }
            for (var j = 0; j < this.callChain.length; j++) {
                if ((this.callChain[j].mixerUri == this.callChain[i].mixedUri) && (this.callChain[j].mixedUri == this.callChain[i].mixerUri)) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
         params
         string sourceKey
         { errorData
         @ row
         @ column
         @ description
         boolean json
        
    */
    LoadHistory.prototype.getIttfDocumentErrorLines = function(sourceKey, errorData, json) {
        var source = this.getIttfDocumentContent(sourceKey);
        return utilsErrors.getErrorLines(errorData, source, json);
    }
    LoadHistory.prototype.setContextsFromMTreeBuildUpScriptAst = function(contexts) {
        this.contextsFromMTreeBuildUpScriptAst = contexts;
        // loog 'loader.loadHistory.contextsFromMTreeBuildUpScriptAst', this.contextsFromMTreeBuildUpScriptAst
    }
    LoadHistory.prototype.getMTreeBrickFunctionScopes = function(brickKey) {
        var mTreeBricks = this.contextsFromMTreeBuildUpScriptAst.mTreeBricks;
        // loog 'loadHistory.mTreeBricks', mTreeBricks
        // loog 'loadHistory.mTreeBricks[brickKey]', mTreeBricks[brickKey]
        
        // the mTreeBricks ha no script statement and the `functions` scopes object
        
        // has not been set by the JsWizziRunner
        
        // return an empty object
        if (!mTreeBricks[brickKey]) {
            return {
                    functions: {
                        
                     }
                 };
        }
        // log 'loadHistory.mTreeBricks[brickKey].functions', mTreeBricks[brickKey].functions
        else {
            return mTreeBricks[brickKey];
        }
    }
    return LoadHistory;
})();


module.exports = {
    LoadHistory: LoadHistory
};