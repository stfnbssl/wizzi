/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\features\annotations\types.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/

export enum AnnotationSeverity {
    LOADING = -1 , 
    IGNORE = 0 , 
    INFO = 1 , 
    WARNING = 2 , 
    ERROR = 3 , 
    FATAL = 4
}

export type AnnotationAction = { 
    title: string;
    icon?: React.ComponentType<any>;
    run: () => void;
};

export type AnnotationLocation = { 
    fileName: string;
    startLineNumber: number;
    endLineNumber: number;
    startColumn: number;
    endColumn: number;
};

export type Annotation = { 
    message: string;
    severity: AnnotationSeverity;
    source: 'Device' | 'Web' | 'JSON' | 'ESLint' | 'Dependencies';
    location?: AnnotationLocation;
    action?: AnnotationAction;
};
