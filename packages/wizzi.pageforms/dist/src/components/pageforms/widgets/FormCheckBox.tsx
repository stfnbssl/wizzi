/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.pageforms\.wizzi\src\components\pageforms\widgets\FormCheckBox.tsx.ittf
    utc time: Thu, 22 Jul 2021 20:20:24 GMT
*/
import React, {FunctionComponent} from 'react';
// see https://mxstbr.blog/2016/11/styled-components-magic-explained/
import styled, {keyframes, css} from 'styled-components';

import {c} from '../../ThemeProvider';

export interface FormCheckBoxProps {
    id: string;
    name: string;
    label: string;
    sublabel?: string;
    value: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface RootStyleProps {
}
const StyledRoot = styled.div<RootStyleProps>`
    margin: 15px 0;
    padding-left: 20px;
    vertical-align: middle;
    
`
const StyledInputLabel = styled.dt<RootStyleProps>`
    font-weight: 600;
    
`
const StyledLabelSpan = styled.span<RootStyleProps>`
    color: var(--color-text-secondary);
    display: block;
    font-size: 12px;
    font-weight: 400;
    margin: 0;
    
`
const StyledInput = styled.input<RootStyleProps>`
    float: left;
    margin: 5px 0 0 -20px;
    vertical-align: middle;
    
`
export const FormCheckBox: FunctionComponent<FormCheckBoxProps> = ({
    id, 
    name, 
    label, 
    sublabel, 
    value, 
    onChange
 }) => {

    return  (
        <StyledRoot
        >
            <StyledInputLabel
            >
                <StyledInput 
                    type="checkbox"
                    value="1"
                    name={name}
                    id={id}
                    checked={value}
                    onChange={onChange}
                 />
                {label}
            </StyledInputLabel>
            <StyledLabelSpan
            >
                {sublabel}
            </StyledLabelSpan>
        </StyledRoot>
        )
    ;
}
;
export default FormCheckBox;
