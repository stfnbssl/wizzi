/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\mocks\repo\uriparser.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
var url = require('url');
module.exports = function(uri, callback) {
    uri = uri.toLowerCase();
    var ret = {};
    var parsedUri = url.parse(uri);
    if (typeof(parsedUri.protocol) !== 'string') {
        var error = new errors.InvalidRequestError("ittf.uriparser. uri must have a protocol (must be an absolute url) : " + uri, "UriError");
        return callback(error);
    }
    var protocol = parsedUri.protocol.substr(-1, 1) === ':' ? parsedUri.protocol.substr(0, (parsedUri.protocol.length - 1)) : parsedUri.protocol;
    ;
    // loog 'parseuri.parsedUri', parsedUri
    var name, parts = parsedUri.pathname ? parsedUri.pathname.split('/') : [];
    if (parsedUri.pathname && parsedUri.pathname.length > 0 && parsedUri.pathname[0] == '/') {
        parts.shift();
    }
    if (protocol.length === 1) {
        if (parts.length < 3) {
            var error = new errors.InvalidRequestError('Invalid uri for an IttfDocument. Too short: ' + uri, 'UriError');
            return callback(error);
        }
        ret.storeKind = 'filesystem';
        ret.userId = parts[0];
        ret.projectId = parts[1];
        ret.uri = uri;
        parts.shift();
        parts.shift();
        ret.path = parts.join('/');
        name = parts[parts.length-1];
    }
    
    // loog 'parsedUri.parts', parts
    
    // loog 'parsedUri', parsedUri
    else if (protocol === 'repo') {
        if (parts.length < 2) {
            var error = new errors.InvalidRequestError('Invalid uri for an IttfDocument. Too short: ' + uri, 'UriError');
            return callback(error);
        }
        ret.storeKind = 'repo';
        ret.userId = parsedUri.host;
        ret.projectId = parts[0];
        ret.uri = uri;
        parts.shift();
        ret.path = parts.join('/');
        name = parts[parts.length-1];
    }
    else {
        var error = new errors.InvalidRequestError('Invalid uri protocol for an IttfDocument. Must be a drive letter or "repo": uri=' + uri, 'UriError');
        return callback(error);
    }
    var nameparts = name.split('.');
    if (nameparts.length > 2 && nameparts[nameparts.length -1] === 'ittf') {
        ret.isIttfDocument = true;
        ret.schema = nameparts[nameparts.length -2];
    }
    else {
        ret.isIttfDocument = false;
    }
    return callback(null, ret);
}
;