/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\tests\quick\loader\evaluator.js.ittf
    utc time: Mon, 01 Apr 2024 12:48:03 GMT
*/
'use strict';

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
var store,
    evaluatedModel,
    node;

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
        evaluate(content_filepath, function(err, evaluatedModel) {
            if (err) {
                console.log("[31m%s[0m", 'err', err);
                if (err.toString()) {
                    console.log("[31m%s[0m", 'err.toString()', err.toString());
                }
                if (err.inner) {
                    console.log("[31m%s[0m", 'err.inner', err.inner);
                    if (err.inner.toString) {
                        console.log("[31m%s[0m", 'err.inner.toString()', err.inner.toString());
                    }
                }
                throw new Error(err.message);
            }
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
            done();
        })
    });
    it("should throw an error evaluating", function(done) {
        var content_filepath = path.join(__dirname, 'repo', 'data', 'evaluator_error_1.tests.ittf');
        evaluate(content_filepath, function(err, evaluatedModel) {
            if (err) {
                console.log("[31m%s[0m", err);
            }
            // loog 'should throw an error evaluating', '\n' + err.toString()
            expect(err.__is_error).to.be(true);
            expect(err.errorName).to.be('JsWizziError');
            expect(err.data.inner).to.be.an('object');
            expect(err.data.inner.errorName).to.be('ReferenceError');
            done();
        })
    });
    it("should throw an error evaluating", function(done) {
        var content_filepath = path.join(__dirname, 'repo', 'data', 'evaluator_error_2.tests.ittf');
        evaluate(content_filepath, function(err, evaluatedModel) {
            if (err) {
                console.log("[31m%s[0m", err);
            }
            
            // loog 'should throw an error evaluating', '\n' + err.toString()
            if (err) {
            }
            expect(err.__is_error).to.be(true);
            expect(err.errorName).to.be('JsWizziError');
            done();
        })
    });
    it("should throw an error evaluating", function(done) {
        var content_filepath = path.join(__dirname, 'repo', 'data', 'evaluator_error_3.tests.ittf');
        evaluate(content_filepath, function(err, evaluatedModel) {
            if (err) {
                console.log("[31m%s[0m", err);
            }
            
            // loog 'should throw an error evaluating', '\n', err, '\n' + err.toString()
            if (err) {
            }
            expect(err.__is_error).to.be(true);
            expect(err.errorName).to.be('JsWizziError');
            done();
        })
    });
});
