/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\.wizzi\cmds\help.js.ittf
    utc time: Tue, 05 Jul 2022 06:52:47 GMT
*/
'use strict';
const menus = {
    main: [
        "", 
        "", 
        "wizzi [noarguments] | configname | [command] <options>", 
        "", 
        "noarguments ......... execute generation using wizzi.config.js", 
        "configname .......... execute generation using wizzi.config.<configname>.js", 
        "create .............. setup wizzi for the current project", 
        "fy .................. wizzify a file or folder", 
        "version ............. show package version", 
        "help ................ show help menu for a command"
    ].join('\n'), 
    create: [
        "", 
        "", 
        "wizzi create <options>", 
        "", 
        "--kind | -k <kindname> ... the project kind <kindname>", 
        "", 
        "valid kindnames:", 
        "  webpack", 
        "  express", 
        "  plugin"
    ].join('\n'), 
    fy: [
        "", 
        "", 
        "wizzi fy <options>", 
        "", 
        "[--source | -s] <file | folder> .... the source file or folder", 
        "[--dest | -d] <file | folder> ...... the destination file or folder"
    ].join('\n')
 };
module.exports = (args) => {

    const subCmd = args._[0] === 'help' ? args._[1] : args._[0];
    console.log(menus[subCmd] || menus.main);
}
;
