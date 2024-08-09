/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\production\model\asyncFrontMatterLoader.js.ittf
    utc time: Fri, 09 Aug 2024 15:27:07 GMT
*/
'use strict';
var path = require('path');
var util = require('util');
var async = require('async');
var verify = require('@wizzi/utils').verify;

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
/**
     Load a single front matter using ModelInfo data
     params
     { modelInfo
     func srcFullPath
*/
function _load_item(modelInfo, callback) {
    // loog '+ asyncFrontMatterLoader._load_item, modelInfo', modelInfo.srcFullPath()
    var srcFullPath = modelInfo.srcFullPath();
    modelInfo.getLoadFrontMatter(function(err, frontMatterLoader) {
        if (err) {
            return callback(err);
        }
        frontMatterLoader(srcFullPath, function(err, mTree) {
            if (err) {
                return callback(err);
            }
            callback(null, {
                kind: 'frontMatter', 
                sourceRelPath: modelInfo.srcRelPath(), 
                sourceUri: srcFullPath, 
                sourceSchema: modelInfo.schema, 
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