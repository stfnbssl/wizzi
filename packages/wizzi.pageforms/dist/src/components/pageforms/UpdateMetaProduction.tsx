/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.pageforms\.wizzi\src\components\pageforms\UpdateMetaProduction.tsx.ittf
    utc time: Thu, 22 Jul 2021 20:20:24 GMT
*/
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// see https://mxstbr.blog/2016/11/styled-components-magic-explained/
import styled, {keyframes, css} from 'styled-components';
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

export interface UpdateMetaProductionProps {
    data: any;
}

type UpdateMetaProductionState = { 
    mp_name: string;
    mp_description: string;
    mp_add_context: boolean;
    mp_contexts: any[];
    mp_add_tfolder: boolean;
    mp_dependencies: any[];
};

interface RootStyleProps {
}
const StyledRoot = styled.div<RootStyleProps>`
    display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    
`

export class UpdateMetaProduction extends Component<UpdateMetaProductionProps, UpdateMetaProductionState> {
    constructor(props: UpdateMetaProductionProps) {
        super(props);
        this.state = {
            mp_name: "", 
            mp_description: "", 
            mp_add_context: false, 
            mp_contexts: [], 
            mp_add_tfolder: false, 
            mp_dependencies: []
         };
    }
    
    handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handleInputChange', ev.target.type, ev.target.checked, ev.target.value);
        this.setState({
            [ev.target.name]: (ev.target.type == 'checkbox' ? ev.target.checked : ev.target.value)
         })
    };
    
    componentDidMount() {
        console.log('UpdateMetaProduction.componentDidMount.props', this.props);
        const {
            name, 
            description, 
            contexts, 
            dependencies
         } = this.props.data;
        const mp_contexts = contexts || [];
        const mp_dependencies = dependencies || [];
        this.setState({
            mp_name: name, 
            mp_description: description, 
            mp_add_context: mp_contexts.length > 0, 
            mp_contexts, 
            mp_add_tfolder: mp_dependencies.length > 0, 
            mp_dependencies
         })
    }
    
    render() {
        console.log('UpdatePacki.render', 'state', this.state);
        return  (
            <FormContainer
            >
                <FormTitle
                 title='Update meta production' subtitle='A meta production contains ittf documents for a production setup.' />
                <HR
                 />
                <FormGroup 
                    label='Meta name'
                    name='mp_name'
                    id='mp_name'
                    required={true}
                    value={this.state.mp_name}
                    onChange={this.handleInputChange}
                 />
                <HR
                 />
                <FormGroup 
                    label='Description'
                    name='mp_description'
                    id='mp_description'
                    required={true}
                    value={this.state.mp_description}
                    onChange={this.handleInputChange}
                 />
                <HR
                 />
                <FormButton
                 label='Update meta production' id='btn_update_ap' />
            </FormContainer>
            )
        ;
    }
}
export default UpdateMetaProduction;
