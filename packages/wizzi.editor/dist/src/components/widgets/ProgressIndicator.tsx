/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\ProgressIndicator.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import React, {FunctionComponent} from 'react';
// see https://mxstbr.blog/2016/11/styled-components-magic-explained/
import styled, {keyframes, css} from 'styled-components';

import {c, ThemeName} from '../ThemeProvider';

export interface ProgressIndicatorProps {
    delay?: number;
    duration?: number;
    className?: string;
}

interface RootStyleProps {
    delay?: number;
    duration?: number;
}
const progressKeyframes = keyframes`
    0% {
        -webkit-transform: scale3d(0, 1, 1);
        -ms-transition: scale3d(0, 1, 1);
        transform: scale3d(0, 1, 1);
        opacity: 1;
    }
    75% {
        -webkit-transform: scale3d(1, 1, 1);
        -ms-transition: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
        opacity: 1;
    }
    100% {
        -webkit-transform: scale3d(1, 1, 1);
        -ms-transition: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
        opacity: 0;
    }
    
`
const StyledRoot = styled.div<RootStyleProps>`
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    z-index: 1;
    background-color: ${props => c('primary')};
    -webkit-transform: scale3d(0, 1, 1);
    -ms-transition: scale3d(0, 1, 1);
    transform: scale3d(0, 1, 1);
    transform-origin: top left;
    animation-name: ${props => progressKeyframes};
    animation-iteration-count: infinite;
    animation-delay: ${props => props.delay + 'ms'};
    animation-duration: ${props => props.duration + 'ms'};
`
export const ProgressIndicator: FunctionComponent<ProgressIndicatorProps> = ({
    delay, 
    duration, 
    className
 }) => 

     (
    <StyledRoot
     delay={delay} duration={duration} className={className} />
    )

;
ProgressIndicator.defaultProps = {
    delay: 0, 
    duration: 2000
 };
export default ProgressIndicator;
