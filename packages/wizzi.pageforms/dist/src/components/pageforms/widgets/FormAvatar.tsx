/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.pageforms\.wizzi\src\components\pageforms\widgets\FormAvatar.tsx.ittf
    utc time: Sun, 25 Jul 2021 18:49:11 GMT
*/
import React, {FunctionComponent} from 'react';
// see https://mxstbr.blog/2016/11/styled-components-magic-explained/
import styled, {keyframes, css} from 'styled-components';

import {c} from '../../ThemeProvider';

export interface FormAvatarProps {
    title: string;
    subtitle?: string;
    avatar_url: string;
}

const StyledImg = styled.img((props: any) => {

    return {
            borderRadius: '50%!important', 
            boxShadow: '0 0 0 1px ' + c('avatar-border'), 
            display: 'inline-block', 
            flexShrink: 0, 
            lineHeight: 1, 
            overflow: 'hidden', 
            verticalAlign: 'middle', 
            width: props.width || "260px", 
            height: props.width || "260px", 
            aspectRatio: props.aspectRatio || "auto 260 / 260"
         };
}
);
export const FormAvatar: FunctionComponent<FormAvatarProps> = ({
    title, 
    subtitle, 
    avatar_url
 }) => {

    return  (
        <StyledImg
         src={avatar_url} />
        )
    ;
}
;
export default FormAvatar;
