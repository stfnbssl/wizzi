/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: json:/___template/wizzi.config.override.js.ittf
    utc time: Wed, 26 Apr 2023 20:34:33 GMT
*/
'use strict';
const path = require('path');
module.exports = {
    wzjobName: "wizzi.plugin.ts.express.app-override/job", 
    wzjobPath: path.join(__dirname, '.wizzi-override', 'generate.wzjob.ittf'), 
    destPath: __dirname, 
    plugins: [
        './wizzi-core/index.js', 
        './wizzi-js/index.js', 
        './wizzi-web/index.js'
    ], 
    pluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi/packages", 
    schemas: [
        
    ], 
    globalContext: {
        wzConfigIsDevelopment: true, 
        wzConfigIsPackageDeploy: false
     }
 };
