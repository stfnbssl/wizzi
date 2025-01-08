/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\lib\jswizzi\jsWizziEvalHelper.js.ittf
    utc time: Thu, 02 Jan 2025 09:17:36 GMT
*/
var verify = require('@wizzi/utils').verify;
var util = require('util');
var path = require('path');
var assert = require('assert');
var verify = require('@wizzi/utils').verify;
var errors = require('../errors');
var ContextData = require('./contextData');
var interpolate = require('../loader/ittfInterpolate');
var types = require('../utils/types');
var JsWizziContext = null;
var work = {};
work.lineSep = "__LS__";
work.textSep = "__TS__";
/**
     This helper instance is stored in the global context
     of the JsWizziContext and is in the global scope of the
     JsWizziRunner when it runs the mTreeBuildUpScript.
     In the script the symbol `$` represent the running instance of JsWizziEvalHelper.
    
     The mTreeBuildUpScript may call the methods of
     this instance for
     . Setting the evalContext: global, mTreeBuildUp (nodes) or mTreeBrick (scripts).
     . Adding nodes to the mTree that is been building.
     . Executing interpolation of expressions.
     . Calling api functions (declared in the wizzifile.js) on the runner server
     . Retrieving wizzi models (loaded in wizzifile.js) from the runner server
     . Setting and getting values from the production context.
     --> This is a powerful feature for managing a context spanning
     multiple ittf documents in package productions.
    
     The evalContext(s) of mTreeBrick(s) are stored in
     the mTreeBrickDatas map of the wizzi.loader.loadHistory.
     There are retrieved by the getMTreeBrickEvalContext method
     every time the active mTreeBrick context changes.
*/
class JsWizziEvalHelper {
    constructor(jsWizziContext, primaryModel, productionContext) {
        if (verify.isObject(jsWizziContext) === false) {
            throw new Error(error(
                'InvalidArgument', 'ctor', { parameter: 'jsWizziContext', message: 'The jsWizziContext parameter must be an object. Received: ' + jsWizziContext }
            ));
        }
        if (verify.isObject(primaryModel) === false) {
            throw new Error(error(
                'InvalidArgument', 'ctor', { parameter: 'primaryModel', message: 'The primaryModel parameter must be an object. Received: ' + primaryModel }
            ));
        }
        if (verify.isObject(primaryModel.loadHistory) === false) {
            throw new Error(error(
                'InvalidArgument', 'ctor', { parameter: 'primaryModel.loadHistory', message: 'The primaryModel.loadHistory parameter must be an object. Received: ' + primaryModel.loadHistory }
            ));
        }
        if (verify.isObject(productionContext) === false) {
            throw new Error(error(
                'InvalidArgument', 'ctor', { parameter: 'productionContext', message: 'The productionContext parameter must be an object. Received: ' + productionContext }
            ));
        }
        this.jsWizziContext = jsWizziContext;
        this.primaryModel = primaryModel;
        this.loadHistory = primaryModel.loadHistory;
        this.productionContext = productionContext;
        this.textSep = work.textSep;
        if (productionContext.runnerServer) {
            this.callApi = productionContext.runnerServer.callApi;
            this.getModel = productionContext.runnerServer.getModel;
        }
    }
    /**
         mTree buildup method
         script method: `$.s(<brickKey>)`
         Set the JsWizziContext state to MTreeBrickEvalContext of `brickKey`
    */
    s(brickKey) {
        // loog 'JsWizziEvalHelper called $.s(' + brickKey +')'
        var notUsed = this.jsWizziContext.set_MTreeBrickEvalContext(brickKey);
        if (notUsed && notUsed.__is_error) {
            return notUsed;
        }
    }
    /**
         mTree buildup method
         script method: `$.n()`
         Set the JsWizziContext state to NodeContext
    */
    n() {
        // loog 'JsWizziEvalHelper called $.n()'
        this.jsWizziContext.set_NodeContext();
    }
    /**
         mTree buildup method
         script method: `$.g()`
         Set the JsWizziContext state to GlobalContext
    */
    g(brickKey) {
        // loog 'JsWizziEvalHelper called $.g("brickKey")'
        this.jsWizziContext.set_GlobalContext(brickKey);
    }
    /**
         mTree buildup method
         script method: `$.a(<parent>, <node>, <line-number>)`
         Append a child node to a parent node
    */
    a(parent, node, line) {
        // loog 'JsWizziEvalHelper called $.a(' + node.n + ',' + node.v + ')'
        assert(parent, "wizzi-mtree.JsWizziEvalHelper error. Parent undefined in add. At line " + line);
        node.parent = parent;
        if (typeof (parent.children) === 'undefined') {
            parent.children = [];
        }
        node.children = [];
        parent.children.push(node);
    }
    /**
         Interpolate a templated node value
         script method: `$.ip(<brickKey>, <templatedValue>, <type>, <line-number>, <hasMacro>)`
    */
    ip(brickKey, templatedValue, type, line, hasMacro) {
        var ret;
        try {
            var saveCurrentBrickKey = this.jsWizziContext.get_currentMTreeBrickKey();
            var notUsed = this.jsWizziContext.set_MTreeBrickEvalContext(brickKey, line);
            if (notUsed && notUsed.__is_error) {
                return notUsed;
            }
            var ret = interpolate(templatedValue, this.jsWizziContext, {delimiter: '${}'});
            if (ret && ret.__is_error) {
                console.log("[31m%s[0m", 'wizzi-mtree.JsWizziEvalHelper.interpolation.error\n', line, '\n', ret);
                ret.sourceKey = brickKey;
                ret.line = line;
                ret.templatedValue = templatedValue;
                return ret;
            }
            // loog 'ip', templatedValue, ret
            // Stop 7/7/17 if hasMacro
            ret = remacro(ret);
            // loog 'ip after remacro', templatedValue, ret
            if (saveCurrentBrickKey === null) {
                this.jsWizziContext.set_NodeContext(brickKey);
            }
            else {
                var notUsed = this.jsWizziContext.set_MTreeBrickEvalContext(saveCurrentBrickKey);
                if (notUsed && notUsed.__is_error) {
                    return notUsed;
                }
            }
        } 
        catch (ex) {
            var mTreeBrickData = this.loadHistory.getMTreeBrickData(brickKey);
            var mixerMTreeBrickData = this.loadHistory.getMTreeBrickData(mTreeBrickData.mTreeBrick.$mixerBrickKey);
            var mixerUri = mixerMTreeBrickData ? mixerMTreeBrickData.ittfDocumentUri : 'root model';
            // loog 'wizzi-mtree.JsWizziEvalHelper.ip.catch.ex.saved ip.currentMTreeBrickKey', saveCurrentBrickKey, 'mTreeBrickData.evalContext', mTreeBrickData.evalContext
            // loog 'wizzi-mtree.JsWizziEvalHelper.ip.catch.ex.values.' + util.inspect(this.jsWizziContext.getValues(), {depth: 2})
            // loog 'wizzi-mtree.JsWizziEvalHelper.ip.catch.ex.message', ex.message
            return local_error('IttfEvaluationError', 'ip', 'Interpolation failed, ' + ex.message, this.jsWizziContext.getNodeFromScriptMap(line), ex, {
                    line: line, 
                    type: type, 
                    brickKey: brickKey
                 });
        } 
        // Attention!!! types.objectify is different from verify.convert
        // let types.objectify do the job
        var retObject = types.objectify(ret, type, {
            row: line
         });
        if (retObject && retObject.__is_error) {
            var mTreeBrickData = this.loadHistory.getMTreeBrickData(brickKey);
            var mixerMTreeBrickData = this.loadHistory.getMTreeBrickData(mTreeBrickData.mTreeBrick.$mixerBrickKey);
            var mixerUri = mixerMTreeBrickData ? mixerMTreeBrickData.ittfDocumentUri : 'root model';
            return local_error('IttfEvaluationError', 'ip', 'Interpolation failed, ' + retObject.message, this.jsWizziContext.getNodeFromScriptMap(line), retObject, {
                    line: line, 
                    type: type, 
                    brickKey: brickKey
                 });
        }
        else {
            return retObject;
        }
    }
    api() {
        if (this.callApi) {
            return this.callApi.apply(this.productionContext.runnerServer, arguments);
        }
        else {
            return local_error('IttfEvaluationError', 'api', 'A RunnerServer has not been started. You must create a wizzifile.js.');
        }
    }
    model() {
        if (this.getModel) {
            return this.getModel.apply(this.productionContext.runnerServer, arguments);
        }
        else {
            return local_error('IttfEvaluationError', 'model', 'A RunnerServer has not been started. You must create a wizzifile.js.');
        }
    }
    /**
         Helper method
         called by jswizzi.jsWizziContext.set_MTreeBrickEvalContext
         for retrieving the evaluation context of an mTreeBrick by its brickKey.
    */
    getMTreeBrickEvalContext(brickKey, line) {
        // mTreeBrick eval contexts are stored in the mTreeBrickDatas map
        // of the wizzi-mtree.loader.loadHistory
        var mTreeBrickData = this.loadHistory.getMTreeBrickData(brickKey);
        var mTreeBrick_EvalContext;
        
        // An eval context object has already been created for this mTreeBrickData
        if (mTreeBrickData.evalContext != null) {
            mTreeBrick_EvalContext = mTreeBrickData.evalContext;
            var notUsed = this._updateMTreeBrickEvalContext(mTreeBrickData, mTreeBrick_EvalContext);
            if (notUsed && notUsed.__is_error) {
                return notUsed;
            }
        }
        // loog 'JsWizziEvalHelper.mTreeBrickFunctionContexts', mTreeBrickFunctionContexts
        // loog 'JsWizziEvalHelper created mTreeBrick_EvalContext for', brickKey, 'id', mTreeBrickData.mTreeBrick.id, mTreeBrickData.evalContext, mTreeBrickData.ittfDocumentUri
        else {
            var mTreeBrickFunctionContexts = this.loadHistory.getMTreeBrickFunctionScopes(brickKey);
            mTreeBrick_EvalContext = new ContextData(1, brickKey, brickKey);
            mTreeBrick_EvalContext.setFunctionScopesFromAst(mTreeBrickFunctionContexts)
            mTreeBrick_EvalContext.setValue('__dirname', path.dirname(mTreeBrickData.ittfDocumentUri))
            mTreeBrick_EvalContext.setValue('__filename', mTreeBrickData.ittfDocumentUri)
            var notUsed = this._updateMTreeBrickEvalContext(mTreeBrickData, mTreeBrick_EvalContext);
            if (notUsed && notUsed.__is_error) {
                return notUsed;
            }
            mTreeBrickData.evalContext = mTreeBrick_EvalContext;
        }
        return mTreeBrick_EvalContext;
    }
    /**
         If the mTreeBrick has a `$params` command node
         the values passed by the mixer and the default values in the `$params` node
         must be evaluated and added to the mTreeBrick eval context.
    */
    _updateMTreeBrickEvalContext(mTreeBrickData, mTreeBrick_EvalContext) {
        // If the mTreeBrick do not receives parameters
        // a refresh of the eval context is not required
        // loog 'wizzi-mtree.jsWizziEvalHelper.brickKey.sourceKey.$args,$params.name,value', mTreeBrickData.brickKey, mTreeBrickData.sourceKey, mTreeBrickData.mTreeBrick.$args, mTreeBrickData.mTreeBrick.$params, mTreeBrickData.mTreeBrick.nodes[0].name, mTreeBrickData.mTreeBrick.nodes[0].value
        if (verify.isEmpty(mTreeBrickData.mTreeBrick.$params)) {
            return ;
        }
        var args = mTreeBrickData.mTreeBrick.$args;
        var interpolateArgsContext;
        
        /**
            * Mix call arguments, in the mixer ittf document, may contain IttfMacros,
            * in that case they must be interpolated.
            * mTreeBrickData.mTreeBrick.$mixerBrickKey is the brickKey of the mixer mTreeBrick.
            * We need its eval context for interpolation.
        */
        if (args && args.indexOf('${') > -1) {
            var mixer_mTreeBrick_EvalContext = this.getMTreeBrickEvalContext(mTreeBrickData.mTreeBrick.$mixerBrickKey);
            if (mixer_mTreeBrick_EvalContext && mixer_mTreeBrick_EvalContext.__is_error) {
                return mixer_mTreeBrick_EvalContext;
            }
            try {
                // Then we create a temporary JsWizziContext and load it with the
                // context values of both:
                // the global context and
                // the mixer mTreeBrick eval context.
                interpolateArgsContext = this.getInterpolateContext(mTreeBrickData)
                ;
                // TODO the values of the mixer can be modified by the mixed during interpolation
                // if so, what does it means? Needs investigation.
                // then we interpolate the arguments passed to the mixed mTreeBrick
                args = interpolate(args, interpolateArgsContext);
                // loog 'JsWizziEvalHelper interpolateArgs', mTreeBrickData.mTreeBrick.$args, args
            } 
            catch (ex) {
                var mixerMTreeBrickData = this.loadHistory.getMTreeBrickData(mTreeBrickData.mTreeBrick.$mixerBrickKey);
                var mixerUri = mixerMTreeBrickData ? mixerMTreeBrickData.ittfDocumentUri : 'root model';
                var exMessage = ex ? ex.message : 'not available';
                var exStack = ex ? ex.stack : 'not available';
                return error('InterpolationError', '_updateMTreeBrickEvalContext', 'Exception interpolating mixer args: ' + args + ', mTreeBrick uri: ' + mTreeBrickData.ittfDocumentUri + ', mixerMTreeBrick uri: ' + mixerUri + ', ex message: ' + exMessage + ', stack: ' + exStack, ex);
            } 
        }
        /**
             With the interpolated values of the arguments we may now parse the
             parameters received by the mixed mTreeBrick, applying type conversions and default values
        */
        var parsedParamValues = mTreeBrickData.mTreeBrick.parseFragmentParamsValues(args);
        if (parsedParamValues && parsedParamValues.__is_error) {
            return parsedParamValues;
        }
        // We have to load the parsed parameters on the eval context
        // of the mixed mTreeBrick
        var i, i_items=parsedParamValues, i_len=parsedParamValues.length, item;
        for (i=0; i<i_len; i++) {
            item = parsedParamValues[i];
            
            // The argument is passed by reference, so the parameter
            
            // value must be retrieved from the eval context of the mixer mTreeBrick
            
            // and then added to the mixed one.
            if (item.isByRef) {
                var mixer_mTreeBrick_EvalContext = this.getMTreeBrickEvalContext(mTreeBrickData.mTreeBrick.$mixerBrickKey);
                if (mixer_mTreeBrick_EvalContext && mixer_mTreeBrick_EvalContext.__is_error) {
                    return mixer_mTreeBrick_EvalContext;
                }
                mTreeBrick_EvalContext.setValue(item.name, mixer_mTreeBrick_EvalContext.getValue(item.name))
            }
            else if (item.defaultIsByRef) {
                mTreeBrick_EvalContext.setValue(item.name, this.jsWizziContext.globalContext.getValue(item.defaultName))
            }
            else if (item.isIttfMacro) {
                if (!interpolateArgsContext) {
                    interpolateArgsContext = this.getInterpolateContext(mTreeBrickData)
                    ;
                }
                var ip_value = interpolate(item.value, interpolateArgsContext);
                mTreeBrick_EvalContext.setValue(item.name, ip_value)
            }
            // The argument is passed by value, so the parsed
            // parameter can be added to the eval context of the mixed mTreeBrick
            else {
                mTreeBrick_EvalContext.setValue(item.name, item.value)
            }
        }
    }
    getInterpolateContext(mTreeBrickData) {
        var mixer_mTreeBrick_EvalContext = this.getMTreeBrickEvalContext(mTreeBrickData.mTreeBrick.$mixerBrickKey);
        if (mixer_mTreeBrick_EvalContext && mixer_mTreeBrick_EvalContext.__is_error) {
            return mixer_mTreeBrick_EvalContext;
        }
        if (JsWizziContext == null) {
            JsWizziContext = require('./jsWizziContext');
        }
        var interpolateArgsContext = new JsWizziContext();
        interpolateArgsContext.setValues(this.jsWizziContext.globalContext.getSettableValues());
        interpolateArgsContext.setValues(mixer_mTreeBrick_EvalContext.getValues());
        return interpolateArgsContext;
    }
    /**
         Method for `multi-part production context management`
         script method: `$.setCtx(<namePath>, <value>)`
         Set a value in the production context of a multi-part production (es. Wizzi Job)
    */
    setCtx(namePath, value) {
        return this.productionContext.setEvaluationContextValue(namePath, value);
    }
    /**
         Method for `multi-part production context management`
         script method: `$.removeCtx(<namePath>)`
         Remove a value in the production context of a multi-part production (es. Wizzi Job)
    */
    removeCtx(namePath) {
        throw new Error('ProductionContext.removeEvaluationContextValue not implemented yet');
        return this.productionContext.removeEvaluationContextValue(namePath);
    }
    /**
         Method for `multi-part production context management`
         script method: `$.getCtx(<namePath>)`
         Get a value from the production context of a multi-part production (es. Wizzi Job)
    */
    getCtx(namePath) {
        return this.productionContext.getEvaluationContextValue(namePath);
    }
}
function remacro(value) {
    // Alt+146 = Æ
    return verify.replaceAll(value, "Æ" + "{", "${");
}
function local_error(errorName, method, message, node, inner, other) {
    var mtree = {
        mTreeBrickNode: node
     };
    if (other.mtree) {
        mtree = {
            ...mtree, 
            ...other.mtree
         };
    }
    return new errors.WizziError(message, errorName, [
            errorName
        ], {
            source: {
                method: 'wizzi-mtree@0.8.32.lib.jswizzi.jsWizziEvalHelper.' + method
             }, 
            mtree: {
                mTreeBrickNode: node
             }, 
            inner: inner || null
         });
}
module.exports = JsWizziEvalHelper;
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
        method: 'wizzi-mtree@0.8.32.jswizzi.jsWizziEvalHelper.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}