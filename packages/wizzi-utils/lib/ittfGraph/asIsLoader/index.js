/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\ittfGraph\asIsLoader\index.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
var verify = require('@wizzi/helpers').verify;
var liner = require('./liner');
var nodifier = require('./nodifier');
// function asIsLoader
// string ittfDocumentUri
// { options
// { file?
// api-ref wizzi.utils.file
// callback?
function AsisLoader(ittfDocumentUri, options, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', 'AsisLoader', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isNotEmpty(ittfDocumentUri) === false) {
        return callback(error(
            'InvalidArgument', 'AsisLoader', { parameter: 'ittfDocumentUri', message: 'The ittfDocumentUri parameter must be a string. Received: ' + ittfDocumentUri }
        ));
    }
    if (verify.isObject(options) === false) {
        return callback(error(
            'InvalidArgument', 'AsisLoader', { parameter: 'options', message: 'The options parameter must be an object. Received: ' + options }
        ));
    }
    var reader = options.file;
    reader.read(ittfDocumentUri, function(err, content) {
        if (err) {
            return callback(err);
        }
        var lines = liner(content, {});
        var count = 0;
        var asisMTree = {
            loadHistory: {
                getNewNodeId: function() {
                    return ++count;
                }
             }, 
            uri: ittfDocumentUri, 
            content: content
         };
        asisMTree.nodes = nodifier(lines, asisMTree)
        ;
        
        // loog 'asis.loader.asisMTree.nodes.__is_error', asisMTree.nodes.__is_error
        if (asisMTree.nodes.__is_error) {
            asisMTree.nodes = [
                {
                    name: 'Cannot load this ittf document: ' + asisMTree.nodes.message
                 }
            ];
        }
        // loog 'asis.loader.asisMTree.nodes.length', asisMTree.nodes.length, asisMTree.nodes.length != 1
        else {
            if (asisMTree.nodes.length != 1) {
                var message = 'wizzi-utils.asIsLoader.error. The ittf source document must have one node. Found: ' + asisMTree.nodes.length + ' in document: ' + ittfDocumentUri;
                if (callback) {
                    return callback({
                            __is_error: true, 
                            message: message
                         });
                }
                else {
                    throw new Error(message);
                }
            }
        }
        if (asisMTree.nodes && asisMTree.nodes.length > 0) {
            if (options.clean) {
                clean(asisMTree.nodes[0])
            }
            else if (options.clean_remove) {
                asisMTree = clean(asisMTree.nodes[0])
                ;
            }
        }
        if (callback) {
            return callback(null, asisMTree);
        }
        else {
            return asisMTree;
        }
    })
}
function clean(node) {
    delete node.parent
    delete node.model
    delete node.hasMacro
    delete node.id
    if (node.children) {
        var i, i_items=node.children, i_len=node.children.length, item;
        for (i=0; i<i_len; i++) {
            item = node.children[i];
            clean(item);
        }
    }
    return node;
}
AsisLoader.createFromString = function(text, options, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isNotEmpty(text) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'text', message: 'The text parameter must be a string. Received: ' + text }
        ));
    }
    options = options || {};
    var options = {
        file: {
            read: function(dummy, callback) {
                if (callback) {
                    return callback(null, text);
                }
                else {
                    return text;
                }
            }
         }
     };
    return AsisLoader('dummy', options, callback);
}
;
module.exports = AsisLoader;
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
        method: '.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}