/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\demo.js.react\.wizzi\src\components\widgets\Button.js.ittf
    utc time: Fri, 23 Jul 2021 09:36:12 GMT
*/
'use strict';
import React from 'react';
import './Button.css';
const Button = (props) => {

    let buttonClasses = 'button';
    buttonClasses += ` button-${props.theme}`;
    if (props.large) {
        buttonClasses += ' button-large';
    }
    if (props.fill) {
        buttonClasses += ' button-fill';
    }
    if (props.loading) {
        buttonClasses += ' button-loading';
    }
    return  (
            <button type={props.type} disabled={props.loading} className={buttonClasses} onClick={props.onClick}>
            {
                props.loading
                 &&  (
                        <span className='button-spinner'>
                        </span>
                    )
                
            }
            {
                props.icon
                 &&  (
                        <span className='button-icon'>
                        Icon
                        </span>
                    )
                
            }
                <span className='button-text'>
                {props.text}
                </span>
            
            </button>
        )
    ;
}
;
Button.defaultProps = 
// Button Text

// Button Theme

// Button Type

// Button Size

// Button Filled

// Button Loading

// Button onClick
{
    text: '', 
    theme: 'primary', 
    type: 'button', 
    large: false, 
    fill: false, 
    loading: false, 
    onClick: () => {
    
    }
    
 };
export default Button;
