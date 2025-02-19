/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\.wizzi\src\cmds\job.js.ittf
    utc time: Tue, 21 Jan 2025 14:27:09 GMT
*/
const path = require('path');
const wizzi = require('@wizzi/factory');
const config = require('../utils/config');
const commons = require('./commons');

const kCommandName = "job";

module.exports = (args) => {
    
    const checker = new commons.commandChecker(kCommandName);
    
    const currentDir = process.cwd();
    
    checker.checkNotEmpty(args.c || args.config, 'configRelPath')
    if (checker.isValid()) {
        checker.checkFile(path.join(currentDir, checker.configRelPath + '.config.js'), 'configPath')
    }
    let configInstance;
    if (checker.isValid()) {
        configInstance = require(checker.configPath);
    }
    else {
        return checker.checkOut();
    }
    checker.checkNotEmpty(configInstance.wzjobName, 'wzjobName')
    checker.checkFile(configInstance.wzjobPath, 'wzjobPath')
    checker.checkNotEmpty(configInstance.pluginsBaseFolder, 'pluginsBaseFolder', {
        message: "in config file " + checker.configPath
     })
    checker.checkArrayNotEmpty(configInstance.plugins, 'pluginsItems', {
        message: "in config file " + checker.configPath
     })
    
    if (!checker.checkOut()) {
        return ;
    }
    
    wizzi.executeWizziJob({
        storeKind: 'filesystem', 
        config: {
            wfBaseFolder: __dirname, 
            plugins: checker.pluginsItems, 
            pluginsBaseFolder: checker.pluginsBaseFolder
         }, 
        job: {
            name: checker.wzjobName, 
            ittfDocumentUri: checker.wzjobPath, 
            productionOptions: wizzi.productionOptions({
                indentSpaces: 4, 
                basedir: __dirname, 
                verbose: 2, 
                dumps: {
                    dumpsBaseFolder: path.join(__dirname, '_dumps'), 
                    mTreeBuildupJsWizziScript: {
                        dump: false
                     }
                 }
             }), 
            globalContext: configInstance.globalContext || {}
         }
     }, function(err) {
        if (err) {
            console.log("[31m%s[0m", "");
            console.log("[31m%s[0m", "");
            wizzi.printWizziJobError(configInstance.wzjobName, err);
            console.log("[31m%s[0m", "");
            console.log("[31m%s[0m", "");
        }
        else {
            console.log("[32m%s[0m", "");
            console.log("[32m%s[0m", "");
            console.log("[32m%s[0m", 'Job execution done');
            console.log("[32m%s[0m", "");
            console.log("[32m%s[0m", "");
        }
    })
}
;