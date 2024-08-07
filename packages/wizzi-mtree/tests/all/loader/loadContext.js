/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\tests\all\loader\loadContext.js.ittf
    utc time: Tue, 30 Jul 2024 07:41:32 GMT
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

var LoadHistory = require('../../../lib/loader/loadHistory').LoadHistory;

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

describe("loadContext", function() {
    var loadHistory;
    it("adding a source IttfDocument to the loadHistory should return a key for retreaving the uri", function() {
        loadHistory = new LoadHistory();
        var content_filepath = path.join(__dirname, 'repo', 'data', 'lexer_1.tests.ittf');
        var sourceData = loadHistory.addIttfDocument(content_filepath, {});
        var uri = loadHistory.getIttfDocumentUri(sourceData.sourceKey);
        expect(sourceData.sourceKey).to.be.a('string');
        expect(sourceData.sourceKey).to.be('f1');
        expect(uri).to.be(content_filepath);
    });
});