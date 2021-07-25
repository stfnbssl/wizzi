/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.pageforms\.wizzi\src\components\pageforms\widgets\FormFile.tsx.ittf
    utc time: Sun, 25 Jul 2021 18:49:11 GMT
*/
import React, {FunctionComponent} from 'react';
// see https://mxstbr.blog/2016/11/styled-components-magic-explained/
import styled, {keyframes, css} from 'styled-components';

import {c, s} from '../../ThemeProvider';
function giveCustomAttributes(input) {

    input.setAttribute('webkitdirectory', '');
    input.setAttribute('moz-directory', '');
}

export interface FormFileProps {
    id: string;
    name: string;
    label: string;
    required: boolean;
    value: any[];
    onChange: any;
}

interface RootStyleProps {
}
const StyledFormGroup = styled.dl<RootStyleProps>`
    
`
const StyledInputLabel = styled.dt<RootStyleProps>`
    font-weight: 600;
    
`
const StyledLabelSpan = styled.span<RootStyleProps>`
    color: ${props => c('secondary-text')};
    font-size: 12px;
    margin: 4px 4px 2px;
    min-height: 17px;
`
const StyledInputBox = styled.dd<RootStyleProps>`
    margin: 2px 0;
    
`
const StyledInput = styled.input<RootStyleProps>`
    background-color: ${props => c('background')};
    background-position: right 8px center;
    background-repeat: no-repeat;
    border: ${props => '1px solid ' + c('border')};
    -webkit-border-radius: 6px;
    -khtml-border-radius: 6px;
    -moz-border-radius: 6px;
    -o-border-radius: 6px;
    border-radius: 6px;
    -webkit-box-shadow: ${props => s('small')};
    -moz-box-shadow: ${props => s('small')};
    -o-box-shadow: ${props => s('small')};
    box-shadow: ${props => s('small')};
    color: ${props => c('primary-text')};
    font-size: 14px;
    line-height: 20px;
    outline: none;
    padding: 5px 12px;
    vertical-align: middle;
`
export const FormFile: FunctionComponent<FormFileProps> = ({
    id, 
    name, 
    label, 
    required, 
    value, 
    onChange
 }) => {

    return  (
        <StyledFormGroup
        >
            <StyledInputLabel
             htmlFor={name}>
                {label}
                <StyledLabelSpan
                >
                    { required ? '(*)' : '(optional)' }
                </StyledLabelSpan>
            </StyledInputLabel>
            <StyledInputBox
            >
                <StyledInput 
                    type="file"
                    ref={giveCustomAttributes}
                    multiple
                    name={name}
                    id={name}
                    onChange={(ev: any) => 
                        
                            onChange([...ev.target.files])
                    }
                 />
                {
                    value && value.length > 0
                     &&  (
                        <div
                        >
                            <div
                             style={{
                                    fontWeight: 600
                                 }}>
                                Files to upload
                            </div>
                            {
                                value.map((file, ndx) => 
                                
                                     (
                                    <dl
                                     key={ndx} style={{
                                            margin: 0
                                         }}>
                                        <dd
                                         style={{
                                                margin: 0
                                             }}>
                                            {file.relPath}
                                        </dd>
                                    </dl>
                                    )
                                
                                )
                            }
                        </div>
                        )
                    
                }
            </StyledInputBox>
        </StyledFormGroup>
        )
    ;
}
;
export default FormFile;
