/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.site\.wizzi\client\src\components\FileList\actions\__tests__\createNewEntry.test.tsx.ittf
    utc time: Tue, 11 May 2021 04:47:43 GMT
*/
import {FileSystemEntry} from '../../types';
import createNewEntry from '../createNewEntry';
it('creates new file', () => {

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
    expect(createNewEntry(entries, 'file')).toMatchSnapshot();
    expect(createNewEntry(entries, 'file', 'test')).toMatchSnapshot();
}
)
it('creates new folder', () => {

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
    expect(createNewEntry(entries, 'folder')).toMatchSnapshot();
    expect(createNewEntry(entries, 'folder', 'test')).toMatchSnapshot();
}
)
