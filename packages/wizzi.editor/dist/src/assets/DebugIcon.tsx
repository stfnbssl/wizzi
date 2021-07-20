/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\assets\DebugIcon.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import * as React from "react";
export const DebugIcon = ({
    height="24px", 
    width="24px", 
    theme="light", 
    ...props
 }: React.SVGProps<SVGSVGElement> & { 
    theme?: string;
}) => {

    const fill = theme == 'light' ? '#ffffff' : '#000000';
    const stroke = theme == 'light' ? '#000000' : '#ffffff';
    return  (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            {...props}
        >
            <path
             d="M29,15h-5.1c-0.1-1.2-0.5-2.4-1-3.5c1.9-1.5,3.1-3.7,3.1-6.1V5c0-0.6-0.4-1-1-1s-1,0.4-1,1v0.4c0,1.8-0.8,3.4-2.2,4.5c-0.5-0.7-1.2-1.2-1.9-1.7c0-0.1,0-0.1,0-0.2c0-2.2-1.8-4-4-4s-4,1.8-4,4c0,0.1,0,0.1,0,0.2c-0.7,0.5-1.3,1-1.9,1.7C8.8,8.8,8,7.2,8,5.4V5c0-0.6-0.4-1-1-1S6,4.4,6,5v0.4c0,2.4,1.1,4.7,3.1,6.1c-0.5,1-0.9,2.2-1,3.5H3c-0.6,0-1,0.4-1,1s0.4,1,1,1h5.1c0.1,1.2,0.5,2.4,1,3.5C7.1,21.9,6,24.2,6,26.6V27c0,0.6,0.4,1,1,1s1-0.4,1-1v-0.4c0-1.8,0.8-3.4,2.2-4.5c1.5,1.8,3.5,2.9,5.8,2.9s4.4-1.1,5.8-2.9c1.4,1.1,2.2,2.7,2.2,4.5V27c0,0.6,0.4,1,1,1s1-0.4,1-1v-0.4c0-2.4-1.1-4.7-3.1-6.1c0.5-1,0.9-2.2,1-3.5H29c0.6,0,1-0.4,1-1S29.6,15,29,15z" />
        </svg>
        )
    ;
}
;
