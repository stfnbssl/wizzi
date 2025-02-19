/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\.wizzi\src\cmds\metify.js.ittf
    utc time: Tue, 21 Jan 2025 14:27:09 GMT
*/
const path = require('path');
const wizziUtils = require('@wizzi/utils');
const commons = require('./commons');
const vfile = wizziUtils.vfile;
const verify = wizziUtils.verify;
const meta = wizziUtils.meta;
var file = vfile();

const kCommandName = "metify";

module.exports = (args) => {
    let sourceFolder = args.s || args.source;
    let destFolder = args.d || args.dest || args.o || args.output;
    let compressFolders = args.c || args.compress;
    let metaProductionName = args.n || args.name;
    
    const checker = new commons.commandChecker(kCommandName);
    
    checker.checkFolder(sourceFolder, 'sourceFolder')
    checker.checkFolder(destFolder, 'destFolder', {
        parentFolderMustExist: true
     })
    compressFolders = checkCompressFolders(checker, compressFolders)
    ;
    
    if (checker.isValid()) {
        metaProductionName = metaProductionName || path.basename(sourceFolder);
        checker.usingOption('metaProductionName: ' + metaProductionName)
    }
    if (!checker.checkOut()) {
        return ;
    }
    meta.metify(checker.sourceFolder, checker.sourceFolder, metaProductionName, {
        destFolder: checker.destFolder, 
        compressFolders: compressFolders
     }, (err, result) => {
        if (err) {
            console.log("[31m%s[0m", err);
        }
        else {
            console.log("[32m%s[0m", '');
            console.log("[32m%s[0m", '');
            console.log("[32m%s[0m", 'Metafication done, see', checker.destFolder, 'folder');
            console.log("[32m%s[0m", '');
            console.log("[32m%s[0m", '');
        }
    }
    )
}
;
function checkCompressFolders(checker, compressFolders) {
    if (verify.isEmpty(compressFolders)) {
        return [];
    }
    let retval;
    try {
        retval = compressFolders.split(';');
    } 
    catch (err) {
        return checker.optionError('Transforming the compress option into an array has given an error: ' + err.message);
    } 
    checker.usingOption('compress folders: ' + retval.join(','))
    return retval;
}