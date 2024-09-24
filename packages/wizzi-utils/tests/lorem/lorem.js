/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\tests\lorem\lorem.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:15 GMT
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var verify = require('@wizzi/helpers').verify;

var lorem = require('../../lib/lorem/index');

describe("lorem", function() {
    
    it("should produce a lorem", function() {
        var text1 = lorem({
            count: 100
         });
        // loog 'lorem.100', text1
        expect(text1).to.be.a('string');
        var text2 = lorem({
            count: 10, 
            units: 'paragraphs', 
            htmlTag: 'p'
         });
        // loog 'lorem.10.paragraphs.p\n', text
        expect(text2).to.be.a('string');
    });
});

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