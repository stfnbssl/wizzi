/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\assets\PopoverIcon.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import * as React from "react";
export const PopoverIcon = ({
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
                points="10 2 10 18 14 18 14 2 10 2"
                strokeWidth="2"
             />
            <polyline 
                stroke={stroke}
                fill={fill}
                points="10 20 10 22 14 22 14 20 10 20"
                strokeWidth="2"
             />
        </svg>
        )
    ;
}
;
