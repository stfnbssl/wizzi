/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:/My/wizzi/stfnbssl/wizzi/packages/wizzi/dist/examples/light/templates/js-lib/wizzi.config.js.ittf
    utc time: Fri, 12 Feb 2021 05:47:13 GMT
*/
'use strict';
const path = require('path');
module.exports = {
    wfjobName: "myfirstwizzi/job", 
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
        isDevelopment: true
    }
};
