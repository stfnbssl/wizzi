/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\kernel\wizzi-repo\src\ittf\lib\repo\uriparser.js.ittf
    utc time: Tue, 10 Oct 2017 15:38:08 GMT
*/
'use strict';
var verify = require('../util/verify');
/**
     params
     string uri
     returns
     {
     string originalUri
     string protocol
     one-of 'db', 'ls', drive letter
     string storeKind
     one-of 'mongodb', 'localstorage', 'filesystem'
     string userId
     # if storeKind === 'mongodb'
     string projectId
     # if storeKind === 'mongodb'
     string path
     boolean isIttfDocument
     string basename
     string schema
     # if isIttfDocument === true
     string extension
     # if isIttfDocument === false
    
*/
var url = require('url');
module.exports = function parse(uri, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', 'parse', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isNotEmpty(uri) === false) {
        return callback(error(
            'InvalidArgument', 'parse', { parameter: 'uri', message: 'The uri parameter must be a string. Received: ' + uri }
        ));
    }
    uri = uri.toLowerCase();
    var ret = {
        originalUri: uri
    };
    var parsedUri = url.parse(uri);
    if (typeof(parsedUri.protocol) !== 'string') {
        return callback(error('InvalidArgument', 'parse', 'Uri must have a protocol (must be an absolute url). Received: ' + uri)
            )
        ;
    }
    var protocol = parsedUri.protocol.substr(-1, 1) === ':' ? parsedUri.protocol.substr(0, (parsedUri.protocol.length - 1)) : parsedUri.protocol;
    ;
    // log 'parseuri.parsedUri', parsedUri
    ret.protocol = protocol;
    if (protocol === 'db') {
        ret.storeKind = 'mongodb';
    }
    else if (protocol === 'ls') {
        ret.storeKind = 'localstorage';
    }
    else {
        if (protocol.length === 1) {
            ret.storeKind = 'filesystem';
        }
        else {
            return callback(error('InvalidArgument', 'parse', 'Uri protocol must be `db` or `ls` or a filesystem drive letter. Received: ' + protocol)
                )
            ;
        }
    }
    
    var name, parts = parsedUri.pathname ? parsedUri.pathname.split('/') : [];
    if (parsedUri.pathname && parsedUri.pathname.length > 0 && parsedUri.pathname[0] == '/') {
        parts.shift();
    }
    name = parts[parts.length-1];
    ret.basename = name;
    var nameparts = name.split('.');
    if (nameparts.length > 2 && nameparts[nameparts.length -1] === 'ittf') {
        ret.isIttfDocument = true;
        ret.schema = nameparts[nameparts.length -2];
    }
    else {
        ret.isIttfDocument = false;
        ret.extension = nameparts[nameparts.length -1];
    }
    if (ret.storeKind === 'mongodb') {
        if (parts.length < 1) {
            return callback(error('InvalidArgument', 'parse', {
                    parameter: 'uri', 
                    message: 'A mongodb uri must be in the form `db://userName/projectName/documentPath`. Received: ' + uri
                })
                )
            ;
        }
        // log 'wizzi-repo.fs.uriparser.parsedUri.parts', parts
        // log 'wizzi-repo.fs.uriparser.parsedUri', parsedUri
        ret.userId = parsedUri.host;
        ret.projectId = parts[0];
        parts.shift();
        ret.path = parts.join('/');
    }
    else {
        ret.path = parts.join('/');
    }
    // log 'parseuri.ret', ret
    return callback(null, ret)
    ;
};
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
        method: 'wizzi-repo.uriParser.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
