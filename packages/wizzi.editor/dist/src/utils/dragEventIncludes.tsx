/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\utils\dragEventIncludes.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
export default function dragEventIncludes({
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
