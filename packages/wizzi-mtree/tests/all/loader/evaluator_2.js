/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\tests\all\loader\evaluator_2.js.ittf
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

var mocks = require('../../mocks/misc');
var MTreeBrickProvider = require('../../../lib/loader/mTreeBrickProvider');
var mixer = require('../../../lib/loader/mixer');
var appender = require('../../../lib/loader/appender');
var evaluator = require('../../../lib/loader/evaluator');

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

describe("evaluator", function() {
    var store,
        evaluatedModel,
        node;
    before(function(done) {
        store = new mocks.IttfDocumentStore();
        store.init({
            storeKind: 'filesystem'
         }, function(err, notUsed) {
            if (err) {
                console.log("[31m%s[0m", err);
            }
            done();
        })
    });
    it("should load and evaluate", function(done) {
        var content_filepath = path.join(__dirname, 'repo', 'data', 'evaluator_1.tests.ittf');
        var loadContext = {
            mTreeBuildUpContext: {}, 
            productionContext: mocks.ProductionContext, 
            __ittfDocumentStore: store
         };
        MTreeBrickProvider.createFromUri(content_filepath, loadContext, function(err, provider) {
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
                    evaluator(appendedModel, loadContext, function(err, result) {
                        if (err) {
                            console.log("[31m%s[0m", err);
                            throw new Error(err.message);
                        }
                        evaluatedModel = result;
                        done();
                    })
                })
            })
        })
    });
    it("nodes[0]", function() {
        expect(evaluatedModel).to.be.an('object');
        expect(evaluatedModel.nodes).to.be.an('array');
        expect(evaluatedModel.nodes.length).to.be(1);
        expect(evaluatedModel.nodes[0]).to.be.an('object');
        node = evaluatedModel.nodes[0];
        expect(node.r).to.be.a('number');
        expect(node.r).to.be(1);
        expect(node.c).to.be.a('number');
        expect(node.c).to.be(1);
        expect(node.n).to.be.a('string');
        expect(node.n).to.be('test');
    });
    it("nodes [0][0]", function() {
        expect(evaluatedModel.nodes[0].children).to.be.an('array');
        expect(evaluatedModel.nodes[0].children.length).to.be(1);
        node = evaluatedModel.nodes[0].children[0];
        expect(node.r).to.be.a('number');
        expect(node.r).to.be(2);
        expect(node.c).to.be.a('number');
        expect(node.c).to.be(5);
        expect(node.n).to.be.a('string');
        expect(node.n).to.be('team');
        expect(node.v).to.be.a('string');
        expect(node.v).to.be('INTER');
    });
});