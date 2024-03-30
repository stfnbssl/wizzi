/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.cli\packages\wizzi.cli\.wizzi\src\cmds\commons.js.ittf
    utc time: Thu, 29 Feb 2024 08:43:48 GMT
*/
'use strict';
const path = require('path');
const {verify, file, vfile} = require('@wizzi/utils');

type ParameterCheckerError = {
    message: string;
}

type ParameterCheckerOption = {
    message: string;
}

type CheckOptions = {
    message: string;
    parentFolderMustExist?: boolean;
}

type ParameterValue = string | number | boolean | object | ParameterValue[];

export class ParameterChecker {
    command: string;
    errors: ParameterCheckerError[];
    options: ParameterCheckerOption[];
    values: {
        [path: string]: ParameterValue;
    }

    constructor(command: string) {
        this.command = command;
        this.errors = [];
        this.options = [];
        this.values = {};
    }
    usingOption(message: string) {
        this.options.push({
            message
         })
        return true;
    }
    optionError(message: string) {
        this.errors.push({
            message
         })
        return false;
    }
    checkNotNullOrUndefined(instance:ParameterValue, kind: string, options?: CheckOptions) {
        if (verify.isEmpty(kind)) {
            throw new Error('commandChecker.checkNotNull.kind param missing');
        }
        options = options || { message: '' };
        if (!instance) {
            return this.optionError(kind + ' ' + options.message + ': parameter cannot be null');
        }
        this.values[kind] = instance;
        if (verify.isObject(instance)) {
            return this.usingOption(kind + '.keys: ' + Object.keys(instance).join(','));
        }
        else if (verify.isArray(instance)) {
            return this.usingOption(kind + '.items: ' + (instance as ParameterValue[]).length);
        }
        else {
            return this.usingOption(kind + ': ' + instance);
        }
    }
    checkNotEmpty(name: string, kind: string, options?: CheckOptions) {
        name = name || '';
        if (verify.isEmpty(kind)) {
            throw new Error('commandChecker.checkNotEmpty.kind param missing');
        }
        options = options || { message: '' };
        if (verify.isEmpty(name)) {
            return this.optionError(kind + ' ' + options.message + ': missing parameter');
        }
        this.values[kind] = name;
        return this.usingOption(kind + ': ' + name);
    }
    checkArrayNotEmpty(items: ParameterValue[], kind: string, options?: CheckOptions) {
        if (verify.isEmpty(kind)) {
            throw new Error('commandChecker.checkNotEmpty.kind param missing');
        }
        options = options || { message: '' };
        if (!verify.isArray(items)) {
            return this.optionError(kind + ' ' + options.message + ': is not an array');
        }
        if (items.length < 1) {
            return this.optionError(kind + ' ' + options.message + ': the array is empty');
        }
        this.values[kind] = items;
        return this.usingOption(kind + ': ' + items.length + ' items');
    }
    checkFile(fileName: string, kind: string, options?: CheckOptions) {
        kind = kind || '__';
        options = options || { message: '' };
        // console.log('checkFile', fileName, __filename);
        if (verify.isEmpty(fileName)) {
            return this.optionError(kind + ' ' + options.message + ': missing file name');
        }
        let filePath = fileName;
        let currentDir = process.cwd();
        if (verify.isAbsolutePath(filePath) == false) {
            filePath = path.join(currentDir, filePath);
        }
        if (!file.exists(filePath)) {
            // console.log(1, __filename);
            if (options.parentFolderMustExist) {
                // console.log(2, file.exists(path.dirname(filePath)), __filename);
                if (!file.exists(path.dirname(filePath))) {
                    return this.optionError(kind + ' ' + options.message + ' parent folder must exist: ' + filePath);
                }
                else {
                    this.values[kind + 'parent_only_exists'] = true;
                }
            }
            else {
                return this.optionError(kind + ' ' + options.message + ' file not found: ' + filePath);
            }
        }
        this.values[kind] = filePath;
        this.values[kind+'_is_folder'] = file.isDirectory(filePath);
        return this.usingOption(kind + ': ' + filePath);
    }
    checkFolder(folderName: string, kind: string, options?: CheckOptions) {
        options = options || { message: '' };
        if (verify.isEmpty(folderName)) {
            return this.optionError(kind + ': missing folder name');
        }
        let folderPath = folderName;
        let currentDir = process.cwd();
        if (verify.isAbsolutePath(folderPath) == false) {
            folderPath = path.join(currentDir, folderPath);
        }
        if (!file.exists(folderPath)) {
            if (options.parentFolderMustExist) {
                // console.log(2, file.exists(path.dirname(filePath)), __filename);
                if (!file.exists(path.dirname(folderPath))) {
                    return this.optionError(kind + ' ' + options.message + ' parent folder must exist: ' + folderPath);
                }
                else {
                    this.values[kind + 'parent_only_exists'] = true;
                }
            }
            return this.optionError(kind + ' ' +  'folder not found: ' + folderName);
        }
        this.values[kind] = folderPath;
        return this.usingOption(kind + ': ' + folderPath);
    }
    isValid() {
        return this.errors.length == 0;
    }
    checkOut() {
        console.log("[31m%s[0m", '');
        console.log("[31m%s[0m", '');
        if (this.errors.length == 0) {
            console.log("[32m%s[0m", '------------------------------');
            console.log("[32m%s[0m", 'Executing', this.command, 'command');
            console.log("[32m%s[0m", '------------------------------');
            this.options.map(option=> {
                console.log("[32m%s[0m", 'using ->', option.message);
            })
            console.log("[32m%s[0m", '');
            console.log("[32m%s[0m", '');
            return true;
        }
        console.log("[31m%s[0m", '------------------------------');
        console.log("[31m%s[0m", 'Error executing', this.command, 'command');
        console.log("[31m%s[0m", '------------------------------');
        this.errors.map(err=> {
            console.log("[31m%s[0m", err.message);
        })
        console.log("[31m%s[0m", 'Review the command options using');
        console.log("[31m%s[0m", '-> wz help ' + this.command);
        console.log("[31m%s[0m", '');
        console.log("[31m%s[0m", '');
        return false;
    }
}