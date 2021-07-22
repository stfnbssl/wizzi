/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.pageforms\.wizzi\src\components\pageforms\widgets\FormRadioBox.tsx.ittf
    utc time: Thu, 22 Jul 2021 20:20:24 GMT
*/
import React, {FunctionComponent} from 'react';
// see https://mxstbr.blog/2016/11/styled-components-magic-explained/
import styled, {keyframes, css} from 'styled-components';

import {c} from '../../ThemeProvider';

export interface FormRadioBoxProps {
    id: string;
    name: string;
    label: string;
    sublabel?: string;
    sublabelid?: string;
    checked: boolean;
    value: any;
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
const StyledInput = styled.input<RootStyleProps>`
    float: left;
    margin: 5px 0 0 -20px;
    vertical-align: middle;
    
`
const StyledLabelSpan = styled.span<RootStyleProps>`
    color: ${props => c('secondary-text')};
    display: block;
    font-size: 12px;
    font-weight: 400;
    margin: 0;
    min-height: 17px;
`
export const FormRadioBox: FunctionComponent<FormRadioBoxProps> = ({
    id, 
    name, 
    label, 
    sublabel, 
    sublabelid, 
    checked, 
    value, 
    onChange
 }) => 

     (
    <StyledRoot
    >
        <StyledInputLabel
        >
            <StyledInput 
                aria-describedby={sublabelid}
                type='radio'
                value={value}
                checked={checked}
                name={name}
                id={id}
                onChange={onChange}
             />
            {label}
        </StyledInputLabel>
        <StyledLabelSpan
         id={sublabelid}>
            {sublabel}
        </StyledLabelSpan>
    </StyledRoot>
    )

;
export default FormRadioBox;
