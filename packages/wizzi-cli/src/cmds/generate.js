/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.cli\.wizzi\src\cmds\generate.js.ittf
    utc time: Wed, 08 Jan 2025 05:17:28 GMT
*/
const path = require('path');
const util = require('util');
const fs = require('fs');
const async = require('async');
const chalk = require('chalk');
const wizzi = require('@wizzi/factory');
const config = require('../utils/config');
const filemod = require('../utils/filemod');
const commons = require('./commons');

const kCommandName = "main";

module.exports = (name, args) => {
    
    const legacyVersion = args && (args.l || args.legacy) || null;
    console.log("Wizzi.CLI. Generate. name: ", name || 'DEFAULT', __filename);
    console.log("Wizzi.CLI. Generate. legacyVersion: ", legacyVersion || 'NONE', __filename);
    
    const checker = new commons.commandChecker(kCommandName);
    
    const currentDir = process.cwd();
    
    let configPath = config.getPath(name);
    if (!configPath) {
        configPath = config.getPathCjs(cmd);
        if (!configPath) {
            console.log("[31m%s[0m", `config file "wizzi.config.' + (name ? name + '.' : '') + 'js" not found`);
            return ;
        }
    }
    const configInstance = require(configPath);
    // loog 'wizzi-cli.generate.configInstance', configInstance
    const x_pluginsBaseFolder = configInstance.pluginsBaseFolder || __dirname;
    if (!configInstance.pluginsBaseFolder) {
        console.log(chalk.red('wizzi-cli.generate - pluginsBaseFolder not set'))
        console.log(chalk.red('wizzi-cli.generate - pluginsBaseFolder defaulted to ' + x_pluginsBaseFolder))
    }
    var x_pluginsItems = [];
    if (configInstance.plugins && configInstance.plugins.length > 0) {
        x_pluginsItems = configInstance.plugins;
    }
    else {
        chalk.red('wizzi.cli.generate - plugins not found in wizzi.config')
        chalk.red('generation failed')
        return ;
    }
    filemod.deleteTypeModuleFromPackageJson(path.join(path.dirname(configPath), "package.json"))
    wizzi.executeWizziJob({
        storeKind: 'filesystem', 
        config: {
            wfBaseFolder: __dirname, 
            plugins: x_pluginsItems, 
            pluginsBaseFolder: x_pluginsBaseFolder
         }, 
        job: {
            name: configInstance.wzjobName, 
            ittfDocumentUri: configInstance.wzjobPath, 
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
            globalContext: configInstance.globalContext
         }
     }, function(err) {
        if (err) {
            return wizzi.printWizziJobError(configInstance.wzjobName, err);
        }
        if (configInstance.schemas && configInstance.schemas.length > 0) {
            generateSchemas(configInstance.schemas, path.dirname(configInstance.wzjobPath), configInstance.destPath, configInstance.packageName || configInstance.wzjobName, {
                items: x_pluginsItems, 
                baseFolder: x_pluginsBaseFolder
             }, legacyVersion)
        }
    })
}
;
function generateSchemas(schemasToGen, wfJobFolder, destPath, packageName, plugins, legacyVersion) {
    async.mapSeries(schemasToGen, function(schemaName, callback) {
        // loog 'wizzi-cli.generate.Generating schema ' + schemaName
        var options = {};
        if (plugins) {
            options = {
                plugins: plugins.items, 
                pluginsBaseFolder: plugins.baseFolder
             };
        }
        wizzi.generateWizziModelDom({
            configOptions: options, 
            wfschema: {
                name: schemaName, 
                ittfDocumentUri: path.join(wfJobFolder, 'lib', 'wizzi', 'schemas', schemaName + '.wzschema.ittf'), 
                outputPackageFolder: destPath
             }, 
            legacyVersion: legacyVersion
         }, function(err, result) {
            if (err) {
                throw new Error('Package: ' + packageName + ' schema ' + schemaName + '  wizzi models production error: ' + (util.inspect(err, {
                        depth: null
                     })));
            }
            // loog 'wizzi-cli.generate.Generate schema result', result
            callback(null, result);
        })
    }, function(err, result) {
        if (err) {
            wizzi.printWizziJobError($name, err);
        }
    })
}