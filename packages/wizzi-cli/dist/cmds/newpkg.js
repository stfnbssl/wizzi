/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\.wizzi\cmds\newpkg.js.ittf
*/
'use strict';
var inquirer = require('inquirer');
module.exports = (callback) =>
    promptPkgType(function(err, type_answers) {
        if (err) {
            return callback(err);
        }
        if (type_answers.pkg_type == 'wizzi_plugin') {
            promptWizziPlugin(function(err, plugin_answers) {
                if (err) {
                    return callback(err);
                }
                return promptNext(promptPkgName, Object.assign({}, type_answers, plugin_answers), callback);
            })}
        else if (type_answers.pkg_type == 'webpack') {
            promptWebpack(function(err, webpack_answers) {
                if (err) {
                    return callback(err);
                }
                if (webpack_answers.webpack_type == 'react') {
                    type_answers.__template = 'webpack_react'}
                else if (webpack_answers.webpack_type == 'react_materialui') {
                    type_answers.__template = 'webpack_react_mui'}
                else {
                    type_answers.__template = 'webpack'}
                return promptNext(promptPkgName, Object.assign({}, type_answers, webpack_answers), callback);
            })}
        else {
            // _ type_answers.__template = type_answers.pkg_type
            return promptNext(promptPkgName, type_answers, callback);
        }
    });
function promptNext(fPrompt, prevAnswers, callback) {
    fPrompt(function(err, answers) {
        if (err) {
            return callback(err);
        }
        return callback(null, Object.assign({}, prevAnswers, answers));
    })
}
function promptPkgType(callback) {
    var questions = {
        type: 'list', 
        name: 'pkg_type', 
        message: 'What package type do you want create?', 
        choices: [
            'Pure_NodeJs', 
            'Pure_Html_Js_Css_Svg', 
            'Webpack', 
            'Angular', 
            'Gatsby', 
            'Express', 
            'Wizzi_plugin', 
            'Empty', 
            'Go_Back'
        ], 
        filter: function(val) {
            return val.toLowerCase();
        }
    };
    inquirer.prompt(questions).then((answers) => {
        console.log('\nNew package type:');
        console.log(JSON.stringify(answers, null, '  '));
        return callback(null, answers);
    })
}
function promptWizziPlugin(callback) {
    var questions = {
        type: 'list', 
        name: 'wizzi_plugin_type', 
        message: 'What type of wizzi plugin do you want create?', 
        choices: [
            'Flat_Data_Structure', 
            'Tree_Data_Structure', 
            'Syntax_Structure', 
            'Empty', 
            'Go_Back'
        ], 
        filter: function(val) {
            return val.toLowerCase();
        }
    };
    inquirer.prompt(questions).then((answers) => {
        console.log('\nWizzi plugin type:');
        console.log(JSON.stringify(answers, null, '  '));
        return callback(null, answers);
    })
}
function promptWebpack(callback) {
    var questions = {
        type: 'list', 
        name: 'webpack_type', 
        message: 'What kind of webpack package do you want create?', 
        choices: [
            'Pure_Js_Html_Css', 
            'React', 
            'React_MaterialUI', 
            'Go_Back'
        ], 
        filter: function(val) {
            return val.toLowerCase();
        }
    };
    inquirer.prompt(questions).then((answers) => {
        console.log('\nNew webpack package type:');
        console.log(JSON.stringify(answers, null, '  '));
        return callback(null, answers);
    })
}
function promptPkgName(callback) {
    var questions = [
        {
            type: 'input', 
            name: 'pkg_name', 
            message: "Which project name?", 
            validate: function(value) {
                var pass = value.match(/^[a-zA-Z0-9_]/i);
                if (pass) {
                    return true;
                }
                return 'Please enter a valid project name';
            }
        }, 
        {
            type: 'confirm', 
            name: 'pkg_enterinfo', 
            message: 'Whould you like to enter package info? Otherwise defaults are used', 
            default: false
        }
    ];
    inquirer.prompt(questions).then((answers) => {
        console.log('\nNew package name:');
        console.log(JSON.stringify(answers, null, '  '));
        if (answers.pkg_enterinfo) {
            delete answers.pkg_enterinfo
            promptPkgInfo(function(err, info_answers) {
                if (err) {
                    return callback(err);
                }
                return callback(null, Object.assign({}, answers, info_answers));
            })
        }
        else {
            delete answers.pkg_enterinfo
            return callback(null, answers);
        }
    })
}
function promptPkgInfo(callback) {
    var questions = [
        {
            type: 'input', 
            name: 'author', 
            message: "Who is the author?"
        }, 
        {
            type: 'input', 
            name: 'author_email', 
            message: "The author has an e-mail?"
        }, 
        {
            type: 'list', 
            name: 'license_type', 
            message: 'What license do you want to apply?', 
            choices: [
                'MIT', 
                'other1', 
                'other2'
            ], 
            filter: function(val) {
                return val.toLowerCase();
            }
        }
    ];
    inquirer.prompt(questions).then((answers) => {
        console.log('\nNew package info:');
        console.log(JSON.stringify(answers, null, '  '));
        return callback(null, answers);
    })
}
