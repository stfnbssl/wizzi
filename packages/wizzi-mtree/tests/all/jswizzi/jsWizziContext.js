/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\tests\all\jswizzi\jsWizziContext.js.ittf
    utc time: Thu, 02 Jan 2025 09:17:38 GMT
*/

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('@wizzi/utils').file;
var verify = require('@wizzi/utils').verify;
var createStoreFactory = require('@wizzi/repo').createStoreFactory;
function getFSDocumentStore(callback) {
    createStoreFactory({
        kind: 'filesystem'
     }, function(err, storeFacory) {
        if (err) {
            console.log("[31m%s[0m", err);
            return callback(err);
        }
        return storeFacory(callback);
    })
}

var JsWizziContext = require('../../../lib/jswizzi/jsWizziContext');
var ctx = new JsWizziContext();

function evaluate(uri, callback) {
    var loadContext = {
        mTreeBuildUpContext: {}, 
        productionContext: mocks.ProductionContext, 
        __ittfDocumentStore: store
     };
    MTreeBrickProvider.createFromUri(uri, loadContext, function(err, provider) {
        if (err) {
            console.log("[31m%s[0m", err);
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
                evaluator(appendedModel, loadContext, callback)
            })
        })
    })
}

describe("jsWizziContext", function() {
    it("should declare a function", function() {
        ctx.declareFunction('f1', {});
        var f = ctx.getFunction('f1');
        expect(f.__is_function).to.be(true);
    });
    it("should set a function to a var", function() {
        ctx.declareFunction('f1', {});
        ctx.setValue('pointF1', ctx.getValue('f1'))
        var f = ctx.getFunction('pointF1');
        expect(f.__is_function).to.be(true);
    });
});