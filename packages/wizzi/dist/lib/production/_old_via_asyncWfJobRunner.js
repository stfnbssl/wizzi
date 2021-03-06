/*
    artifact generator: C:\My\wizzi\wizzi-mono\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\wizzi-mono\packages\wizzi\.wizzi\ittf\lib\production\_old_via_asyncWfJobRunner.js.ittf
*/
'use strict';
var path = require('path');
var util = require('util');
var async = require('async');
var thisPackageIndex = require('../../index');
var verify = require('wizzi-utils').verify;
var log = require('../util/log')(module);
function logme() {
    if (false) {
        console.log.apply(console, arguments);
    }
}
/**
    
*/
var AsyncWfJobRunner = {
    run_many: function(modelInfos, callback) {
        async.mapSeries(modelInfos, AsyncWfJobRunner._run_item, callback);
    }, 
    _run_item: function(modelInfo, callback) {
        var srcFullPath = modelInfo.srcFullPath();
        // log "AsyncWfJobRunner._run_item: I should run " + srcFullPath
        thisPackageIndex.executeJob({
            name: 'wizzi-studio dev-dashboard-incubator', 
            path: srcFullPath, 
            options: thisPackageIndex.options({
                indentSpaces: 4, 
                basedir: path.dirname(srcFullPath), 
                verbose: 2
            })
        }, callback);
    }
};
module.exports = AsyncWfJobRunner;
