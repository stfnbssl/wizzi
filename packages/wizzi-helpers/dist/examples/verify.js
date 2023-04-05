/*
    artifact generator: C:\My\wizzi\wizzi-mono\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\My\wizzi\wizzi-mono\packages\wizzi-helpers\.wizzi\ittf\examples\verify.js.ittf
*/
'use strict';

var util = require('util');
var path = require('path');
var stringify = require('json-stringify-safe');
var verify = require('../../lib/verify');


var nv = verify.parseNameValue("['@id'] this.id", null, {
    objectProperty: true
});
console.log('verify.parseNameValue', nv);
nv = verify.parseNameValue("['@id'] this.id");
console.log('verify.parseNameValue', nv);
