/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\ResizeDetector.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import {StyleSheet, css} from 'aphrodite';
import * as React from 'react';

type Props = { 
    onResize: () => void;
    children: React.ReactNode;
};

export default class ResizeDetector extends React.Component<Props> {
        componentDidMount() {
            const horiz = this._horizontal.current;
            const verti = this._vertical.current;
            horiz?.contentWindow?.addEventListener?.('resize', this._handleResize);
            verti?.contentWindow?.addEventListener?.('resize', this._handleResize);
        }
        componentWillUnmount() {
            const horiz = this._horizontal.current;
            const verti = this._vertical.current;
            horiz?.contentWindow?.removeEventListener?.('resize', this._handleResize);
            verti?.contentWindow?.removeEventListener?.('resize', this._handleResize);
        }
        _handleResize = () => 
            this.props.onResize();
        _horizontal = React.createRef<HTMLIFrameElement>();
        _vertical = React.createRef<HTMLIFrameElement>();
        
        /**
            * pointer-events: none is not working properly on EDGE, so we render 2 iframes to detect resize instead of one iframe covering the entire editor
        */
        render() {
            return  (
                <div
                 className={css(styles.container)}>
                    {}<iframe
                     ref={this._horizontal} className={css(styles.phantom, styles.horizontal)} />
                    <iframe
                     ref={this._vertical} className={css(styles.phantom, styles.vertical)} />
                    {this.props.children}
                </div>
                )
            ;
        }
    }
const styles = StyleSheet.create({
    container: {
        display: 'flex', 
        flex: 1, 
        flexDirection: 'column', 
        minWidth: 0, 
        minHeight: 0, 
        position: 'relative'
     }, 
    phantom: {
        display: 'block', 
        position: 'absolute', 
        left: 0, 
        top: 0, 
        pointerEvents: 'none', 
        opacity: 0
     }, 
    horizontal: {
        height: 1, 
        width: '100%'
     }, 
    vertical: {
        height: '100%', 
        width: 1
     }
 });
