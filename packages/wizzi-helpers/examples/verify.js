/*
    artifact generator: C:\Users\Stefano Bassoli\AppData\Roaming\npm\node_modules\wizzi-cli\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-helpers\.wizzi\examples\verify.js.ittf
*/
'use strict';

var util = require('util');
var path = require('path');
var stringify = require('json-stringify-safe');
var verify = require('../../lib/verify');


var nv = verify.parseNameValue("['@id'] this.id", null, {
    objectProperty: true
 });
console.log('verify.parseNameValue', nv, __filename);
nv = verify.parseNameValue("['@id'] this.id");
;
console.log('verify.parseNameValue', nv, __filename);
