/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\tests\all\loader\mTreeBrick.js.ittf
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

var MTreeBrickProvider = require('../../../lib/loader/mTreeBrickProvider');
var mocks = require('../../mocks/misc');

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

describe("mTree", function() {
    
    var store;
    
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
    it("should get an mTreeBrick param values", function(done) {
        MTreeBrickProvider.createFromUri(path.join(__dirname, 'repo', 'data', 'params_1.tests.ittf'), {
            productionContext: mocks.ProductionContext, 
            mTreeBuildUpContext: {}, 
            __ittfDocumentStore: store
         }, function(err, provider) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            expect(provider).to.be.an('object');
            var mTree = provider.getPrimaryMTreeBrick();
            expect(mTree).to.be.an('object');
            var expected = 'alfa, num:integer|9, ok:boolean|true, when:date|2015-8-23, cost:float|9.99';
            expect(mTree.$params).to.be.a('string');
            expect(mTree.$params).to.be(expected);
            var prms = mTree.parseFragmentParamsValues('pluto');
            expect(prms).to.be.an('array');
            expect(prms.length).to.be(5);
            expect(prms[0].value).to.be.a('string');
            expect(prms[0].value).to.be('pluto');
            expect(prms[1].value).to.be.a('number');
            expect(prms[1].value).to.be(9);
            expect(prms[2].value).to.be(true);
            expected = new Date(2015, 7, 23);
            // loose equality works for objects
            expect(prms[3].value).to.eql(expected);
            expect(prms[4].value).to.be.a('number');
            expect(prms[4].value).to.be(9.99);
            done();
        })
    });
    it("should get an mTreeBrick param values", function(done) {
        MTreeBrickProvider.createFromUri(path.join(__dirname, 'repo', 'data', 'toIttf_1.tests.ittf'), {
            productionContext: mocks.ProductionContext, 
            mTreeBuildUpContext: {}, 
            __ittfDocumentStore: store
         }, function(err, provider) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            expect(provider).to.be.an('object');
            var mTree = provider.getPrimaryMTreeBrick();
            expect(mTree).to.be.an('object');
            var nodes1Ittf = mTree.toIttf();
            expect(nodes1Ittf).to.be.a('string');
            expect(nodes1Ittf).to.be('alpha 1\n    beta 2');
            var nodes = [
                {
                    n: "id", 
                    v: "value1", 
                    children: [
                        
                    ]
                 }, 
                {
                    n: "id", 
                    v: "value2", 
                    children: [
                        
                    ]
                 }
            ];
            var nodes2Ittf = mTree.toIttf(nodes);
            expect(nodes2Ittf).to.be.a('string');
            expect(nodes2Ittf).to.be('id value1\nid value2');
            done();
        })
    });
});