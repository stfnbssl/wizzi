var path = require('path');
var wizziUtils = require('wizzi-utils');
var folderFrom = path.join(__dirname, '../mongoose/packi/data/packiItems/docs/cheatsheets');
var folderTo = path.join(__dirname, '../mongoose/packi/data/packiItems/docs/cheatsheets/models');

wizziUtils.vfile().getFiles(folderFrom).map(file=>{
    console.log(file);
    if (file.relPath.startsWith('cs.')) {
        var newRelPath = file.relPath.substring(3);
        var newPath = path.join(folderTo, newRelPath);
        console.log('newPath', newPath);
        wizziUtils.vfile().mkdir(path.dirname(newPath));
        wizziUtils.vfile().copyFile(file.fullPath, path.join(folderTo, newRelPath));        
    }
});