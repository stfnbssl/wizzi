/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\FileList\actions\__tests__\openEntry.test.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import {FileSystemEntry} from '../../types';
import openEntry from '../openEntry';
it('toggles entry state', () => {

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
                isSelected: false, 
                isExpanded: true
             }
         }, 
        {
            item: {
                path: 'components/App.js', 
                type: 'file', 
                content: ''
             }, 
            state: {
                isSelected: true, 
                isFocused: true, 
                isOpen: true
             }
         }, 
        {
            item: {
                path: 'static', 
                type: 'folder'
             }, 
            state: {
                
             }
         }, 
        {
            item: {
                path: 'static/file.png', 
                type: 'file', 
                content: ''
             }, 
            state: {
                isFocused: false, 
                isOpen: true
             }
         }
    ];
    expect(openEntry(entries, 'test/App.js')).toMatchSnapshot();
    expect(openEntry(entries, 'components')).toMatchSnapshot();
    expect(openEntry(entries, 'static/file.png', true)).toMatchSnapshot();
}
)
