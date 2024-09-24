/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\ittfScanner\folderScanner.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
var verify = require('@wizzi/helpers').verify;
var path = require('path');
var verify = require('../helpers/verify');
var vfile = require('../fSystem/vfile');
var ittfGraph = require('../ittfGraph/index');
var IttfFsNode = require('./ittfFsNode');
var md = module.exports = {};
/**
    
     Scans a folder searching for *.ittf files
     Returns a wizzi.utils.IttfDocumentGraph instance
     loaded with an mTree conformant to the
     'wzpackage' schema.
    
     params
     string folderPath
     { options
     string name
     # the name of the 'wzpackage' wizzi model that
     # will be generated from this folder
     string gitPath
     # the base path to the 'main' generated artifact
     # in the future, could be used for linking the ittf document
     # of a language type to the generated code.
     { file
     virtual filesystem
     optional
    
*/
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
    if (verify.isObject(options) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'options', message: 'The options parameter must be an object. Received: ' + options }
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
            return callback(error('999', 'scanExec', 'Parameter folderPath must be an existing folder, ' + folderPath + ' not found'));
        }
        var removeRoot = path.dirname(folderPath);
        // loog 'folderPath, removeRoot', folderPath, removeRoot
        var baseFolder = path.basename(folderPath);
        file.getGlobbedFilesEx(path.join(folderPath, '**/*.ittf'), {
            removeRoot: removeRoot, 
            dot: true, 
            ignore: path.join(folderPath, '**/node_modules/**/*.*')
         }, function(err, ittfs) {
            if (err) {
                console.log("[31m%s[0m", err);
                throw new Error(err.message);
            }
            // loog 'ittfs\n', JSON.stringify(ittfs, null, 2)
            ittfGraph.createIttfDocumentGraphFrom(null, {
                createEmpty: true, 
                name: 'wzpackage', 
                value: options.name
             }, function(err, ittfDocumentGraph) {
                if (err) {
                    return callback(err);
                }
                var root = new IttfFsNode(path.dirname(folderPath), null, {
                    isDirectory: true, 
                    file: file
                 });
                root.setSourcePaths({
                    ittfBasePath: removeRoot, 
                    jsCodeBasePath: options.gitPath
                 })
                // create the IttfFsNode tree structure of the scanned folder
                var i, i_items=ittfs, i_len=ittfs.length, ittf;
                for (i=0; i<i_len; i++) {
                    ittf = ittfs[i];
                    root.addDocument(( ittf[0] === '/' ? ittf.substr(1) : ittf ), {
                        basePath: removeRoot, 
                        gitPath: options.gitPath
                     })
                }
                // analize all IttfFsNode(s) starting from root
                // this also searches mixed or included ittf fragments that are
                // outside (up) of folderPath
                root.analize(function(err, notUsed) {
                    if (err) {
                        console.log("[31m%s[0m", err);
                        throw new Error(err.message);
                    }
                    // export folder infos to an mTree conformant to the
                    // 'wzpackage' schema.
                    root.toIttf(ittfDocumentGraph);
                    // loog 'IttfFsNode.ittfDocumentGraph\n', ittfDocumentGraph.toString()
                    if (options.getAll) {
                        return callback(null, {
                                wzPackageIttfDocumentGraph: ittfDocumentGraph, 
                                ittfFsNode: root
                             });
                    }
                    else {
                        return callback(null, ittfDocumentGraph);
                    }
                })
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
        method: '.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}