/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\.wizzi\src\cmds\commons.js.ittf
    utc time: Mon, 20 Jan 2025 19:30:35 GMT
*/
const path = require('path');
const wizziUtils = require('@wizzi/utils');
const verify = wizziUtils.verify;
const file = wizziUtils.file;
const vfile = wizziUtils.vfile;
const help = require('./help');
const md = module.exports = {};
class commandChecker {
    constructor(command) {
        this.command = command;
        this.errors = [];
        this.options = [];
    }
    usingOption(option) {
        this.options.push(option);
        return true;
    }
    optionError(error) {
        this.errors.push({
            message: error
         })
        return false;
    }
    checkNotNullOrUndefined(instance, kind, options) {
        if (verify.isEmpty(kind)) {
            throw new Error('commandChecker.checkNotNull.kind param missing');
        }
        options = options || { message: '' };
        if (!instance) {
            return this.optionError(kind + ' ' + options.message + ': parameter cannot be null');
        }
        this[kind] = instance;
        if (verify.isObject(instance)) {
            return this.usingOption(kind + '.keys: ' + Object.keys(instance).join(','));
        }
        else if (verify.isArray(instance)) {
            return this.usingOption(kind + '.items: ' + instance.length);
        }
        else {
            return this.usingOption(kind + ': ' + instance);
        }
    }
    checkNotEmpty(name, kind, options) {
        name = name || '';
        if (verify.isEmpty(kind)) {
            throw new Error('commandChecker.checkNotEmpty.kind param missing');
        }
        options = options || { message: '' };
        if (verify.isEmpty(name)) {
            return this.optionError(kind + ' ' + options.message + ': missing parameter');
        }
        this[kind] = name;
        return this.usingOption(kind + ': ' + name);
    }
    checkArrayNotEmpty(items, kind, options) {
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
        this[kind] = items;
        return this.usingOption(kind + ': ' + items.length + ' items');
    }
    checkFile(fileName, kind, options) {
        kind = kind || '__';
        options = options || { message: '' };
        console.log('checkFile', fileName, __filename);
        if (verify.isEmpty(fileName)) {
            return this.optionError(kind + ' ' + options.message + ': missing file name');
        }
        let filePath = fileName;
        let currentDir = process.cwd();
        if (verify.isAbsolutePath(filePath) == false) {
            filePath = path.join(currentDir, filePath);
        }
        if (!file.exists(filePath)) {
            
            // log 2, file.exists(path.dirname(filePath))
            if (options.parentFolderMustExist) {
                if (!file.exists(path.dirname(filePath))) {
                    return this.optionError(kind + ' ' + options.message + ' parent folder must exist: ' + filePath);
                }
                else {
                    this[kind + '_parent_only_exists'] = true;
                }
            }
            else {
                return this.optionError(kind + ' ' + options.message + ' file not found: ' + filePath);
            }
        }
        this[kind] = filePath;
        this[kind+'_is_folder'] = file.isDirectory(filePath);
        return this.usingOption(kind + ': ' + filePath);
    }
    checkFolder(folderName, kind, options) {
        kind = kind || '__';
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
                console.log(2, file.exists(path.dirname(folderPath)), __filename);
                if (!file.exists(path.dirname(folderPath))) {
                    return this.optionError(kind + ' ' + options.message + ' parent folder must exist: ' + folderPath);
                }
                else {
                    this[kind + '_parent_only_exists'] = true;
                }
            }
            else {
                return this.optionError(kind + ' ' +  'folder not found: ' + folderName);
            }
        }
        this[kind] = folderPath;
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
            var i, i_items=this.options, i_len=this.options.length, opt;
            for (i=0; i<i_len; i++) {
                opt = this.options[i];
                console.log("[32m%s[0m", 'using ->', opt);
            }
            console.log("[32m%s[0m", '');
            console.log("[32m%s[0m", '');
            return true;
        }
        console.log("[31m%s[0m", '------------------------------');
        console.log("[31m%s[0m", 'Error executing', this.command, 'command');
        console.log("[31m%s[0m", '------------------------------');
        var i, i_items=this.errors, i_len=this.errors.length, err;
        for (i=0; i<i_len; i++) {
            err = this.errors[i];
            console.log("[31m%s[0m", err.message);
        }
        console.log("[31m%s[0m", 'Review the command options using');
        console.log("[31m%s[0m", '-> wz help ' + this.command);
        console.log("[31m%s[0m", '');
        console.log("[31m%s[0m", '');
        return false;
    }
}
md.commandChecker = commandChecker;