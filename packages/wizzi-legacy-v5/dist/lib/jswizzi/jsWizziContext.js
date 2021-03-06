/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\kernel\wizzi-mtree\src\ittf\lib\jswizzi\jswizzicontext.js.ittf
    utc time: Tue, 10 Oct 2017 15:44:11 GMT
*/
'use strict';
// generated by wizzi.codegen.js.es2015.module
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var assert = require('assert');
var util = require('util');
var f_dateutil = require('./functions/dateutil');
var f_verify = require('./functions/verify');
var f_underscore = require('./functions/underscore');
var errors = require('./errors');
var JsWizziEvalHelper = require('./jsWizziEvalHelper');
var ContextData = require('./contextData');
var defaultValues = {
    '__dollar':  '$', 
    '__dollardollar':  '$$', 
    '__dollaraster':   '$*', 
    '__asterdollar':   '*$'
};
var knownCallables = {
    'console': console, 
    '_': f_underscore, 
    'Object': Object, 
    'Array': Array, 
    'String': String, 
    'Date': Date, 
    'Number': Number, 
    'Map': Map, 
    'Math': Math, 
    'RegExp': RegExp, 
    'JSON': JSON, 
    'path': require('path'), 
    'util': util, 
    'dateUtil': f_dateutil, 
    'verify': f_verify, 
    'Infinity': Infinity, 
    'NaN': NaN
};
var builtinFunctions = {
    'Array': Array, 
    'String': String, 
    'Date': Date, 
    'Number': Number, 
    'RegExp': RegExp, 
    'isFinite': isFinite, 
    'isNaN': isNaN, 
    'parseFloat': parseFloat, 
    'parseInt': parseInt, 
    'decodeURI': decodeURI, 
    'decodeURIComponent': decodeURIComponent, 
    'encodeURI': encodeURI, 
    'encodeURIComponent': encodeURIComponent
};
var ittfStates = {
    nodeContext: 0, 
    brickEvalContext: 1, 
    globalContext: 2, 
    callContext: 3
};
var JsWizziContext = (function () {
    function JsWizziContext(composedMTree, productionContext) {
        _classCallCheck(this, JsWizziContext);
        this.isForInterpolation = false;
        if (composedMTree) {
            // The JsWizziContext is used for the
            // buildup of an MTree.
            // Create the JsWizziEvalHelper
            this.composedMTree = composedMTree;
            this.loadHistory = composedMTree.loadHistory;
            this.productionContext = productionContext;
            this.evalHelper = new JsWizziEvalHelper(this, composedMTree, productionContext);
        }
        else {
            // The JsWizziContext is used for interpolations.
            this.isForInterpolation = true;
        }
        
        this.globalContext = new ContextData(ittfStates.globalContext);
        this.callContext = new ContextData(ittfStates.callContext);
        if (this.isForInterpolation == false) {
            this.nodeContext = new ContextData(ittfStates.nodeContext);
        }
        this.loadingCallArguments = false;
        
        this.exprPending = null;
        
        // The first getValue will be for the '$' variable
        this.ittf_state = ittfStates.globalContext;
        this.currentMTreeBrickKey = null;
        // brickEvalContext is retrieved from JsWizziEvalHelper
        // each ittf source document has its brickEvalContext
        this.brickEvalContext = null;
        
        if (this.isForInterpolation == false) {
            this.globalContext.declare('$', this.evalHelper);
            // freeze to avoid override of $ variable.
            this.globalContext.$freeze();
        }
        
        // set global defaults and allowed functions
        this.globalContext.setValues(defaultValues);
        this.globalContext.setValues(knownCallables);
        this.globalContext.setValues(builtinFunctions);
        
        this.runningNodeId = null;
        
        this.startTimer = process.hrtime();
        
    }
    // Called by JsWizziRunner.FunctionDeclarationCall
    JsWizziContext.prototype.push = function() {
        this.callContext.push();
        if (this.isForInterpolation == false) {
            this.nodeContext.push();
            this.brickEvalContext.push();
        }
        return this;
    }
    JsWizziContext.prototype.pop = function() {
        this.callContext.pop();
        if (this.isForInterpolation == false) {
            this.nodeContext.pop();
            this.brickEvalContext.pop();
        }
        return this;
    }
    JsWizziContext.prototype.clear = function() {
        this.globalContext.clear();
        if (this.isForInterpolation == false) {
            this.nodeContext.clear();
            if (this.brickEvalContext) {
                this.brickEvalContext.clear();
            }
            this.globalContext.declare('$', this.evalHelper);
            this.globalContext.$freeze();
        }
        this.globalContext.setValues(defaultValues);
        this.globalContext.setValues(knownCallables);
    }
    JsWizziContext.prototype.setRunningNodeId = function(id) {
        this.runningNodeId = id;
    }
    JsWizziContext.prototype.get_currentMTreeBrickInfo = function() {
        if (this.currentMTreeBrickKey == null) {
            return {
                    currentModel_uri: 'unavailable', 
                    currentModel_mixerUri: 'unavailable'
                };
        }
        else {
            var mTreeBrickData = this.loadHistory.getMTreeBrickData(this.currentMTreeBrickKey);
            var mixerUri = 'root model';
            if (mTreeBrickData.mTreeBrick.$mixerBrickKey) {
                var mixerMTreeBrickData = this.loadHistory.getMTreeBrickData(mTreeBrickData.mTreeBrick.$mixerBrickKey);
                var mixerUri = mixerMTreeBrickData ? mixerMTreeBrickData.ittfDocumentUri : 'root model';
            }
            return {
                    currentModel_uri: mTreeBrickData.ittfDocumentUri, 
                    currentModel_mixerUri: mixerUri
                };
        }
    }
    JsWizziContext.prototype.elapsedTime = function(note) {
        var precision = 3;
        // divide by a million to get nano to milli
        var elapsed = process.hrtime(this.startTimer)[1] / 1000000;
        console.log(process.hrtime(this.startTimer)[0] + " s, " + elapsed.toFixed(precision) + " ms - " + note);
        this.startTimer = process.hrtime();
    }
    JsWizziContext.prototype.beginLoadingCallArguments = function() {
        this.loadingCallArguments = true;
    }
    JsWizziContext.prototype.endLoadingCallArguments = function() {
        this.loadingCallArguments = false;
    }
    JsWizziContext.prototype.declare = function(name, value) {
        if (this.ittf_state === ittfStates.globalContext) {
            this.globalContext.declare(name, value);
        }
        else if (this.ittf_state === ittfStates.nodeContext) {
            this.nodeContext.declare(name, value);
        }
        else {
            this.brickEvalContext.declare(name, value);
        }
    }
    JsWizziContext.prototype.declareCallParam = function(name, value) {
        // log 'wizzi-mtree.jsWizziContext.declareCallParam', name, value
        this.callContext.declare(name, value);
    }
    JsWizziContext.prototype.undeclare = function(name) {
        if (this.ittf_state === ittfStates.globalContext) {
            this.globalContext.undeclare(name);
        }
        else if (this.ittf_state === ittfStates.nodeContext) {
            this.nodeContext.undeclare(name);
        }
        else {
            this.brickEvalContext.undeclare(name);
        }
    }
    JsWizziContext.prototype.isDeclared = function(name) {
        var ret = false;
        if (this.loadingCallArguments) {
            if (this.globalContext.isDeclared(name)) {
                return true;
            }
            if (this.callContext.isDeclared(name)) {
                return true;
            }
            if (this.isForInterpolation == false) {
                if (this.nodeContext.isDeclared(name)) {
                    return true;
                }
                if (this.brickEvalContext && this.brickEvalContext.isDeclared(name)) {
                    return true;
                }
            }
            return false;
        }
        else if (this.ittf_state === ittfStates.globalContext) {
            var ret = this.brickEvalContext ? this.brickEvalContext.isDeclared(name) : null;
            if (!ret) {
                ret = this.globalContext.isDeclared(name);
            }
        }
        else if (this.ittf_state === ittfStates.nodeContext) {
            var ret = this.nodeContext.isDeclared(name);
            if (!ret) {
                ret = this.globalContext.isDeclared(name);
            }
        }
        else {
            var ret = this.brickEvalContext.isDeclared(name);
            if (!ret) {
                ret = this.globalContext.isDeclared(name);
            }
        }
        if (!ret) {
            ret = this.callContext.isDeclared(name);
        }
        return ret;
    }
    JsWizziContext.prototype.setValue = function(name, value) {
        if (this.ittf_state === ittfStates.globalContext) {
            this.globalContext.setValue(name, value);
        }
        else if (this.ittf_state === ittfStates.nodeContext) {
            this.nodeContext.setValue(name, value);
        }
        else {
            this.brickEvalContext.setValue(name, value);
        }
    }
    JsWizziContext.prototype.setValues = function(values) {
        values = (values || {});
        for (var k in values) {
            this.setValue(k, values[k]);
        }
    }
    JsWizziContext.prototype.put = function(name, value) {
        assert(this.ittf_state != ittfStates.nodeContext, 'put in an invalid operation for NodeContext state');
        var ok = false;
        if (this.ittf_state === ittfStates.globalContext) {
            ok = this.globalContext.put(name, value);
        }
        else {
            ok = this.brickEvalContext.put(name, value);
            if (!ok) {
                ok = this.globalContext.put(name, value);
            }
        }
        if (!ok) {
            console.log('wizzi-mtree.jsWizziContext.brickEvalContext.declaresStack', this.brickEvalContext.declaresStack);
            console.log('wizzi-mtree.jsWizziContext.brickEvalContext.valuesStack', this.brickEvalContext.valuesStack);
            throw new Error('Not declared: ' + name);
        }
    }
    JsWizziContext.prototype.getValue = function(name) {
        if (this.loadingCallArguments) {
            if (this.globalContext.isDeclared(name)) {
                return this.globalContext.getValue(name);
            }
            if (this.callContext.isDeclared(name)) {
                return this.callContext.getValue(name);
            }
            if (this.isForInterpolation == false) {
                if (this.nodeContext.isDeclared(name)) {
                    return this.nodeContext.getValue(name);
                }
                if (this.brickEvalContext && this.brickEvalContext.isDeclared(name)) {
                    return this.brickEvalContext.getValue(name);
                }
            }
            return undefined;
        }
        else if (this.ittf_state === ittfStates.globalContext) {
            if (this.brickEvalContext && this.brickEvalContext.isDeclared(name)) {
                return this.brickEvalContext.getValue(name);
            }
            if (this.globalContext.isDeclared(name)) {
                return this.globalContext.getValue(name);
            }
        }
        else if (this.ittf_state === ittfStates.nodeContext) {
            if (this.nodeContext.isDeclared(name)) {
                return this.nodeContext.getValue(name);
            }
            if (this.globalContext.isDeclared(name)) {
                return this.globalContext.getValue(name);
            }
        }
        else {
            if (this.brickEvalContext.isDeclared(name)) {
                return this.brickEvalContext.getValue(name);
            }
            else if (this.globalContext.isDeclared(name)) {
                return this.globalContext.getValue(name);
            }
        }
        if (this.callContext.isDeclared(name)) {
            return this.callContext.getValue(name);
        }
        else {
            // return undefined
            console.log('JsWizziContext.getValue context value not found for', name);
            console.log('JsWizziContext.getValue ittf_state ', this.ittf_state);
            console.log('JsWizziContext.getValue currentMTreeBrickKey ', this.currentMTreeBrickKey);
            this.dumpValues();
            throw new Error('In jswizzi context. Not declared: ' + name);
        }
    }
    JsWizziContext.prototype.getValues = function() {
        // TODO brickEvalContext needs globalValues ???
        if (this.ittf_state === ittfStates.globalContext) {
            return this.globalContext.getValues();
        }
        else if (this.ittf_state === ittfStates.nodeContext) {
            return this.nodeContext.getValues();
        }
        else {
            return this.brickEvalContext.getValues();
        }
    }
    JsWizziContext.prototype.setGlobalValues = function(values) {
        this.globalContext.setValues(values);
    }
    JsWizziContext.prototype.getGlobalValues = function() {
        this.globalContext.values();
    }
    JsWizziContext.prototype.declareFunction = function(name, fn) {
        if (this.ittf_state === ittfStates.globalContext) {
            this.globalContext.declareFunction(name, fn);
        }
        else {
            this.brickEvalContext.declareFunction(name, fn);
        }
    }
    JsWizziContext.prototype.getFunction = function(name) {
        if (this.ittf_state === ittfStates.globalContext) {
            return this.globalContext.getFunction(name);
        }
        else {
            var ret = this.brickEvalContext.getFunction(name);
            return ret ? ret : this.globalContext.getFunction(name);
        }
    }
    JsWizziContext.prototype.beginExpr = function() {
        this.exprPending = {};
    }
    JsWizziContext.prototype.endExpr = function() {
        assert(this.exprPending, 'endExpr called without previous call to beginExpr');
        for (var k in this.exprPending) {
            this.put(k, this.exprPending[k]);
        }
        this.exprPending = null;
    }
    JsWizziContext.prototype.abortExpr = function() {
        this.exprPending = null;
    }
    JsWizziContext.prototype.dumpValues = function() {
        // TODO if this.verbose
        console.log('Dump context value for debug');
        console.log('JsWizziContext ittf_state ', this.ittf_state);
        console.log('JsWizziContext currentMTreeBrickKey ', this.currentMTreeBrickKey);
        if (this.brickEvalContext) {
            console.log('Local values');
            this.brickEvalContext.dumpValues();
        }
        console.log('Global values');
        this.globalContext.dumpValues();
    }
    JsWizziContext.prototype.getDeclaredInfo = function() {
        var ret = [];
        if (this.ittf_state === ittfStates.globalContext) {
            ret.push('state=global');
            ret.push('global declares:' + this.globalContext.getDeclaredInfo());
        }
        else if (this.ittf_state === ittfStates.nodeContext) {
            ret.push('state=node');
        }
        else {
            ret.push('state=brick:' + this.currentMTreeBrickKey);
            ret.push('model declares:' + this.brickEvalContext.getDeclaredInfo());
            ret.push('global declares:' + this.globalContext.getDeclaredInfo());
        }
        return ret.join(', ');
    }
    /**
         The JsWizziRunner is entering a block of statements
         with instructions for the buildup
         of the final MTree.
    */
    JsWizziContext.prototype.set_NodeContext = function() {
        if (this.isForInterpolation) {
            return ;
        }
        if (this.ittf_state === ittfStates.nodeContext) {
            // we already are in a nodeContext state
            return ;
        }
        // log '*** => set_NodeContext'
        this.ittf_state = ittfStates.nodeContext;
        this.currentMTreeBrickKey = null;
        this.brickEvalContext = null;
    }
    /**
         The JsWizziRunner is entering a block of global statements
         declared inside an ittf document.
         Example:
         001     $global var message = 'hello';
    */
    JsWizziContext.prototype.set_GlobalContext = function(brickKey) {
        // get_value has scope: global and the current MTreeBrickEvalContext
        // set_value puts value into global
        if (this.isForInterpolation == false && this.currentMTreeBrickKey !== brickKey) {
            // added 7/8/17
            // Must stay before the call to getMTreeBrickEvalContext
            // to allow debug info about brickKey
            this.currentMTreeBrickKey = brickKey;
            this.brickEvalContext = this.evalHelper.getMTreeBrickEvalContext(brickKey, -1);
            if (this.brickEvalContext && this.brickEvalContext.__is_error) {
                return this.brickEvalContext;
            }
            assert(this.brickEvalContext, 'set_MTreeBrickEvalContext brickEvalContext for key ' + brickKey + ' undefined');
        }
        if (this.ittf_state === ittfStates.globalContext) {
            // we already are in a globalContext state
            return ;
        }
        // log '*** => set_GlobalContext'
        this.ittf_state = ittfStates.globalContext;
        // via 7/8/17 set this.currentMTreeBrickKey = null
        // via 7/8/17 set this.brickEvalContext = null
    }
    /**
         The JsWizziRunner is entering a block of statements or
         a node expression that are in the scope of an mTreeBrick.
         They could be statements declared in a mixed ittf
         document using the $ IttfCommand:
        
         001     $ var message = 'hello';
        
         or it could be a node expression that the JsWizziEvalHelper
         has to interpolate:
        
         001     function ${functionName}
        
    */
    JsWizziContext.prototype.set_MTreeBrickEvalContext = function(brickKey, line) {
        if (this.isForInterpolation) {
            return ;
        }
        this.ittf_state = ittfStates.brickEvalContext;
        if (this.currentMTreeBrickKey === brickKey) {
            return ;
        }
        // Must stay before the call to getMTreeBrickEvalContext
        // to allow debug info about brickKey
        this.currentMTreeBrickKey = brickKey;
        this.brickEvalContext = this.evalHelper.getMTreeBrickEvalContext(brickKey, line);
        if (this.brickEvalContext && this.brickEvalContext.__is_error) {
            return this.brickEvalContext;
        }
        assert(this.brickEvalContext, 'set_MTreeBrickEvalContext brickEvalContext for key ' + brickKey + ' undefined');
        // log '*** => set_MTreeBrickEvalContext', brickKey
        return this.brickEvalContext;
    }
    JsWizziContext.prototype.get_currentMTreeBrickKey = function() {
        return this.currentMTreeBrickKey;
    }
    return JsWizziContext;
})();

module.exports = JsWizziContext;
