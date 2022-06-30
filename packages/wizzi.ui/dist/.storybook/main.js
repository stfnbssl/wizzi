/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.ui\.wizzi\storybook\main.js.ittf
    utc time: Fri, 24 Jun 2022 16:36:06 GMT
*/
'use strict';
module.exports = {
    "stories": [
        "./**/*.stories.mdx", 
        "./**/*.stories.@(js|jsx|ts|tsx)"
    ], 
    "addons": [
        "@storybook/addon-links", 
        "@storybook/addon-essentials"
    ], 
    typescript: {
        check: false, 
        checkOptions: {
            
         }, 
        reactDocgen: 'react-docgen-typescript', 
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: true, 
            propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true)
         }
     }
 };
