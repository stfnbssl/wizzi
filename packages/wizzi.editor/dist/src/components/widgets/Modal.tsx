/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\Modal.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
// see https://mxstbr.blog/2016/11/styled-components-magic-explained/
import styled, {keyframes, css} from 'styled-components';

export interface ModalProps {
    visible: boolean;
    onDismiss?: () => void;
    children?: React.ReactNode;
}

type ModalState = { 
    rendered: boolean;
    initial: boolean;
};

interface RootStyleProps {
    initial: boolean;
    visible: boolean;
}
const StyledRoot = styled.div<RootStyleProps>`
    -webkit-font-smoothing: antialiased;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: #fff;
    z-index: 999;
    transition-property: opacity;
    transition-duration: 200ms;
    background-color: ${props => props.initial ? "rgba(24, 29, 37, 0.8)" : "inherit"};
    opacity: ${props => props.visible ? "1" : "0"};
    pointer-events: ${props => props.visible ? "auto" : "none"};
`
const StyledContent = styled.div`
    width: 100%;
    height: 100%;
    display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    
`

export class Modal extends PureComponent<ModalProps, ModalState> {
    
    static getDerivedStateFromProps(props: ModalProps) {
        return props.visible ? {
                    rendered: true, 
                    initial: false
                 } : null;
    }
    
    state = {
        rendered: this.props.visible, 
        initial: !this.props.visible
    }
    ;
    
    componentDidMount() {
        document.body.appendChild(this._container);
        document.addEventListener('keydown', this._handleKeyDown);
    }
    
    componentDidUpdate(prevProps: ModalProps) {
        if (this.props.visible !== prevProps.visible) {
            clearTimeout(this._timer);
            if (!this.props.visible) {
                this._timer = setTimeout(() => 
                
                    this.setState({
                        rendered: false
                     })
                , 300)
                ;
            }
        }
    }
    
    componentWillUnmount() {
        document.body.removeChild(this._container);
        document.removeEventListener('keydown', this._handleKeyDown);
    }
    
    _container = document.createElement('div');
    
    _content = React.createRef<HTMLDivElement>();
    
    _timer: any;
    
    _handleDismiss = (e: React.MouseEvent<HTMLDivElement>) => {
        if (this._content.current && this._content.current !== e.target && this._content.current.contains(e.target as Node)) {
            return ;
        }
        this.props.onDismiss?.();
    };
    
    _handleKeyDown = (e: KeyboardEvent) => {
        if (e.keyCode === 27 && this.props.visible) {
            // Esc was pressed
            e.preventDefault();
            this.props.onDismiss?.();
        }
    };
    
    render() {
        return ReactDOM.createPortal(
            <StyledRoot
             initial={this.state.initial} visible={this.props.visible} onClick={this._handleDismiss}>
                <StyledContent
                 ref={this._content}>
                    {
                        this.state.rendered ? this.props.children : null
                    }
                </StyledContent>
            </StyledRoot>
            , this._container);
    }
}
export default Modal;
