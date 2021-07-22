/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\EditorView\NoFileSelected.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import {StyleSheet, css} from 'aphrodite';
import * as React from 'react';
export default class NoFileSelected extends React.PureComponent {
        render() {
            return  (
                <div
                 className={css(styles.container)}>
                    <h4
                     className={css(styles.text)}>
                        Select a file to view and edit
                    </h4>
                </div>
                )
            ;
        }
    }
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
     }, 
    text: {
        fontSize: '1.5em', 
        fontWeight: 500, 
        opacity: 0.5
     }
 });
