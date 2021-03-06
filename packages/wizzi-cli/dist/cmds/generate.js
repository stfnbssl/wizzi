/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\.wizzi\cmds\generate.js.ittf
    utc time: Tue, 20 Jul 2021 11:08:44 GMT
*/
'use strict';
const path = require('path');
const util = require('util');
const fs = require('fs');
const async = require('async');
const chalk = require('chalk');
const wizzi = require('wizzi');
const config = require('../utils/config');
function generateSchemas(schemasToGen, wfJobFolder, destPath, packageName, plugins) {
    async.mapSeries(schemasToGen, function(schemaName, callback) {
        console.log('wizzi-cli.generate.Generating schema ' + schemaName);
        var options = {};
        if (plugins) {
            options = {
                plugins: plugins.items, 
                pluginsBaseFolder: plugins.baseFolder
             };
        }
        wizzi.generateWizziModelTypes({
            configOptions: options, 
            wfschema: {
                name: schemaName, 
                ittfDocumentUri: path.join(wfJobFolder, 'ittf', 'lib', 'wizzi', 'schemas', schemaName + '.wfschema.ittf'), 
                outputPackageFolder: destPath
             }
         }, function(err, result) {
            if (err) {
                throw new Error('Package: ' + packageName + ' schema ' + schemaName + '  wizzi models production error: ' + (util.inspect(err, {
                        depth: null
                     })));
            }
            console.log('wizzi-cli.generate.Generate schema result', result);
            callback(null, result);
        })
    }, function(err, result) {
        if (err) {
            wizzi.printWizziJobError($name, err);
        }
    })
}
module.exports = (name) => {

    let configPath = config.getPath(name);
    if (!configPath) {
        console.error(`config file "wizzi.config.' + (name ? name + '.' : '') + 'js" not found`);
        return ;
    }
    const configInstance = require(configPath);
    console.log('wizzi-cli.generate.configInstance', configInstance);
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
        x_pluginsItems.push('wizzi-core');
        x_pluginsItems.push('wizzi-js');
        x_pluginsItems.push('wizzi-web');
        chalk.red('wizzi-cli.generate - plugins not found in wizzi.config')
        chalk.red('wizzi-cli.generate - using default plugins: "wizzi-core", "wizzi-js", "wizzi-web"')
    }
    wizzi.executeWizziJob({
        user: 'stefi', 
        role: 'admin', 
        storeKind: 'filesystem', 
        config: {
            wfBaseFolder: __dirname, 
            plugins: x_pluginsItems, 
            pluginsBaseFolder: x_pluginsBaseFolder
         }, 
        job: {
            name: configInstance.wfjobName, 
            ittfDocumentUri: configInstance.wfjobPath, 
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
            return wizzi.printWizziJobError(configInstance.wfjobName, err);
        }
        if (configInstance.schemas && configInstance.schemas.length > 0) {
            generateSchemas(configInstance.schemas, path.dirname(configInstance.wfjobPath), configInstance.destPath, configInstance.packageName || configInstance.wfjobName, {
                items: x_pluginsItems, 
                baseFolder: x_pluginsBaseFolder
             })
        }
    })
}
;
