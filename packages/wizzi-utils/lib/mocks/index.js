/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\mocks\index.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
var verify = require('../helpers/verify');
var file = require('../fSystem/file');
var loader = require('./loader');
var errors = require('./errors');
var genContext = require('./artifact/genContext');
var md = module.exports = {};
md.repo = require('./repo/index');
md.getFactoryWizziObject = function() {
    return {
            loadMTree: loader.loadMTree, 
            file: file, 
            verify: verify, 
            errors: errors
         };
}
;
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
md.errors = require('./errors');
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