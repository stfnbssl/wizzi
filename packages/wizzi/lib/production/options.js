/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.lastsafe.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\lib\production\options.js.ittf
    utc time: Fri, 09 Aug 2024 15:27:07 GMT
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