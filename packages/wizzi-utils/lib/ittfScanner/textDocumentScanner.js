/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\ittfScanner\textDocumentScanner.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
var verify = require('@wizzi/helpers').verify;
var path = require('path');
var encdec = require('../crypto/index');
var vfile = require('../fSystem/vfile');
var verify = require('../helpers/verify');
// TODO use Wizzi Virtual Store System (defaults to filesystems)
var md = module.exports = {};
// Scan a text document
// params
// string documentPath
// { options
// VFile file
// callback
md.scan = function(documentPath, options, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isNotEmpty(documentPath) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'documentPath', message: 'The documentPath parameter must be a string. Received: ' + documentPath }
        ));
    }
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    if (options.file) {
        md.scanExec(options.file, documentPath, options, callback)
    }
    else {
        vfile(function(err, file) {
            if (err) {
                return callback(err);
            }
            md.scanExec(file, documentPath, options, callback)
        })
    }
}
;
md.scanExec = function(file, documentPath, options, callback) {
    file.isFile(documentPath, function(err, result) {
        if (err) {
            return callback(err);
        }
        if (result == false) {
            return callback(error('999', 'scan', 'Parameter documentPath must be an existing file. Received: ' + documentPath));
        }
    })
    documentPath = verify.unixifyPath(documentPath);
    var documentUri = '';
    var breadCrumbs = [];
    if (options.rootFolder) {
        documentUri = verify.unixifyPath(documentPath.substr(options.rootFolder.length))
        ;
        var parts = documentUri.split('/');
        var partUri = '';
        var i, i_items=parts, i_len=parts.length, item;
        for (i=0; i<i_len; i++) {
            item = parts[i];
            if (item.length > 0) {
                partUri += '/' + item;
                breadCrumbs.push({
                    uri: partUri, 
                    name: item
                 })
            }
        }
        breadCrumbs[breadCrumbs.length-1].isLast = true;
    }
    file.read(documentPath, function(err, content) {
        if (err) {
            return callback(err);
        }
        return callback(null, {
                id: "p_1_1", 
                primaryPath: documentPath, 
                primaryUri: documentUri, 
                primaryHash: encdec.encrypt(documentPath), 
                breadCrumbs: breadCrumbs, 
                primaryIttf: {
                    content: content, 
                    pretty: '<span class="pp-pln">' + content + '</span>'
                 }, 
                fragments: [
                    
                ], 
                ittfReferences: [
                    
                ]
             });
    })
}
;
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
        method: 'wizzi-utils.lib.scanners.textDocumentScanner.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}