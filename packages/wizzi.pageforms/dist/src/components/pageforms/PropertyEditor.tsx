/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.pageforms\.wizzi\src\components\pageforms\PropertyEditor.tsx.ittf
    utc time: Thu, 22 Jul 2021 20:20:24 GMT
*/
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// see https://mxstbr.blog/2016/11/styled-components-magic-explained/
import styled, {keyframes, css} from 'styled-components';
import lodashSet from 'lodash/set';
import FormContainer from './widgets/FormContainer';
import FormTitle from './widgets/FormTitle';
import FormGroup from './widgets/FormGroup';
import FormCheckBox from './widgets/FormCheckBox';
import FormRadioBox from './widgets/FormRadioBox';
import FormRow from './widgets/FormRow';
import FormFile from './widgets/FormFile';
import FormHidden from './widgets/FormHidden';
import FormButton from './widgets/FormButton';
import HR from './widgets/HR';
import FlexRow from './widgets/styles/FlexRow';
import Para from './widgets/styles/Para';
import Text from './widgets/styles/Text';
import Link from './widgets/styles/Link';
import Box from './widgets/styles/Box';
import FormObject from './widgets/FormObject';

export interface PropertyEditorProps {
    data: any;
}

type PropertyEditorState = { 
    pe_values: any;
};

interface RootStyleProps {
}
const StyledRoot = styled.div<RootStyleProps>`
    display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    
`

export class PropertyEditor extends Component<PropertyEditorProps, PropertyEditorState> {
    constructor(props: PropertyEditorProps) {
        super(props);
        this.state = {
            pe_values: ""
         };
        const values: any = {};
        const properties = this.props.data.schema.properties;
        var i, i_items=properties, i_len=properties.length, prop;
        for (i=0; i<i_len; i++) {
            prop = properties[i];
            if (prop.type == 'string' || prop.type == 'number') {
                values[prop.name] = prop.defaultValue || '';
            }
            else if (prop.type == 'array') {
                values[prop.name] = [];
            }
            else if (prop.type == 'object') {
                values[prop.name] = {};
            }
        }
        this.state = {
            pe_values: values
         };
    }
    handleValuesChange = (valuePath, value) => 
        this.setState((state) => {
        
            const newValues = lodashSet(state.pe_values, valuePath, value);
            return {
                    pe_values: newValues
                 };
        }
        );
    render() {
        console.log('PropertyEditor.render', 'state', this.state);
        const properties = this.props.data.schema.properties;
        return  (
            <FormContainer
            >
                <FormTitle
                 title='Property editor' />
                {
                    properties.map((p: any, ndx) => {
                    
                        if (p.type == 'string' || p.type == 'number') {
                            return  (
                                <FormGroup 
                                    key={ndx}
                                    label={p.label || p.name}
                                    name={p.name}
                                    id={p.name}
                                    value={this.state.pe_values[p.name]}
                                    onChange={ev => 
                                        
                                            this.handleValuesChange(p.name, ev.target.value)
                                    }
                                 />
                                )
                            ;
                        }
                        if (p.type == 'object') {
                            return  (
                                <FormObject 
                                    key={ndx}
                                    label={p.label || p.name}
                                    name={p.name}
                                    id={p.name}
                                    path={p.name}
                                    values={this.state.pe_values[p.name] || {}}
                                    properties={p.properties}
                                    onChange={this.handleValuesChange}
                                 />
                                )
                            ;
                        }
                    }
                    )
                }
            </FormContainer>
            )
        ;
    }
}
export default PropertyEditor;
