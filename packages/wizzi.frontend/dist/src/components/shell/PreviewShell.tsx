/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.frontend\.wizzi\src\components\shell\PreviewShell.tsx.ittf
    utc time: Sat, 01 May 2021 05:18:20 GMT
*/
import React, {FunctionComponent} from 'react';
// see https://mxstbr.blog/2016/11/styled-components-magic-explained/
import styled, {keyframes, css} from 'styled-components';

import {c} from '../ThemeProvider';
export interface PreviewShellProps {
    children?: React.ReactNode;
}

const StyledRoot = styled.div`
    height: 100%;
    display: none;
    min-width: 334;
    background-color: ${props => c('content')};
    border-left: ${props => "1px solid " + c('border')};
    @media (min-width: 780px) {
        display: 'flex';
    }
`
export const PreviewShell: FunctionComponent<PreviewShellProps> = ({
    children
 }) => 

     (
    <StyledRoot
    >
        {children}
    </StyledRoot>
    )

;
export default PreviewShell;
