/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\tests\all\services\pluginsManager.js.ittf
    utc time: Thu, 15 Feb 2024 18:31:20 GMT
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('@wizzi/utils').file;
var verify = require('@wizzi/utils').verify;

var pluginsManager = require('../../../lib/services/pluginsManager');

describe("pluginsManager", function() {
    
    var pluginsManagerInstance = null;
    
    before(function(done) {
        pluginsManager.createManager({
            items: [
                '../../mocks/plugin'
            ], 
            pluginsBaseFolder: __dirname
         }, function(err, pm) {
            if (err) {
                console.log("[31m%s[0m", 'err', err);
                throw new Error(err);
            }
            pluginsManagerInstance = pm;
            done();
        })
    });
    
    it("should retrieve the loadModel function for a 'tests' wizzi model", function() {
        var modelFactory = pluginsManagerInstance.getModelFactory('tests');
        expect(modelFactory).to.be.an('object');
        expect(modelFactory.createLoadModel).to.be.a('function');
    });
    it("should retrieve a model transformer", function() {
        var transformModel = pluginsManagerInstance.getModelTransformer('tests/trans1');
        expect(transformModel.trans).to.be.a('function');
    });
    it("should retrieve an artifact generator", function() {
        var artifactGenerator = pluginsManagerInstance.getArtifactGenerator('tests/gen1');
        expect(artifactGenerator.gen).to.be.a('function');
    });
    it("should retrieve the 'tests' schema definition", function() {
        var schemaDefinition = pluginsManagerInstance.getSchemaDefinition('tests');
        expect(schemaDefinition).to.be.an('object');
        expect(schemaDefinition.name).to.be.a('string');
        expect(schemaDefinition.name).to.be('tests');
    });
});
