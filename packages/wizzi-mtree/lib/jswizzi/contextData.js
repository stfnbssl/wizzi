/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\lib\jswizzi\contextData.js.ittf
    utc time: Thu, 02 Jan 2025 09:17:36 GMT
*/
// generated by wizzi.plugin.js.artifacts.js.module.gen.main
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var util = require('util');
var assert = require('assert');
var errors = require('./errors');
var f_verify = require('./functions/verify');
var IsV09 = true;
/**
     params
     number ittfState
     | nodeContext 0
     | brickEvalContext 1
     | globalContext 2
     | callContext 3
     | brickFunctionEvalContext 4
     string brickKey
*/
var ITTF_STATE_NODE_CONTEXT = 0;
var ITTF_STATE_BRICK_EVAL_CONTEXT = 1;
var ITTF_STATE_GLOBAL_CONTEXT = 2;
var ITTF_STATE_CALL_CONTEXT = 3;
var ITTF_STATE_BRICK_FUNCTION_EVAL_CONTEXT = 4;
/**
     When ittfState == 1 (brickEvalContext) or 2 (globalContext) the `ContextData` instance
     must manage the contexts of `functions` declared in the scripts of the mTreeBrick.
     The JsWizziRunner traversing the AST of the mTreeBuildUpScript
     detects the scope chains of every function declared in the mTreeBrick.
*/
var ContextData = (function () {
    function ContextData(ittfState, brickKey) {
        _classCallCheck(this, ContextData);
        this.ittfState = ittfState;
        this.brickKey = brickKey;
        this.clear();
    }
    ContextData.prototype.clear = function() {
        this.$freezed = false;
        this.functions = {};
        this.values = {};
        this.declares = {};
        this.functionsStack = [];
        this.valuesStack = [];
        this.declaresStack = [];
        this.builtInFunctions = {};
        
        // v0.9 28/3/24
        if (true) {
            this.functionContexts = {};
            this.functionScopeChains = {};
            this.currentFunctionScopeChain = null;
            this.currentFunctionName = null;
        }
    }
    ContextData.prototype.$freeze = function() {
        this.$freezed = true;
    }
    /**
         v0.9 28/3/24
    */
    ContextData.prototype.setV09 = function(value) {
        IsV09 = value;
    }
    /**
         v0.9 28/3/24
    */
    ContextData.prototype.getContextOf = function(functionName) {
        // loog 'getContextOf', functionName
        if (!functionName) {
            return this;
        }
        else {
            return this.functionContexts[functionName];
        }
    }
    /**
         v0.9 28/3/24
         the mTreeBuildUpScript is parsed and analized by the JsWizziRunner
    */
    ContextData.prototype.setFunctionScopesFromAst = function(functionScopesFromAst) {
        for (var functionName in functionScopesFromAst.functions) {
            // loog "setFunctionScopesFromAst", functionName, functionScopesFromAst.functions[functionName]
            this.functionContexts[functionName] = new ContextData(4, functionName);
            this.functionScopeChains[functionName] = functionScopesFromAst.functions[functionName];
        }
    }
    /**
         v0.9 28/3/24
    */
    ContextData.prototype.enterFunction = function(functionName) {
        // Called by JsWizziContext,
        // called by JsWizziRunner.FunctionDeclaration_Call
        // called by JsWizziRunner.runnerCall
        assert(this.ittfState == ITTF_STATE_BRICK_EVAL_CONTEXT || this.ittfState == ITTF_STATE_GLOBAL_CONTEXT, 'ContextData: Method `enterFunction` must be called on ittfStates 1 or 2 only')
        
        var retval = this.currentFunctionName;
        
        // for test only
        if (true) {
            var ctx = this.getContextOf(this.currentFunctionName);
        }
        
        var ctx = this.getContextOf(functionName);
        if (!ctx) {
            var errorMsg = '--> Error. ContextData.enterFunction. Function not found `' + functionName + '`';
            console.log("[31m%s[0m", errorMsg, 'previous `', retval, '`', 'values', ctx.getValues());
            throw new Error(errorMsg);
        }
        
        
        ctx.push();
        
        this.currentFunctionScopeChain = this.functionScopeChains[functionName];
        this.currentFunctionName = functionName;
        return retval;
    }
    /**
         v0.9 28/3/24
    */
    ContextData.prototype.exitFunction = function(functionName, restoreFunctionName) {
        // Called by JsWizziContext,
        // called by JsWizziRunner.FunctionDeclaration_Call
        // called by JsWizziRunner.runnerCall
        assert(this.ittfState == 1 || this.ittfState == 2, 'ContextData: Method `exitFunction` must be called on ittfStates 1 or 2 only')
        
        var ctx = this.getContextOf(functionName);
        
        
        // for test only
        if (false && functionName == 'buildNode') {
            var ctx = this.getContextOf(this.currentFunctionName);
        }
        
        ctx.pop();
        
        // restore previous function
        this.currentFunctionName = restoreFunctionName;
        this.currentFunctionScopeChain = restoreFunctionName ? this.functionScopeChains[restoreFunctionName] : null;
        
        // for test only
        if (true) {
            var ctx = this.getContextOf(this.currentFunctionName);
        }
    }
    /**
         v0.9 28/3/24
    */
    ContextData.prototype.getParentScopeFunction = function(functionName) {
        if (this.currentFunctionScopeChain == null) {
            throw new Error("Invalid operation, ContextData.getParentFunctionScope called with no current function (" + functionName + ")");
        }
        var index = this.currentFunctionScopeChain.indexOf(functionName);
        var retval = index > 0 ? this.currentFunctionScopeChain[index-1] : null;
        // loog 'ContextData.getParentScopeFunction', functionName, index, retval
        return retval;
    }
    /**
         v0.9 28/3/24
    */
    ContextData.prototype.getContextOfDeclared = function(name) {
        // loog 'ContextData.getContextOfDeclared', name, 'ittfState', this.ittfState, 'brickKey', this.brickKey, 'currentFunctionName', this.currentFunctionName,
        
        // loog 'ContextData.getContextOfDeclared', name, 1, this.isDeclaredInScope(name)
        if (!this.currentFunctionName) {
            return this.isDeclaredInScope(name) ? this : null;
        }
        else {
            var ctx = this.getContextOf(this.currentFunctionName);
            
            // loog 'ContextData.getContextOfDeclared', name, 2, this.currentFunctionName
            if (ctx.isDeclaredInScope(name)) {
                return ctx;
            }
            var parentScopeFunction = this.getParentScopeFunction(this.currentFunctionName);
            while (parentScopeFunction) {
                ctx = this.getContextOf(parentScopeFunction);
                
                // loog 'ContextData.getContextOfDeclared', name, 3, this.parentScopeFunction
                if (ctx.isDeclaredInScope(name)) {
                    return ctx;
                }
                parentScopeFunction = this.getParentScopeFunction(parentScopeFunction);
            }
        }
        // loog 'ContextData.getContextOfDeclared', name, 4, this.isDeclaredInScope(name)
        return this.isDeclaredInScope(name) ? this : null;
    }
    ContextData.prototype.declare = function(name, init) {
        if (name == '$' && this.$freezed) {
            throw new errors.InvalidVariableNameError('The variable "$" cannot be declared on the global context after it has been freezed.');
        }
        if (IsV09) {
            var ctx = this.getContextOf(this.currentFunctionName);
            ctx.declares[name] = true;
            ctx.values[name] = init;
            return true;
        }
        else {
            this.declares[name] = true;
            this.values[name] = init;
        }
        // loog 'ContextData.declare', name, init, 'kind', this.ittfState, 'brickKey', this.brickKey, 'function', this.currentFunctionName
    }
    ContextData.prototype.undeclare = function(name) {
        // loog 'ContextData.undeclare', name, 'kind', this.ittfState, 'brickKey', this.brickKey, 'function', this.currentFunctionName
        if (IsV09) {
            var ctx = this.getContextOf(this.currentFunctionName);
            if (ctx.declares[name] == true) {
                delete ctx.declares[name]
            }
            if (ctx.values[name] == true) {
                delete ctx.values[name]
            }
        }
        else {
            if (this.declares[name] == true) {
                delete this.declares[name]
            }
            if (this.values[name] == true) {
                delete this.values[name]
            }
        }
    }
    ContextData.prototype.isDeclared = function(name) {
        // loog 'wizzi-mtree.contextData.isDeclared', name, this.declares[name]
        if (IsV09) {
            if (!this.currentFunctionName) {
                return this.isDeclaredInScope(name) || false;
            }
            else {
                // this is a function context, search contexts in scope
                // current function context
                var ctx = this.getContextOf(this.currentFunctionName);
                var d = ctx.isDeclaredInScope(name);
                if (d == true) {
                    return true;
                }
                var parentScopeFunction = this.getParentScopeFunction(this.currentFunctionName);
                while (parentScopeFunction) {
                    ctx = this.getContextOf(parentScopeFunction);
                    var d = ctx.isDeclaredInScope(name);
                    if (d == true) {
                        return true;
                    }
                    parentScopeFunction = this.getParentScopeFunction(parentScopeFunction);
                }
            }
            return this.isDeclaredInScope(name) || false;
        }
        else {
            if (this.declares[name] == true) {
                return true;
            }
            else if (this.declaresStack.length > 0) {
                var i, i_len=this.declaresStack.length, item;
                for (i= (i_len-1); i>-1; i--) {
                    item = this.declaresStack[i];
                    // loog 'wizzi-mtree.contextData.isDeclared for', name, this.declaresStack.length, item[name]
                    if (item[name] == true) {
                        return true;
                    }
                }
                return false;
            }
            else {
                return false;
            }
        }
    }
    ContextData.prototype.setValue = function(name, value) {
        if (name == '$' && this.$freezed) {
            throw new errors.InvalidVariableNameError('The variable "$" cannot be set on the global context after it has been freezed.');
        }
        if (IsV09) {
            var ctx = this.getContextOf(this.currentFunctionName);
            if (ctx) {
                ctx.declare(name, value);
            }
            else {
                throw new Error("Internal error. Context for function `" + this.currentFunctionName + "` not found");
            }
        }
        else {
            this.declare(name, value);
        }
        // loog 'ContextData.setValue', name, value, 'kind', this.ittfState, 'brickKey', this.brickKey, 'function', this.currentFunctionName
    }
    ContextData.prototype.setValues = function(values) {
        values = (values || {});
        if (IsV09) {
            var ctx = this.getContextOf(this.currentFunctionName);
            for (var k in values) {
                ctx.declare(k, values[k])
            }
        }
        else {
            for (var k in values) {
                this.declare(k, values[k])
            }
        }
    }
    // Set value only if name is declared
    ContextData.prototype.put = function(name, value) {
        // Runner: Identifier_Set, UpdateExpression
        
        // loog 'ContextData.put', name, value, 'currentFunctionName', this.currentFunctionName
        if (IsV09) {
            var ctx = this.getContextOfDeclared(name);
            
            // loog 'ContextData.put', name, value, 'ctx.values', ctx.values, 'ctx.valuesStack.length', ctx.valuesStack.length, 'this.currentFunctionName', this.currentFunctionName, 'ctx.brickKey', ctx.brickKey
            if (ctx) {
                ctx.values[name] = value;
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if (this.declares[name] === true) {
                this.values[name] = value;
                return true;
            }
            else {
                return false;
            }
        }
    }
    ContextData.prototype.getValue = function(name) {
        if (name[0] != '$' && name[0] != '_') {
        }
        if (IsV09) {
            if (!this.currentFunctionName) {
                return this.getValueInScope(name);
            }
            else {
                // this is a function context, search contexts in scope
                // current function context
                var ctx = this.getContextOf(this.currentFunctionName);
                var v = ctx.getValueInScope(name);
                
                // loog 'ContextData.getValue 2', name, v
                if (v != undefined) {
                    return v;
                }
                // parents function contexts
                var parentScopeFunction = this.getParentScopeFunction(this.currentFunctionName);
                while (parentScopeFunction) {
                    ctx = this.getContextOf(parentScopeFunction);
                    var v = ctx.getValueInScope(name);
                    if (v != undefined) {
                        return v;
                    }
                    parentScopeFunction = this.getParentScopeFunction(parentScopeFunction);
                }
            }
            return this.getValueInScope(name);
        }
        else {
            
            // loog 'wizzi-mtree.contextData.getValue found for', name, this.values[name], this.declaresStack.length
            if (this.declares[name] == true) {
                return this.values[name];
            }
            else if (this.declaresStack.length > 0) {
                var i, i_len=this.declaresStack.length, item;
                for (i= (i_len-1); i>-1; i--) {
                    item = this.declaresStack[i];
                    
                    // loog 'wizzi-mtree.contextData.getValue found for', name, this.declaresStack.length
                    if (item[name] == true) {
                        return this.valuesStack[i][name];
                    }
                }
            }
            // loog 'wizzi-mtree.contextData.getValue not found for', name, this.ittfState, this.brickKey
            else {
                return undefined;
            }
        }
    }
    ContextData.prototype.getValues = function() {
        var ret = {};
        if (IsV09) {
            if (this.currentFunctionName) {
                // program context values
                var ret = this.values;
                // then context values of parent functions of current function
                var parentScopeFunctionContexts = [];
                // parents function contexts
                var parentScopeFunction = this.getParentScopeFunction(this.currentFunctionName);
                while (parentScopeFunction) {
                    var ctx = this.getContextOf(parentScopeFunction);
                    parentScopeFunctionContexts.push(ctx)
                    parentScopeFunction = this.getParentScopeFunction(parentScopeFunction);
                }
                var i, i_len=parentScopeFunctionContexts.length, ctx;
                for (i= (i_len-1); i>-1; i--) {
                    ctx = parentScopeFunctionContexts[i];
                    ret = Object.assign({}, ret, ctx.getValues())
                    ;
                }
                // at last context values of this functions
                var ctx = this.getContextOf(this.currentFunctionName);
                ret = Object.assign({}, ret, ctx.getValues())
                ;
            }
            else {
                ret = this.values;
            }
        }
        // TODO what if the stack has items ???
        else {
            ret = this.values;
        }
        return ret;
    }
    ContextData.prototype.getSettableValues = function() {
        var ret = {};
        if (IsV09) {
            if (this.currentFunctionName) {
                throw new Error("Invalid operation, ContextData.getSettableValues called on a function context");
            }
            else {
                for (var k in this.values) {
                    if (k != '$') {
                        ret[k] = this.values[k];
                    }
                }
            }
        }
        // TODO what if the stack has items ???
        else {
            for (var k in this.values) {
                if (k != '$') {
                    ret[k] = this.values[k];
                }
            }
        }
        return ret;
    }
    ContextData.prototype.declareFunction = function(name, fn) {
        if (IsV09) {
            this.getContextOf(this.currentFunctionName).functions[name] = fn;
        }
        else {
            this.functions[name] = fn;
        }
    }
    ContextData.prototype.getFunction = function(name) {
        if (IsV09) {
            if (!this.currentFunctionName) {
                return this.getFunctionInScope(name);
            }
            else {
                // this is a function context, search contexts in scope
                // current function context
                var ctx = this.getContextOf(this.currentFunctionName);
                var f = ctx.getFunctionInScope(name);
                if (f != undefined) {
                    return f;
                }
                // parents function contexts
                var parentScopeFunction = this.getParentScopeFunction(this.currentFunctionName);
                while (parentScopeFunction) {
                    ctx = this.getContextOf(parentScopeFunction);
                    var f = ctx.getFunctionInScope(name);
                    if (f != undefined) {
                        return f;
                    }
                    parentScopeFunction = this.getParentScopeFunction(parentScopeFunction);
                }
            }
            
            // at last the Program context (this)
            if (this.functions[name]) {
                return this.getFunctionInScope(name);
            }
            else {
                return undefined;
            }
        }
        else {
            if (this.functions[name]) {
                return this.functions[name];
            }
            else if (this.functionsStack.length > 0) {
                var i, i_len=this.functionsStack.length, item;
                for (i= (i_len-1); i>-1; i--) {
                    item = this.functionsStack[i];
                    if (item[name]) {
                        return item[name];
                    }
                }
            }
            // undefined
            else {
                return this.functions[name];
            }
        }
    }
    ContextData.prototype.setBuiltInFunction = function(name, value) {
        if (this.currentFunctionName) {
            throw new Error("Invalid operation, ContextData.setBuiltInFunction called on a function context");
        }
        this.builtInFunctions[name] = value;
    }
    ContextData.prototype.getBuiltInFunction = function(name) {
        if (this.currentFunctionName) {
            throw new Error("Invalid operation, ContextData.getBuiltInFunction called on a function context");
        }
        return this.builtInFunctions[name];
    }
    ContextData.prototype.push = function() {
        // Called by ContextData.enterFunction
        assert(this.ittfState == 4, 'ContextData: Method `push` must be called on ittfStates 4 only')
        this.functionsStack.push(this.functions);
        this.valuesStack.push(this.values);
        this.declaresStack.push(this.declares);
        this.functions = {};
        this.values = {};
        this.declares = {};
    }
    ContextData.prototype.pop = function() {
        assert(this.ittfState == 4, 'ContextData: Method `pop` must be called on ittfStates 4 only')
        if (this.functionsStack.length > 0) {
            this.functions = this.functionsStack.pop();
            this.values = this.valuesStack.pop();
            this.declares = this.declaresStack.pop();
        }
        else {
            throw new Error("Internal error in ContextData: push/pop mismatch");
        }
    }
    ContextData.prototype.getValueInScope = function(name) {
        
        // loog 'wizzi-mtree.contextData.getValue found for', name, this.values[name], this.declaresStack.length
        if (this.declares[name] == true) {
            return this.values[name];
        }
        else if (this.declaresStack.length > 0) {
            var i, i_len=this.declaresStack.length, item;
            for (i= (i_len-1); i>-1; i--) {
                item = this.declaresStack[i];
                if (item[name] == true) {
                    
                    // loog 'wizzi-mtree.contextData.getValue found for', name, this.declaresStack.length
                    return this.valuesStack[i][name];
                }
            }
            return undefined;
        }
        else {
            
            // loog 'wizzi-mtree.contextData.getValue not found for', name, this.ittfState, this.brickKey
            return undefined;
        }
    }
    ContextData.prototype.getFunctionInScope = function(name) {
        if (this.functions[name]) {
            return this.functions[name];
        }
        else if (this.functionsStack.length > 0) {
            var i, i_len=this.functionsStack.length, item;
            for (i= (i_len-1); i>-1; i--) {
                item = this.functionsStack[i];
                if (item[name]) {
                    return item[name];
                }
            }
        }
        else {
            return undefined;
        }
    }
    ContextData.prototype.isDeclaredInScope = function(name) {
        if (this.declares[name] == true) {
            return true;
        }
        else if (this.declaresStack.length > 0) {
            var i, i_len=this.declaresStack.length, item;
            for (i= (i_len-1); i>-1; i--) {
                item = this.declaresStack[i];
                // loog 'wizzi-mtree.contextData.isDeclared for', name, this.declaresStack.length, item[name]
                if (item[name] == true) {
                    return true;
                }
            }
            return false;
        }
        else {
            return false;
        }
    }
    ContextData.prototype.dumpValues = function() {
        console.log('Dump context value for debug', this.ittfState);
        for (var k in this.declares) {
            if (f_verify.isObject(this.values[k]) == false) {
                console.log(k, this.values[k]);
            }
        }
    }
    ContextData.prototype.getDeclareddumpValues = function() {
        console.log('Dump context value for debug', this.ittfState);
        for (var k in this.declares) {
            if (f_verify.isObject(this.values[k]) == false) {
                console.log(k, this.values[k]);
            }
        }
    }
    ContextData.prototype.getDeclaredInfo = function() {
        var ret = [];
        for (var k in this.declares) {
            if (f_verify.isObject(this.values[k]) == false) {
                ret.push(k + '=' + this.values[k]);
            }
            else {
                ret.push(k + '= [object]');
            }
        }
        return ret.join(', ');
    }
    return ContextData;
})();

module.exports = ContextData;