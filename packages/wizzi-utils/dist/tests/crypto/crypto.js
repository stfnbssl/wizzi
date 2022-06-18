/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\tests\crypto\crypto.js.ittf
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
