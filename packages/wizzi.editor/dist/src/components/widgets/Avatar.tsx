/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\Avatar.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import React, {FunctionComponent} from 'react';
// see https://mxstbr.blog/2016/11/styled-components-magic-explained/
import styled, {keyframes, css} from 'styled-components';

import {c} from '../ThemeProvider';

export interface AvatarProps {
    size: number;
    source: string | null;
}

interface RootStyleProps {
}
interface ImageStyleProps {
    size: number;
}
const StyledRoot = styled.div<RootStyleProps>`
    display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    stroke: ${props => c('text')};
`
const StyledImage = styled.img<ImageStyleProps>`
    width: ${props => props.size + "px"};
    height: ${props => props.size + "px"};
    -webkit-border-radius: ${props => (props.size / 2) + "px"};
    -khtml-border-radius: ${props => (props.size / 2) + "px"};
    -moz-border-radius: ${props => (props.size / 2) + "px"};
    -o-border-radius: ${props => (props.size / 2) + "px"};
    border-radius: ${props => (props.size / 2) + "px"};
`
export const Avatar: FunctionComponent<AvatarProps> = ({
    size, 
    source
 }) => 

     (
    <StyledRoot
    >
        {
            source ?  (
                <StyledImage
                 src={source} size={size} />
                )
             :  (
                <svg 
                    width="20"
                    height="20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        d="M13.125 13.563c2.423-3.635 2.831-10.938-2.623-10.938-5.454 0-5.05 7.303-2.627 10.938-2.423 0-5.25 2.389-5.25 4.812h15.75c.004-2.423-2.827-4.813-5.25-4.813z"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                </svg>
                )
            
        }
    </StyledRoot>
    )

;
export default Avatar;
