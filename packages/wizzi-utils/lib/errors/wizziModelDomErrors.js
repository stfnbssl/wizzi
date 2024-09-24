/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\errors\wizziModelDomErrors.js.ittf
    utc time: Fri, 16 Aug 2024 08:42:14 GMT
*/
'use strict';
var util = require('util');

var md = module.exports = {};

function WizziModelDOMNodeError(message, node) {
    this.name = 'WizziModelDOMNodeError';
    var msg = [
        message
    ];
    if (node) {
        this.ittfDocumentUri = 'Unavailable';
        if (node.wzSourceLineInfo) {
            var info = node.wzSourceLineInfo;
            if (node.wzSourceFilepath) {
                this.ittfDocumentUri = node.wzSourceFilepath(info.sourceKey);
            }
            this.row = info.row;
            this.col = info.col;
            this.sourceKey = info.sourceKey;
            msg.push((' at row: ' + info.row));
            msg.push((', col: ' + info.col));
            msg.push((', source: ' + info.sourceKey));
            msg.push((', in file: ' + this.ittfDocumentUri));
        }
        else if (node.row) {
            this.row = node.row;
            this.col = node.col;
            msg.push((' at row: ' + node.row));
            msg.push((', col: ' + node.col));
        }
    }
    this.message = msg.join('');
}
WizziModelDOMNodeError.prototype.toString = function() {
    return this.message;
}
;
WizziModelDOMNodeError.prototype = Object.create(Error.prototype);
WizziModelDOMNodeError.prototype.constructor = WizziModelDOMNodeError;
md.WizziModelDOMNodeError = WizziModelDOMNodeError;
