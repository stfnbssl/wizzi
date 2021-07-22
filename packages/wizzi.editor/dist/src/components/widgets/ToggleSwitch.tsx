/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\ToggleSwitch.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import {StyleSheet, css} from 'aphrodite';
import classnames from 'classnames';
import * as React from 'react';
import {c} from '../ThemeProvider';

export type ToggleSwitchProps = { 
    checked: boolean;
    label: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
};

export function ToggleSwitch(props: ToggleSwitchProps) {

    return  (
        <label
         className={classnames(css(styles.container), props.className)}>
            <span
             className={css(styles.label)}>
                {props.label}
            </span>
            <span
             className={css(styles.switch, props.checked ? styles.active : styles.inactive)} />
            <input 
                type="checkbox"
                checked={props.checked}
                onChange={props.onChange}
                className={css(styles.check)}
             />
        </label>
        )
    ;
}

const styles = StyleSheet.create({
    container: {
        display: 'flex', 
        alignItems: 'center', 
        margin: 8, 
        cursor: 'pointer', 
        whiteSpace: 'nowrap'
     }, 
    switch: {
        display: 'inline-block', 
        verticalAlign: -4, 
        width: 36, 
        height: 20, 
        borderRadius: 12, 
        border: `1px solid ${c('border')}`, 
        backgroundColor: c('background'), 
        ':before': {
            content: '""', 
            display: 'inline-block', 
            height: 14, 
            width: 14, 
            borderRadius: 7, 
            margin: 2, 
            transition: '.2s', 
            transform: 'translateX(0)'
         }
     }, 
    inactive: {
        ':before': {
            transform: 'translateX(0)', 
            backgroundColor: c('soft')
         }
     }, 
    active: {
        ':before': {
            transform: 'translateX(16px)', 
            backgroundColor: c('primary')
         }
     }, 
    check: {
        display: 'none'
     }, 
    label: {
        flex: 1, 
        padding: '0 .5em', 
        fontWeight: 'normal'
     }
 });
export default ToggleSwitch;
