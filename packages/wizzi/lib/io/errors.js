/*
    artifact generator: C:\Users\stfnb\AppData\Roaming\npm\node_modules\@wizzi\cli\node_modules\@wizzi\plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\io\errors.js.ittf
    utc time: Tue, 21 Jan 2025 14:15:35 GMT
*/
var util = require('util');

var md = module.exports = {};
var pkgVersioned = ' (@wizzi/factory.0.8.46)';

function NotImplementedError(message) {
    this.name = 'NotImplementedError';
    console.log("[31m%s[0m", 'message', message);
    this.message = message;
    // 5/10/17 set this.stack = (new Error()).stack
}
NotImplementedError.prototype.toString = function() {
    var msg = [this.message];
    if (this.inner) {
        msg.push('Inner error:')
        msg.push(this.inner.toString())
    }
    return msg.join('\n');
}
;
NotImplementedError.prototype = Object.create(Error.prototype);
NotImplementedError.prototype.constructor = NotImplementedError;
md.NotImplementedError = NotImplementedError;


function InvalidRequestError(message, code) {
    this.name = 'InvalidRequestError';
    console.log("[31m%s[0m", 'message', message);
    this.message = message;
    this.code = code;
    // 5/10/17 set this.stack = (new Error()).stack
}
InvalidRequestError.prototype.toString = function() {
    var msg = [this.message];
    if (this.inner) {
        msg.push('Inner error:')
        msg.push(this.inner.toString())
    }
    return msg.join('\n');
}
;
InvalidRequestError.prototype = Object.create(Error.prototype);
InvalidRequestError.prototype.constructor = InvalidRequestError;
md.InvalidRequestError = InvalidRequestError;

function FsItemNotFoundError(resourceType, uri) {
    this.name = 'FsItemNotFoundError';
    this.message = resourceType + ': ' + uri + ' not found ';
    // 5/10/17 set this.stack = (new Error()).stack
}
FsItemNotFoundError.prototype.toString = function() {
    var msg = [this.message];
    if (this.inner) {
        msg.push('Inner error:')
        msg.push(this.inner.toString())
    }
    return msg.join('\n');
}
;
FsItemNotFoundError.prototype = Object.create(Error.prototype);
FsItemNotFoundError.prototype.constructor = FsItemNotFoundError;
md.FsItemNotFoundError = FsItemNotFoundError;
