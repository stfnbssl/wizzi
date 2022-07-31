/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\.wizzi\root\create.js.ittf
    utc time: Sun, 31 Jul 2022 09:15:50 GMT
*/
'use strict';
const minimist = require('minimist');
const create = require('./cmds/create');
const args = minimist(process.argv.slice(2));
let cmd = args._[0];
console.log('args', args, 'cmd', cmd);
if (cmd == 'js-express') {
    create({
        template: 'js/express', 
        pkgName: 'demo.js.express'
     })
}
else if (cmd == 'js-gatsby') {
    create({
        template: 'js/gatsby', 
        pkgName: 'demo.js.gatsby'
     })
}
else if (cmd == 'js-pure-nodejs') {
    create({
        template: 'js/pure_nodejs', 
        pkgName: 'demo.js.pure_nodejs'
     })
}
else if (cmd == 'js-react') {
    create({
        template: 'js/webpack_react', 
        pkgName: 'demo.js.webpack_react'
     })
}
else if (cmd == 'js-react_mui') {
    create({
        template: 'js/webpack_react_mui', 
        pkgName: 'demo.js.webpack_react_mui'
     })
}
else if (cmd == 'js-webpack') {
    create({
        template: 'js/webpack', 
        pkgName: 'demo.js.webpack'
     })
}
else if (cmd == 'wizzi-plugin') {
    create({
        template: 'wizzi/plugin', 
        pkgName: 'demo.wizzi.plugin', 
        wizzi_plugin_type: 'data', 
        wizzi_plugin_schema: 'db'
     })
}
else {
    create();
}
