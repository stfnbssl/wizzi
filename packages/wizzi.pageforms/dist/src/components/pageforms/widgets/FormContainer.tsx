/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.pageforms\.wizzi\src\components\pageforms\widgets\FormContainer.tsx.ittf
    utc time: Sun, 25 Jul 2021 18:49:11 GMT
*/
import React, {FunctionComponent} from 'react';
// see https://mxstbr.blog/2016/11/styled-components-magic-explained/
import styled, {keyframes, css} from 'styled-components';

import {c} from '../../ThemeProvider';

export interface FormContainerProps {
    children: React.ReactNode;
}

interface RootStyleProps {
}
const StyledRoot = styled.div<RootStyleProps>`
    display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    background-color: #fff;
    
`
export const FormContainer: FunctionComponent<FormContainerProps> = ({
    children
 }) => {

    return  (
        <StyledRoot
        >
            {children}
        </StyledRoot>
        )
    ;
}
;
export default FormContainer;
