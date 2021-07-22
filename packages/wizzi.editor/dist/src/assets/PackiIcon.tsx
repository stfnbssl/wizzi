/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\assets\PackiIcon.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import * as React from "react";
export const PackiIcon = ({
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
            <polyline 
                stroke={stroke}
                fill={fill}
                points="4 2 4 22 20 22 20 2 4 2"
                strokeWidth="2"
             />
        </svg>
        )
    ;
}
;
