/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.pageforms\.wizzi\src\components\pageforms\CreateTFolder.tsx.ittf
    utc time: Sun, 25 Jul 2021 18:49:11 GMT
*/
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// see https://mxstbr.blog/2016/11/styled-components-magic-explained/
import styled, {keyframes, css} from 'styled-components';
import debounce from 'lodash/debounce';
import nullthrows from 'nullthrows';
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

export interface CreateTFolderProps {
    data: any;
}

type CreateTFolderState = { 
    tf_name: string;
    tf_description: string;
    tf_schema: string;
    tf_type: string;
    tf_add_context: boolean;
    tf_contexts: any[];
    tf_add_tfolder: boolean;
    tf_dependencies: any[];
    tf_upload_files: any[];
};

interface RootStyleProps {
}
const StyledRoot = styled.div<RootStyleProps>`
    display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    
`

export class CreateTFolder extends Component<CreateTFolderProps, CreateTFolderState> {
    constructor(props: CreateTFolderProps) {
        super(props);
        this.state = {
            tf_name: "", 
            tf_description: "", 
            tf_schema: "", 
            tf_type: "", 
            tf_add_context: false, 
            tf_contexts: [], 
            tf_add_tfolder: false, 
            tf_dependencies: [], 
            tf_upload_files: []
         };
    }
    formRef = React.createRef();
    
    async _checkAvalibleTFolderName() {
        const tf_checked = this.state.tf_name;
        const endpoint = `${nullthrows(process.env.API_SERVER_URL)}/production/tfolder/checkname/${tf_checked}`;
        console.log('CreateTFolder._checkAvalibleTFolderName.endpoint', endpoint);
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`checkAvalibleTFolderName error - ${response.status} - ${response.statusText}`);
        }
        const result = await response.json();
        console.log('CreateTFolder._checkAvalibleTFolderName.result', result);
        this.setState({
            tf_name_available: result.isValid, 
            tf_name_checked: tf_checked
         })
    }
    componentDidMount() {
        this._checkAvalibleTFolderName = debounce(this._checkAvalibleTFolderName, 100)
        ;
    }
    
    componentDidMount() {
    }
    
    handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handleInputChange', ev.target.type, ev.target.checked, ev.target.value);
        this.setState({
            [ev.target.name]: (ev.target.type == 'checkbox' ? ev.target.checked : ev.target.value)
         })
    };
    handleContextAdd = context => 
        this.setState((state) => 
        
            ({
                tf_contexts: [context, ...state.tf_contexts]
             })
        );
    handleContextDelete = delcontext => 
        this.setState((state) => {
        
            const contexts = [];
            var i, i_items=this.state.tf_contexts, i_len=this.state.tf_contexts.length, context;
            for (i=0; i<i_len; i++) {
                context = this.state.tf_contexts[i];
                if (context.name !== delcontext.name) {
                    contexts.push(context)
                }
            }
            return {
                    tf_contexts: contexts
                 };
        }
        );
    handleTFolderAdd = tfolder => 
        this.setState((state) => 
        
            ({
                tf_dependencies: [tfolder, ...state.tf_dependencies]
             })
        );
    handleTFolderDelete = deltfolder => 
        this.setState((state) => {
        
            const tfolders = [];
            var i, i_items=this.state.tf_dependencies, i_len=this.state.tf_dependencies.length, tfolder;
            for (i=0; i<i_len; i++) {
                tfolder = this.state.tf_dependencies[i];
                if (tfolder.name !== deltfolder.name) {
                    tfolders.push(tfolder)
                }
            }
            return {
                    tf_dependencies: tfolders
                 };
        }
        );
    
    handleTFolderNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handleTFolderNameChange', ev.target.type, ev.target.checked, ev.target.value);
        this.setState({
            tf_name: ev.target.value
         })
        this._checkAvalibleTFolderName();
    };
    
    handleSubmitCreate = (ev: React.MouseEvent<HTMLElement>) => {
        ev.preventDefault();
        if (this.state.tf_name_available) {
            this.formRef.dispatchEvent(new Event('submit'));
        }
    };
    handleTFolderUploadChange = files => {
        console.log('CreateTFolder.handleTFolderUploadChange', files);
        const uploadfiles = [];
        var i, i_items=files, i_len=files.length, file;
        for (i=0; i<i_len; i++) {
            file = files[i];
            if (file.webkitRelativePath.endsWith('.ittf')) {
                uploadfiles.push({
                    relPath: file.webkitRelativePath, 
                    file: file
                 })
            }
        }
        this.setState({
            tf_upload_files: uploadfiles
         })
    };
    
    render() {
        console.log('CreatePacki.render', 'state', this.state);
        return  (
            <FormContainer
            >
                <FormTitle
                 title='Create a new tfolder' subtitle='A tfolder contains ittf fragments of a single wizzi schema or of many wizzi schemas.' />
                <HR
                 />
                <form 
                    action="/tfolder/new"
                    acceptCharset="UTF-8"
                    method="POST"
                    ref={ref => 
                        
                            this.formRef = ref
                    }
                >
                    <FormGroup 
                        label='TFolder name'
                        name='tf_name'
                        id='tf_name'
                        required={true}
                        value={this.state.tf_name}
                        onChange={this.handleTFolderNameChange}
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
                    <HR
                     />
                    <FormCheckBox 
                        label='Add a data context'
                        name='tfolder_add_context'
                        id='tfolder_add_context'
                        value={this.state.tfolder_add_context}
                        onChange={this.handleInputChange}
                     />
                    {
                        this.state.tfolder_add_context
                         &&  (
                            <div
                            >
                                {
                                    this.state.tfolder_contexts.map((context, ndx) => {
                                    
                                        console.log('Createtfolder.context', context);
                                        return  (
                                            <div
                                             key={ndx}>
                                                <FormRow
                                                 type='delete' value={context} onDelete={this.handleContextDelete} />
                                            </div>
                                            )
                                        ;
                                    }
                                    )
                                }
                                <FormRow
                                 type='add' onAdd={this.handleContextAdd} />
                            </div>
                            )
                        
                    }
                    <HR
                     />
                    <FormCheckBox 
                        label='Add a tfolder dependency'
                        name='tfolder_add_tfolder'
                        id='tfolder_add_tfolder'
                        value={this.state.tfolder_add_tfolder}
                        onChange={this.handleInputChange}
                     />
                    {
                        this.state.tfolder_add_tfolder
                         &&  (
                            <div
                            >
                                {
                                    this.state.tfolder_dependencies.map((tfolder, ndx) => {
                                    
                                        console.log('Createtfolder.tfolder', tfolder);
                                        return  (
                                            <div
                                             key={ndx}>
                                                <FormRow
                                                 type='delete' value={tfolder} onDelete={this.handleTFolderDelete} />
                                            </div>
                                            )
                                        ;
                                    }
                                    )
                                }
                                <FormRow
                                 type='add' onAdd={this.handleTFolderAdd} />
                            </div>
                            )
                        
                    }
                    <FormFile 
                        label='Upload fragments'
                        name='tf_upload'
                        id='tf_upload'
                        value={this.state.tf_upload_files}
                        onChange={this.handleTFolderUploadChange}
                     />
                    <HR
                     />
                    <FormButton 
                        label='Create tfolder'
                        id='btn_create_tfolder'
                        variant='submit'
                        type="submit"
                        onClick={this.handleSubmitCreate}
                     />
                </form>
            </FormContainer>
            )
        ;
    }
}
export default CreateTFolder;
