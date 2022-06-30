/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.ui\.wizzi\src\components\widgets\Text.tsx.ittf
    utc time: Fri, 24 Jun 2022 16:36:04 GMT
*/
import React from 'react';
import styled, {css} from 'styled-components';
import {system, display, DisplayProps, typography, TypographyProps, layout, LayoutProps, space, SpaceProps, position, PositionProps, color, ColorProps} from 'styled-system';
import {themeGet} from '@styled-system/theme-get';

export type TextProps = DisplayProps | TypographyProps | LayoutProps | SpaceProps | PositionProps | ColorProps | // eslint-disable-next-line @typescript-eslint/no-explicit-any
{ 
    as?:  keyof JSX.IntrinsicElements | React.ComponentType<any>;
};

export const caps = () => 

    ((props: any) => 
    
        props.caps ? css`
                text-transform: uppercase;
                -webkit-letter-spacing: ${themeGet('letterSpacings.caps')(props)};
                -moz-letter-spacing: ${themeGet('letterSpacings.caps')(props)};
                -ms-letter-spacing: ${themeGet('letterSpacings.caps')(props)};
                letter-spacing: ${themeGet('letterSpacings.caps')(props)};
            `
         : null
    )
;

export const regular = () => 

    ((props: any) => 
    
        props.regular ? css`
                font-weight: ${props.theme.regular};
            `
         : null
    )
;

export const bold = () => 

    ((props: any) => 
    
        props.bold ? css`
                font-weight: ${props.theme.regular};
            `
         : null
    )
;
export const textShadow = () => 

    ((props: any) => {
    
        const textShadowSize = props.textShadowSize || 'md';
        return props.enableTextShadow ? css`
                    font-weight: ${props.theme.regular};
                `
             : null;
    }
    )
;

console.log('display', display);
console.log('typography', typography);
console.log('layout', layout);
console.log('space', space);
console.log('position', position);
console.log('color', color);

const textProps = css`
    ${caps}
    ${regular}
    ${bold}
    ${textShadow}
    ${display}
    ${typography}
    ${layout}
    ${space}
    ${position}
    ${color}
`
;

export const Text = styled.div`
    ${textProps}
`

export const Span = styled.span`
    ${textProps}
`

export const Paragraph = styled.p`
    ${textProps}
`

export const Strike = styled.s`
    ${textProps}
`

Text.displayName = 'Text';

Span.displayName = 'Text.span';
(Text as any).span = Span;

Paragraph.displayName = 'Text.p';
(Text as any).p = Paragraph;

Strike.displayName = 'Text.s';
(Text as any).s = Strike;

export default Text;
