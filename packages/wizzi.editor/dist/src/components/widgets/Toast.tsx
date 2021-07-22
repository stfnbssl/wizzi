/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\Toast.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import {StyleSheet, css} from 'aphrodite';
import * as React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider, c, s} from '../ThemeProvider';

export type ToastProps = { 
    label: React.ReactNode;
    timeout?: number;
    persistent?: boolean;
    actions: { 
        label: string;
        action?: () => void;
        primary?: boolean;
    }[];
    onDismiss?: () => void;
};

type State = { 
    dismissing: boolean;
};

const TOAST_GROUP_ID = '__toast_group__container';

export class Toast extends React.Component<ToastProps, State> {
    static defaultProps = {
        timeout: 5000
    }
    ;
    state = {
        dismissing: false
    }
    ;
    componentDidMount() {
        let group = document.getElementById(TOAST_GROUP_ID);
        if (!group) {
            group = document.createElement('div');
            group.id = TOAST_GROUP_ID;
            Object.assign(group.style, {
                position: 'fixed', 
                bottom: '3em', 
                left: '1em', 
                zIndex: '999'
             })
            document.body.appendChild(group);
        }
        group.appendChild(this._container);
        if (this.props.persistent) {
            this._scheduleDismiss();
        }
    }
    componentWillUnmount() {
        const group = document.getElementById(TOAST_GROUP_ID);
        if (group) {
            group.removeChild(this._container);
        }
        this._cancelDismiss();
    }
    _container = document.createElement('div');
    _timer: any;
    _scheduleDismiss = () => 
        this._timer = setTimeout(this._handleDismiss, this.props.timeout);
    _cancelDismiss = () => {
        this.setState({
            dismissing: false
         })
        clearTimeout(this._timer);
    };
    _handleDismiss = () => {
        this.setState({
            dismissing: true
         })
        this._timer = setTimeout(() => 
        
            this.props.onDismiss?.()
        , 400)
        ;
    };
    render() {
        const props = this.props.persistent ? {} : {
                onMouseEnter: this._cancelDismiss, 
                onMouseLeave: this._scheduleDismiss
             };
        return ReactDOM.createPortal(
            <ThemeProvider
             {...props} style={styles.toast} className={css(this.state.dismissing ? styles.dismissing : styles.appearing)}>
                <div
                 className={css(styles.label)}>
                    {this.props.label}
                </div>
                {
                    this.props.actions.map((action) => 
                    
                         (
                        <button
                         key={action.label} className={css(styles.button)} onClick={action.action ?? this._handleDismiss}>
                            {action.label}
                        </button>
                        )
                    
                    )
                }
            </ThemeProvider>
            , this._container);
    }
}

const fadeIn = {
    from: {
        opacity: 0
     }, 
    to: {
        opacity: 1
     }
 };

const fadeOut = {
    from: {
        opacity: 1
     }, 
    to: {
        opacity: 0
     }
 };

export default Toast;

const styles = StyleSheet.create({
    toast: {
        display: 'flex', 
        margin: '1em', 
        padding: '0 .75em', 
        borderRadius: 3, 
        border: `1px solid ${c('border')}`, 
        boxShadow: s('popover'), 
        minWidth: '27em', 
        whiteSpace: 'nowrap', 
        backgroundColor: c('content'), 
        color: c('text')
     }, 
    appearing: {
        animationName: fadeIn, 
        animationDuration: '250ms', 
        opacity: 1
     }, 
    dismissing: {
        animationName: fadeOut, 
        animationDuration: '400ms', 
        opacity: 0
     }, 
    label: {
        flex: 1, 
        minWidth: 0, 
        overflow: 'hidden', 
        textOverflow: 'ellipsis', 
        padding: '.75em'
     }, 
    button: {
        appearance: 'none', 
        background: 'transparent', 
        color: c('primary'), 
        border: '0', 
        textTransform: 'uppercase', 
        fontSize: '.9em', 
        fontWeight: 'bold', 
        padding: '1em', 
        outline: 0, 
        ':hover': {
            backgroundColor: c('hover')
         }, 
        ':active': {
            backgroundColor: c('hover')
         }
     }
 });
