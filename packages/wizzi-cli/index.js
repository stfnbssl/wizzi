/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\.wizzi\root\index.js.ittf
    utc time: Tue, 21 Jan 2025 14:27:09 GMT
*/
const path = require('path');
const minimist = require('minimist');
const config = require('./src/utils/config');
const error = require('./src/utils/error');
function checkConfig(name) {
    var test = path.join(currentDir, 'wizzi.config.' + name + 'js');
}
module.exports = () => {
}
;
const args = minimist(process.argv.slice(2));
console.log('args', args, __filename);
let cmd = args._[0] || !args.s && !args.source && 'generate';
if (args.version || args.v) {
    cmd = 'version';
}
if (args.help || args.h || args['?']) {
    cmd = 'help';
}
console.log('cmd', cmd, __filename);
switch (cmd) {
    case 'generate': {
        require('./src/cmds/generate')();
        break;
    }
    case 'fy': {
        console.log('fy.args.git', args.git, __filename);
        if (args.git) {
            var configPath = config.getPath('env');
            const configInstance = configPath && require(configPath);
            console.log('configInstance', configInstance, __filename);
            if (configInstance && configInstance.accessToken) {
                require('./src/cmds/fy')(args, configInstance.accessToken);
            }
            else {
                error(`To wizzify a github repo you need to export an accessToken property from a "wizzi.config.env.js" file.`);
                error(`The "wizzi.config.env.js" file is searched in the current folder and upward in parent folders.`);
            }
        }
        else {
            require('./src/cmds/fy')(args);
        }
        break;
    }
    case 'meta': {
        require('./src/cmds/meta')(args);
        break;
    }
    case 'metify': {
        require('./src/cmds/metify')(args);
        break;
    }
    case 'job': {
        require('./src/cmds/job')(args);
        break;
    }
    case 'help': {
        require('./src/cmds/help')(args);
        break;
    }
    case 'version': {
        require('./src/cmds/version')(args);
        break;
    }
    default: {
        if (args.source || args.s) {
            require('./src/cmds/generatePath')(args);
        }
        else {
            var configPath = config.getPath(cmd);
            if (configPath) {
                require('./src/cmds/generate')(cmd, args);
            }
            else {
                configPath = config.getPathCjs(cmd);
                if (configPath) {
                    require('./src/cmds/generate')(cmd, args);
                }
                else {
                    error(`"${cmd}" is not a valid command!`);
                    error(`try wizzi help`, true);
                }
            }
        }
        break;
    }
}