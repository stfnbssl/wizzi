/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\SegmentedButton.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import {StyleSheet, css} from 'aphrodite';
import * as React from 'react';
import {c} from '../ThemeProvider';

type Segment<T> = { 
    id: T;
    text: string;
};

export type SegmentedButtonProps<T> = { 
    selectedId: T;
    onSelect: (id: T) => void;
    onClick?: () => void;
    segments: Segment<T>[];
    className?: string;
};

export function SegmentedButton<T extends string>({
    selectedId, 
    onSelect, 
    segments
 }: SegmentedButtonProps<T>) {

    return  (
        <div
         className={css(styles.container)}>
            {
                segments.map(({
                    id, 
                    text
                 }) => 
                
                     (
                    <button
                     onClick={(e) => {
                        
                            e.preventDefault();
                            onSelect(id);
                        }
                    } className={css(styles.button, selectedId === id ? styles.selected : null)} key={id}>
                        <span
                        >
                            {text}
                        </span>
                    </button>
                    )
                
                )
            }
        </div>
        )
    ;
}

export default SegmentedButton;

const styles = StyleSheet.create({
    container: {
        display: 'flex', 
        flexDirection: 'row', 
        width: '100%', 
        boxShadow: `inset 0 0 0 1px ${c('border')}`, 
        borderRadius: 3, 
        overflow: 'hidden'
     }, 
    button: {
        flex: 1, 
        cursor: 'pointer', 
        outline: 0, 
        border: 0, 
        padding: '.5em 1em', 
        whiteSpace: 'nowrap', 
        textDecoration: 'none', 
        transitionDuration: '170ms', 
        transitionProperty: 'color, background', 
        transitionTimingFunction: 'linear', 
        appearance: 'none', 
        backgroundColor: 'transparent', 
        ':hover': {
            backgroundColor: c('hover')
         }
     }, 
    selected: {
        color: c('selected-text'), 
        backgroundColor: c('selected'), 
        ':hover': {
            backgroundColor: c('selected')
         }
     }
 });
