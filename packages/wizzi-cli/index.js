/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\.wizzi\root\index.js.ittf
    utc time: Wed, 17 Aug 2022 15:01:10 GMT
*/
'use strict';
const path = require('path');
const minimist = require('minimist');
const config = require('./utils/config');
const error = require('./utils/error');
function checkConfig(name) {
    var test = path.join(currentDir, 'wizzi.config.' + name + 'js');
}
module.exports = () => {

    const args = minimist(process.argv.slice(2));
    // loog 'args', args
    let cmd = args._[0] || 'generate';
    if (args.version || args.v) {
        cmd = 'version';
    }
    if (args.help || args.h || args['?']) {
        cmd = 'help';
    }
    // loog 'cmd', cmd
    switch (cmd) {
        case 'generate': {
            require('./cmds/generate')();
            break;
        }
        case 'create': {
            require('./cmds/create')(args);
            break;
        }
        case 'fy': {
            require('./cmds/fy')(args);
            break;
        }
        case 'help': {
            require('./cmds/help')(args);
            break;
        }
        default: {
            var configPath = config.getPath(cmd);
            if (configPath) {
                require('./cmds/generate')(cmd);
            }
            else {
                error(`"${cmd}" is not a valid command!`);
                error(`try wizzi help`, true);
            }
            break;
        }
    }
}
;
