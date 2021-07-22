/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.pageforms\.wizzi\src\components\pageforms\widgets\FormButton.tsx.ittf
    utc time: Thu, 22 Jul 2021 20:20:24 GMT
*/
import React, {FunctionComponent} from 'react';
// see https://mxstbr.blog/2016/11/styled-components-magic-explained/
import styled, {keyframes, css} from 'styled-components';

import {c} from '../../ThemeProvider';

export interface FormButtonProps {
    id: string;
    name: string;
    label: string;
}

interface RootStyleProps {
}
const StyledRoot = styled.button<RootStyleProps>`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 1px solid;
    -webkit-border-radius: 6px;
    -khtml-border-radius: 6px;
    -moz-border-radius: 6px;
    -o-border-radius: 6px;
    border-radius: 6px;
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    padding: 5px 16px;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
    
`
export const FormButton: FunctionComponent<FormButtonProps> = ({
    id, 
    name, 
    label
 }) => {

    return  (
        <StyledRoot
         id={id}>
            {label}
        </StyledRoot>
        )
    ;
}
;
export default FormButton;
