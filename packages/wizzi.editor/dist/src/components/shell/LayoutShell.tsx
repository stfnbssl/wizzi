/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\shell\LayoutShell.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import React, {FunctionComponent} from 'react';
// see https://mxstbr.blog/2016/11/styled-components-magic-explained/
import styled, {keyframes, css} from 'styled-components';


export interface LayoutShellProps {
    children: React.ReactNode;
}

const StyledLayout = styled.div`
    display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -ms-flex: 1;
    flex: 1;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: space-between;
    -ms-flex-pack: space-between;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    position: relative;
    height: 100%;
    min-height: 0;
    min-width: 0;
    
`
export const LayoutShell: FunctionComponent<LayoutShellProps> = ({
    children
 }) => 

     (
    <StyledLayout
    >
        {children}
    </StyledLayout>
    )

;
export default LayoutShell;
