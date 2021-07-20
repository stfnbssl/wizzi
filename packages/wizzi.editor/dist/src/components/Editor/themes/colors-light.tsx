/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\Editor\themes\colors-light.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import {c} from '../../ThemeProvider';
export const syntax = {
    text: '#5c6773', 
    variable: '#5c6773', 
    invalid: '#ff3333', 
    constant: '#f08c36', 
    comment: '#abb0b6', 
    regexp: '#4dbf99', 
    annotation: '#41a6d9', 
    tag: '#e7c547', 
    number: '#f08c36', 
    string: '#86b300', 
    property: '#41a6d9', 
    value: '#0451a5', 
    keyword: '#f2590c', 
    operator: '#778899', 
    predefined: '#FF00FF'
 };
export const ui = {
    background: c('background', 'light'), 
    text: '#5c6773', 
    selection: '#cccccc', 
    indent: {
        active: '#e0e0e0', 
        inactive: '#ecebec'
     }
 };
export type SyntaxColors = typeof syntax;
export type UIColors = typeof ui;
