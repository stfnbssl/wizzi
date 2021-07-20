/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\FileList\actions\__tests__\selectEntry.test.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import {FileSystemEntry} from '../../types';
import selectEntry from '../selectEntry';
it('selects entry', () => {

    const entries: FileSystemEntry[] = [
        {
            item: {
                path: 'test', 
                type: 'folder'
             }, 
            state: {
                
             }
         }, 
        {
            item: {
                path: 'test/App.js', 
                type: 'file', 
                content: ''
             }, 
            state: {
                
             }
         }, 
        {
            item: {
                path: 'components', 
                type: 'folder'
             }, 
            state: {
                
             }
         }
    ];
    expect(selectEntry(entries, 'test/App.js')).toEqual([
        {
            item: {
                path: 'test', 
                type: 'folder'
             }, 
            state: {
                
             }
         }, 
        {
            item: {
                path: 'test/App.js', 
                type: 'file', 
                content: ''
             }, 
            state: {
                isSelected: true
             }
         }, 
        {
            item: {
                path: 'components', 
                type: 'folder'
             }, 
            state: {
                
             }
         }
    ])
}
)
