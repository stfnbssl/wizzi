/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.pageforms\.wizzi\src\assets\DeleteIcon.tsx.ittf
    utc time: Tue, 20 Jul 2021 08:45:17 GMT
*/
import * as React from "react";
export const DeleteIcon = ({
    height=24, 
    width=24, 
    theme="light", 
    ...props
 }: React.SVGProps<SVGSVGElement> & { 
    theme?: string;
}) => {

    const fill = theme == 'light' ? '#ffffff' : '#000000';
    const stroke = theme == 'light' ? '#000000' : '#ffffff';
    function r(v) {
    
        return v * (height + width) / 200;
    }
    return  (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            width={width + 'px'}
            height={height + 'px'}
            viewBox={'0 0 ' + width + ' ' + height}
            {...props}
        >
            <polyline 
                stroke={stroke}
                fill={fill}
                points={r(4) + ' ' + r(2) + ' ' + r(98) + ' ' + r(96) + ' ' + r(96) + ' ' + r(98) + ' ' + r(2) + ' ' + r(4) + ' ' + r(4) + ' ' + r(2)}
                strokeWidth="2"
             />
            <polyline 
                stroke={stroke}
                fill={fill}
                points={r(96)  + ' ' +  r(2) + ' ' + r(98)  + ' ' +  r(4)  + ' ' + r(4)  + ' ' +  r(98) + ' ' + r(2)  + ' ' +  r(96) + ' ' + r(96)  + ' ' +  r(2)}
                strokeWidth="2"
             />
        </svg>
        )
    ;
}
;
