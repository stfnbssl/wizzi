/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\production\options.js.ittf
    utc time: Thu, 09 May 2024 12:34:31 GMT
*/
'use strict';
var _ = require('lodash');
var verify = require('@wizzi/utils').verify;
module.exports = function(userdefaults, genoptions) {
    return _.merge({
            isDebug: false, 
            CRLF: '\n', 
            indentSpaces: 4, 
            dotgExtensionPrefix: false, 
            dumps: {}
         }, userdefaults || {}, genoptions || {});
}
;
