/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\production\modelDom\asyncWizziModelDomRunner.js.ittf
    utc time: Thu, 09 May 2024 12:34:31 GMT
*/
'use strict';
var path = require('path');
var util = require('util');
var async = require('async');
var chalk = require('chalk');
var verify = require('@wizzi/utils').verify;
var log = require('../../util/log')(module);
/**
    
*/
var AsyncWizziModelDomRunner = {
    run: function(wmtRequest, callback) {
        var modelInfo = wmtRequest.modelInfo;
        var productionManager = modelInfo.productionManager();
        var wizziFactory = productionManager.wizziFactory;
        wizziFactory.generateModelDoms(wmtRequest.wfschemaIttfDocumentUri, wmtRequest.outputPackageFolder, wmtRequest.schemaName, {}, function(err, result) {
            if (err) {
                return callback(err);
            }
            console.log(chalk.green('WIZZI MODEL TYPES GENERATED FOR SCHEMA ' + wmtRequest.schemaName));
            callback(null, result)
        })
    }
 };
module.exports = AsyncWizziModelDomRunner;
