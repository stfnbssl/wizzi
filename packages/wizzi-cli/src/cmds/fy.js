/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: @wizzi/plugin.js@0.8.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.cli\.wizzi\src\cmds\fy.js.ittf
    utc time: Wed, 08 Jan 2025 05:17:28 GMT
*/
const path = require('path');
const fs = require('fs');
const wizziUtils = require('@wizzi/utils');
const verify = wizziUtils.verify;
const file = wizziUtils.file;
const vfile = wizziUtils.vfile;
const help = require('./help');
const commons = require('./commons');
const factory = require('../factory');
const github = require('../features/github');
var _wf = null;

const kCommandName = "fy";

module.exports = (args, accessToken) => {
    // loog 'fy.accessToken', accessToken, args.git
    
    const checker = new commons.commandChecker(kCommandName);
    
    if (args.git) {
        wizzifyGitRepo(args, accessToken, (err, result) => {
            if (err) {
                console.log("[31m%s[0m", 'err', err);
                throw new Error(err.message);
            }
            console.log('Done. Wizzify github repo.');
        }
        )
        return ;
    }
    let currentDir = process.cwd();
    let sourcePath = args.source || args.s;
    let destPath = args.dest || args.d;
    let excludes = [];
    // loog 'args.exclude || args.e', args.exclude || args.e
    if (verify.isArray(args.exclude || args.e)) {
        excludes = args.exclude || args.e;
    }
    else if (verify.isString(args.exclude || args.e)) {
        excludes = [args.exclude || args.e];
    }
    // loog 'fy.sourcePath.destPath', sourcePath, destPath
    checker.checkFile(sourcePath, 'sourcePath')
    checker.checkFile(destPath, 'destPath', {
        parentFolderMustExist: true
     })
    if (!checker.checkOut()) {
        return ;
    }
    // loog 'source is folder', checker.sourcePath_is_folder
    // loog 'dest is folder', checker.destPath_is_folder
    if (checker.sourcePath_is_folder && !checker.destPath_is_folder && !checker.destPath_parent_only_exists) {
        checker.optionError('Source path is a folder, destination path cannot be a filename: ' + checker.destPath)
        return checker.checkOut();
    }
    
    // At this point this cannot be invalid
    if (!checker.sourcePath_is_folder && checker.destPath_is_folder) {
        checker.checkFile(path.join(destPath, path.basename(sourcePath) + '.ittf'), 'destPath', {
            parentFolderMustExist: true
         })
    }
    
    // loog 'ok. source && dest are folders', args
    if (checker.sourcePath_is_folder) {
        var excludesDef = [];
        var i, i_items=excludes, i_len=excludes.length, item;
        for (i=0; i<i_len; i++) {
            item = excludes[i];
            excludesDef.push(path.join(checker.sourcePath, item))
        }
        wizzifyFolder(checker.sourcePath, checker.destPath, args.f || args.from || null, args.t || args.to || null, excludesDef, (err, result) => {
            if (err) {
                console.log("[31m%s[0m", 'err', err);
                throw new Error(err.message);
            }
            console.log("[32m%s[0m", '');
            console.log("[32m%s[0m", '');
            console.log("[32m%s[0m", 'Wizzification done, see', checker.destPath + ' folder');
            console.log("[32m%s[0m", '');
            console.log("[32m%s[0m", '');
        }
        )
    }
    // loog 'ok. source && dest are files'
    else {
        wizzifyFile(checker.sourcePath, checker.destPath, (err, notUsed) => {
            if (err) {
                console.log("[31m%s[0m", 'err', err);
                throw new Error(err.message);
            }
            console.log("[32m%s[0m", '');
            console.log("[32m%s[0m", '');
            console.log("[32m%s[0m", 'Wizzification done, see', checker.destPath + ' file');
            console.log("[32m%s[0m", '');
            console.log("[32m%s[0m", '');
        }
        )
    }
}
;
function wizzifyGitRepo(args, accessToken, callback) {
    const owner = args.o || args.owner;
    const name = args.n || args.name;
    const branch = args.b || args.branch || "master";
    const kind = args.k || args.kind || "all";
    const destFolder = path.join(process.cwd(), args.d || args.dest || 'git_output', owner, name);
    // loog 'wizzifyGitRepo', 'owner', owner, 'name', name, 'branch', branch, 'kind', kind, 'destFolder', destFolder
    github.api.repo.cloneBranch({
        owner, 
        name, 
        token: accessToken
     }, branch, kind).then((result) => {
        // loog 'wizzifyGitRepo.result', Object.keys(result.files)
        if (result.files) {
            for (var k in result.files) {
                file.write(path.join(destFolder, k), result.files[k].contents)
                // loog 'Written', k
            }
        }
        const destIttfFolder = path.join(destFolder, ".wizzi");
        wizzifyFolder(destFolder, destIttfFolder, null, null, [], (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            return callback(null);
        }
        )
    }
    )
}
function wizzifyFolder(sourceFolder, destFolder, from, to, excludes, callback) {
    // loog 'wizzifyFolder.sourceFolder', sourceFolder
    // loog 'wizzifyFolder.destFolder', destFolder
    getWizziFactory((err, wf) => {
        if (err) {
            return callback(err);
        }
        vfile().getFiles(sourceFolder, {
            deep: true, 
            documentContent: false
         }, (err, files) => {
            if (err) {
                return callback(err);
            }
            // loog 'wizzifyFolder.sourceFiles', files.length
            function run(ndx) {
                if (from != null && ndx < from) {
                    return run(ndx+1);
                }
                if (to != null && ndx > to) {
                    return run(ndx+1);
                }
                if (!files[ndx]) {
                    return callback(null);
                }
                try {
                    var sourcePath = files[ndx].fullPath;
                    var i, i_items=excludes, i_len=excludes.length, exclude;
                    for (i=0; i<i_len; i++) {
                        exclude = excludes[i];
                        
                        // loog 'exclude sourcePath', sourcePath
                        if (sourcePath.startsWith(exclude)) {
                            return run(ndx+1);
                        }
                    }
                    var wizzifyExtension = getWizzifyExtension(sourcePath);
                    
                    // loog ndx+1, '/', files.length, sourcePath,'has no wizzifier'
                    if (verify.isEmpty(wizzifyExtension) || !wf.canWizzify(wizzifyExtension)) {
                        return file.copyFile(sourcePath, path.join(destFolder, files[ndx].relPath), (err, result) => {
                                if (err) {
                                    console.log("[31m%s[0m", 'copying file', sourcePath);
                                    console.log("[31m%s[0m", err);
                                    return run(ndx+1);
                                }
                                // loog ndx+1, '/', files.length, sourcePath, 'copied'
                                return run(ndx+1);
                            }
                            );
                    }
                    // loog "from, to, ndx", from, to, ndx+1, '/', files.length
                    var sourceTextOrBuffer;
                    if (wf.wizzifierIsForBinaryFile(wizzifyExtension)) {
                        sourceTextOrBuffer = fs.readFileSync(sourcePath, "base64")
                        ;
                    }
                    else {
                        sourceTextOrBuffer = file.read(sourcePath)
                        ;
                    }
                    var destPath = path.join(destFolder, files[ndx].relPath + '.ittf');
                    wf.getWizziIttfFromText(sourceTextOrBuffer, wizzifyExtension, {
                        sourceFilepath: sourcePath
                     }, (err, result) => {
                        if (err) {
                            console.log("[31m%s[0m", 'on file', sourcePath);
                            console.log("[31m%s[0m", err);
                            return process.nextTick(() => 
                                    run(ndx+1)
                                );
                        }
                        file.write(destPath, result);
                        console.log('Done. Wizzify file', destPath);
                        return process.nextTick(() => 
                                run(ndx+1)
                            );
                    }
                    )
                } 
                catch (ex) {
                    console.log("[31m%s[0m", 'in file', sourcePath, 'message', ex.message);
                    process.nextTick(() => 
                        run(ndx+1)
                    )
                } 
            }
            run(0);
        }
        )
    }
    )
}
function wizzifyFile(sourcePath, destPath, callback) {
    getWizziFactory((err, wf) => {
        if (err) {
            return callback(err);
        }
        try {
            wf.getWizziIttfFromText(file.read(sourcePath), getWizzifyExtension(sourcePath), (err, result) => {
                if (err) {
                    return callback(err);
                }
                file.write(destPath, result);
                console.log('Done. Wizzify file', destPath);
                return callback(null);
            }
            )
        } 
        catch (ex) {
            console.log("[31m%s[0m", 'in file', sourcePath, 'message', ex.message);
            return callback(null);
        } 
    }
    )
}
function getWizzifyExtension(sourcePath) {
    var ext = path.extname(sourcePath).substr(1);
    if (ext == 'tsx') {
        return 'ts';
    }
    else if (ext == 'jsx') {
        return 'js';
    }
    else if (ext == 'mdx') {
        return 'md';
    }
    else {
        return ext;
    }
}
function getWizziFactory(callback) {
    if (_wf != null) {
        return callback(null, _wf);
    }
    const globalContext = {};
    factory.createWizziFactory(globalContext, {
        items: factory.getDefaultPlugins(), 
        pluginsBaseFolder: factory.getDefaultPluginsBaseFolder()
     }, (err, wf) => {
        if (err) {
            return callback(err);
        }
        _wf = wf;
        return callback(null, _wf);
    }
    )
}