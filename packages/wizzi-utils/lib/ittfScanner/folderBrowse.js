/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\ittfScanner\folderBrowse.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
var verify = require('@wizzi/helpers').verify;
var path = require('path');
var async = require('async');
var verify = require('../helpers/verify');
var vfile = require('../fSystem/vfile');
var encdec = require('../crypto/index');
var md = module.exports = {};
// Scans a folder searching for *.ittf files
// Returns a collection of ITTF Source Unit infos
// Does not go deep to subfolders
// params
// string folderPath
// { options
// string baseFolder
// callback
md.scan = function(folderPath, options, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isNotEmpty(folderPath) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'folderPath', message: 'The folderPath parameter must be a string. Received: ' + folderPath }
        ));
    }
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    if (options.file) {
        md.scanExec(options.file, folderPath, options, callback)
    }
    else {
        vfile(function(err, file) {
            if (err) {
                return callback(err);
            }
            md.scanExec(file, folderPath, options, callback)
        })
    }
}
;
md.scanExec = function(file, folderPath, options, callback) {
    file.isDirectory(folderPath, function(err, result) {
        if (err) {
            return callback(err);
        }
        if (result == false) {
            return callback(error('999', 'scan', 'wizzi-utils.folderBrowse.scan. Parameter folderPath must be an existing folder. Received: ' + folderPath));
        }
        var folderUri = '';
        var breadCrumbs = [];
        if (options.rootFolder) {
            folderUri = verify.unixifyPath(folderPath.substr(options.rootFolder.length))
            ;
            var parts = folderUri.split('/');
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
        file.readdir(folderPath, function(err, dir) {
            if (err) {
                return callback(err);
            }
            var fsitems = [],
                fullPath,
                fsitem;
            async.map(dir, function(item, callback) {
                // loog 'wizzi-util.folderBrowse.item', item
                var fullPath = path.join(folderPath, item);
                var uri = '';
                if (options.rootFolder) {
                    uri = verify.unixifyPath(fullPath.substr(options.rootFolder.length))
                    ;
                }
                file.isFile(fullPath, function(err, result) {
                    if (err) {
                        return callback(err);
                    }
                    if (result) {
                        var ss = item.split('.');
                        if (ss[ss.length-1] === 'ittf') {
                            file.read(fullPath, function(err, content) {
                                if (err) {
                                    return callback(err);
                                }
                                fsitems.push({
                                    isFolder: false, 
                                    uri: uri, 
                                    name: ss.slice(0, ss.length-2).join('.'), 
                                    basename: item, 
                                    isIttfDocument: true, 
                                    isFragment: fullPath.indexOf('/t/') > -1, 
                                    schema: ss[ss.length-2], 
                                    mime: ss[ss.length-2], 
                                    hash: encdec.encrypt(fullPath), 
                                    content: content
                                 })
                                return callback(null);
                            })
                        }
                        else {
                            fsitems.push({
                                isFolder: false, 
                                uri: uri, 
                                name: ss.slice(0, ss.length-1).join('.'), 
                                basename: item, 
                                isIttfDocument: false, 
                                schema: null, 
                                mime: ss[ss.length-1], 
                                hash: encdec.encrypt(fullPath)
                             })
                            return callback(null);
                        }
                    }
                    else {
                        fsitems.push({
                            uri: uri, 
                            name: item, 
                            basename: item, 
                            isFolder: true, 
                            hash: encdec.encrypt(fullPath)
                         })
                        return callback(null);
                    }
                })
            }, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                return callback(null, {
                        folderPath: folderPath, 
                        folderUri: folderUri, 
                        breadCrumbs: breadCrumbs, 
                        fsitems: fsitems
                     });
            })
        })
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
        method: 'wizzi-utils.lib.scanners.folderBrowse.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}