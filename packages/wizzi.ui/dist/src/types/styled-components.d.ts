/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.ui\.wizzi\src\types\styled-components.d.ts.ittf
    utc time: Fri, 24 Jun 2022 16:36:04 GMT
*/
import 'styled-components';
interface IPalette {
    main: string;
    contrastText: string;
}
declare module 'styled-components' {
    export interface DefaultTheme {
        borderRadius: string;
        palette: { 
            common: { 
                black: string;
                white: string;
            };
            primary2: IPalette;
            secondary2: IPalette;
            primary: string;
            secondary: string;
            accent: { 
                light: string;
                dark: string;
            };
            error: string;
            warning: string;
            success: string;
            text: { 
                light: string;
                dark: string;
            };
            background: { 
                light: string;
                dark: string;
            };
            content: { 
                light: string;
                dark: string;
            };
            ayu: { 
                mirage: { 
                    text: string;
                    border: string;
                    background: string;
                };
            };
            border: string;
        };
    }
}
