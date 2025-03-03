/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\tests\reviewed\nodifier.js.ittf
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

var liner = require('../../../lib/loader/liner');
var nodifier = require('../../../lib/loader/nodifier');
var MTreeBrick = require('../../../lib/loader/mTreeBrick').MTreeBrick;
var LoadHistory = require('../../../lib/loader/loadHistory').LoadHistory;
var file = require('@wizzi/utils').file;

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

describe("nodifier", function() {
    var loadHistory = new LoadHistory();
    it("nodes should have : row and col number, name and value", function() {
        var uri = path.join(__dirname, 'repo', 'data', 'liner_1.tests.ittf');
        var mTree = new MTreeBrick(uri, loadHistory);
        var lines = liner(file.read(uri), {
            sourceKey: 'f1'
         });
        var nodes = nodifier(lines, mTree);
        // loog 'nodifier nodes', nodes
        expect(nodes).to.be.an('array');
        expect(nodes.length).to.be(1);
        expect(nodes[0].children).to.be.an('array');
        expect(nodes[0].children.length).to.be(3);
        expect(nodes[0].children[1].children).to.be.an('array');
        expect(nodes[0].children[1].children.length).to.be(1);
        expect(nodes[0].row).to.be.a('number');
        expect(nodes[0].row).to.be(1);
        expect(nodes[0].col).to.be.a('number');
        expect(nodes[0].col).to.be(1);
        expect(nodes[0].sourceKey).to.be.a('string');
        expect(nodes[0].sourceKey).to.be('f1');
        expect(nodes[0].name).to.be.a('string');
        expect(nodes[0].name).to.be('alpha');
        expect(nodes[0].value).to.be(undefined);
        expect(nodes[0].children[0].row).to.be.a('number');
        expect(nodes[0].children[0].row).to.be(3);
        expect(nodes[0].children[0].col).to.be.a('number');
        expect(nodes[0].children[0].col).to.be(18);
        expect(nodes[0].children[0].sourceKey).to.be.a('string');
        expect(nodes[0].children[0].sourceKey).to.be('f1');
        expect(nodes[0].children[0].name).to.be.a('string');
        expect(nodes[0].children[0].name).to.be('beta');
        expect(nodes[0].children[0].value).to.be.a('string');
        expect(nodes[0].children[0].value).to.be('1');
        expect(nodes[0].children[1].row).to.be.a('number');
        expect(nodes[0].children[1].row).to.be(4);
        expect(nodes[0].children[1].col).to.be.a('number');
        expect(nodes[0].children[1].col).to.be(5);
        expect(nodes[0].children[1].sourceKey).to.be.a('string');
        expect(nodes[0].children[1].sourceKey).to.be('f1');
        expect(nodes[0].children[1].name).to.be.a('string');
        expect(nodes[0].children[1].name).to.be('beta');
        expect(nodes[0].children[1].value).to.be.a('string');
        expect(nodes[0].children[1].value).to.be('2');
        expect(nodes[0].children[1].children[0].row).to.be.a('number');
        expect(nodes[0].children[1].children[0].row).to.be(5);
        expect(nodes[0].children[1].children[0].col).to.be.a('number');
        expect(nodes[0].children[1].children[0].col).to.be(9);
        expect(nodes[0].children[1].children[0].sourceKey).to.be.a('string');
        expect(nodes[0].children[1].children[0].sourceKey).to.be('f1');
        expect(nodes[0].children[1].children[0].name).to.be.a('string');
        expect(nodes[0].children[1].children[0].name).to.be('gamma');
        expect(nodes[0].children[1].children[0].value).to.be.a('string');
        expect(nodes[0].children[1].children[0].value).to.be('2.1');
        expect(nodes[0].children[2].children[0].row).to.be.a('number');
        expect(nodes[0].children[2].children[0].row).to.be(12);
        expect(nodes[0].children[2].children[0].col).to.be.a('number');
        expect(nodes[0].children[2].children[0].col).to.be(9);
        expect(nodes[0].children[2].children[0].sourceKey).to.be.a('string');
        expect(nodes[0].children[2].children[0].sourceKey).to.be('f1');
        expect(nodes[0].children[2].children[0].name).to.be.a('string');
        expect(nodes[0].children[2].children[0].name).to.be('margin');
        expect(nodes[0].children[2].children[0].value).to.be.a('string');
        expect(nodes[0].children[2].children[0].value).to.be('0');
        expect(nodes[0].mTreeBrick).to.be.an('object');
        expect(nodes[0].children[0].mTreeBrick).to.be.an('object');
        expect(nodes[0].children[1].mTreeBrick).to.be.an('object');
        expect(nodes[0].children[2].mTreeBrick).to.be.an('object');
        expect(nodes[0].children[2].children[0].mTreeBrick).to.be.an('object');
        expect(nodes[0].mTreeBrick.uri).to.be.a('string');
        expect(nodes[0].mTreeBrick.uri).to.be(uri);
        expect(nodes[0].children[2].children[0].mTreeBrick.uri).to.be.a('string');
        expect(nodes[0].children[2].children[0].mTreeBrick.uri).to.be(uri);
        expect(nodes[0].mTreeBrick.$params).to.be.a('string');
        expect(nodes[0].mTreeBrick.$params).to.be('name');
    });
    it("nodifier should throw WizziError", function() {
        var uri = path.join(__dirname, 'repo', 'data', 'liner_error_1.tests.ittf');
        var mTree = new MTreeBrick(uri, loadHistory);
        var lines = liner(file.read(uri), {
            sourceKey: 'f1'
         });
        var nodes = nodifier(lines, mTree);
        // loog 'nodifier should throw WizziError', '\n' + nodes.toString()
        expect(nodes.__is_error).to.be(true);
        expect(nodes.errorName).to.be('InvalidIttfError');
    });
});