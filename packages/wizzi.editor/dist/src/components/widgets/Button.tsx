/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\Button.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import React, {FunctionComponent} from 'react';
// see https://mxstbr.blog/2016/11/styled-components-magic-explained/
import styled, {keyframes, css} from 'styled-components';

import {c, s, ThemeName} from '../ThemeProvider';

export interface ButtonProps {
    variant?: 'primary' | 'secondary';
    large?: boolean;
    icon?: string;
    disabled?: boolean;
    loading?: boolean;
    type?: 'submit' | 'button';
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    children: React.ReactNode;
}

interface RootStyleProps extends ButtonProps {
    primary: boolean;
    secondary: boolean;
    normal: boolean;
    isLoading?: boolean;
    large?: boolean;
}
const buttonKeyframes = keyframes`
    from  {
        -webkit-transform: rotate(0deg);
        -ms-transition: rotate(0deg);
        transform: rotate(0deg);
    }
    to  {
        -webkit-transform: rotate(360deg);
        -ms-transition: rotate(360deg);
        transform: rotate(360deg);
    }
    
`
const StyledRoot = styled.button<RootStyleProps>`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    color: ${props => props.primary ? c('primary-text') : props.secondary ? c('secondary-text') : c('text')};
    background-color: ${props => props.primary ? c('primary') : props.secondary ? c('secondary') : c('content')};
    outline: 0;
    border: ${props => props.primary ? "1px solid transparent" : props.secondary ? "1px solid transparent" : "1px solid " + c('border')};
    -webkit-border-radius: 3px;
    -khtml-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    border-radius: 3px;
    white-space: nowrap;
    text-align: center;
    -webkit-text-decoration: none;
    text-decoration: none;
    font-size: ${props => props.large ? "16px" : 'inherit'};
    width: ${props => props.large ? "100%" : 'inherit'};
    padding: ${props => props.icon ? ".5em 1em .5em 36px" : props.large ? "1em 1.5em" : props.normal ? ".5em 1em" : "0"};
    margin: ${props => props.icon ? ".5em" : props.large ? ".5em 0" : props.normal ? ".5em" : "0"};
    pointer-events: ${props => props.disabled ? "none" : "inherit"};
    opacity: ${props => props.disabled ? "0.3" : "inherit"};
    background-size: ${props => props.icon ? "16px" : "auto"};
    background-repeat: ${props => props.icon ? "no-repeat" : "repeat"};
    background-position: ${props => props.icon ? "12px center" : "0% 0%"};
    transition-duration: 170ms;
    transition-property: box-shadow;
    transition-timing-function: linear;
    background-image: ${props => props.icon ? "url(" + props.icon + ")" : "none"};
    ${props => {
        if (props.isLoading) {
            return css`
                &:before {
                    display: inline-block;
                    content: "";
                    border-width: 2px;
                    border-style: solid;
                    border-top-color: ${props => "rgba(255, 255, 255, 0.2)"};
                    border-right-color: ${props => "rgba(255, 255, 255, 0.2)"};
                    border-bottom-color: ${props => "rgba(255, 255, 255, 0.2)"};
                    border-left-color: ${props => c('primary-text')};
                    height: 16px;
                    width: 16px;
                    -webkit-border-radius: 50%;
                    -khtml-border-radius: 50%;
                    -moz-border-radius: 50%;
                    -o-border-radius: 50%;
                    border-radius: 50%;
                    margin-right: .75em;
                    vertical-align: -3px;
                    animation-name: ${props => buttonKeyframes};
                    animation-duration: 1s;
                    animation-iteration-count: infinite;
                    animation-timing-function: linear;
                }
            `
        }
        
    }}
    &:hover {
        -webkit-box-shadow: ${props => s('small')};
        -moz-box-shadow: ${props => s('small')};
        -o-box-shadow: ${props => s('small')};
        box-shadow: ${props => s('small')};
    }
`
export const Button: FunctionComponent<ButtonProps> = ({
    variant, 
    large, 
    icon, 
    disabled, 
    loading, 
    type, 
    className, 
    onClick, 
    children
 }) => 

     (
    <StyledRoot 
        className={className}
        disabled={disabled}
        onClick={onClick}
        primary={variant === 'primary'}
        secondary={variant === 'secondary'}
        normal={!!large == false}
        icon={icon}
        large={large}
        isLoading={loading}
    >
        {children}
    </StyledRoot>
    )

;
export default Button;
