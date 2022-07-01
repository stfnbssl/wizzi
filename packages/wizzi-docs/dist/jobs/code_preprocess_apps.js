/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-docs\.wizzi\jobs\code_preprocess_apps.js.ittf
*/
'use strict';


var path = require('path');
var wizzi = require('wizzi');
// begin params
var $name = 'code - code_preprocess_apps';
// end params
function exec(callback) {
    wizzi.executeWizziJob({
        user: 'stefi', 
        role: 'admin', 
        storeKind: 'filesystem', 
        config: {
            wfBaseFolder: 'c:\\my\\wizzi\\v6', 
            plugins: [
                'wizzi-core', 
                'wizzi-meta', 
                'wizzi-js', 
                'wizzi-web'
            ]
         }, 
        job: {
            name: $name, 
            ittfDocumentUri: path.join(__dirname, 'ittf', 'code', 'code_preprocess_apps.wfjob.ittf'), 
            productionOptions: wizzi.productionOptions({
                indentSpaces: 4, 
                basedir: __dirname, 
                verbose: 2, 
                dumps: {
                    dumpsBaseFolder: path.join(__dirname, '_debug_dumps'), 
                    mTreeBuildupJsWizziCode: {
                        dump: true
                     }
                 }
             }), 
            globalContext: {}
         }
     }, function(err, result) {
        if (callback) {
            if (err) {
                callback(err);
            }
            else {
                callback(null, result);
            }
        }
        else {
            if (err) {
                console.log("Error executing wizzi instance job", err);
            }
        }
    })
}
module.exports = function(callback) {
    exec(callback);
}
;
if (require && require.main === module) {
    exec();
}
