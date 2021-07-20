/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\FileList\FileListPane.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import {StyleSheet, css} from 'aphrodite';
import * as React from 'react';
type Props = { 
    title: string;
    expanded: boolean;
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    buttons?: React.ReactNode[];
    children?: React.ReactNode;
    className?: string;
};
export default function FileListPane({
        title, 
        expanded, 
        buttons, 
        children, 
        onClick, 
        className
     }: Props) {
    
        return  (
            <div
             className={`${className ?? ''} ${css(styles.container)}`}>
                <div
                 className={css(styles.header)}>
                    <div
                     className={css(styles.left)} onClick={onClick} data-test-id={`file-list-pane-${title.toLowerCase().replace(/[^a-z]/g, '-')}`}>
                        <svg 
                            className={css(styles.collapse, expanded ? styles.collapseExpanded : styles.collapseCollapsed)}
                            width="12px"
                            height="12px"
                            viewBox="0 0 12 12"
                        >
                            <g 
                                stroke="none"
                                strokeWidth="2"
                                fill="none"
                                fillRule="evenodd"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline
                                 stroke="currentColor" transform="translate(6.000000, 6.000000) scale(-1, 1) rotate(180.000000) translate(-6.000000, -6.000000) " points="2 4 6 8 10 4" />
                            </g>
                        </svg>
                        <h4
                         className={css(styles.label)}>
                            {title}
                        </h4>
                    </div>
                    <div
                     className={css(styles.right)}>
                        {buttons}
                    </div>
                </div>
                {
                    expanded ? children : null
                }
            </div>
            )
        ;
    }
const styles = StyleSheet.create({
    container: {
        display: 'flex', 
        flexDirection: 'column'
     }, 
    header: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: '0 4px'
     }, 
    label: {
        fontSize: '1em', 
        fontWeight: 500, 
        lineHeight: 1, 
        margin: 0
     }, 
    collapse: {
        margin: '1px 6px 1px 2px', 
        opacity: 0.7
     }, 
    collapseCollapsed: {
        transform: 'rotate(180deg)'
     }, 
    collapseExpanded: {
        transform: 'rotate(0deg)'
     }, 
    left: {
        flex: 1, 
        display: 'flex', 
        flexDirection: 'row', 
        padding: '2px 4px', 
        cursor: 'pointer'
     }, 
    right: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center'
     }
 });
