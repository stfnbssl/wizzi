/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\lib\loader\includer.js.ittf
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
     $include
     $json
     $fragment
*/
var includer = module.exports = function(primaryMTreeBrick, mTreeBrickProvider, callback) {
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
    if (verify.isObject(mTreeBrickProvider) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'mTreeBrickProvider', message: 'The mTreeBrickProvider parameter must be an object. Received: ' + mTreeBrickProvider }
        ));
    }
    var includes = [];
    var jsons = [];
    var fragments = [];
    var i, i_items=primaryMTreeBrick.nodes, i_len=primaryMTreeBrick.nodes.length, node;
    for (i=0; i<i_len; i++) {
        node = primaryMTreeBrick.nodes[i];
        searchCommands(node, includes, jsons, fragments)
    }
    // loog 'wizzi-mtree.includer.fragments before', primaryMTreeBrick.documentFragments
    primaryMTreeBrick.documentFragments = fragments;
    // loog 'wizzi-mtree.includer.fragments after', primaryMTreeBrick.documentFragments
    async.mapSeries(includes, function(item, callback) {
        var v = item.value.trim();
        var includerUri = item.model.uri;
        var includerBaseDir = path.dirname(includerUri);
        mTreeBrickProvider.get({
            from: 'store', 
            basedir: includerBaseDir, 
            relpath: v, 
            include: true, 
            includerBrickKey: item.model.brickKey, 
            includerMTreeBrick: primaryMTreeBrick
         }, function(err, includedWipNodifiedMTree) {
            if (err) {
                console.log("[31m%s[0m", err);
            }
            if (err) {
                if (err.__is_wizzi_error) {
                    err.mtree = {
                        includerUri: includerUri, 
                        includedRelPath: v
                     };
                    return callback(err);
                }
                return callback(local_error('IttfIncludeError', 'includer', 'Fragment to include not found', item, err, {
                        mtree: {
                            includerUri: includerUri, 
                            includedRelPath: v
                         }
                     }));
            }
            mTreeBrickProvider.enterFragmentCall(includerUri, includedWipNodifiedMTree.uri)
            if (mTreeBrickProvider.checkForRecursion()) {
                return callback(local_error('IttfIncludeError', 'default', 'Recursive mixin or include: ' + v, node));
            }
            includer(includedWipNodifiedMTree, mTreeBrickProvider, function(err, includeResult) {
                if (err) {
                    console.log("[31m%s[0m", err);
                    return callback(err);
                }
                mTreeBrickProvider.exitFragmentCall();
                // _ mTreeBrickProvider.callChain.pop()
                if (!item.parent) {
                    return callback(local_error('IttfIncludeError', 'includer', 'A $include command cannot be a root node.', item, err, {
                            mtree: {
                                includerUri: includerUri, 
                                includedRelPath: v
                             }
                         }));
                }
                utilnode.replace(item, includeResult.nodes)
                return callback(null);
            })
        })
    }, function(err, results) {
        if (err) {
            console.log("[31m%s[0m", err);
            return callback(err);
        }
        var i, i_items=jsons, i_len=jsons.length, item;
        for (i=0; i<i_len; i++) {
            item = jsons[i];
            var json = JSON.parse(item.value);
            if (verify.isArray(json)) {
                var normalized = [];
                var j, j_items=json, j_len=json.length, jsonitem;
                for (j=0; j<j_len; j++) {
                    jsonitem = json[j];
                    normalized.push(normalizeNode(jsonitem, item.parent, item.model, item.row, item.col, item.sourceKey))
                }
                utilnode.replace(item, normalized);
            }
            else {
                var normalized = normalizeNode(json, item.parent, item.model, item.row, item.col, item.sourceKey);
                utilnode.replace(item, [
                    normalized
                ])
            }
        }
        callback(null, primaryMTreeBrick);
    })
}
;
function searchCommands(item, includes, jsons, fragments) {
    if (item.name === '$include') {
        includes.push(item);
    }
    else if (item.name === '$json') {
        jsons.push(item);
    }
    else if (item.name === '$fragment') {
        fragments.push(item);
    }
    var i, i_items=item.children, i_len=item.children.length, child;
    for (i=0; i<i_len; i++) {
        child = item.children[i];
        searchCommands(child, includes, jsons, fragments)
    }
}
function normalizeNode(node, parent, model, r, c, u) {
    node.parent = parent;
    node.model = model;
    node.row = r;
    node.col = c;
    node.souceKey = u;
    if (node.children) {
        var i, i_items=node.children, i_len=node.children.length, item;
        for (i=0; i<i_len; i++) {
            item = node.children[i];
            normalizeNode(item, node, model, r, c, u);
        }
    }
    else {
        node.children = [];
    }
}
function local_error(errorName, method, message, node, inner, other) {
    console.log('local_error', errorName, node, __filename);
    var mtree = other ? Object.assign({}, other.mtree || {}, {
            mTreeBrickNode: node, 
            mTreeBrick: node ? (node.mTreeBrick || node.model) : null
         }) : {};
    if (other) {
        delete other.mtree
    }
    return new errors.WizziError(message, errorName, [
            errorName
        ], {
            source: {
                method: 'wizzi-mtree@0.8.32.loader.includer.' + method
             }, 
            mtree: mtree, 
            inner: inner, 
            ...other||{}
         });
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
        method: 'wizzi-mtree@0.8.32.loader.includer.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}