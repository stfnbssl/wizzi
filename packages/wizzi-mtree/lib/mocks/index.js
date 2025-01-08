/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\lib\mocks\index.js.ittf
    utc time: Thu, 02 Jan 2025 09:17:36 GMT
*/
var md = module.exports = {};
md.getGenContext = function(wizziFactory) {
    return new genContext({
            options: {
                CRLF: '\n', 
                indentSpaces: 4
             }, 
            pman: {
                wizziFactory: wizziFactory
             }
         });
}
;
md.getLoadModelContext = function(modelContext) {
    modelContext.__productionManager = md.getProductionManager();
    ;
    return modelContext;
}
;
md.getProductionManager = function() {
    return {
            wizziFactory: {}, 
            productionContext: md.createProductionContext(), 
            globalContext: function() {
                return {};
            }
         };
}
;
md.ProductionContext = {};
md.createProductionContext = function createProductionContext() {
    return {
            aclstat: {}, 
            ittfEvaluationScripts: {}, 
            setAclStat: function() {
            }, 
            addIttfDocument: function() {
            }, 
            addMTreeBuildUpScript: function(uri, ittfEvalScript) {
                this.ittfEvaluationScripts[uri] = {
                    uri: uri, 
                    ittfEvalScript: ittfEvalScript
                 };
            }, 
            addMixedMTree: function() {
            }, 
            addEvaluatedMTree: function() {
            }, 
            addMTree: function() {
            }, 
            addWizziModel: function() {
            }, 
            addArtifact: function() {
            }, 
            raiseIttfEvaluationScriptError: function(uri, exception) {
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
            }, 
            setEvaluationContextValue: function(name, value) {
                md.ProductionContext[name] = value;
            }, 
            getEvaluationContextValue: function(name) {
                return md.ProductionContext[name];
            }
         };
}
;