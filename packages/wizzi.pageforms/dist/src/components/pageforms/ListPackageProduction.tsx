/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.pageforms\.wizzi\src\components\pageforms\ListPackageProduction.tsx.ittf
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
import {AddDocumentIcon} from '../../assets/AddDocumentIcon';

export interface ListPackageProductionProps {
    data: any;
}

type ListPackageProductionState = { 
    l_packages: any[];
    l_search: string;
    l_sort: string;
};

interface RootStyleProps {
}
const StyledRoot = styled.div<RootStyleProps>`
    display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    
`

export class ListPackageProduction extends Component<ListPackageProductionProps, ListPackageProductionState> {
    constructor(props: ListPackageProductionProps) {
        super(props);
        this.state = {
            l_packages: [], 
            l_search: "", 
            l_sort: ""
         };
    }
    componentDidMount() {
        console.log('ListPackageProduction.componentDidMount', this.props.data);
        this.setState({
            l_packages: this.props.data.packages, 
            l_search: '', 
            l_sort: 'none'
         })
    }
    filterItem(item) {
        if (this.state.l_search.length > 0) {
            if ((item.name + ' ' + item.description).indexOf(this.state.l_search) < 0) {
                return false;
            }
        }
        return true;
    }
    handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handleInputChange', ev.target.type, ev.target.checked, ev.target.value);
        this.setState({
            [ev.target.name]: (ev.target.type == 'checkbox' ? ev.target.checked : ev.target.value)
         })
    };
    render() {
        console.log('ListPackageProduction.render', this.state);
        return  (
            <div
             className="flex-column width-full">
                <div
                 className="flex-row flex-items-start">
                    <form 
                        className="width-full"
                        aria-label="Package productions"
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
                                        placeholder="Find a package production???"
                                        aria-label="Find a package production???"
                                        value={this.state.l_search}
                                        onChange={this.handleInputChange}
                                        name='l_search'
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
                                         onChange={this.handleInputChange} name='l_sort' value={this.state.l_sort}>
                                            <option
                                             value="none">
                                             
                                            </option>
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
                             className="button p-s radius-m bg-success color-white border-s font-m font-w-xxl" href="/package/new">
                                <div
                                 className="flex-row">
                                    <AddDocumentIcon
                                     height="16" width="16" />
                                     New 
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                {
                    this.state.l_packages
                     && this.state.l_packages.map((item: any, ndx: number) => {
                    
                        if (this.filterItem(item)) {
                            return  (
                                <div
                                 className="flex-row flex-items-start m-m" key={ndx}>
                                    <div
                                     className="flex-row border-b-s p-b-s width-full">
                                        <div
                                         className="flex-column width-full">
                                            <div
                                             className="font-xl">
                                                <a
                                                 href={'/~~/p/stfnbssl/' + item.name}>
                                                {item.name}
                                                </a>
                                            </div>
                                            <div
                                             className="font-m m-b-m">
                                                {item.description}
                                            </div>
                                        </div>
                                        <div
                                         className="flex-row">
                                            <div
                                             className="flex-column m-s">
                                                <a
                                                 className="button p-s radius-m bg-warning color-white border-s font-m font-w-xxl" href={'/package/update/' + item.owner + '/' + item.name}>
                                                    <div
                                                     className="flex-row">
                                                        <AddDocumentIcon
                                                         height="16" width="16" />
                                                         Update 
                                                    </div>
                                                </a>
                                            </div>
                                            <div
                                             className="flex-column m-s">
                                                <a
                                                 className="button p-s radius-m bg-error color-white border-s font-m font-w-xxl" href={'/package/delete/' + item.owner + '/' + item.name}>
                                                    <div
                                                     className="flex-row">
                                                        <AddDocumentIcon
                                                         height="16" width="16" />
                                                         Delete 
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )
                            ;
                        }
                    }
                    )
                }
            </div>
            )
        ;
    }
}
export default ListPackageProduction;
