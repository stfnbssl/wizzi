/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.pageforms\.wizzi\src\components\pageforms\UpdatePackageProduction.tsx.ittf
    utc time: Sun, 25 Jul 2021 18:49:11 GMT
*/
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// see https://mxstbr.blog/2016/11/styled-components-magic-explained/
import styled, {keyframes, css} from 'styled-components';
import FormContainer from './widgets/FormContainer';
import FormTitle from './widgets/FormTitle';
import FormGroup from './widgets/FormGroup';
import FormText from './widgets/FormText';
import FormSelect from './widgets/FormSelect';
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

export interface UpdatePackageProductionProps {
    data: any;
}

type UpdatePackageProductionState = { 
    pp_name: string;
    pp_description: string;
    pp_add_context: boolean;
    pp_contexts: any[];
    pp_add_tfolder: boolean;
    pp_dependencies: any[];
};

interface RootStyleProps {
}
const StyledRoot = styled.div<RootStyleProps>`
    display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    
`

export class UpdatePackageProduction extends Component<UpdatePackageProductionProps, UpdatePackageProductionState> {
    constructor(props: UpdatePackageProductionProps) {
        super(props);
        this.state = {
            pp_name: "", 
            pp_description: "", 
            pp_add_context: false, 
            pp_contexts: [], 
            pp_add_tfolder: false, 
            pp_dependencies: []
         };
    }
    
    handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handleInputChange', ev.target.type, ev.target.checked, ev.target.value);
        this.setState({
            [ev.target.name]: (ev.target.type == 'checkbox' ? ev.target.checked : ev.target.value)
         })
    };
    
    componentDidMount() {
        console.log('UpdatePackageProduction.componentDidMount.props', this.props);
        const {
            name, 
            description, 
            contexts, 
            dependencies
         } = this.props.data;
        const pp_contexts = contexts || [];
        const pp_dependencies = dependencies || [];
        this.setState({
            pp_name: name, 
            pp_description: description, 
            pp_add_context: pp_contexts.length > 0, 
            pp_contexts, 
            pp_add_tfolder: pp_dependencies.length > 0, 
            pp_dependencies
         })
    }
    
    render() {
        console.log('UpdatePacki.render', 'state', this.state);
        return  (
            <FormContainer
            >
                <FormTitle
                 title='Update package production' subtitle='An package production contains the ittf documents for a single software package.' />
                <HR
                 />
                <FormGroup 
                    label='Package name'
                    name='pp_name'
                    id='pp_name'
                    required={true}
                    value={this.state.pp_name}
                    onChange={this.handleInputChange}
                 />
                <HR
                 />
                <FormGroup 
                    label='Description'
                    name='pp_description'
                    id='pp_description'
                    required={true}
                    value={this.state.pp_description}
                    onChange={this.handleInputChange}
                 />
                <HR
                 />
                <FormButton
                 label='Update package production' id='btn_update_ap' />
            </FormContainer>
            )
        ;
    }
}
export default UpdatePackageProduction;
