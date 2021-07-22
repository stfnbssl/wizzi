/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.pageforms\.wizzi\src\components\pageforms\widgets\styles\Text.tsx.ittf
    utc time: Thu, 22 Jul 2021 20:20:24 GMT
*/
import styled, {keyframes, css} from 'styled-components';
import {c} from '../../ThemeProvider';
export const Text = styled.span((props: any) => {

    const ret = {
        marginLeft: '3px' || props.marginLeft
     };
    if (props.fontSize) {
        ret.fontSize = props.fontSize;
    }
    if (props.color) {
        ret.color = props.color;
    }
    if (props.padding) {
        ret.margin = props.padding;
    }
    return ret;
}
);
export default Text;
