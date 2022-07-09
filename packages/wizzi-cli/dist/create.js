/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\.wizzi\root\create.js.ittf
    utc time: Tue, 05 Jul 2022 06:52:47 GMT
*/
'use strict';
const minimist = require('minimist');
const create = require('./cmds/create');
const args = minimist(process.argv.slice(2));
let cmd = args._[0];
console.log('args', args, 'cmd', cmd);
if (cmd == 'ts-ui') {
    create({
        template: 'ts/react', 
        pkgName: '../../wizzi.webapp/packages/wizzi.ui'
     })
}
else if (cmd == 'ts-account') {
    create({
        template: 'ts/account_site', 
        pkgName: '../../wizzi.webapp/packages/wizzi.account'
     })
}
else if (cmd == 'ts-site') {
    create({
        template: 'ts/express_site', 
        pkgName: '../../wizzi.webapp/packages/wizzi.site'
     })
}
else if (cmd == 'ts-webapp') {
    console.log('create ts-webapp');
    create({
        template: 'ts/express_webapp', 
        pkgName: '../../wizzi.apps/packages/wizzi.webapp'
     })
}
else if (cmd == 'ts-editor') {
    create({
        template: 'ts/webpack_editor', 
        pkgName: '../../wizzi.webapp/packages/wizzi.editor'
     })
}
else if (cmd == 'ts-pageforms') {
    create({
        template: 'ts/webpack_pageforms', 
        pkgName: '../../wizzi.webapp/packages/wizzi.pageforms'
     })
}
else if (cmd == 'js-express') {
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
else {
    create();
}
