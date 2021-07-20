/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:/My/wizzi/stfnbssl/wizzi/packages/wizzi-cli/dist/resources/create/templates/js/webpack_react/wizzi.config.js.ittf
    utc time: Tue, 20 Jul 2021 12:30:15 GMT
*/
'use strict';
const path = require('path');
module.exports = {
    wfjobName: "demo.js.react/job", 
    wfjobPath: path.join(__dirname, '.wizzi', 'generate.wfjob.ittf'), 
    destPath: path.join(__dirname, 'dist'), 
    plugins: [
        'wizzi-core', 
        'wizzi-js', 
        'wizzi-web'
    ], 
    schemas: [
        
    ], 
    globalContext: {
        wzConfigIsDevelopment: true
    }
};
