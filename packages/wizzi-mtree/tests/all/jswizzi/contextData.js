/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\tests\all\jswizzi\contextData.js.ittf
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

var contextData = require('../../../lib/jswizzi/contextData');

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

describe("contextData", function() {
    var cd;
    var values;
    var alfa, beta, gamma, sigma;
    var alfa_d, beta_d, gamma_d, sigma_d;
    before(function() {
        cd = new contextData('evalContext', 'f1');
    });
    it("should set and get values", function() {
        cd.setValue('alfa', 10);
        cd.setValue('beta', 'annie');
        alfa_d = cd.isDeclared('alfa');
        expect(alfa_d).to.be(true);
        alfa = cd.getValue('alfa');
        expect(alfa).to.be.a('number');
        expect(alfa).to.be(10);
        beta_d = cd.isDeclared('beta');
        expect(beta_d).to.be(true);
        beta = cd.getValue('beta');
        expect(beta).to.be.a('string');
        expect(beta).to.be('annie');
        var asterix_d = cd.isDeclared('asterix');
        expect(asterix_d).to.be(false);
        values = cd.getValues();
        expect(values).to.be.an('object');
        expect(Object.keys(values).length).to.be(2);
    });
});