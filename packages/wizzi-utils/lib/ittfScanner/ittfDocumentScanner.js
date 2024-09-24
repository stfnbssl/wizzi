/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\ittfScanner\ittfDocumentScanner.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
var verify = require('@wizzi/helpers').verify;
var path = require('path');
var async = require('async');
var stringify = require('json-stringify-safe');
var encdec = require('../crypto/index');
var vfile = require('../fSystem/vfile');
var verify = require('../helpers/verify');
var ittfGraph = require('../ittfGraph/index');
var IttfDocumentState = require('./ittfDocumentState');
var mTreeHtmlPrettifier = require('../pretty/mTreeHtmlPrettifier');
// TODO use Wizzi Virtual Store System (defaults to filesystems)
var md = module.exports = {};
// Scan a single ITTF Document
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
        if (options.getNodeDetails) {
            scanMTreeEx(options.file, documentPath, options, callback)
        }
        else {
            scanExec(options.file, documentPath, options, callback)
        }
    }
    else {
        vfile(function(err, file) {
            if (err) {
                return callback(err);
            }
            if (options.getNodeDetails) {
                scanMTreeEx(file, documentPath, options, callback)
            }
            else {
                scanExec(file, documentPath, options, callback)
            }
        })
    }
}
;
function scanMTreeEx(file, documentPath, options, callback) {
    file.isFile(documentPath, function(err, result) {
        if (err) {
            return callback(err);
        }
        if (result == false) {
            return callback(error('999', 'scan', 'Parameter documentPath must be an existing file. Received: ' + documentPath));
        }
        ittfGraph.createIttfDocumentGraphFrom(documentPath, {
            file: file
         }, function(err, ittfDocumentGraph) {
            if (err) {
                return callback(err);
            }
            ittfDocumentGraph.analize({
                rootFolder: options.rootFolder
             }, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                // loog 'scanMTreeEx.ittfDocumentGraph.fragments',  ittfDocumentGraph.fragments
                // loog 'scanMTreeEx.ittfDocumentGraph.ittfReferences',  ittfDocumentGraph.ittfReferences
                // loog 'scanMTreeEx.ittfDocumentGraph.errorFragments',  ittfDocumentGraph.errorFragments
                return callback(null, {
                        ittfDocumentGraph: ittfDocumentGraph, 
                        fragments: ittfDocumentGraph.fragments, 
                        ittfReferences: ittfDocumentGraph.ittfReferences, 
                        errorFragments: ittfDocumentGraph.errorFragments
                     });
            })
        })
    })
}
function scanExec(file, documentPath, options, callback) {
    var idCounter = options.baseIdCounter || 1;
    options.scanIdCounter = idCounter;
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
    var ittfDocumentState = new IttfDocumentState(documentPath, documentUri, breadCrumbs, options);
    scanMTreeEx(file, documentPath, options, function(err, scanResult) {
        if (err) {
            return callback(err);
        }
        var primary = scanResult.ittfDocumentGraph;
        ittfDocumentState.setIttfContent(primary.content);
        var pretty = mTreeHtmlPrettifier(primary);
        ittfDocumentState.setIttfPretty(pretty.prettyLines.join(''));
        ittfDocumentState.setFromScanResult(scanResult)
        var msg = stringify(ittfDocumentState, null, 2);
        // loog 'related', msg
        var guard = 0;
        function loopNext(done) {
            // loog 'loopNext', guard
            if (done) {
                return callback(null, ittfDocumentState);
            }
            guard++;
            if (guard > 5) {
                return callback(null, ittfDocumentState);
            }
            scanState(function(err, result) {
                if (err) {
                    return callback(err);
                }
                loopNext(result)
            })
        }
        loopNext(false)
        function scanState(callback) {
            // loog 'scanState.ittfDocumentState.hasUnscanned()', ittfDocumentState.hasUnscanned()
            if (ittfDocumentState.hasUnscanned() == false) {
                return callback(null, true);
            }
            scanStateFragments(function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                scanStateIttfReferences(function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    return callback(null, false);
                })
            })
        }
        function scanStateFragments(callback) {
            // loog 'scanStateFragments.getUnscannedFragments.length', ittfDocumentState.getUnscannedFragments().length
            async.map(ittfDocumentState.getUnscannedFragments(), function(fragment, callback) {
                fragment.hash = encdec.encrypt(fragment.uri);
                scanMTreeEx(file, fragment.uri, options, function(err, scanResult) {
                    if (err) {
                        return callback(err);
                    }
                    var primary = scanResult.ittfDocumentGraph;
                    var msg = stringify(scanResult, null, 2);
                    // loog 'scanResult', fragment.uri, msg
                    ittfDocumentState.setFromScanResult(scanResult)
                    fragment.ittfContent = primary.content;
                    var pretty = mTreeHtmlPrettifier(primary);
                    fragment.ittfPretty = pretty.prettyLines.join('');
                    return callback(null);
                })
            }, callback)
        }
        function scanStateIttfReferences(callback) {
            // loog 'scanStateFragments.getUnscannedIttfReferences.length', ittfDocumentState.getUnscannedIttfReferences()
            async.map(ittfDocumentState.getUnscannedIttfReferences(), function(reference, callback) {
                scanExec(file, reference.uri, {
                    rootFolder: options.rootFolder, 
                    baseIdCounter: ++idCounter
                 }, function(err, documentState) {
                    if (err) {
                        console.log("[31m%s[0m", err);
                        throw new Error(err.message);
                    }
                    reference.documentState = documentState;
                    return callback(null);
                })
            }, callback)
        }
    })
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
        method: 'wizzi-utils.lib.scanners.ittfDocumentScanner.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}