/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\lib\loader\mTreeBuildUpScriptBuilder.js.ittf
    utc time: Thu, 02 Jan 2025 09:17:36 GMT
*/
var JsWizziContext = require('../jswizzi/jsWizziContext');
var dateUtil = require('../jswizzi/functions/dateUtil');
var JsWizziScriptCoder = require('../jswizzi/jsWizziScriptCoder');
var mTreeBuildUpScripter = require('./mTreeBuildUpScripter');
var requireFromString = null;
/**
     Returns for debug purposes:
     . the mTreeBuildUpScript
*/
module.exports = function(composedMTree, loadContext, callback) {
    var productionContext = loadContext.productionContext;
    loadContext.options = loadContext.options || {};
    var jsWizziContext = new JsWizziContext(composedMTree, productionContext);
    jsWizziContext.setGlobalValues(loadContext.mTreeBuildUpContext)
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
    scriptCoder.w('var $0 = {}; // the root node of the mTree buildUp')
    var i, i_items=composedMTree.nodes, i_len=composedMTree.nodes.length, item;
    for (i=0; i<i_len; i++) {
        item = composedMTree.nodes[i];
        mTreeBuildUpScripter.codify(item, 0, scriptCoder, ctx);
    }
    if (isCompile) {
        scriptCoder.w('return $0;')
        scriptCoder.deindent();
        scriptCoder.w('}')
    }
    callback(null, {
        mTreeBuildUpScript: scriptCoder.toCode()
     })
}
;