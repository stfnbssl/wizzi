/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-core\.wizzi\tests\models\text\model_text.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var mtree = require('wizzi-mtree');
var file = require('wizzi-utils').file;
var verify = require('wizzi-utils').verify;
var mocks = require('wizzi-utils').mocks;

var text_factory = require('../../../lib/wizzi/models/text-factory.g');
var text_artifact = require('../../../lib/artifacts/text/document/gen/main');

describe("model text", function() {
    var loadModel;
    before(function() {
        loadModel = text_factory.createLoadModel(getWizziObject())
        ;
    });
    it("should load a basic text ittf document", function(done) {
        loadModel(path.join(__dirname, 'ittf', 'basic.text.ittf'), getLoadModelContext({}), function(err, wizziModel) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err);
            }
            // log? wizziModel
            var ctx = new mocks.getGenContext();
            text_artifact.gen(wizziModel, ctx, function(err, result) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err);
                }
                var artifactText = result.getContent();
                expect(artifactText).to.be.a('string');
                expect(artifactText).to.be('Hello stefi\n');
                done();
            })
        })
    });
    it("should load a mixed text ittf document", function(done) {
        loadModel(path.join(__dirname, 'ittf', 'mixed.text.ittf'), getLoadModelContext({}), function(err, wizziModel) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err);
            }
            // log? wizziModel
            var ctx = new mocks.getGenContext();
            text_artifact.gen(wizziModel, ctx, function(err, result) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    throw new Error(err);
                }
                var artifactText = result.getContent();
                expect(artifactText).to.be.a('string');
                expect(artifactText).to.be('Copyright (c) Wizzi\n');
                done();
            })
        })
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
