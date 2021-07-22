/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\FileList\actions\closeEntry.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import {FileSystemEntry} from '../../features/file';
import updateEntry from './updateEntry';
export default function closeEntry(entry: FileSystemEntry) {
    
        if (entry.item.type === 'file') {
            if (entry.state.isSelected || entry.state.isFocused || entry.state.isOpen) {
                
                // Unselect and unfocus the file
                return updateEntry(entry, {
                        state: {
                            isOpen: false, 
                            isSelected: false, 
                            isFocused: false
                         }
                     });
            }
        }
        else {
            if (entry.state.isSelected) {
                
                // Unselect the folder
                return updateEntry(entry, {
                        state: {
                            isSelected: false
                         }
                     });
            }
        }
        return entry;
    }
