/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.pageforms\.wizzi\src\components\pageforms\widgets\FormObject.tsx.ittf
    utc time: Thu, 22 Jul 2021 20:20:24 GMT
*/
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// see https://mxstbr.blog/2016/11/styled-components-magic-explained/
import styled, {keyframes, css} from 'styled-components';
import {c, s} from '../../ThemeProvider';
import FormContainer from './FormContainer';
import FormTitle from './FormTitle';
import FormGroup from './FormGroup';
import FormCheckBox from './FormCheckBox';
import FormRadioBox from './FormRadioBox';
import FormRow from './FormRow';
import FormFile from './FormFile';
import FormHidden from './FormHidden';
import FormButton from './FormButton';
import HR from './HR';
import FlexRow from './styles/FlexRow';
import Para from './styles/Para';
import Text from './styles/Text';
import Link from './styles/Link';
import Box from './styles/Box';

export interface FormObjectProps {
    path: string;
    properties: any;
    values: any;
    onChange: any;
}

type FormObjectState = { 
    objProperties: any;
    condProperty: any;
};

interface RootStyleProps {
}
const StyledInput = styled.input<RootStyleProps>`
    
`

export class FormObject extends Component<FormObjectProps, FormObjectState> {
    constructor(props: FormObjectProps) {
        super(props);
        this.state = {
            objProperties: "", 
            condProperty: ""
         };
        const objProperties = [];
        let condProperty = null;
        var i, i_items=this.props.properties, i_len=this.props.properties.length, p;
        for (i=0; i<i_len; i++) {
            p = this.props.properties[i];
            if (p.isCondition) {
                condProperty = p;
            }
            else {
                objProperties.push(p)
            }
        }
        this.state = {
            condProperty: condProperty, 
            objProperties: objProperties
         };
    }
    render() {
        const cp = this.state.condProperty;
        console.log('FormObject.render', cp.name, this.props.values[cp.name], this.props.values, this.state);
        return  (
            <Box
             border='1px solid #bcbcbc' padding='10px'>
                {
                    cp
                     &&  (
                        <div
                        >
                            <FormCheckBox 
                                label={cp.label || cp.name}
                                name={cp.name}
                                id={cp.name}
                                value={this.props.values[cp.name] || false}
                                onChange={ev => 
                                    
                                        this.props.onChange(this.props.path + '.' + cp.name, ev.target.checked)
                                }
                             />
                        </div>
                        )
                    
                }
                {
                    (cp ? this.props.values[cp.name] : true)
                     &&  (
                        <Box
                        >
                            <HR
                             />
                            {
                                this.state.objProperties.map((p: any, ndx) => {
                                
                                    console.log('p', p);
                                    if (p.type == 'string' || p.type == 'number') {
                                        return  (
                                            <FormGroup 
                                                key={ndx}
                                                label={p.label || p.name}
                                                name={p.name}
                                                id={p.name}
                                                value={this.props.values[p.name] || ''}
                                                onChange={ev => 
                                                    
                                                        this.props.onChange(this.props.path + '.' + p.name, ev.target.value)
                                                }
                                             />
                                            )
                                        ;
                                    }
                                    else if (p.type == 'boolean') {
                                        return  (
                                            <FormCheckBox 
                                                key={ndx}
                                                label={p.label || p.name}
                                                name={p.name}
                                                id={p.name}
                                                value={this.props.values[p.name]}
                                                onChange={ev => 
                                                    
                                                        this.props.onChange(this.props.path + '.' + p.name, ev.target.checked)
                                                }
                                             />
                                            )
                                        ;
                                    }
                                    else if (p.type == 'object') {
                                        return  (
                                            <FormObject 
                                                key={ndx}
                                                label={p.label || p.name}
                                                name={p.name}
                                                id={p.name}
                                                path={this.props.path + '.' + p.name}
                                                value={this.props.values[p.name] || {}}
                                                properties={p.properties}
                                                onChange={this.props.onChange}
                                             />
                                            )
                                        ;
                                    }
                                }
                                )
                            }
                        </Box>
                        )
                    
                }
            </Box>
            )
        ;
    }
}
export default FormObject;
