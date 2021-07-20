/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\Editor\EditorProps.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import {SDKVersion, PackiDependencies, PackiFiles, PackiFile} from '../../features/packi';
import {Annotation} from '../../features/annotations/index';
export type EditorProps = { 
    files: PackiFiles;
    updateFiles: (updateFn: (files: PackiFiles) => { 
        [path: string]: PackiFile | null;
    }) => void;
    selectedFile: string;
    onSelectFile: (path: string) => void;
    annotations: Annotation[];
    lineNumbers?: 'on' | 'off' | 'relative' | 'interval';
    wordWrap?: 'off' | 'on' | 'wordWrapColumn' | 'bounded';
    scrollBeyondLastLine?: boolean;
    minimap?: { 
        enabled?: boolean;
        maxColumn?: number;
        renderCharacters?: boolean;
        showSlider?: 'always' | 'mouseover';
        side?: 'right' | 'left';
    };
    autoFocus?: boolean;
    fontFamily?: string;
    fontLigatures?: boolean;
};
