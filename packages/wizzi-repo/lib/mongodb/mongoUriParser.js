/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-repo\.wizzi\lib\mongodb\mongoUriParser.js.ittf
*/
'use strict';
var verify = require('wizzi-utils').verify;
var path = require('path');
var url = require('url');
var verify = require('wizzi-utils').verify;
//
module.exports = function parse(uri, mongoBaseFolder) {
    if (verify.isNotEmpty(uri) === false) {
        return error(
            'InvalidArgument', 'parse', { parameter: 'uri', message: 'The uri parameter must be a string. Received: ' + uri }
        );
    }
    if (verify.isNotEmpty(mongoBaseFolder) === false) {
        return error(
            'InvalidArgument', 'parse', { parameter: 'mongoBaseFolder', message: 'The mongoBaseFolder parameter must be a string. Received: ' + mongoBaseFolder }
        );
    }
    uri = uri.toLowerCase();
    var ret = {
        originalUri: uri
     };
    var parsedUri = url.parse(uri);
    if (typeof(parsedUri.protocol) !== 'string') {
        return error('InvalidArgument', 'parse', 'Uri must have a protocol (must be an absolute url). Received: ' + uri);
    }
    var protocol = parsedUri.protocol.substr(-1, 1) === ':' ? parsedUri.protocol.substr(0, (parsedUri.protocol.length - 1)) : parsedUri.protocol;
    ;
    if (protocol !== 'db') {
        return error('InvalidArgument', 'parse', 'Invalid uri protocol. Must be `db`. Received: ' + uri);
    }
    // loog 'parseuri.parsedUri', parsedUri
    var name,
        parts = parsedUri.pathname ? parsedUri.pathname.split('/') : [];
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
    if (parts.length < 1) {
        return error('InvalidArgument', 'parse', {
                parameter: 'uri', 
                message: 'A mongodb uri must be in the form `db://userName/projectName/documentPath`. Received: ' + uri
             });
    }
    // loog 'wizzi-repo.mongodb.uriparser.parsedUri.parts', parts
    // loog 'wizzi-repo.mongodb.uriparser.parsedUri', parsedUri
    ret.storeKind = 'mongodb';
    ret.userId = parsedUri.host;
    ret.projectId = parts[0];
    parts.shift();
    ret.path = parts.join('/');
    if (mongoBaseFolder && mongoBaseFolder.length > 0) {
        ret.internalPath = verify.unixifyPath(path.join(mongoBaseFolder, ret.userId, ret.projectId, ret.path))
        ;
    }
    // loog 'parseuri.ret', ret
    return ret;
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
        method: 'wizzi-repo.mongodb.mongoUriParser.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}