/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\model\asyncFrontMatterLoader.js.ittf
*/
'use strict';
var path = require('path');
var util = require('util');
var async = require('async');
var verify = require('wizzi-utils').verify;

function loadMany(modelInfos, callback) {
    // loog '+ asyncFrontMatterLoader.loadMany, modelInfos', modelInfos
    async.map(modelInfos, _load_item, function(err, frontMatters) {
        if (err) {
            return callback(err);
        }
        // loog 'asyncFrontMatterLoader.loadMany, frontMatters', frontMatters
        return callback(null, frontMatters);
    })
}
function load(modelInfo, callback) {
    _load_item(modelInfo, function(err, frontMatter) {
        if (err) {
            return callback(err);
        }
        // loog 'asyncFrontMatterLoader.load, frontMatter', frontMatter
        return callback(null, frontMatter);
    })
}
//
function _load_item(masterModelInfo, callback) {
    // loog '+ asyncFrontMatterLoader._load_item, masterModelInfo', masterModelInfo.srcFullPath()
    var srcFullPath = masterModelInfo.srcFullPath();
    masterModelInfo.getLoadFrontMatter(function(err, frontMatterLoader) {
        if (err) {
            return callback(err);
        }
        frontMatterLoader(srcFullPath, function(err, mTree) {
            if (err) {
                return callback(err);
            }
            callback(null, {
                kind: 'frontMatter', 
                sourceRelPath: masterModelInfo.srcRelPath(), 
                sourceUri: srcFullPath, 
                sourceSchema: masterModelInfo.schema, 
                ...mTree.frontMatter
             })
        })
    })
}

module.exports = {
    loadMany: loadMany,
    load: load,
    _load_item: _load_item
};
