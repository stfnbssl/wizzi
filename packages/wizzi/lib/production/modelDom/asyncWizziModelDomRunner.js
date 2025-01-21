/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\production\modelDom\asyncWizziModelDomRunner.js.ittf
    utc time: Tue, 21 Jan 2025 14:15:35 GMT
*/
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