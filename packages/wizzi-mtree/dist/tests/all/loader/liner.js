/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\ittf\tests\all\loader\liner.js.ittf
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

var liner = require('../../../lib/loader/liner');
var file = require('wizzi-utils').file;

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

describe("liner", function() {
    it("should have : an indent, row and col number, name and value", function() {
        var lines = liner(file.read(path.join(__dirname, 'repo', 'data', 'liner_1.tests.ittf')), {
            sourceKey: 'f1'
        });
        // log 'liner lines', lines
        expect(lines).to.be.an('array');
        expect(lines.length).to.be(7);
        expect(lines[0].indent).to.be.a('number');
        expect(lines[0].indent).to.be(0);
        expect(lines[0].row).to.be.a('number');
        expect(lines[0].row).to.be(1);
        expect(lines[0].col).to.be.a('number');
        expect(lines[0].col).to.be(1);
        expect(lines[0].sourceKey).to.be.a('string');
        expect(lines[0].sourceKey).to.be('f1');
        expect(lines[0].name).to.be.a('string');
        expect(lines[0].name).to.be('alpha');
        expect(lines[0].value).to.be(undefined);
        expect(lines[1].indent).to.be.a('number');
        expect(lines[1].indent).to.be(1);
        expect(lines[1].row).to.be.a('number');
        expect(lines[1].row).to.be(2);
        expect(lines[1].col).to.be.a('number');
        expect(lines[1].col).to.be(18);
        expect(lines[1].sourceKey).to.be.a('string');
        expect(lines[1].sourceKey).to.be('f1');
        expect(lines[1].name).to.be.a('string');
        expect(lines[1].name).to.be('beta');
        expect(lines[1].value).to.be.a('string');
        expect(lines[1].value).to.be('1');
        expect(lines[2].indent).to.be.a('number');
        expect(lines[2].indent).to.be(1);
        expect(lines[2].row).to.be.a('number');
        expect(lines[2].row).to.be(3);
        expect(lines[2].col).to.be.a('number');
        expect(lines[2].col).to.be(5);
        expect(lines[2].sourceKey).to.be.a('string');
        expect(lines[2].sourceKey).to.be('f1');
        expect(lines[2].name).to.be.a('string');
        expect(lines[2].name).to.be('beta');
        expect(lines[2].value).to.be.a('string');
        expect(lines[2].value).to.be('2');
        expect(lines[4].indent).to.be.a('number');
        expect(lines[4].indent).to.be(1);
        expect(lines[4].row).to.be.a('number');
        expect(lines[4].row).to.be(10);
        expect(lines[4].col).to.be.a('number');
        expect(lines[4].col).to.be(5);
        expect(lines[4].sourceKey).to.be.a('string');
        expect(lines[4].sourceKey).to.be('f1');
        expect(lines[4].name).to.be.a('string');
        expect(lines[4].name).to.be('<');
        expect(lines[4].value).to.be.a('string');
        expect(lines[4].value).to.be('body');
    });
    it("should skip multi line comments", function() {
        var lines = liner([
            'root', 
            '    node1 value1', 
            '    $$ node2 value2', 
            '    node3 value3', 
            '    $*', 
            '    node4 value4', 
            '    node5 value5', 
            '    *$', 
            '    node6 value6'
        ].join('\n'), {
            sourceKey: 'f1'
        });
        // log 'should skip comments liner lines', lines
        expect(lines).to.be.an('array');
        expect(lines.length).to.be(4);
        expect(lines[0].indent).to.be.a('number');
        expect(lines[0].indent).to.be(0);
        expect(lines[0].row).to.be.a('number');
        expect(lines[0].row).to.be(1);
        expect(lines[0].col).to.be.a('number');
        expect(lines[0].col).to.be(1);
        expect(lines[0].name).to.be.a('string');
        expect(lines[0].name).to.be('root');
        expect(lines[3].indent).to.be.a('number');
        expect(lines[3].indent).to.be(1);
        expect(lines[3].row).to.be.a('number');
        expect(lines[3].row).to.be(9);
        expect(lines[3].col).to.be.a('number');
        expect(lines[3].col).to.be(5);
        expect(lines[3].name).to.be.a('string');
        expect(lines[3].name).to.be('node6');
    });
    it("should skip line comments 2", function() {
        var lines = liner([
            'root', 
            '    node1 value1', 
            '$$ node2 value2', 
            '    node3 value3', 
            '$*', 
            '    node4 value4', 
            '    node5 value5', 
            '*$', 
            '    node6 v$$alue6'
        ].join('\n'), {
            sourceKey: 'f1'
        });
        // log 'should skip comments liner lines', lines
        expect(lines).to.be.an('array');
        expect(lines.length).to.be(4);
        expect(lines[0].indent).to.be.a('number');
        expect(lines[0].indent).to.be(0);
        expect(lines[0].row).to.be.a('number');
        expect(lines[0].row).to.be(1);
        expect(lines[0].col).to.be.a('number');
        expect(lines[0].col).to.be(1);
        expect(lines[0].name).to.be.a('string');
        expect(lines[0].name).to.be('root');
        expect(lines[3].indent).to.be.a('number');
        expect(lines[3].indent).to.be(1);
        expect(lines[3].row).to.be.a('number');
        expect(lines[3].row).to.be(9);
        expect(lines[3].col).to.be.a('number');
        expect(lines[3].col).to.be(5);
        expect(lines[3].name).to.be.a('string');
        expect(lines[3].name).to.be('node6');
        expect(lines[3].value).to.be.a('string');
        expect(lines[3].value).to.be('v');
    });
    it("should escape wizzi macro delimiters", function() {
        var lines = liner([
            'root', 
            '    node1 value1', 
            '    \$\{name}'
        ].join('\n'), {
            sourceKey: 'f1'
        });
        // log 'should skip comments liner lines', lines
        expect(lines).to.be.an('array');
        expect(lines.length).to.be(3);
        expect(lines[0].indent).to.be.a('number');
        expect(lines[0].indent).to.be(0);
        expect(lines[0].name).to.be.a('string');
        expect(lines[0].name).to.be('root');
        expect(lines[2].indent).to.be.a('number');
        expect(lines[2].indent).to.be(1);
    });
    it("should escape javascript string macro delimiters", function() {
        var source = [
            'root', 
            '    node1 value1', 
            '    `my ${name}`'
        ].join('\n');
        // log 'source', source
        var lines = liner(source, {
            sourceKey: 'f1'
        });
        // log 'should skip comments liner lines', lines
        expect(lines).to.be.an('array');
        expect(lines.length).to.be(3);
        expect(lines[0].indent).to.be.a('number');
        expect(lines[0].indent).to.be(0);
        expect(lines[0].name).to.be.a('string');
        expect(lines[0].name).to.be('root');
        expect(lines[2].indent).to.be.a('number');
        expect(lines[2].indent).to.be(1);
        // Alt+146 = Æ
        var expected = String.fromCodePoint(96) + 'my ' + 'Æ' + '{name}' + String.fromCodePoint(96);
        expect(lines[2].name + ' ' + lines[2].value).to.be.a('string');
        expect(lines[2].name + ' ' + lines[2].value).to.be(expected);
    });
    it("should escape javascript string macro delimiters with escapes", function() {
        var template = String.fromCodePoint(96) + 'alfa ' + '\\' + String.fromCodePoint(96) + 'beta' + '\\' + String.fromCodePoint(96) + ', ${name}' + String.fromCodePoint(96);
        // Alt+146 = Æ
        var template_expected = String.fromCodePoint(96) + 'alfa ' + '\\' + String.fromCodePoint(96) + 'beta' + '\\' + String.fromCodePoint(96) + ', ' + 'Æ' + '{name}' + String.fromCodePoint(96);
        var source = [
            'root', 
            '    node1 value1', 
            '    node2 ' + template, 
            '    node3 value2'
        ].join('\n');
        // log 'should escape javascript string macro delimiters with escapes.source', source
        var lines = liner(source, {
            sourceKey: 'f1'
        });
        // log 'should escape javascript string macro delimiters with escapes.lines', lines, 'template_expected', template_expected
        expect(lines).to.be.an('array');
        expect(lines.length).to.be(4);
        expect(lines[0].indent).to.be.a('number');
        expect(lines[0].indent).to.be(0);
        expect(lines[0].name).to.be.a('string');
        expect(lines[0].name).to.be('root');
        expect(lines[2].indent).to.be.a('number');
        expect(lines[2].indent).to.be(1);
        expect(lines[2].name).to.be.a('string');
        expect(lines[2].name).to.be('node2');
        expect(lines[2].value).to.be.a('string');
        expect(lines[2].value).to.be(template_expected);
    });
});
