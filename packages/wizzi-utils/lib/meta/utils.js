/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\meta\utils.js.ittf
    utc time: Wed, 15 May 2024 03:17:23 GMT
*/
'use strict';
var verify = require('../helpers/verify');

var md = module.exports = {};

md.wizzifyIttfNodeName = function(name) {
    return verify.replaceAll(name, "(", "$" + "{'('}");
}
;
