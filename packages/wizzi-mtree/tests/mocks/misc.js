/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\tests\mocks\misc.js.ittf
*/
'use strict';
var path = require('path');
var file = require('wizzi-utils').file;
var IttfDocumentStore = require('./ittfDocumentStore');
module.exports = {
    IttfDocumentStore: IttfDocumentStore, 
    ProductionManager: {
        productionContext: {
            aclstat: {}, 
            addIttfDocument: function(uri, content) {
            }, 
            addMixedMTree: function(uri, content) {
            }, 
            addEvaluatedMTree: function(uri, content) {
            }, 
            addMTreeBuildupScript: function(uri, jsScriptCoder) {
                // loog 'addMTreeBuildupScript'
                file.write(path.join(path.dirname(uri), '_debug_dumps', path.basename(uri)), jsScriptCoder.toCode())
            }
         }
     }, 
    ProductionContext: {
        IttfDocumentStoreType: IttfDocumentStore, 
        dump: true, 
        addIttfDocument: function(uri, content) {
        }, 
        mTreeBuildupScripts: {}, 
        addMTreeBuildupScript: function(uri, jsScriptCoder) {
            var uri = uri;
            var script = jsScriptCoder.toCode();
            this.mTreeBuildupScripts[uri] = {
                uri: uri, 
                script: script
             };
            // log script, uri
            
            // loog 'dump'
            if (this.dump) {
                file.write(path.join(path.dirname(uri), '_debug', path.basename(uri) + '.js.dump'), script)
            }
        }, 
        raiseIttfEvaluationScriptError: function(uri, exception) {
            var uri = uri;
            var script = this.mTreeBuildupScripts[uri];
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