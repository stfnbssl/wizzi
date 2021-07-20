/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\AppDetails.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import {StyleSheet, css} from 'aphrodite';
import * as React from 'react';
import {c} from './ThemeProvider';
import {Button} from './widgets/Button';
type Props = { 
    name: string;
    description: string | undefined;
    experienceURL: string;
    onOpenEditor: () => void;
    userAgent: string;
};
export default function AppDetails({
        name, 
        description, 
        experienceURL, 
        onOpenEditor, 
        userAgent
     }: Props) {
    
        return  (
            <main
             className={css(styles.container)}>
                <div
                 className={css(styles.card)}>
                    <div
                     className={css(styles.section, styles.first)}>
                        <div
                         className={css(styles.details)}>
                            <h1
                             className={css(styles.title)}>
                                {name || 'Unnamed Packi'}
                            </h1>
                            <p
                            >
                                {description ?? 'No description'}
                            </p>
                        </div>
                        <div
                         className={css(styles.openInEditor)}>
                            <Button
                             className={css(styles.button)} onClick={onOpenEditor}>
                                Open in editor
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            )
        ;
    }
const styles = StyleSheet.create({
    container: {
        overflow: 'auto', 
        height: '100%', 
        width: '100%', 
        color: c('text'), 
        '@media (max-width: 590px)': {
            backgroundColor: c('content'), 
            textAlign: 'center'
         }
     }, 
    card: {
        backgroundColor: c('content'), 
        borderRadius: 6, 
        opacity: 1, 
        width: 420, 
        margin: '4rem auto', 
        border: `1px solid ${c('border')}`, 
        '@media (max-width: 590px)': {
            margin: 0, 
            border: 0, 
            width: '100%'
         }
     }, 
    section: {
        borderTop: `1px solid ${c('border')}`, 
        padding: '3rem'
     }, 
    details: {
        
     }, 
    first: {
        borderTop: 0
     }, 
    title: {
        fontSize: '1.75rem', 
        fontWeight: 500, 
        marginTop: 0
     }, 
    openInClient: {
        margin: '2rem -.5em 1rem'
     }, 
    openInEditor: {
        margin: '0 -.5em -.5em'
     }, 
    button: {
        display: 'block', 
        width: 'calc(100% - 1em)'
     }, 
    qrcode: {
        display: 'block', 
        margin: '0 0 0 2rem', 
        '@media (max-width: 590px)': {
            margin: '1rem auto 0'
         }
     }, 
    qrcodeSection: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        '@media (max-width: 420px)': {
            flexDirection: 'column', 
            alignItems: 'flex-start'
         }
     }, 
    qrcodeDetails: {
        
     }, 
    download: {
        display: 'inline-block', 
        margin: '.5rem 1rem 0 0', 
        textDecoration: 'none'
     }, 
    downloadIcon: {
        height: 36
     }, 
    downloadButtons: {
        margin: '1.5rem 0 0'
     }
 });
