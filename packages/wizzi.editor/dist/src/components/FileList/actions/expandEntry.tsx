/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\FileList\actions\expandEntry.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import {FileSystemEntry} from '../../../features/file';
import updateEntry from './updateEntry';
export default function expandEntry(entries: FileSystemEntry[], path: string, expand: boolean = true):  FileSystemEntry[] {
    
        return entries.map((entry) => {
            
                if (entry.item.path === path && entry.item.type === 'folder') {
                    return updateEntry(entry, {
                            state: {
                                isExpanded: expand
                             }
                         });
                }
                return entry;
            }
            );
    }
