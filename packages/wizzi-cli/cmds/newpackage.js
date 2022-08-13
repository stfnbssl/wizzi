/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\.wizzi\cmds\newpackage.js.ittf
    utc time: Fri, 12 Aug 2022 16:51:08 GMT
*/
'use strict';
// This example shows specifying the arguments for the program to pass to the action handler.
// const { Command } = require('commander'); // (normal include)
const {
    Command
 } = require('commander');
// include commander in git clone of commander repo
const program = new Command();
program.version('0.1.0').arguments('<username> [password]').description('test command', {
    username: 'user to login', 
    password: 'password for user, if required'
 }).action((username, password) => {

    console.log('username:', username);
    console.log('environment:', password || 'no password given');
}
)
program.parse();
// Try the following:
// node arguments.js --help
// node arguments.js user
// node arguments.js user secret
