/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-repo\.wizzi\tests\mocks\misc.js.ittf
    utc time: Wed, 03 Jul 2024 03:18:30 GMT
*/
'use strict';
var path = require('path');
var file = require('@wizzi/utils').file;
var IttfDocumentStore = require('../../../lib/repo/ittfDocumentStore');
module.exports = {
    IttfDocumentStore: IttfDocumentStore, 
    ProductionManager: {
        productionContext: {
            aclstat: {}, 
            addIttfDocument: function(uri, content) {
            }, 
            addMixedIttfModel: function(uri, content) {
            }, 
            addEvaluatedIttfModel: function(uri, content) {
            }, 
            addMTreeBuildUpScript: function(uri, jsScriptCoder) {
            }
         }
     }, 
    ProductionContext: {
        IttfDocumentStoreType: IttfDocumentStore, 
        dump: true, 
        addIttfDocument: function(uri, content) {
        }, 
        mTreeBuildUpScripts: {}, 
        addMTreeBuildUpScript: function(uri, jsScriptCoder) {
            var uri = uri;
            var script = jsScriptCoder.toCode();
            this.mTreeBuildUpScripts[uri] = {
                uri: uri, 
                script: script
             };
            if (this.dump) {
                file.write(path.join(path.dirname(uri), '_debug', path.basename(uri) + '.js.dump'), script)
            }
        }, 
        raiseIttfEvaluationScriptError: function(uri, exception) {
            var uri = uri;
            var script = this.mTreeBuildUpScripts[uri];
            if (script && script.ittfEvalScript && exception && exception.lineNumber) {
                var lines = script.ittfEvalScript.getErrorLines(exception).join('\n');
                exception.message = '\nError evaluating ittf in uri: ' + uri + '\n' + lines + '\n';
            }
            else {
                exception.message = '\nError evaluating ittf in uri: ' + uri + '\n' + exception.message + '\n';
            }
            // In case of --force proceed inside the try/catch flow
            throw exception;
        }
     }
 };