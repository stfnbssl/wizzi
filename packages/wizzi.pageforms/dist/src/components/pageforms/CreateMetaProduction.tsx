/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.pageforms\.wizzi\src\components\pageforms\CreateMetaProduction.tsx.ittf
    utc time: Thu, 22 Jul 2021 20:20:24 GMT
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

export interface CreateMetaProductionProps {
    data: any;
}

type CreateMetaProductionState = { 
    mp_name: string;
    mp_description: string;
    mp_type: string;
    mp_add_context: boolean;
    mp_contexts: any[];
    mp_add_tfolder: boolean;
    mp_dependencies: any[];
    mp_upload_files: any[];
};

interface RootStyleProps {
}
const StyledRoot = styled.div<RootStyleProps>`
    display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    
`

export class CreateMetaProduction extends Component<CreateMetaProductionProps, CreateMetaProductionState> {
    constructor(props: CreateMetaProductionProps) {
        super(props);
        this.state = {
            mp_name: "", 
            mp_description: "", 
            mp_type: "", 
            mp_add_context: false, 
            mp_contexts: [], 
            mp_add_tfolder: false, 
            mp_dependencies: [], 
            mp_upload_files: []
         };
    }
    formRef = React.createRef();
    
    async _checkAvalibleMetaName() {
        const mp_checked = this.state.mp_name;
        const endpoint = `${nullthrows(process.env.API_SERVER_URL)}/production/meta/checkname/${mp_checked}`;
        console.log('CreateMeta._checkAvalibleMetaName.endpoint', endpoint);
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`checkAvalibleMetaName error - ${response.status} - ${response.statusText}`);
        }
        const result = await response.json();
        console.log('CreateMeta._checkAvalibleMetaName.result', result);
        this.setState({
            mp_name_available: result.isValid, 
            mp_name_checked: mp_checked
         })
    }
    componentDidMount() {
        this._checkAvalibleMetaName = debounce(this._checkAvalibleMetaName, 100)
        ;
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
                mp_contexts: [context, ...state.mp_contexts]
             })
        );
    handleContextDelete = delcontext => 
        this.setState((state) => {
        
            const contexts = [];
            var i, i_items=this.state.mp_contexts, i_len=this.state.mp_contexts.length, context;
            for (i=0; i<i_len; i++) {
                context = this.state.mp_contexts[i];
                if (context.name !== delcontext.name) {
                    contexts.push(context)
                }
            }
            return {
                    mp_contexts: contexts
                 };
        }
        );
    handleTFolderAdd = tfolder => 
        this.setState((state) => 
        
            ({
                mp_dependencies: [tfolder, ...state.mp_dependencies]
             })
        );
    handleTFolderDelete = deltfolder => 
        this.setState((state) => {
        
            const tfolders = [];
            var i, i_items=this.state.mp_dependencies, i_len=this.state.mp_dependencies.length, tfolder;
            for (i=0; i<i_len; i++) {
                tfolder = this.state.mp_dependencies[i];
                if (tfolder.name !== deltfolder.name) {
                    tfolders.push(tfolder)
                }
            }
            return {
                    mp_dependencies: tfolders
                 };
        }
        );
    
    handleMetaNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handleMetaNameChange', ev.target.type, ev.target.checked, ev.target.value);
        this.setState({
            mp_name: ev.target.value
         })
        this._checkAvalibleMetaName();
    };
    
    handleSubmitCreate = (ev: React.MouseEvent<HTMLElement>) => {
        ev.preventDefault();
        if (this.state.mp_name_available) {
            this.formRef.dispatchEvent(new Event('submit'));
        }
    };
    
    render() {
        console.log('CreateMetaProduction.render', 'state', this.state);
        return  (
            <FormContainer
            >
                <FormTitle
                 title='Create a new meta production' subtitle='A meta production contains ittf documents for a production setup.' />
                <HR
                 />
                <form 
                    action="/meta/new"
                    acceptCharset="UTF-8"
                    method="POST"
                    ref={ref => 
                        
                            this.formRef = ref
                    }
                >
                    <FormGroup 
                        label='Meta name'
                        name='mp_name'
                        id='mp_name'
                        required={true}
                        value={this.state.mp_name}
                        onChange={this.handleMetaNameChange}
                     />
                    {
                        this.state.mp_name.length > 0 && this.state.mp_name_available
                         &&  (
                            <Para
                            >
                                {'Meta name ' + this.state.mp_name_checked + ' is available'}
                            </Para>
                            )
                        
                    }
                    {
                        this.state.mp_name.length > 0 && !this.state.mp_name_available
                         &&  (
                            <Para
                             color='#ff0000'>
                                {'Meta name ' + this.state.mp_name_checked + ' is not available'}
                            </Para>
                            )
                        
                    }
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
                    <FormCheckBox 
                        label='Add a data context'
                        name='mp_add_context'
                        id='mp_add_context'
                        value={this.state.mp_add_context}
                        onChange={this.handleInputChange}
                     />
                    {
                        this.state.mp_add_context
                         &&  (
                            <div
                            >
                                {
                                    this.state.mp_contexts.map((context, ndx) => {
                                    
                                        console.log('Createmp.context', context);
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
                        name='mp_add_tfolder'
                        id='mp_add_tfolder'
                        value={this.state.mp_add_tfolder}
                        onChange={this.handleInputChange}
                     />
                    {
                        this.state.mp_add_tfolder
                         &&  (
                            <div
                            >
                                {
                                    this.state.mp_dependencies.map((tfolder, ndx) => {
                                    
                                        console.log('Createmp.tfolder', tfolder);
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
                    <HR
                     />
                    <FormButton 
                        label='Create meta production'
                        id='btn_create_mp'
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
export default CreateMetaProduction;
