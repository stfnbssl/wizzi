/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\features\file\dragUtilities.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
export function dragEventIncludes({
    dataTransfer
 }: DragEvent, item: string):  boolean {

    if (!dataTransfer) {
        return false;
    }
    if (dataTransfer.types instanceof DOMStringList) {
        return dataTransfer.types.contains(item);
    }
    return dataTransfer.types.indexOf(item) > -1;
}
