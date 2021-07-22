/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\features\file\convertFileStructure.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import {isEntryPoint} from './fileUtilities';
import {FileSystemEntry, FileSystemEntryDiff} from './types';
import {PackiFiles} from '../packi';
const getFolders = (path: string):  string[] => {

    
    // TODO: change this to slice and join
    const pathSegments = path.split('/');
    if (pathSegments.length === 0) {
        return [];
    }
    const result = [];
    for (let pathIdx = 0; pathIdx < pathSegments.length - 1; pathIdx++) {
        result.push(pathSegments.slice(0, pathIdx + 1).join('/'));
    }
    return result;
}
;
export const packiToEntryArray = (files: PackiFiles):  FileSystemEntry[] => {

    const fileSystem: FileSystemEntry[] = [];
    const foldersInFileSystem = new Set();
    for (const filename of Object.keys(files).sort()) {
        for (const folder of getFolders(filename)) {
            if (!foldersInFileSystem.has(folder)) {
                fileSystem.push({
                    item: {
                        path: folder, 
                        type: 'folder'
                     }, 
                    state: {
                        
                     }
                 })
                foldersInFileSystem.add(folder);
            }
        }
        const isEntry = isEntryPoint(filename);
        fileSystem.push(files[filename].type === 'ASSET' ? {
                item: {
                    path: filename, 
                    type: 'file', 
                    uri: files[filename].contents as string, 
                    asset: true
                 }, 
                state: {
                    
                 }
             } : {
                item: {
                    path: filename, 
                    type: 'file', 
                    content: files[filename].contents as string, 
                    generated: files[filename].generated
                 }, 
                state: {
                    isOpen: isEntry, 
                    isSelected: isEntry, 
                    isFocused: isEntry
                 }
             })
    }
    return fileSystem;
}
;
export const packiFilterIttf = (files: PackiFiles):  PackiFiles => {

    const ittfFiles: PackiFiles = {};
    Object.keys(files).forEach((k) => {
    
        if (k.endsWith('.ittf')) {
            ittfFiles[k] = files[k];
        }
    }
    )
    return ittfFiles;
}
;
export const mixPreviousAndGeneratedPackiFilesToEntryArray = (previous: PackiFiles, generated: PackiFiles):  FileSystemEntry[] => {

    return packiToEntryArray(mixPreviousAndGeneratedPackiFiles(previous, generated));
}
;
export const mixPreviousAndGeneratedPackiFiles = (previous: PackiFiles, generated: PackiFiles):  PackiFiles => {

    const packiFiles = Object.assign({}, previous);
    Object.keys(generated).forEach((k) => {
    
        if (previous[k]) {
            generated[k].bothRealAndGenerated = true;
        }
        packiFiles[k] = generated[k];
    }
    )
    return packiFiles;
}
;
export const entryArrayToPacki = (entryArray: FileSystemEntry[]):  PackiFiles => {

    const sourceResult: PackiFiles = {};
    for (const { item } of entryArray) {
        if (item.type === 'file') {
            if (item.asset) {
                sourceResult[item.path] = {
                    contents: item.uri, 
                    
                    // TODO: support for different types
                    type: 'ASSET'
                 };
            }
            else {
                sourceResult[item.path] = {
                    contents: (item as any).content, 
                    
                    // TODO: support for different types
                    type: 'CODE'
                 };
            }
        }
    }
    return sourceResult;
}
;
export const entryArrayDiff = (a: FileSystemEntry[], b: FileSystemEntry[]):  { 
    [k: string]: FileSystemEntryDiff;
} => {

    const diff: { 
        [k: string]: FileSystemEntryDiff;
    } = {};
    a.forEach(entry => 
    
        
        // console.log('-', entry.item.path)
        diff[entry.item.path] = {
            kind: '-', 
            a: entry.item
         }
    )
    b.forEach((entry) => {
    
        if (diff[entry.item.path]) {
            if (diff[entry.item.path].a === entry.item) {
                delete diff[entry.item.path]
            }
            else {
                
                // console.log('<>', entry.item.path)
                diff[entry.item.path].kind === '<>';
                diff[entry.item.path].b === entry.item;
            }
        }
        else {
            
            // console.log('+', entry.item.path)
            diff[entry.item.path] = {
                kind: '+', 
                b: entry.item
             };
        }
    }
    )
    return diff;
}
;
