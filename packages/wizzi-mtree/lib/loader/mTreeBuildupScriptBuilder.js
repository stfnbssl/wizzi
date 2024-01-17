/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\lib\loader\mTreeBuildupScriptBuilder.js.ittf
    utc time: Thu, 11 Jan 2024 15:48:37 GMT
*/
'use strict';
var JsWizziContext = require('../jswizzi/jsWizziContext');
var dateUtil = require('../jswizzi/functions/dateUtil');
var JsWizziScriptCoder = require('../jswizzi/jsWizziScriptCoder');
var mTreeBuildupScripter = require('./mTreeBuildupScripter');
var requireFromString = null;
/**
     Returns for debug purposes:
     . the mTreeBuildupScript
*/
module.exports = function(composedMTree, loadContext, callback) {
    var productionContext = loadContext.productionContext;
    loadContext.options = loadContext.options || {};
    var jsWizziContext = new JsWizziContext(composedMTree, productionContext);
    jsWizziContext.setGlobalValues(loadContext.mTreeBuildupContext)
    var ctx = {
        brickKey: null, 
        counter: 0, 
        startTime: dateUtil.now_GMYHMS(), 
        isCompile: loadContext.options.isCompile
     };
    var isCompile = loadContext.options.isCompile;
    var scriptCoder = new JsWizziScriptCoder();
    scriptCoder.w('// ' + ctx.startTime + '  by ' + __filename)
    if (isCompile) {
        scriptCoder.w('module.exports = function($, $ctx) {')
        scriptCoder.indent();
        var i, i_items=Object.keys(jsWizziContext.getIsCompileGlobals()), i_len=Object.keys(jsWizziContext.getIsCompileGlobals()).length, k;
        for (i=0; i<i_len; i++) {
            k = Object.keys(jsWizziContext.getIsCompileGlobals())[i];
            scriptCoder.w('var ' + k + ' = $ctx.' + k + ';')
        }
    }
    scriptCoder.w('$.n(); // set the context state to NodeContext')
    scriptCoder.w('var $0 = {}; // the root node of the MTree buildup')
    var i, i_items=composedMTree.nodes, i_len=composedMTree.nodes.length, item;
    for (i=0; i<i_len; i++) {
        item = composedMTree.nodes[i];
        mTreeBuildupScripter.codify(item, 0, scriptCoder, ctx);
    }
    if (isCompile) {
        scriptCoder.w('return $0;')
        scriptCoder.deindent();
        scriptCoder.w('}')
    }
    callback(null, {
        mTreeBuildupScript: scriptCoder.toCode()
     })
}
;
