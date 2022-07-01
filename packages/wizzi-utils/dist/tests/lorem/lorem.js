/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\tests\lorem\lorem.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var mtree = require('wizzi-mtree');
var file = require('wizzi-utils').file;
var vfile = require('wizzi-utils').vfile;
var verify = require('wizzi-utils').verify;
var mocks = require('wizzi-utils').mocks;

var lorem = require('../../lib/lorem/index');

describe("lorem", function() {
    
    it("should produce a lorem", function() {
        var text1 = lorem({
            count: 100
         });
        // log 'lorem.100', text1
        expect(text1).to.be.a('string');
        var text2 = lorem({
            count: 10, 
            units: 'paragraphs', 
            htmlTag: 'p'
         });
        // log 'lorem.10.paragraphs.p\n', text
        expect(text2).to.be.a('string');
    });
});

function getWizziObject() {
    return {
            loadMTree: mtree.createLoadMTree(mocks.repo.getCreateFilesystemStore(), {
                useCache: false
             }), 
            file: file, 
            verify: verify
         };
}

function getLoadModelContext(mTreeBuildUpContext) {
    return mocks.getLoadModelContext(mTreeBuildUpContext);
}

function getTestModelInfo(schemaName, modelName) {
    
    var expectedPath = path.join(__dirname, 'ittf', modelName + '.' + schemaName + '.expected');
    var expectedContent = file.read(expectedPath);
    return {
            ittfPath: path.join(__dirname, 'ittf', modelName + '.' + schemaName + '.ittf'), 
            expectedPath: expectedPath, 
            expectedContent: expectedContent, 
            writeResult: function(content) {
                file.write(path.join(__dirname, 'ittf', modelName + '.' + schemaName + '.result'), content)
            }
         };
}
