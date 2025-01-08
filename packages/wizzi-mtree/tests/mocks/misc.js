/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\tests\mocks\misc.js.ittf
    utc time: Thu, 02 Jan 2025 09:17:38 GMT
*/
var path = require('path');
var file = require('@wizzi/utils').file;
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
            addMTreeBuildUpScript: function(uri, jsScriptCoder) {
                // loog 'addMTreeBuildUpScript'
                file.write(path.join(path.dirname(uri), '_debug_dumps', path.basename(uri)), jsScriptCoder.toCode())
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
            // log script, uri
            
            // loog 'dump'
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