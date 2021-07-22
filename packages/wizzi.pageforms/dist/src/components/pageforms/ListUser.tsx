/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.pageforms\.wizzi\src\components\pageforms\ListUser.tsx.ittf
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
import {AddIcon} from '../../assets/AddIcon';

export interface ListUserProps {
    data: any;
}

type ListUserState = { 
    l_artifacts: any;
    l_search: string;
    l_sort: string;
    l_wizzi_schema: string;
};

interface RootStyleProps {
}
const StyledRoot = styled.div<RootStyleProps>`
    display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    
`

export class ListUser extends Component<ListUserProps, ListUserState> {
    constructor(props: ListUserProps) {
        super(props);
        this.state = {
            l_artifacts: "", 
            l_search: "", 
            l_sort: "", 
            l_wizzi_schema: ""
         };
    }
    componentDidMount() {
        this.setState({
            l_artifacts: this.props.data.artifacts
         })
    }
    render() {
        return  (
            <div
             className="flex-column width-full">
                <div
                 className="flex-row flex-items-start">
                    <form 
                        className="width-full"
                        aria-label="Artifact productions"
                        role="search"
                        acceptCharset="UTF-8"
                        method="get"
                    >
                        <div
                         className="flex-row m-xxl">
                            <div
                             className="flex-column width-full">
                                <div
                                 className="m-s">
                                    <input 
                                        className="form-control width-full"
                                        autoComplete="off"
                                        type="search"
                                        id="your-repos-filter"
                                        name="q"
                                        placeholder="Find an artifact production…"
                                        aria-label="Find an artifact production…"
                                        value
                                     />
                                </div>
                            </div>
                            <div
                             className="flex-row">
                                <div
                                 className="flex-column">
                                    <div
                                     className="m-s">
                                        <select
                                        >
                                            <option
                                             value="Html">
                                            Html
                                            </option>
                                            <option
                                             value="Css">
                                            Css
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div
                                 className="flex-column">
                                    <div
                                     className="m-s">
                                        <select
                                        >
                                            <option
                                             value="last-updated">
                                            Last updated
                                            </option>
                                            <option
                                             value="stars">
                                            Stars
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div
                     className="flex-row m-xxl">
                        <div
                         className="flex-column m-s">
                            <a
                             className="button p-s radius-m bg-success color-white border-s font-m font-w-xxl" href="/artifact/new">
                                <div
                                 className="flex-row">
                                    <AddIcon
                                     />
                                     New 
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                {
                    this.state.l_artifacts.map((item: any, ndx: number) => {
                    
                        return  (
                            <div
                             className="flex-row flex-items-start m-m">
                                <div
                                 className="flex-column border-b-s p-b-s width-full m-w-xxl">
                                    <div
                                     className="font-xl">
                                        <a
                                         href={'/~~/stfnbssl/' + item.name}>
                                        {item.name}
                                        </a>
                                    </div>
                                    <div
                                     className="font-m m-b-m">
                                        {item.description}
                                    </div>
                                    <div
                                     className="flex-row">
                                        <div
                                         className="font-m m-r-s">
                                            main ittf:
                                        </div>
                                        <div
                                         className="font-m m-r-xl">
                                            {item.mainIttf}
                                        </div>
                                        <div
                                         className="font-m m-r-s">
                                            schema:
                                        </div>
                                        <div
                                         className="font-m">
                                            {item.wizziSchema}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )
                        ;
                    }
                    )
                }
            </div>
            )
        ;
    }
}
export default ListUser;
