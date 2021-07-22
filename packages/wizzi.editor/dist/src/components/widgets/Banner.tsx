/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\Banner.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
// see https://mxstbr.blog/2016/11/styled-components-magic-explained/
import styled, {keyframes, css} from 'styled-components';
import {c, s} from '../ThemeProvider';

export interface BannerProps {
    visible: boolean;
    className?: string;
    type?: 'info' | 'success' | 'error';
    children?: React.ReactNode;
}

type BannerState = { 
    rendered: boolean;
};

interface BannerStyleProps {
    visible: boolean;
    type?: 'info' | 'success' | 'error';
}
const StyledRoot = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 10px;
    z-index: 999;
    text-align: center;
    pointer-events: none;
    
`
const StyledBanner = styled.div<BannerStyleProps>`
    display: inline-block;
    margin: auto;
    padding: 1em;
    max-width: 100%;
    background-color: ${props => props.type === 'success' ? c('success') : props.type === 'error' ? c('error') : c('primary')};
    color: ${props => props.type === 'success' ? c('success-text') : props.type === 'error' ? c('error-text') : c('primary-text')};
    -webkit-border-radius: 0 0 4px 4px;
    -khtml-border-radius: 0 0 4px 4px;
    -moz-border-radius: 0 0 4px 4px;
    -o-border-radius: 0 0 4px 4px;
    border-radius: 0 0 4px 4px;
    transition-duration: 200ms;
    pointer-events: ${props => props.visible ? "auto" : "none"};
    -webkit-box-shadow: ${props => s('popover')};
    -moz-box-shadow: ${props => s('popover')};
    -o-box-shadow: ${props => s('popover')};
    box-shadow: ${props => s('popover')};
    -webkit-transform: ${props => props.visible ? "translateY(0)" : "translateY(-100%)"};
    -ms-transition: ${props => props.visible ? "translateY(0)" : "translateY(-100%)"};
    transform: ${props => props.visible ? "translateY(0)" : "translateY(-100%)"};
`

export class Banner extends PureComponent<BannerProps, BannerState> {
    
    static getDerivedStateFromProps(props: BannerProps) {
        if (props.visible) {
            return {
                    rendered: true
                 };
        }
        return null;
    }
    
    state = {
        rendered: this.props.visible
    }
    ;
    
    componentDidUpdate(prevProps: BannerProps) {
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
    
    _timer: any;
    
    render() {
        if (!this.state.rendered) {
            return null;
        }
        return  (
            <StyledRoot
            >
                <StyledBanner
                 visible={this.props.visible} type={this.props.type} className={this.props.className}>
                    {this.props.children}
                </StyledBanner>
            </StyledRoot>
            )
        ;
    }
}
export default Banner;
