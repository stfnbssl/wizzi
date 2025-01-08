/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-helpers\.wizzi\examples\verify.js.ittf
    utc time: Fri, 12 Apr 2024 05:45:14 GMT
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
