/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\tests\all\basicloader\index.js.ittf
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

var loader = require('../../../lib/basicloader');

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

describe("basicloader", function() {
    
    var ittfSource = path.join(__dirname, 'data', 'doc1.tests.ittf');
    
    it("should load an ittfdocument with no frills", function(done) {
        loader.loadMTree(ittfSource, null, function(err, mTreeBrick) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            expect(mTreeBrick).to.be.an('object');
            expect(mTreeBrick.nodes).to.be.an('array');
            expect(mTreeBrick.nodes.length).to.be(1);
            expect(mTreeBrick.nodes[0].n).to.be.a('string');
            expect(mTreeBrick.nodes[0].n).to.be('tests');
            expect(mTreeBrick.nodes[0].v).to.be.a('string');
            expect(mTreeBrick.nodes[0].v).to.be('School');
            done();
        })
    });
});