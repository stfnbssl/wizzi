/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.pageforms\.wizzi\src\components\pageforms\UpdateUser.tsx.ittf
    utc time: Tue, 20 Jul 2021 08:45:17 GMT
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

export interface UpdateUserProps {
    data: any;
}

type UpdateUserState = { 
    u_web_url: string;
};

interface RootStyleProps {
}
const StyledRoot = styled.div<RootStyleProps>`
    display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    
`

export class UpdateUser extends Component<UpdateUserProps, UpdateUserState> {
    constructor(props: UpdateUserProps) {
        super(props);
        this.state = {
            u_web_url: ""
         };
    }
    
    componentDidMount() {
    }
    handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handleInputChange', ev.target.type, ev.target.checked, ev.target.value);
        this.setState({
            [ev.target.name]: (ev.target.type == 'checkbox' ? ev.target.checked : ev.target.value)
         })
    };
    
    render() {
        console.log('UpdateUser.render', 'state', this.state);
        return  (
            <FormContainer
            >
                <FormTitle
                 title='Update user profile' subtitle='' />
                <HR
                 />
                <FormGroup 
                    label='User name'
                    name='u_userid'
                    id='u_userid'
                    disabled={true}
                 />
                <HR
                 />
                <FormButton
                 label='Update user profile' id='btn_update_u' />
            </FormContainer>
            )
        ;
    }
}
export default UpdateUser;
