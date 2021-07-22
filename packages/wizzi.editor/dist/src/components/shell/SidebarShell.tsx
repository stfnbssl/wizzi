/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\shell\SidebarShell.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import React, {FunctionComponent} from 'react';
// see https://mxstbr.blog/2016/11/styled-components-magic-explained/
import styled, {keyframes, css} from 'styled-components';

import {c} from '../ThemeProvider';

export interface SidebarShellProps {
    children?: React.ReactNode;
}

const StyledRoot = styled.div`
    display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    height: 100%;
    min-width: 240px;
    border-right: ${props => "1px solid " + c('border')};
    background-color: ${props => c('content')};
`
export const SidebarShell: FunctionComponent<SidebarShellProps> = ({
    children
 }) => 

     (
    <StyledRoot
    >
        {children}
    </StyledRoot>
    )

;
export default SidebarShell;
