/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.backend\.wizzi\src\features\repo\types.ts.ittf
    utc time: Tue, 20 Jul 2021 18:38:14 GMT
*/

export type FileDiffKind = '+' | '-' | '<>';

export type FileDiffItem = { 
    path: string;
    content: string;
};

export type FileDiff = { 
    kind: FileDiffKind;
    a?: FileDiffItem;
    b?: FileDiffItem;
};
