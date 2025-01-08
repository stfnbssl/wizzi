/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\lib\loader\frontMatter.js.ittf
    utc time: Thu, 02 Jan 2025 09:17:36 GMT
*/
var verify = require('@wizzi/utils').verify;
var util = require('util');
var path = require('path');
var async = require('async');
var errors = require('../errors');
var verify = require('@wizzi/utils').verify;
var utilnode = require('../utils/node');
/**
     Ittf commands
     $---       // the front-matter root node.
     // Children nodes are front-matter named values
     // Name - value syntax is the same of a json ittf document
*/
module.exports = function(primaryMTreeBrick, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isObject(primaryMTreeBrick) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'primaryMTreeBrick', message: 'The primaryMTreeBrick parameter must be an object. Received: ' + primaryMTreeBrick }
        ));
    }
    var frontmatters = [];
    var i, i_items=primaryMTreeBrick.nodes, i_len=primaryMTreeBrick.nodes.length, node;
    for (i=0; i<i_len; i++) {
        node = primaryMTreeBrick.nodes[i];
        searchCommands(node, frontmatters)
    }
    var i, i_items=frontmatters, i_len=frontmatters.length, item;
    for (i=0; i<i_len; i++) {
        item = frontmatters[i];
        var j, j_items=item.children, j_len=item.children.length, node;
        for (j=0; j<j_len; j++) {
            node = item.children[j];
            var prop = utilnode.jsonifyProperty(node);
            
            // loog 'wizzi-mtree.includer.jsonifyProperty.err', prop
            
            // loog 'wizzi-mtree.includer.jsonifyProperty.lineErrors', prop.errorLines
            if (prop.__is_error) {
                var errItem = prop.__errItem ? prop.__errItem : node;
                prop.errorLines = item.model.loadHistory.getIttfDocumentErrorLines(item.sourceKey, {
                    row: errItem.row, 
                    col: errItem.col + errItem.name.length + 1, 
                    description: 'jsonify error in front matter'
                 }, true)
                ;
                return callback(prop);
            }
            primaryMTreeBrick.frontMatter[prop.name] = prop.value;
        }
        utilnode.remove(item)
    }
    callback(null, primaryMTreeBrick);
}
;
function searchCommands(item, frontmatters) {
    if (item.name === '$---') {
        frontmatters.push(item);
    }
    else {
        var i, i_items=item.children, i_len=item.children.length, child;
        for (i=0; i<i_len; i++) {
            child = item.children[i];
            searchCommands(child, frontmatters)
        }
    }
}
/**
  params
    string code
      # the error name or number
    string method
    string message
      # optional
    { innerError
      # optional
*/
function error(code, method, message, innerError) {
    var parameter = null;
    if (verify.isObject(message)) {
        parameter = message.parameter;
        message = message.message;
    }
    return verify.error(innerError, {
        name: ( verify.isNumber(code) ? 'Err-' + code : code ),
        method: 'wizzi-mtree.loader.frontMatter.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}