/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.v07\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.14
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\tests\crypto\crypto.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var verify = require('@wizzi/helpers').verify;

var crypto = require('../../lib/crypto/index');

describe("crypto", function() {
    
    it("should verify an  encrypt and decrypt", function() {
        var text = 'alba chiara';
        var hash1 = crypto.encrypt(text);
        var decrypt1 = crypto.decrypt(hash1);
        var hash2Simple = crypto.encryptSimple(text);
        var decrypt2Simple = crypto.decryptSimple(hash2Simple);
        // loose equality works for objects
        expect(text).to.eql(decrypt1);
        // loose equality works for objects
        expect(text).to.eql(decrypt2Simple);
    });
});

function getLoadModelContext(mTreeBuildupContext) {
    return mocks.getLoadModelContext(mTreeBuildupContext);
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
