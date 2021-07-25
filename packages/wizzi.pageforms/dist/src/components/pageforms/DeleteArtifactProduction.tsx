/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.pageforms\.wizzi\src\components\pageforms\DeleteArtifactProduction.tsx.ittf
    utc time: Sun, 25 Jul 2021 18:49:11 GMT
*/
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// see https://mxstbr.blog/2016/11/styled-components-magic-explained/
import styled, {keyframes, css} from 'styled-components';

export interface DeleteArtifactProductionProps {
    data: any;
}

type DeleteArtifactProductionState = { 
    ap_name: string;
    ap_description: string;
    ap_schema: string;
    ap_main_ittf: string;
};


export class DeleteArtifactProduction extends Component<DeleteArtifactProductionProps, DeleteArtifactProductionState> {
    constructor(props: DeleteArtifactProductionProps) {
        super(props);
        this.state = {
            ap_name: "", 
            ap_description: "", 
            ap_schema: "", 
            ap_main_ittf: ""
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
                Delete artifact production
            </h1>
            )
        ;
    }
}
export default DeleteArtifactProduction;
