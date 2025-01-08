/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\tests\reviewed\includer.js.ittf
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
var includer = require('../../../lib/loader/includer');

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

describe("includer", function() {
    var store,
        node;
    before(function(done) {
        getFSDocumentStore(function(err, fsStore) {
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
            store = fsStore;
            done();
        })
    });
    it("should include a fragment", function(done) {
        var uri = path.join(__dirname, 'repo', 'data', 'includer_1.tests.ittf');
        MTreeBrickProvider.createFromUri(uri, {
            mTreeBuildUpContext: {}, 
            productionContext: mocks.ProductionContext, 
            __ittfDocumentStore: store
         }, function(err, provider) {
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
            var mTree = provider.getPrimaryMTreeBrick();
            includer(mTree, provider, function(err, includedModel) {
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
                node = includedModel.nodes[0];
                // loog 'includedModel.nodes[0]', node
                expect(node.row).to.be.a('number');
                expect(node.row).to.be(1);
                expect(node.col).to.be.a('number');
                expect(node.col).to.be(1);
                expect(node.name).to.be.a('string');
                expect(node.name).to.be('sigma');
                expect(node.value).to.be(undefined);
                node = includedModel.nodes[0].children[0];
                // loog 'includedModel.nodes[0].children[0]', node
                expect(node.row).to.be.a('number');
                expect(node.row).to.be(1);
                expect(node.col).to.be.a('number');
                expect(node.col).to.be(1);
                expect(node.name).to.be.a('string');
                expect(node.name).to.be('tau');
                expect(node.value).to.be.a('string');
                expect(node.value).to.be('1');
                done();
            })
        })
    });
    it("should throw an error for fragment to include not found", function(done) {
        var uri = path.join(__dirname, 'repo', 'data', 'includer_error_1.tests.ittf');
        MTreeBrickProvider.createFromUri(uri, {
            mTreeBuildUpContext: {}, 
            productionContext: mocks.ProductionContext, 
            __ittfDocumentStore: store
         }, function(err, provider) {
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
            var mTree = provider.getPrimaryMTreeBrick();
            includer(mTree, provider, function(err, includedModel) {
                if (err) {
                    console.log("[31m%s[0m", err);
                }
                // loog 'should throw an error for fragment to include not found', '\n' + err.toString()
                expect(err.__is_error).to.be(true);
                expect(err.errorName).to.be('IttfIncludeError');
                done();
            })
        })
    });
});