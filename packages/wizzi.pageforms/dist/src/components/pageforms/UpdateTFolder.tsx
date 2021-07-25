/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.pageforms\.wizzi\src\components\pageforms\UpdateTFolder.tsx.ittf
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

export interface UpdateTFolderProps {
    data: any;
}

type UpdateTFolderState = { 
    tf_name: string;
    tf_description: string;
    tf_schema: string;
    tf_add_context: boolean;
    tf_contexts: any[];
    tf_add_tfolder: boolean;
    tf_dependencies: any[];
};

interface RootStyleProps {
}
const StyledRoot = styled.div<RootStyleProps>`
    display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    
`

export class UpdateTFolder extends Component<UpdateTFolderProps, UpdateTFolderState> {
    constructor(props: UpdateTFolderProps) {
        super(props);
        this.state = {
            tf_name: "", 
            tf_description: "", 
            tf_schema: "", 
            tf_add_context: false, 
            tf_contexts: [], 
            tf_add_tfolder: false, 
            tf_dependencies: []
         };
    }
    
    handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handleInputChange', ev.target.type, ev.target.checked, ev.target.value);
        this.setState({
            [ev.target.name]: (ev.target.type == 'checkbox' ? ev.target.checked : ev.target.value)
         })
    };
    
    componentDidMount() {
        const {
            name, 
            description, 
            wizziSchema, 
            contexts, 
            dependencies
         } = this.props.data;
        const tf_contexts = contexts || [];
        const tf_dependencies = dependencies || [];
        this.setState({
            tf_name: name, 
            tf_description: description, 
            tf_wizziSchema: wizziSchema, 
            tf_add_context: tf_contexts.length > 0, 
            tf_contexts, 
            tf_add_tfolder: tf_dependencies.length > 0, 
            tf_dependencies
         })
    }
    
    render() {
        console.log('UpdatePacki.render', 'state', this.state);
        return  (
            <FormContainer
            >
                <FormTitle
                 title='Update tfolder' />
                <HR
                 />
                <FormGroup 
                    label='TFolder name'
                    name='tf_name'
                    id='tf_name'
                    required={true}
                    value={this.state.tf_name}
                    onChange={this.handleInputChange}
                 />
                <HR
                 />
                <FormGroup 
                    label='Description'
                    name='tf_description'
                    id='tf_description'
                    required={true}
                    value={this.state.tf_description}
                    onChange={this.handleInputChange}
                 />
                <HR
                 />
                <FormGroup 
                    label='Wizzi schema'
                    name='ap_schema'
                    id='ap_schema'
                    required={true}
                    value={this.state.ap_schema}
                    onChange={this.handleInputChange}
                 />
                <HR
                 />
                <FormGroup 
                    label='Main ittf'
                    name='ap_main_ittf'
                    id='ap_main_ittf'
                    required={true}
                    value={this.state.ap_main_ittf}
                    onChange={this.handleInputChange}
                 />
                <HR
                 />
                <FormButton
                 label='Update tfolder' id='btn_update_tf' />
            </FormContainer>
            )
        ;
    }
}
export default UpdateTFolder;
