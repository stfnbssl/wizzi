/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\WebFrame.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import {StyleSheet, css} from 'aphrodite';
import * as React from 'react';
import {c} from '../ThemeProvider';

export type WebFrameProps = { 
    previewURL: string;
};

export function WebFrame({
    previewURL
 }: Props) {

    return  (
        <div
         className={css(styles.container)}>
            <iframe
             src={previewURL} allow="geolocation; camera; microphone" className={css(styles.frame)} />
        </div>
        )
    ;
}

export default WebFrame;

const styles = StyleSheet.create({
    container: {
        position: 'relative', 
        display: 'flex', 
        flex: 1, 
        width: '100%', 
        height: '100%'
     }, 
    frame: {
        position: 'relative', 
        width: '100%', 
        height: '100%', 
        border: 0, 
        zIndex: 1, 
        backgroundColor: c('content', 'light')
     }
 });
