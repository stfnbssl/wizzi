/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.pageforms\.wizzi\src\components\pageforms\DeleteMetaProduction.tsx.ittf
    utc time: Tue, 20 Jul 2021 08:45:17 GMT
*/
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// see https://mxstbr.blog/2016/11/styled-components-magic-explained/
import styled, {keyframes, css} from 'styled-components';

export interface DeleteMetaProductionProps {
    data: any;
}

type DeleteMetaProductionState = { 
    mp_name: string;
    mp_description: string;
};


export class DeleteMetaProduction extends Component<DeleteMetaProductionProps, DeleteMetaProductionState> {
    constructor(props: DeleteMetaProductionProps) {
        super(props);
        this.state = {
            mp_name: "", 
            mp_description: ""
         };
    }
    
    handleChangeName() {
    }
    
    componentDidMount() {
    }
    
    render() {
        return  (
            <h1
            >
                Delete meta production
            </h1>
            )
        ;
    }
}
export default DeleteMetaProduction;
