/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\tests\mocks\mTreeLoader.js.ittf
    utc time: Thu, 02 Jan 2025 09:17:38 GMT
*/
var url = require('url');
var util = require('util');
var mocks = require('./misc');
var MTreeBrickProvider = require('../../lib/loader/mTreeBrickProvider');
var mixer = require('../../lib/loader/mixer');
var appender = require('../../lib/loader/appender');
var evaluator = require('../../lib/loader/evaluator');
module.exports = function(store, content_filepath, callback) {
    var loadContext = {
        mTreeBuildUpContext: {}, 
        productionContext: mocks.ProductionContext, 
        __ittfDocumentStore: store
     };
    MTreeBrickProvider.createFromUri(content_filepath, loadContext, function(err, provider) {
        if (err) {
            console.log("[31m%s[0m", err);
            throw new Error(err.message);
        }
        var mTree = provider.getPrimaryMTreeBrick();
        mixer(mTree, provider, function(err, mixedModel) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            appender(mixedModel, function(err, appendedModel) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err.message);
                }
                evaluator(appendedModel, loadContext, function(err, result) {
                    if (err) {
                        console.log("[31m%s[0m", err);
                        throw new Error(err.message);
                    }
                    callback(null, result);
                })
            })
        })
    })
}
;