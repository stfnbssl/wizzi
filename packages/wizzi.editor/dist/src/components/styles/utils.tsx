/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\styles\utils.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import {themeGet} from '@styled-system/theme-get';
import {css} from 'styled-components';


export const applyVariations = (componentName: string, variations: any = null) => 

    ((props: any) => {
    
        const {
            color, 
            variation
         } = props;
        if (variations && typeof variation === 'string') {
            return css`
                    ${variations[variation] || ''}
                    ${typeof color === 'string' && themeGet(`componentStyles.${componentName}.${variation}.${color}`, '')}
                `
            ;
        }
        return css`
                ${themeGet(`componentStyles.${componentName}.${color}`, '')}
            `
        ;
    }
    )
;
import {boxShadows as defaultBoxShadowTheme} from '../SCTheme';

export function boxShadow(props: any) {

    const boxShadowTheme = props.theme.boxShadows || defaultBoxShadowTheme;
    const boxShadows = {
        sm: {
            'box-shadow': boxShadowTheme[0]
         }, 
        md: {
            'box-shadow': boxShadowTheme[1]
         }, 
        lg: {
            'box-shadow': boxShadowTheme[2]
         }, 
        xl: {
            'box-shadow': boxShadowTheme[3]
         }
     };
    
    // @ts-ignore
    return boxShadows[props.boxShadowSize]; 
}

export const color = (props: any) => {

    if (!props.theme || (!props.color && !props.bg)) {
        return '';
    }
    else {
        if (props.color === 'text') {
            return props.color && props.bg ? getByPalette(props) : css`
                        color: ${getPaletteColor('base')(props)};
                    `
            ;
        }
        else {
            if (props.color && props.bg) {
                return getByPalette(props);
            }
            else {
                if (props.color && hasPaletteColor(props)) {
                    return css`
                            background-color: ${getPaletteColor('base')(props)};
                            color: ${getTextColorOn('base')(props)};
                        `
                    ;
                }
                else {
                    if (props.color) {
                        return css`
                                color: ${getPaletteColor('base')(props)};
                            `
                        ;
                    }
                    else {
                        return css`
                                background-color: ${getPaletteColor(props.bg, 'base')(props)};
                            `
                        ;
                    }
                }
            }
        }
    }
}
;
export const decomposeColor = (color: string):  number[] => {

    if (color.charAt(0) === '#') {
        return decomposeColor(hexToRgb(color));
    }
    return color.substring(color.indexOf('(') + 1, color.length - 1).split(',').map(value => 
        
            parseFloat(value)
        );
}
;

export const getByPalette = (props: any) => 

    css`
        background-color: ${getPaletteColor(props.bg, 'base')(props)};
        color: ${getPaletteColor(props.color, 'base')(props)};
    `

;

export const getContrastRatio = (colorA: string, colorB: string) => {

    const luminA = getLuminance(colorA);
    const luminB = getLuminance(colorB);
    return (Math.max(luminA, luminB) + 0.05) / (Math.min(luminA, luminB) + 0.05);
}
;

export const getLuminance = (color: string) => {

    const [r, g, b] = decomposeColor(color).map((val: number) => {
    
        val = val / 255;
        return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
    }
    );
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
;

export const getPaletteColor = (...args: string[]) => 

    ((props: any) => {
    
        let color = args.length === 2 ? args[0] : props.color;
        let shade = args.length === 2 ? args[1] : args[0];
        const colorShade = shade.match(/^([a-z]+)\.([a-z]+)$/i);
        if (colorShade) {
            color = colorShade[0];
            shade = colorShade[1];
        }
        return (themeGet(`palette.${color}.${shade}`)(props)
             || themeGet(`palette.${color}`)(props)
             || themeGet(`colors.${color}`)(props)
             || color);
    }
    )
;

export const getTextColorOn = (name: string) => 

    ((props: any) => {
    
        const {
            theme
         } = props;
        if (theme.palette) {
            const color = getPaletteColor(name)(props);
            const text = theme.palette.text;
            if (color) {
                return getContrastRatio(text.lightest, color) >= theme.contrastRatio ? text.lightest : text.base;
            }
            return text.base;
        }
        return '';
    }
    )
;
export const hasPaletteColor = (props: any) => {

    return (props.theme && props.theme.palette && typeof props.color === 'string' && Object.keys(props.theme.palette).includes(props.color.split('.')[0]));
}
;
export const hexToRgb = (color: string) => {

    color = color.substring(1);
    let colors = color.match(new RegExp(`.{1,${color.length / 3}}`, 'g'));
    if (colors) {
        let rgb = colors.map(val => 
        
            parseInt(val.length === 1 ? val + val : val, 16)
        ).join(', ')
        ;
        return `rgb(${rgb})`;
    }
    else {
        return '';
    }
}
;
