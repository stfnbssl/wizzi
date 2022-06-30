/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.ui\.wizzi\src\components\widgets\button.tsx.ittf
    utc time: Fri, 24 Jun 2022 16:36:04 GMT
*/
import React, {FunctionComponent} from 'react';
// see https://mxstbr.blog/2016/11/styled-components-magic-explained/
import styled, {keyframes, css} from 'styled-components';


export interface ButtonProps {
    active?: boolean;
    icon: string;
    theme: string;
    children: React.ReactNode;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

interface ButtonStyleProps {
    active?: boolean;
    dark?: boolean;
}
const StyledButton = styled.button<ButtonStyleProps>`
    position: relative;
    border: 0;
    outline: 0;
    margin: 0;
    height: 30;
    padding: 0 16px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-size: 16;
    background-repeat: no-repeat;
    background-position: center right 8px;
    background-color: ${props => props.active ? 'rgba(0, 0, 0, 0.1)' : 'transparent'};
    &:active {
        opacity: ${props => props.dark ? 0.3 : 0.5};
    }
    @media (min-width: 720px) {
        padding: 5px 32px 5px 8px;
    }
`
export const Button: FunctionComponent<ButtonProps> = ({
    active, 
    icon, 
    theme, 
    children, 
    onClick
 }) => 

     (
    <StyledButton
     onClick={onClick} dark={ theme == 'dark' } style={icon ? {
                backgroundImage: `url(${icon})`
             } : undefined}>
        {children}
    </StyledButton>
    )

;
export default Button;
