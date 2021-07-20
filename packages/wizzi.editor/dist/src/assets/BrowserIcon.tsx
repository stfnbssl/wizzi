/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\assets\BrowserIcon.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import * as React from "react";
export const BrowserIcon = ({
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
            <line 
                className="st0"
                x1="3"
                y1="16"
                x2="15"
                y2="16"
             />
            <path
             className="st0" d="M21.8,13c-0.6-5.7-3-10-5.8-10c-3.3,0-6,5.8-6,13s2.7,13,6,13" />
            <path
             className="st0" d="M28.9,17c0-0.3,0.1-0.7,0.1-1c0-7.2-5.8-13-13-13S3,8.8,3,16s5.8,13,13,13c1,0,2-0.1,3-0.4" />
            <path
             className="st0" d="M24.5,17.5c1.9,1.9,1.9,5.1,0,7c-0.5,0.5-1,0.8-1.6,1.1c-1.8,0.7-3.9,0.4-5.4-1.1c-1.9-1.9-1.9-5.1,0-7S22.6,15.6,24.5,17.5z" />
            <path
             className="st0" d="M25.5,23l3.9,3.6c0.8,0.8,0.8,2,0,2.8l0,0c-0.8,0.8-2,0.8-2.8,0l-3.5-3.5" />
        </svg>
        )
    ;
}
;
