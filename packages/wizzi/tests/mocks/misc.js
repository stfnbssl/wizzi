/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\tests\mocks\misc.js.ittf
*/
'use strict';
var wizziFactory = require('../../lib/services/wizziFactory');
var ProductionManager = require('../../lib/production/manager');
var acl = require('../../lib/acl');
var mockModels = require('./wizziModels');
var md = module.exports = {};
md.getWizziFactory = function(options, callback) {
    wizziFactory.createFactory({
        repo: {
            storeKind: (options.storeKind || 'filesystem')
         }, 
        plugins: {
            items: [
                './plugin'
            ], 
            pluginsBaseFolder: __dirname
         }, 
        test: {
            testOnlyMockBaseDir: options.testOnlyMockBaseDir
         }
     }, function(err, wf) {
        if (err) {
            console.log("[31m%s[0m", 'err', err);
            throw new Error(err);
        }
        return callback(null, wf);
    })
}
;
md.getProductionManager = function(basedir, modelPaths) {
    var pman = new ProductionManager({
        __type: 'WizziFactory'
     }, {
        basedir: basedir
     });
    pman.getLoadModel = function(schema) {
        return md.getLoadModel(modelPaths);
    }
    ;
    pman.globalContext({})
    return pman;
}
;
md.getLoadModel = function(modelPaths) {
    return function(ittfDocumentUri, context, callback) {
            if (modelPaths[ittfDocumentUri]) {
                callback(null, {
                    wzElement: 'source', 
                    wzName: ittfDocumentUri
                 })
            }
            else {
                callback({
                    __is_error: true, 
                    message: 'Not found'
                 })
            }
        };
}
;
md.getLoadModel2 = function(mockBaseDir) {
    var models = mockModels.getModels(mockBaseDir);
    return function(ittfDocumentUri, context, callback) {
            if (models[ittfDocumentUri]) {
                callback(null, models[ittfDocumentUri])
            }
            else {
                callback({
                    __is_error: true, 
                    message: 'Not found'
                 })
            }
        };
}
;
md.getModelInfo = function(mockModelName) {
    if (mockModelName === 'mock1') {
        return {
                cwd: __dirname, 
                src: 'mock1.tests.ittf'
             };
    }
}
;
