/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\lib\loader\evaluator.js.ittf
    utc time: Thu, 02 Jan 2025 09:17:36 GMT
*/
var jsWizziRunner = require('../jswizzi/jsWizziRunner');
var JsWizziContext = require('../jswizzi/jsWizziContext');
var dateUtil = require('../jswizzi/functions/dateUtil');
var JsWizziScriptCoder = require('../jswizzi/jsWizziScriptCoder');
var mTreeBuildUpScripter = require('./mTreeBuildUpScripter');
var requireFromString = null;
/**
     The final step of an mTree loading.
     Executes the expression evaluations and the
     template commands of the composedMTree and builds the final mTree:
     . creates the mTreeBuildUpScript from the composedMTree,
     . creates the jsWizziContext and loads the loadContext.mTreeBuildUpContext
     in the global context,
     . runs the script with the jsWizziRunner,
     . returns the builded mTree.
    
     params
     { composedMTree
     { loadContext
     { mTreeBuildUpContext
     { productionContext
     { runnerServer
     { options
     boolean isCompile
     callback
    
*/
module.exports = function(composedMTree, loadContext, callback) {
    loadContext.options = loadContext.options || {};
    var isCompile = loadContext.options.isCompile;
    var productionContext = loadContext.productionContext;
    var jsWizziScriptCoder = new JsWizziScriptCoder();
    var jsWizziContext = new JsWizziContext(composedMTree, productionContext, jsWizziScriptCoder);
    jsWizziContext.setGlobalValues(loadContext.mTreeBuildUpContext)
    var ctx = {
        brickKey: null, 
        counter: 0, 
        startTime: dateUtil.now_GMYHMS(), 
        isCompile: isCompile
     };
    // loog 'isCompile', isCompile
    jsWizziScriptCoder.w('// ' + ctx.startTime + '  by ' + __filename)
    if (isCompile) {
        jsWizziScriptCoder.w('module.exports = function($, $ctx) {')
        jsWizziScriptCoder.indent();
        var i, i_items=Object.keys(jsWizziContext.getIsCompileGlobals()), i_len=Object.keys(jsWizziContext.getIsCompileGlobals()).length, k;
        for (i=0; i<i_len; i++) {
            k = Object.keys(jsWizziContext.getIsCompileGlobals())[i];
            jsWizziScriptCoder.w('var ' + k + ' = $ctx.' + k + ';')
        }
    }
    jsWizziScriptCoder.w('$.n(); // set the context state to NodeContext')
    jsWizziScriptCoder.w('var $0 = {}; // the root node of the mTree buildUp')
    var i, i_items=composedMTree.nodes, i_len=composedMTree.nodes.length, item;
    for (i=0; i<i_len; i++) {
        item = composedMTree.nodes[i];
        mTreeBuildUpScripter.codify(item, 0, jsWizziScriptCoder, ctx);
    }
    if (isCompile) {
        jsWizziScriptCoder.w('return $0;')
        jsWizziScriptCoder.deindent();
        jsWizziScriptCoder.w('}')
    }
    productionContext.addMTreeBuildUpScript(composedMTree.uri, jsWizziScriptCoder)
    
    // loog 'jsWizziScriptCoder.toCode()', jsWizziScriptCoder.toCode()
    if (isCompile) {
        if (requireFromString === null) {
            requireFromString = require('./requireFromString');
        }
        var md = requireFromString(jsWizziScriptCoder.toCode());
        var $0 = md(jsWizziContext.getValue('$'), jsWizziContext.getGlobalValues());
        finalize(composedMTree, $0, ctx, callback)
    }
    else {
        jsWizziRunner.run(jsWizziScriptCoder.toCode(), jsWizziContext, {}, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
            }
            
            // set err.scriptCode = jsWizziScriptCoder.toCode()
            if (err) {
                console.log('jsWizziRunner.run.err', err, __filename);
                return callback(err);
            }
            jsWizziContext.set_NodeContext();
            var $0 = jsWizziContext.getValue('$0');
            if (typeof($0) === 'undefined' || $0 == null || $0.children === 'undefined') {
                return callback(local_error('IttfEvaluationError', 'evaluator', 'No node returned after IttfEvaluation', composedMTree.nodes[0], null));
            }
            finalize(composedMTree, $0, ctx, callback)
        })
    }
}
;
function finalize(composedMTree, $0, ctx, callback) {
    composedMTree.nodes = [];
    var i, i_items=$0.children, i_len=$0.children.length, item;
    for (i=0; i<i_len; i++) {
        item = $0.children[i];
        item.parent = null;
        // loog 'finalize', item.children[1]
        composedMTree.nodes.push(item);
    }
    composedMTree.data = {
        createdAt: ctx.startTime
     };
    callback(null, composedMTree);
}
function local_error(errorName, method, message, node, inner, other) {
    console.log('local_error', errorName, node, __filename);
    var mtree = other ? Object.assign({}, other.mtree || {}, {
            mTreeBrickNode: node, 
            mTreeBrick: node ? (node.mTreeBrick || node.model) : null
         }) : {};
    if (other) {
        delete other.mtree
    }
    return new errors.WizziError(message, errorName, [
            errorName
        ], {
            source: {
                method: 'wizzi-mtree@0.8.32.loader.evaluator.' + method
             }, 
            mtree: mtree, 
            inner: inner, 
            ...other||{}
         });
}