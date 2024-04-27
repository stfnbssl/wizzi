/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\lib\meta\utils.js.ittf
    utc time: Fri, 26 Apr 2024 13:06:48 GMT
*/
'use strict';
var verify = require('../helpers/verify');

var md = module.exports = {};

md.wizzifyIttfNodeName = function(name) {
    return verify.replaceAll(name, "(", "$" + "{'('}");
}
;
