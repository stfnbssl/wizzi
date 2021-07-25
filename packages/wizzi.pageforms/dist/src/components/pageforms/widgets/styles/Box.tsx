/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.pageforms\.wizzi\src\components\pageforms\widgets\styles\Box.tsx.ittf
    utc time: Sun, 25 Jul 2021 18:49:11 GMT
*/
import styled, {keyframes, css} from 'styled-components';
import {c} from '../../ThemeProvider';
export const Box = styled.div((props: any) => {

    const ret = {};
    if (props.fontSize) {
        ret.fontSize = props.fontSize;
    }
    if (props.color) {
        ret.color = props.color;
    }
    if (props.margin) {
        ret.margin = props.margin;
    }
    if (props.padding) {
        ret.padding = props.padding;
    }
    if (props.border) {
        ret.border = props.border;
    }
    return ret;
}
);
export default Box;
