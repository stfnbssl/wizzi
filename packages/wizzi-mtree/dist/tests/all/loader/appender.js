/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\ittf\tests\all\loader\appender.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('wizzi-utils').file;
var verify = require('wizzi-utils').verify;
var createStoreFactory = require('wizzi-repo').createStoreFactory;
function getFSDocumentStore(callback) {
    createStoreFactory({
        kind: 'filesystem'
    }, function(err, storeFacory) {
        if (err) {
            return callback(err);
        }
        return storeFacory(callback);
    })
}

var mocks = require('../../mocks/misc');
var MTreeBrickProvider = require('../../../lib/loader/mTreeBrickProvider');
var mixer = require('../../../lib/loader/mixer');
var appender = require('../../../lib/loader/appender');

function evaluate(uri, callback) {
    var loadContext = {
        mTreeBuildUpContext: {}, 
        productionContext: mocks.ProductionContext, 
        __ittfDocumentStore: store
    };
    MTreeBrickProvider.createFromUri(uri, loadContext, function(err, provider) {
        var mTree = provider.getPrimaryMTreeBrick();
        mixer(mTree, provider, function(err, mixedModel) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            appender(mixedModel, function(err, appendedModel) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                evaluator(appendedModel, loadContext, callback)
            })
        })
    })
}

describe("appender", function() {
    var store,
        appendedModel,
        node;
    before(function(done) {
        store = new mocks.IttfDocumentStore();
        store.init({
            storeKind: 'filesystem'
        }, function(err, notUsed) {
            done();
        })
    });
    it("should load an mTree", function(done) {
        var content_filepath = path.join(__dirname, 'repo', 'data', 'appender_1.tests.ittf');
        MTreeBrickProvider.createFromUri(content_filepath, {
            mTreeBuildUpContext: {}, 
            productionContext: mocks.ProductionContext, 
            __ittfDocumentStore: store
        }, function(err, provider) {
            var mTree = provider.getPrimaryMTreeBrick();
            mixer(mTree, provider, function(err, mixedModel) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                appender(mixedModel, function(err, result) {
                    if (err) {
                        console.log('err', err);
                        throw new Error(err.message);
                    }
                    appendedModel = result;
                    done();
                })
            })
        })
    });
    it("nodes[0]", function() {
        expect(appendedModel).to.be.an('object');
        expect(appendedModel.nodes).to.be.an('array');
        expect(appendedModel.nodes.length).to.be(1);
        expect(appendedModel.nodes[0]).to.be.an('object');
        node = appendedModel.nodes[0];
        expect(node.row).to.be.a('number');
        expect(node.row).to.be(1);
        expect(node.col).to.be.a('number');
        expect(node.col).to.be(1);
        expect(node.name).to.be.a('string');
        expect(node.name).to.be('root');
    });
    it("nodes [0][0]", function() {
        expect(appendedModel.nodes[0].children).to.be.an('array');
        expect(appendedModel.nodes[0].children.length).to.be(1);
        node = appendedModel.nodes[0].children[0];
        expect(node.row).to.be.a('number');
        expect(node.row).to.be(1);
        expect(node.col).to.be.a('number');
        expect(node.col).to.be(1);
        expect(node.name).to.be.a('string');
        expect(node.name).to.be('leaf');
        expect(node.value).to.be.a('string');
        expect(node.value).to.be('1');
    });
});
