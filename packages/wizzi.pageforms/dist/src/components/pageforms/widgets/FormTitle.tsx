/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.pageforms\.wizzi\src\components\pageforms\widgets\FormTitle.tsx.ittf
    utc time: Tue, 20 Jul 2021 08:45:17 GMT
*/
import React, {FunctionComponent} from 'react';
// see https://mxstbr.blog/2016/11/styled-components-magic-explained/
import styled, {keyframes, css} from 'styled-components';

import {c} from '../../ThemeProvider';

export interface FormTitleProps {
    title: string;
    subtitle?: string;
    subtitle2?: string;
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
    
`
const StyledH1 = styled.h1<RootStyleProps>`
    margin-bottom: 4px;
    
`
const StyledSubTitle = styled.span<RootStyleProps>`
    display: block;
    font-size: 14px;
    font-weight: 400;
    margin: 0;
    
`
export const FormTitle: FunctionComponent<FormTitleProps> = ({
    title, 
    subtitle, 
    subtitle2
 }) => {

    return  (
        <StyledRoot
        >
            <StyledH1
            >
                {title}
            </StyledH1>
            {
                subtitle && subtitle.length > 0
                 &&  (
                    <StyledSubTitle
                    >
                        {subtitle}
                    </StyledSubTitle>
                    )
                
            }
            {
                subtitle2 && subtitle2.length > 0
                 &&  (
                    <StyledSubTitle
                    >
                        {subtitle2}
                    </StyledSubTitle>
                    )
                
            }
        </StyledRoot>
        )
    ;
}
;
export default FormTitle;
