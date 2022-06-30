/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.ui\.wizzi\src\components\widgets\Box.tsx.ittf
    utc time: Fri, 24 Jun 2022 16:36:04 GMT
*/
import React from 'react';
import styled from 'styled-components';
import {display, DisplayProps, layout, LayoutProps, space, SpaceProps, color, ColorProps, shadow, ShadowProps, typography, TypographyProps} from 'styled-system';

export type BoxProps = DisplayProps | LayoutProps | SpaceProps | ColorProps | ShadowProps | TypographyProps | // eslint-disable-next-line @typescript-eslint/no-explicit-any
{ 
    as?:  keyof JSX.IntrinsicElements | React.ComponentType<any>;
};

console.log('display', display);
console.log('layout', layout);
console.log('space', space);
console.log('color', color);
console.log('shadow', shadow);
console.log('typography', typography);

export const Box = styled.div<BoxProps>`
    ${display}
    ${layout}
    ${space}
    ${color}
    ${shadow}
    ${typography}
`

Box.displayName = 'Box';

export default Box;
