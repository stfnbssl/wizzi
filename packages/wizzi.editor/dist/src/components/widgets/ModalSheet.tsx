/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\widgets\ModalSheet.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import React, {FunctionComponent} from 'react';
// see https://mxstbr.blog/2016/11/styled-components-magic-explained/
import styled, {keyframes, css} from 'styled-components';

import {ThemeProvider, c, s} from '../ThemeProvider';
import Modal from './Modal';

export interface ModalSheetProps {
    visible: boolean;
    className?: string;
    onDismiss?: () => void;
    children: React.ReactNode;
}

const StyledThemeProvider = styled(ThemeProvider)`
    display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    position: relative;
    text-align: center;
    -webkit-border-radius: 4px;
    -khtml-border-radius: 4px;
    -moz-border-radius: 4px;
    -o-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: ${props => s('popover')};
    -moz-box-shadow: ${props => s('popover')};
    -o-box-shadow: ${props => s('popover')};
    box-shadow: ${props => s('popover')};
    background-color: ${props => c('content')};
    color: ${props => c('text')};
`
const StyledClose = styled.button`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-border-radius: 1em;
    -khtml-border-radius: 1em;
    -moz-border-radius: 1em;
    -o-border-radius: 1em;
    border-radius: 1em;
    outline: 0;
    padding: 0;
    position: absolute;
    right: -1em;
    top: -1em;
    width: 2em;
    height: 2em;
    background: ${props => c('text')};
    border: ${props => "2px solid " + c('content')};
    -webkit-box-shadow: 0 1.5px 3px rgba(0, 0, 0, .16);
    -moz-box-shadow: 0 1.5px 3px rgba(0, 0, 0, .16);
    -o-box-shadow: 0 1.5px 3px rgba(0, 0, 0, .16);
    box-shadow: 0 1.5px 3px rgba(0, 0, 0, .16);
    color: ${props => c('content')};
    font-size: 1em;
    font-weight: bold;
    text-align: center;
`
export const ModalSheet: FunctionComponent<ModalSheetProps> = ({
    visible, 
    className, 
    onDismiss, 
    children
 }) => 

     (
    <Modal
     visible={visible} onDismiss={onDismiss}>
        <StyledThemeProvider
         className={className}>
            {
                onDismiss ?  (
                    <StyledClose
                     onClick={onDismiss} data-test-id="modal-close">
                        ✕
                    </StyledClose>
                    )
                 : null
            }
            {children}
        </StyledThemeProvider>
    </Modal>
    )

;
export default ModalSheet;
