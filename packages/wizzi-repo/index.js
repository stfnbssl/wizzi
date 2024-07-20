/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-repo\.wizzi\root\index.js.ittf
    utc time: Wed, 03 Jul 2024 03:18:29 GMT
*/
'use strict';
var verify = require('@wizzi/utils').verify;

var chalk = require('chalk');
var vfile = require('@wizzi/utils').vfile;
var fileInfoByPath = require('@wizzi/utils').fileInfoByPath;

var md = module.exports = {};
md.version = "0.8.24";

var MongoDocument = {};
var MongoFsImpl = {};
var JsonFsImpl = require('./lib/json/jsonFsimpl');
var IttfDocumentStore = require('./lib/repo/ittfDocumentStore');
md.ObjectId = require('./lib/utils/objectId');

md.MongoFsImpl = MongoFsImpl;

/**
     Filesystem virtual file service
     noparams
*/
md.fsfile = function fsfile(callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', 'fsfile', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    // vfile default
    var fsfile = vfile();
    return callback(null, fsfile);
}
;

/**
     Create an instance of the mongoDb Document class
     for managing files and directory
*/
md.mongoDbDocumentManager = function mongoDbDocumentManager(mongoUri, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', 'mongoDbDocumentManager', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isNotEmpty(mongoUri) === false) {
        return callback(error(
            'InvalidArgument', 'mongoDbDocumentManager', { parameter: 'mongoUri', message: 'The mongoUri parameter must be a string. Received: ' + mongoUri }
        ));
    }
    MongoDocument.create(mongoUri, function(err, docman) {
        if (err) {
            return callback(err);
        }
        return callback(null, docman);
    })
}
;

/**
     mongoDb virtual file service
     params
     { options
     string mongoUri
     string mongoBaseFolder
*/
md.dbfile = function dbfile(options, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', 'dbfile', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isObject(options) === false) {
        return callback(error(
            'InvalidArgument', 'dbfile', { parameter: 'options', message: 'The options parameter must be an object. Received: ' + options }
        ));
    }
    if (verify.isNotEmpty(options.mongoUri) === false) {
        return callback(error(
            'InvalidArgument', 'dbfile', { parameter: 'options.mongoUri', message: 'The options.mongoUri parameter must be a string. Received: ' + options.mongoUri }
        ));
    }
    if (verify.isNotEmpty(options.mongoBaseFolder) === false) {
        return callback(error(
            'InvalidArgument', 'dbfile', { parameter: 'options.mongoBaseFolder', message: 'The options.mongoBaseFolder parameter must be a string. Received: ' + options.mongoBaseFolder }
        ));
    }
    var fsimpl = new MongoFsImpl(options.mongoUri, options.mongoBaseFolder);
    fsimpl.open(function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        vfile(fsimpl, function(err, dbfile) {
            if (err) {
                return callback(err);
            }
            return callback(null, dbfile);
        })
    })
}
;


md.JsonComponents = require('./lib/json/index');

/**
     Create a json directory tree from a filesystem folder
*/
md.jsonDirectoryTreeFromFilesystem = JsonFsImpl.directoryTree;

md.packiFilesToUtilVFileJson = md.JsonComponents.packiFilesToUtilVFileJson;

/**
     json virtual file service
     params
     { options
     { jsonFsData
*/
md.jsonfile = function jsonfile(options, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', 'jsonfile', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isObject(options) === false) {
        return callback(error(
            'InvalidArgument', 'jsonfile', { parameter: 'options', message: 'The options parameter must be an object. Received: ' + options }
        ));
    }
    if (verify.isNullOrUndefined(options.jsonFsData) === false) {
        if (verify.isObject(options.jsonFsData) === false) {
            return callback(error(
                'InvalidArgument', 'jsonfile', { parameter: 'options.jsonFsData', message: 'The options.jsonFsData parameter must be an object. Received: ' + options.jsonFsData }
            ));
        }
    }
    if (verify.isNullOrUndefined(options.jsonFs) === false) {
        if (verify.isObject(options.jsonFs) === false) {
            return callback(error(
                'InvalidArgument', 'jsonfile', { parameter: 'options.jsonFs', message: 'The options.jsonFs parameter must be an object. Received: ' + options.jsonFs }
            ));
        }
    }
    if (options.jsonFs) {
        var fsimpl = new JsonFsImpl({});
        fsimpl.open({
            jsonFs: options.jsonFs
         }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            vfile(fsimpl, function(err, _jsonfile) {
                if (err) {
                    return callback(err);
                }
                return callback(null, _jsonfile);
            })
        })
    }
    else {
        var fsimpl = new JsonFsImpl(options.jsonFsData);
        fsimpl.open(function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            vfile(fsimpl, function(err, _jsonfile) {
                if (err) {
                    return callback(err);
                }
                return callback(null, _jsonfile);
            })
        })
    }
}
;

/**
     params
     { options
     string storeKind
     oneOf filesystem, mongodb, json
     string storeUri
     when storeKind == mongodb
     string storeBaseFolder
     when storeKind == mongodb
*/
md.createStoreFactory = function createStoreFactory(options, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', 'createStoreFactory', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isObject(options) === false) {
        return callback(error(
            'InvalidArgument', 'createStoreFactory', { parameter: 'options', message: 'The options parameter must be an object. Received: ' + options }
        ));
    }
    if (verify.isNullOrUndefined(options.storeKind) === false) {
        if (verify.isNotEmpty(options.storeKind) === false) {
            return callback(error(
                'InvalidArgument', 'createStoreFactory', { parameter: 'options.storeKind', message: 'The options.storeKind parameter must be a string. Received: ' + options.storeKind }
            ));
        }
    }
    
    // loog 'wizzi-repo.index.createStoreFactory.options', options
    
    var storeKind = options.storeKind || 'filesystem';
    if (checkStoreKind(storeKind) == false) {
        return callback(error('InvalidArgument', 'createStoreFactory', {
                parameter: 'storeKind', 
                message: 'invalid storeKind: ' + storeKind + '. Received: ' + storeKind
             }));
    }
    
    if (storeKind == 'mongodb') {
        if (verify.isNotEmpty(options.storeUri) === false) {
            return callback(error('InvalidArgument', 'createStoreFactory', 'The parameter `options.storeUri` is required and must be a string. Received: ' + options.storeUri));
        }
        if (verify.isNotEmpty(options.storeBaseFolder) === false) {
            return callback(error('InvalidArgument', 'createStoreFactory', 'The parameter `options.storeBaseFolder` is required and must be a string. Received: ' + options.storeUri));
        }
    }
    else if (storeKind == 'json') {
        if (verify.isObject(options.storeJsonFsData) === false && verify.isObject(options.storeJsonFs) === false) {
            return callback(error('InvalidArgument', 'createStoreFactory', 'The parameter `options.storeJsonFsData` or `options.storeJsonFs`is required and must be an object.'));
        }
    }
    return callback(null, getCreateStore(storeKind, options));
}
;
function getCreateStore(storeKind, options) {
    if (verify.isNotEmpty(storeKind) === false) {
        return error(
            'InvalidArgument', 'getCreateStore', { parameter: 'storeKind', message: 'The storeKind parameter must be a string. Received: ' + storeKind }
        );
    }
    if (verify.isObject(options) === false) {
        return error(
            'InvalidArgument', 'getCreateStore', { parameter: 'options', message: 'The options parameter must be an object. Received: ' + options }
        );
    }
    return function createStore(callback) {
            var store = new IttfDocumentStore();
            store.init({
                storeKind: storeKind, 
                storeUri: options.storeUri, 
                storeBaseFolder: options.storeBaseFolder, 
                storeJsonFsData: options.storeJsonFsData, 
                storeJsonFs: options.storeJsonFs
             }, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                return callback(null, store);
            })
        };
}
function checkStoreKind(kind) {
    return ['filesystem', 'mongodb', 'json'].indexOf(kind) > -1;
}
// TODO fileService.getFilesAsync
md.folderFilesInfoByPath = function(folderPath, fileService, options, callback) {
    options = options || { deep: true };
    fileService.getFilesAsync(folderPath, options, function(err, files) {
        if (err) {
            return callback(err);
        }
        var result = [];
        var i, i_items=files, i_len=files.length, f;
        for (i=0; i<i_len; i++) {
            f = files[i];
            result.push(fileInfoByPath(f.fullPath, folderPath))
        }
        return callback(null, result);
    })
}
;
md.ittfDocumentInfoByPath = function(filePath) {
    var result = fileInfoByPath(filePath);
    if (result.isIttfDocument) {
        return result;
    }
    else {
        return {
                is_error: true, 
                message: 'The file is not an ittfdocument: ' + result.fullPath
             };
    }
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
        method: 'wizzi-repo.index.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}