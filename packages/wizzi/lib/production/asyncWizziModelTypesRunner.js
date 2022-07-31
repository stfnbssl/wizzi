/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\production\asyncWizziModelTypesRunner.js.ittf
*/
'use strict';
var path = require('path');
var util = require('util');
var async = require('async');
var chalk = require('chalk');
var verify = require('wizzi-utils').verify;
var log = require('../util/log')(module);
//
var AsyncWizziModelTypesRunner = {
    run: function(wmtRequest, callback) {
        var modelInfo = wmtRequest.modelInfo;
        var productionManager = modelInfo.productionManager();
        var wizziFactory = productionManager.wizziFactory;
        // log "AsyncWizziModelTypesRunner.run: I should run " + wmtRequest.wfschemaIttfDocumentUri
        wizziFactory.generateModelDoms(wmtRequest.wfschemaIttfDocumentUri, wmtRequest.outputPackageFolder, wmtRequest.schemaName, {}, function(err, result) {
            if (err) {
                return callback(err);
            }
            console.log(chalk.green('WIZZI MODEL TYPES GENERATED FOR SCHEMA ' + wmtRequest.schemaName), __filename);
            callback(null, result)
        })
    }
 };
module.exports = AsyncWizziModelTypesRunner;
