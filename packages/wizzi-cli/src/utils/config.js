/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\.wizzi\src\utils\config.js.ittf
    utc time: Tue, 21 Jan 2025 14:27:09 GMT
*/
const path = require('path');
const util = require('util');
const fs = require('fs');
module.exports = {
    getPath: (name, kind) => {
        var configFilename;
        if (kind == 'meta') {
            configFilename = name ? 'wizzi.meta.config.' + name + '.js' : 'wizzi.meta.config.js';
        }
        else {
            configFilename = name ? 'wizzi.config.' + name + '.js' : 'wizzi.config.js';
        }
        let currentDir = process.cwd();
        let currentPath = null;
        let configPath = null;
        // loog 'searching ', configFilename
        while (configPath == null && currentDir.length > 3) {
            currentPath = path.join(currentDir, configFilename);
            try {
                console.log('wizzi-cli.generate.searching', currentPath, __filename);
                const stat = fs.lstatSync(currentPath);
                if (stat.isFile()) {
                    configPath = currentPath;
                }
            } 
            catch (ex) {
            } 
            currentDir = path.dirname(currentDir);
        }
        console.log('Found config path', configPath);
        return configPath;
    }
    
 };