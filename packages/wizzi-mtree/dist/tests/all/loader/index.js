/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\ittf\tests\all\loader\index.js.ittf
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
var file = require('wizzi-utils').file;
var stringify = require('json-stringify-safe');
var loader = require('../../../lib/loader');

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

describe("index", function() {
    var result;
    var store;
    before(function(done) {
        store = new mocks.IttfDocumentStore();
        store.init({
            storeKind: 'filesystem'
        }, function(err, notUsed) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            done();
        })
    });
    it("should load an mTree", function(done) {
        loader.loadMTree(path.join(__dirname, 'repo', 'data', 'ittf_object_args.tests.ittf'), {
            mTreeBuildUpContext: {
                items: [
                    {
                        name: 'stefi', 
                        value: 60
                    }, 
                    {
                        name: 'annie', 
                        value: 59
                    }, 
                    {
                        name: 'afro', 
                        value: 98
                    }
                ]
            }, 
            __productionManager: mocks.ProductionManager, 
            __ittfDocumentStore: store
        }, function(err, mTree) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            result = mTree;
            expect(result).to.be.an('object');
            file.write(path.join(__dirname, 'repo', 'data', 'ittf_object_args.json'), stringify(mTree, null, 2))
            done();
        })
    });
    it("should get a NotFoundError", function(done) {
        loader.loadMTree(path.join(__dirname, 'repo', 'data', 'dummy.tests.ittf'), {
            __productionManager: mocks.ProductionManager, 
            __ittfDocumentStore: store
        }, function(err, result) {
            // log 'should get an RepoIOError error.err', err
            expect(err.name).to.be.a('string');
            expect(err.name).to.be('RepoIOError');
            done();
        })
    });
});
