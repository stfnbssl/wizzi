var fs = require('fs');
var path = require('path');
var wizziUtils = require('wizzi-utils');
var nodeDir = require('node-dir');
const { dir } = require('console');

function loadDirContents(dirname, callback) {
    const data = {};
    wizziUtils.vfile().getFiles(dirname, {deep: true, extension:null, documentContent: true}, function(err, files) {
        if (err) { return callback(err); }
        files.map(item => {
            data[normalizePath(item.fullPath)] = item.content;
        })
        callback(null, data)
    })
    /*
    nodeDir.readFiles(dirname, function(err, content, filename, next) {
        if (err) { return callback(err); }
        data[normalizePath(filename)] = content;
        next();
    }, function() {
        console.log('data', Object.keys(data));
        callback(null, data)
    });
    */
}

/*
loadDirContents('./data/packiDependencies', function(err, data) {
    if (err) { throw err; }
});
*/

function loadPackiDirDependency(dirname, options, callback) {
    console.log('loadPackiDirDependency', dirname, options);
    var files = [];
    fs.readdir(dirname, function(err, list) {
        if (err) { return callback(err); }
        var i = 0;
        (function next() {
            var filename = list[i++];
            if (!filename) return callback(null, files);
            var file = path.join(dirname, filename);
            fs.stat(file, function(err, stat) {
                if (err) return callback(err);        
                if (stat && stat.isDirectory())  {
                    files.push({name: filename, packiFilesPath: file});
                }
                next();
            });
        })();
    });
}

function loadPackiDirItems(dirname, options, callback) {
    console.log('loadPackiDirItems', dirname, options);
    var files = [];
    fs.readdir(dirname, function(err, list) {
        if (err) { return callback(err); }
        var mainIttf;
        var packiName
        var packiFilesPath;
        var i = 0;
        (function next() {
            var filename = list[i++];
            console.log('loadPackiDirItems.filename', filename);
            if (!filename) {
                if (mainIttf) {
                    
                    files.push({
                        name: packiName, 
                        mainIttf: normalizePath(mainIttf), 
                        packiFilesPath: normalizePath(packiFilesPath)}
                    );
                }
                return callback(null, files);
            }
            var file = path.join(dirname, filename);
            fs.stat(file, function(err, stat) {
                if (err) return callback(err);
                if (stat && stat.isDirectory()) {
                    console.log('loadPackiDirItems.isDirectory', filename);
                    if (filename == 't') {
                        packiFilesPath = dirname;
                        // stop search deep dirname is a packiItem
                        next();
                    } else {
                        // search deep
                        const savePathName = options.pathName;
                        options.pathName = options.pathName ? options.pathName + '/' + filename : filename;
                        loadPackiDirItems(file, options, function(err, subfiles) {
                            if (err) { return callback(err); }
                            console.log('called internal loadPackiDirItems', filename, subfiles.length),
                            files = files.concat(subfiles);
                            options.pathName = savePathName;
                            next();
                        })
                    }
                } else {
                    // filename is a mainIttf
                    packiFilesPath = dirname;
                    packiName = options.pathName;
                    mainIttf = normalizePath(file);
                    next();
                }
                    /*
                    var mainIttf;
                    var packiFilesPath;
                    fs.readdir(file, function(err, sublist) {
                        if (err) { return callback(err); }
                        packiFilesPath = normalizePath(file);
                        var j = 0;
                        (function nextSub() {
                            var subFilename = sublist[j++];
                            if (!subFilename) {
                                if (mainIttf) {
                                    const packiName = options.pathName ? options.pathName + '/' + filename : filename;
                                    files.push({name: packiName, mainIttf: normalizePath(mainIttf), packiFilesPath: normalizePath(packiFilesPath)});
                                }
                                return next();
                            }
                            var subFile = path.join(file, subFilename);
                            fs.stat(subFile, function(err, stat) {
                                if (stat && stat.isDirectory()) {
                                    if (subFilename != 't') {
                                        const savePathName = options.pathName;
                                        options.pathName = options.pathName ? options.pathName + '/' + filename : filename;
                                        loadPackiDir(subFile, options, function(err, subfiles) {
                                            if (err) { return callback(err); }
                                            console.log('called internal loadPackiDir', subFilename, subfiles.length),
                                            files = files.concat(subfiles);
                                            options.pathName = savePathName;
                                            nextSub();
                                        })
                                    } else {
                                        nextSub();    
                                    }
                                } else {
                                    console.log('is mainIttf', subFilename);
                                    mainIttf = normalizePath(path.join(file, subFilename));
                                    nextSub();
                                }
                            })
                            
                        })()
                    });
                }
                */
            });
        })()
    });
}
function loadPackiItems(packiItemsFolder, owner, callback) {
    console.log('loadPackiItems', packiItemsFolder, owner);
    loadPackiDirItems(packiItemsFolder, { isDependency: false }, function(err, data) {
        if (err) { return callback(err); }
        // console.log(packiDependenciesFolder, data);
        var packiItems = [];
        var j = 0;
        (function next() {
            var packiItemPaths = data[j++];
            if (!packiItemPaths) {
                console.log('packiItems', packiItems.length);
                return callback(null, packiItems);
            }
            const basePath = packiItemsFolder + '/' + packiItemPaths.name;
            const mainIttf = packiItemPaths.mainIttf.substring(basePath.length + 1);
            const packiItem = {
                owner: owner,
                name: packiItemPaths.name,
                mainIttf: mainIttf,
                wizziSchema: path.basename(mainIttf).split('.')[path.basename(mainIttf).split('.').length-2]
            };
            if (packiItemPaths.packiFilesPath)
                loadDirContents(packiItemPaths.packiFilesPath, function(err, filesData) {
                    if (err) { return callback(err); }
                    packiItem.packiFiles = /*JSON.stringify(*/dataToPackiFiles(filesData, basePath, false)/*)*/;
                    packiItem.packiFiles['wizzi.json.ittf'] = {
                        type: 'CODE',
                        contents: [
                            '{',
                            '    [ fragments',
                            '        {',
                            '            name "' + packiItem.wizziSchema + '"',
                            '            path "' + owner + '/' + packiItem.wizziSchema + '"',
                            '    [ contexts',
                            '        {',
                            '            name "wzCtx"',
                            '            path "' + owner + '/wzctx"',
                        ].join('\n')
                    };
                    packiItems.push(packiItem)
                    next();
                });
            else {
                packiItem.packiFiles = {}
                packiItems.push(packiItem)
                next();
            }
        })()
    });
}
function loadPackiDependencies(packiDependenciesFolder, owner, callback) {
    console.log('loadPackiDependencies', packiDependenciesFolder, owner);
    loadPackiDirDependency(packiDependenciesFolder, {}, function(err, data) {
        if (err) { return callback(err); }
        // console.log(packiDependenciesFolder, data);
        var packiDependencies = [];
        var j = 0;
        (function next() {
            var packiDepPaths = data[j++];
            if (!packiDepPaths) {
                console.log('packiDependencies', packiDependencies.length);
                return callback(null, packiDependencies);
            }
            const packiDependency = {
                owner: owner,
                name: packiDepPaths.name
            };
            loadDirContents(packiDepPaths.packiFilesPath, function(err, filesData) {
                if (err) { return callback(err); }
                packiDependency.packiFiles = /*JSON.stringify(*/dataToPackiFiles(filesData, packiDependenciesFolder, true)/*)*/;
                packiDependencies.push(packiDependency)
                next();
            });
        })()
    });
}

function dataToPackiFiles(filesData, basedir, isTFolder) {
    const prefix = isTFolder ? 't/' : '';
    const packiFiles = {};
    for (var filePath in filesData) {
        const relFilePath = filePath.substring(basedir.length + 1);
        packiFiles[prefix + relFilePath] = {
            type: "CODE",
            contents: filesData[filePath]
        }
    }
    return packiFiles;
}

function normalizePath(filePath) {
    return filePath && filePath.replace(/\\/g, '/');
}

const packiDependenciesFolder = path.join(__dirname, 'data/packiDependencies');
/*
loadPackiDependencies(packiDependenciesFolder, 'stfnbssl', function(err, result) {
    fs.writeFile('json/packiDependencies.json', JSON.stringify(result, null, 2), function (err) {
        if (err) return console.log(err);
      });
});
*/

const packiItemsFolder = path.join(__dirname, 'data/packiItems');
/*
loadPackiItems(packiItemsFolder, 'stfnbssl', function(err, result) {
    fs.writeFile('json/packiItems.json', JSON.stringify(result, null, 2), function (err) {
        if (err) return console.log(err);
      });
});
*/

module.exports = {
    exec: function(callback) {
        loadPackiDependencies(packiDependenciesFolder, 'stfnbssl', function(err, result) {
            if (err) return callback(err);
            fs.writeFile('json/packiDependencies.json', JSON.stringify(result, null, 2), function (err) {
                if (err) return callback(err);
                loadPackiItems(packiItemsFolder, 'stfnbssl', function(err, result) {
                    if (err) return callback(err);
                    fs.writeFile('json/packiItems.json', JSON.stringify(result, null, 2), function (err) {
                        if (err) return callback(err);
                        callback(null);
                    });
                });
            });
        });
    }
}

if (require.main === module) {
    module.exports.exec();
}