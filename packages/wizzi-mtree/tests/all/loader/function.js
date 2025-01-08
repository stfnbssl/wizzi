/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\tests\all\loader\function.js.ittf
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
var mTreeLoader = require('../../mocks/mTreeLoader');

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

describe("function", function() {
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
    it("should load and evaluate an ittf (function_1) with a $function called by a $_ command", function(done) {
        var content_filepath = path.join(__dirname, 'repo', 'data', 'function_1.tests.ittf');
        mTreeLoader(store, content_filepath, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
            }
            evaluatedModel = result;
            expect(evaluatedModel).to.be.an('object');
            expect(evaluatedModel.nodes).to.be.an('array');
            expect(evaluatedModel.nodes.length).to.be(1);
            done();
        })
    });
    it("(function_1) results: nodes[0]", function(done) {
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
        expect(node.n).to.be('alfa');
        done();
    });
    it("(function_1) results: nodes [0][0]", function(done) {
        expect(evaluatedModel.nodes[0].children).to.be.an('array');
        expect(evaluatedModel.nodes[0].children.length).to.be(1);
        node = evaluatedModel.nodes[0].children[0];
        expect(node.r).to.be.a('number');
        expect(node.r).to.be(4);
        expect(node.c).to.be.a('number');
        expect(node.c).to.be(9);
        expect(node.n).to.be.a('string');
        expect(node.n).to.be('beta');
        expect(node.v).to.be.a('string');
        expect(node.v).to.be('stefi');
        done();
    });
    it("should load and evaluate an ittf (function_2) results: with a complex $function called by a $_ command", function(done) {
        var content_filepath = path.join(__dirname, 'repo', 'data', 'function_2.tests.ittf');
        mTreeLoader(store, content_filepath, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
            }
            evaluatedModel = result;
            expect(evaluatedModel).to.be.an('object');
            expect(evaluatedModel.nodes).to.be.an('array');
            expect(evaluatedModel.nodes.length).to.be(1);
            done();
        })
    });
    it("complex function (function_2) results: nodes[0]", function(done) {
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
        expect(node.n).to.be('alfa');
        done();
    });
    it("complex function nodes (function_2) results: [0][0]", function(done) {
        // loog 'evaluatedModel.nodes[0].children', evaluatedModel.nodes[0].children
        expect(evaluatedModel.nodes[0].children).to.be.an('array');
        expect(evaluatedModel.nodes[0].children.length).to.be(2);
        node = evaluatedModel.nodes[0].children[0];
        expect(node.r).to.be.a('number');
        expect(node.r).to.be(2);
        expect(node.c).to.be.a('number');
        expect(node.c).to.be(5);
        expect(node.n).to.be.a('string');
        expect(node.n).to.be('beta');
        node = evaluatedModel.nodes[0].children[1];
        expect(node.r).to.be.a('number');
        expect(node.r).to.be(7);
        expect(node.c).to.be.a('number');
        expect(node.c).to.be(5);
        expect(node.n).to.be.a('string');
        expect(node.n).to.be('gamma');
        node = evaluatedModel.nodes[0].children[1].children[0];
        expect(node.r).to.be.a('number');
        expect(node.r).to.be(5);
        expect(node.c).to.be.a('number');
        expect(node.c).to.be(9);
        expect(node.n).to.be.a('string');
        expect(node.n).to.be('sigma');
        done();
    });
    it("should load and evaluate an ittf (function_3) with a recursive $function", function(done) {
        var content_filepath = path.join(__dirname, 'repo', 'data', 'function_3.tests.ittf');
        mTreeLoader(store, content_filepath, function(err, result) {
            if (err) {
                console.log("[31m%s[0m", err);
            }
            // loog '================', err, result
            evaluatedModel = result;
            expect(evaluatedModel).to.be.an('object');
            expect(evaluatedModel.nodes).to.be.an('array');
            expect(evaluatedModel.nodes.length).to.be(1);
            done();
        })
    });
    it("recursive (function_3) results: nodes[0]", function(done) {
        node = evaluatedModel.nodes[0];
        expect(node).to.be.an('object');
        expect(node.children).to.be.an('array');
        expect(node.children.length).to.be(1);
        expect(node.children[0]).to.be.an('object');
        var n1 = node.children[0];
        expect(n1.r).to.be.a('number');
        expect(n1.r).to.be(22);
        expect(n1.c).to.be.a('number');
        expect(n1.c).to.be(9);
        expect(n1.n).to.be.a('string');
        expect(n1.n).to.be('giove');
        expect(n1.v).to.be.a('string');
        expect(n1.v).to.be('alfa x');
        done();
    });
    it("recursive (function_3) results: nodes[0][0][0]", function(done) {
        node = evaluatedModel.nodes[0].children[0].children[0];
        expect(node).to.be.an('object');
        expect(node.children).to.be.an('array');
        expect(node.children.length).to.be(1);
        expect(node.children[0]).to.be.an('object');
        expect(node.r).to.be.a('number');
        expect(node.r).to.be(22);
        expect(node.c).to.be.a('number');
        expect(node.c).to.be(9);
        expect(node.n).to.be.a('string');
        expect(node.n).to.be('giove');
        expect(node.v).to.be.a('string');
        expect(node.v).to.be('beta y');
        var n1 = node.children[0];
        expect(n1.r).to.be.a('number');
        expect(n1.r).to.be(22);
        expect(n1.c).to.be.a('number');
        expect(n1.c).to.be(9);
        expect(n1.n).to.be.a('string');
        expect(n1.n).to.be('giove');
        expect(n1.v).to.be.a('string');
        expect(n1.v).to.be('sigma t');
        done();
    });
});