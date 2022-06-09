/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\ittf\tests\artifact\asyncArtifactGenerator.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('wizzi-utils').file;
var verify = require('wizzi-utils').verify;

var asyncArtifactGenerator = require('../../lib/artifact/asyncArtifactGenerator');
var mocks = require('../mocks/misc');

describe("asyncArtifactGenerator", function() {
    it("shoul generate ...", function(done) {
        /**
            asyncArtifactGenerator.generate(artifactInfo, generator, modelInfos, contextModelsCollection, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err);
                }
            })*/
    });
    it("shoul generate ... from collection contexts", function(done) {
        /**
            asyncArtifactGenerator.generateModelCollection(artifactInfo, generator, modelInfos, contextModelsCollectionCollection, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err);
                }
            })*/
    });
    it("shoul generate ... by code write", function(done) {
        /**
            asyncArtifactGenerator.generateCodeWrite(artifactInfo, generator, contextModelsCollection, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err);
                }
            })*/
    });
    it("shoul generate ... an item", function(done) {
        /**
            asyncArtifactGenerator._gen_item(genInfo, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err);
                }
            })*/
    });
});
