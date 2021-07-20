/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\LoadingText.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import {StyleSheet, css} from 'aphrodite';
import classnames from 'classnames';
import * as React from 'react';

type Props = { 
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
};

const rotate = {
    from: {
        transform: 'rotate(0deg)'
     }, 
    to: {
        transform: 'rotate(360deg)'
     }
 };

const LoadingText = ({
    children, 
    className, 
    onClick
 }: Props) => 

     (
    <div
     className={classnames(css(styles.loading), className)} onClick={onClick}>
        {children}
    </div>
    )

;

export default LoadingText;

const styles = StyleSheet.create({
    loading: {
        ':before': {
            display: 'inline-block', 
            content: '""', 
            borderWidth: 2, 
            borderStyle: 'solid', 
            borderTopColor: 'rgba(255, 255, 255, 0.2)', 
            borderRightColor: 'rgba(255, 255, 255, 0.2)', 
            borderBottomColor: 'rgba(255, 255, 255, 0.2)', 
            borderLeftColor: 'rgba(255, 255, 255, 0.5)', 
            height: 16, 
            width: 16, 
            borderRadius: '50%', 
            marginLeft: '.5em', 
            marginRight: '1em', 
            verticalAlign: -3, 
            animationName: [
                rotate
            ], 
            animationDuration: '1s', 
            animationIterationCount: 'infinite', 
            animationTimingFunction: 'linear'
         }
     }
 });
