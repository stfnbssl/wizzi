/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\.wizzi\root\create.js.ittf
    utc time: Tue, 20 Jul 2021 11:08:47 GMT
*/
'use strict';
const minimist = require('minimist');
const create = require('./cmds/create');
const args = minimist(process.argv.slice(2));
let cmd = args._[0];
console.log('args', args, 'cmd', cmd);
if (cmd == 'ui') {
    create({
        template: 'ts/react', 
        pkgName: 'wizzi.ui'
     })
}
else if (cmd == 'account') {
    create({
        template: 'ts/account_site', 
        pkgName: 'wizzi.account'
     })
}
else if (cmd == 'site') {
    create({
        template: 'ts/express_site', 
        pkgName: 'wizzi.site'
     })
}
else if (cmd == 'backend') {
    create({
        template: 'ts/express_backend', 
        pkgName: 'wizzi.backend'
     })
}
else if (cmd == 'editor') {
    create({
        template: 'ts/webpack_editor', 
        pkgName: 'wizzi.editor'
     })
}
else if (cmd == 'pageforms') {
    create({
        template: 'ts/webpack_pageforms', 
        pkgName: 'wizzi.pageforms'
     })
}
else if (cmd == 'js-react') {
    create({
        template: 'js/webpack_react', 
        pkgName: 'demo.js.react'
     })
}
else {
    create();
}
