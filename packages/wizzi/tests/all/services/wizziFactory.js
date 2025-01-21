/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\tests\all\services\wizziFactory.js.ittf
    utc time: Tue, 21 Jan 2025 14:15:37 GMT
*/

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('@wizzi/utils').file;
var verify = require('@wizzi/utils').verify;

var wizziFactory = require('../../../lib/services/wizziFactory');
var mocks = require('../../mocks/misc');

describe("wizziFactory", function() {
    
    var wizziFactoryInstance = null;
    var testsMock1Model = null;
    
    before(function(done) {
        wizziFactory.createFactory({
            repo: {
                storeKind: 'filesystem'
             }, 
            plugins: {
                items: [
                    '../mocks/plugin'
                ], 
                pluginsBaseFolder: __dirname
             }, 
            test: {
                testOnlyMockBaseDir: __dirname
             }
         }, function(err, wf) {
            if (err) {
                console.log("[31m%s[0m", 'err', err);
                throw new Error(err);
            }
            // loog 'wf.__loadMTree', wf.__loadMTree
            wizziFactoryInstance = wf;
            done();
        })
    });
    
    it("should load a wizzi model", function(done) {
        var pman = wizziFactoryInstance.createProductionManager();
        wizziFactoryInstance.loadModel('tests', path.join(__dirname, 'ittf', 'mock1.tests.ittf'), {
            __productionManager: pman
         }, function(err, wizziModel) {
            if (err) {
                console.log("[31m%s[0m", 'err', err);
                throw new Error(err);
            }
            // loog 'wizziModel', wizziModel
            testsMock1Model = wizziModel;
            expect(wizziModel).to.be.an('object');
            expect(wizziModel.wzName).to.be.a('string');
            expect(wizziModel.wzName).to.be('mock1');
            done();
        })
    });
    
    it("should retrieve the loadModel function for a 'tests' wizzi model", function() {
        var loadModel = wizziFactoryInstance.getLoadModel('tests');
        expect(loadModel).to.be.a('function');
    });
    it("should retrieve a model transformer", function() {
        var transformModel = wizziFactoryInstance.getModelTransformer('tests/trans1');
        // loog 'should retrieve a model transformer. transformModel', transformModel
        expect(transformModel.trans).to.be.a('function');
    });
    it("should transform a model from a pre loaded wizzimodel", function(done) {
        wizziFactoryInstance.transformModel(testsMock1Model, 'tests/trans1', {
            from: 'stefi'
         }, function(err, transformedModel) {
            if (err) {
                console.log("[31m%s[0m", 'err', err);
                throw new Error(err);
            }
            expect(transformedModel).to.be.an('object');
            expect(transformedModel.testsName).to.be.a('string');
            expect(transformedModel.testsName).to.be('mock1');
            expect(transformedModel.contextFrom).to.be.a('string');
            expect(transformedModel.contextFrom).to.be('stefi');
            done();
        })
    });
    it("should retrieve an artifact generator", function() {
        var artifactGenerator = wizziFactoryInstance.getArtifactGenerator('tests/gen1');
        expect(artifactGenerator.gen).to.be.a('function');
    });
    it("should generate an artifact from a pre loaded wizzimodel", function(done) {
        wizziFactoryInstance.generateArtifact(testsMock1Model, path.join(__dirname, 'ittf', 'mock1.tests.ittf'), 'tests/gen1', {
            from: 'stefi'
         }, function(err, artifact) {
            if (err) {
                console.log("[31m%s[0m", 'err', err);
                throw new Error(err);
            }
            expect(artifact).to.be.a('string');
            expect(artifact).to.be('Hello I am mock1 artifact from stefi\n');
            done();
        })
    });
    it("should load a wizzi model and generate an artifact", function(done) {
        wizziFactoryInstance.loadModelAndGenerateArtifact(path.join(__dirname, 'ittf', 'mock1.tests.ittf'), {
            modelContext: {}, 
            artifactContext: {
                from: 'stefi'
             }
         }, 'tests/gen1', function(err, artifact) {
            if (err) {
                console.log("[31m%s[0m", 'err', err);
                throw new Error(err);
            }
            expect(artifact).to.be.a('string');
            expect(artifact).to.be('Hello I am mock1 artifact from stefi\n');
            done();
        })
    });
    it("should retrieve the 'tests' schema definition", function() {
        var schemaDefinition = wizziFactoryInstance.getSchemaDefinition('tests');
        expect(schemaDefinition).to.be.an('object');
        expect(schemaDefinition.name).to.be.a('string');
        expect(schemaDefinition.name).to.be('tests');
    });
    it("should load an mTree", function(done) {
        // loog 'wizziFactoryInstance.__loadMTree', wizziFactoryInstance.__loadMTree
        wizziFactoryInstance.loadMTree(path.join(__dirname, 'ittf', 'html', 'simple.html.ittf'), {
            from: 'stefi'
         }, function(err, mTree) {
            if (err) {
                return callback(err);
            }
            // loog 'mTree', mTree
            expect(mTree).to.be.an('object');
            expect(mTree.nodes[0].n).to.be.a('string');
            expect(mTree.nodes[0].n).to.be('html');
            expect(mTree.nodes[0].children[0].n).to.be.a('string');
            expect(mTree.nodes[0].children[0].n).to.be('head');
            expect(mTree.nodes[0].children[0].children[0].n).to.be.a('string');
            expect(mTree.nodes[0].children[0].children[0].n).to.be('title');
            expect(mTree.nodes[0].children[0].children[0].v).to.be.a('string');
            expect(mTree.nodes[0].children[0].children[0].v).to.be('from stefi');
            done();
        })
    });
});