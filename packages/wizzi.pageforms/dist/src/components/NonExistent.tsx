/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.pageforms\.wizzi\src\components\NonExistent.tsx.ittf
    utc time: Tue, 20 Jul 2021 08:45:17 GMT
*/
import {StyleSheet, css} from 'aphrodite';
import * as React from 'react';
export default function NonExistent() {
    
        return  (
            <div
             className={css(styles.container)}>
                <div
                 className={css(styles.content)}>
                    <h1
                     className={css(styles.heading)}>
                        Oops!
                    </h1>
                    <p
                     className={css(styles.message)}>
                        We couldn't find the Packi you're looking for. Go to
                        <a
                         href="/">
                          the homepage
                        </a>
                        .
                    </p>
                </div>
            </div>
            )
        ;
    }
const styles = StyleSheet.create({
    container: {
        height: '100%', 
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 24
     }, 
    logo: {
        height: 56, 
        width: 56, 
        marginRight: 24
     }, 
    code: {
        paddingRight: 24, 
        fontSize: '2em'
     }, 
    content: {
        paddingLeft: 24, 
        borderLeft: '1px solid #eee'
     }, 
    heading: {
        margin: 0
     }, 
    message: {
        marginBottom: 0
     }
 });
