/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\.wizzi\utils\config.js.ittf
    utc time: Tue, 20 Jul 2021 11:08:44 GMT
*/
'use strict';
const path = require('path');
const util = require('util');
const fs = require('fs');
module.exports = {
    getPath: (name) => {
    
        let configFilename = name ? 'wizzi.config.' + name + '.js' : 'wizzi.config.js';
        let currentDir = process.cwd();
        let currentPath = null;
        let configPath = null;
        console.log('searching ', configFilename);
        while (configPath == null && currentDir.length > 3) {
            currentPath = path.join(currentDir, configFilename);
            try {
                console.log('wizzi-cli.generate.searching', currentPath);
                const stat = fs.lstatSync(currentPath);
                if (stat.isFile()) {
                    configPath = currentPath;
                }
            } 
            catch (ex) {
            } 
            currentDir = path.dirname(currentDir);
        }
        return configPath;
    }
    
 };
