/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\SCTheme.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
//
// styled-system theme
// sample taken from https://github.com/hackclub/design-system/blob/master/src/theme.js
//
// see https://styled-system.com/table
// for styled-system functions
//
import {Theme} from 'styled-system';
import {includes, get} from 'lodash';
import palx from 'palx';

const addAliases = (obj: { 
}, aliases: string[]) => 

    aliases.forEach((key, i) => 
    
        Object.defineProperty(obj, key, {
            enumerable: false, 
            get() {
                return this[i];
            }
            
         })
    )
;

const bp_aliases = [
    'sm', 
    'md', 
    'lg', 
    'xl'
];

export const breakpoints = [
    32, 
    48, 
    64, 
    80
];
addAliases(breakpoints, bp_aliases);

export let mediaQueries: { 
    [size: string]: string;
} = {
    reduceMotion: '@media (prefers-reduced-motion: reduce)', 
    reduceTransparency: '@media (prefers-reduced-transparency: reduce)'
 };
bp_aliases.forEach((key, i) => 

    mediaQueries[key] = `@media screen and (min-width:${breakpoints[i]}em)`
)

export const space = [
    0, 
    6, 
    12, 
    18, 
    24, 
    36, 
    72, 
    108, 
    144, 
    288, 
    432
];

export const fontSizes = [
    13.5, 
    16, 
    18, 
    24, 
    27, 
    36, 
    48, 
    54, 
    72, 
    96
];

export const fontWeights = [
    100, 
    200, 
    300, 
    400, 
    500, 
    600, 
    700, 
    800, 
    900
];
(fontWeights as any).normal = fontWeights[2];
(fontWeights as any).bold = fontWeights[6];

export const lineHeights = {
    solid: 1, 
    title: 1.25, 
    copy: 1.5
 };

export const letterSpacings = {
    normal: 'normal', 
    tracked: '0.1em', 
    tight: '-0.05em', 
    mega: '0.25em'
 };

export const fonts = {
    serif: 'athelas, georgia, times, serif', 
    sansSerif: '-apple-system, BlinkMacSystemFont, "avenir next", avenir, "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial, sans-serif'
 };

const red = '#e42d42';
const blue = '#2d9ce4';
const palette_color = blue;
export const palette = palx(blue);
export const grays = {
    darker: '#121217', 
    dark: '#17171d', 
    black: palette.black, 
    slate: palette.gray[8], 
    silver: palette.gray[7], 
    smoke: palette.gray[2], 
    snow: palette.gray[0], 
    white: '#ffffff'
 };

export const brand = {
    primary: red, 
    accent: palette.indigo[4], 
    success: palette.teal[5], 
    info: palette.blue[5], 
    warning: palette.orange[5], 
    error: palette.red[7], 
    muted: grays.silver
 };

export const colors = {
    ...brand, 
    ...grays, 
    ...palette
 };
export const pill = '9999px';
    // styled-system’s `borderRadius` function can hook into the `radii` object/array
    

export const radii = [
    '0px', 
    '4px', 
    '8px', 
    '16px', 
    pill, 
    '100%'
];

export const shadowColor = 'rgba(0,0,0,0.125)';

export const baseShadow = '0 0 2px 0 rgba(0,0,0,.0625),';

export const boxShadows = [
    baseShadow + (`0 2px 4px 0 ${shadowColor}`), 
    baseShadow + (`0 4px 8px 0 ${shadowColor}`), 
    baseShadow + (`0 12px 12px 0 ${shadowColor}`), 
    baseShadow + (`0 24px 24px 0 ${shadowColor}`)
];

export const theme: Theme = {
    breakpoints, 
    mediaQueries, 
    space, 
    fontSizes, 
    fontWeights, 
    colors, 
    radii
 };

export default theme;
console.log('SCTheme', theme);
