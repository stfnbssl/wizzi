/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.pageforms\.wizzi\src\components\pageforms\DeletePackageProduction.tsx.ittf
    utc time: Sun, 25 Jul 2021 18:49:11 GMT
*/
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// see https://mxstbr.blog/2016/11/styled-components-magic-explained/
import styled, {keyframes, css} from 'styled-components';

export interface DeletePackageProductionProps {
    data: any;
}

type DeletePackageProductionState = { 
    ap_name: string;
    ap_description: string;
};


export class DeletePackageProduction extends Component<DeletePackageProductionProps, DeletePackageProductionState> {
    constructor(props: DeletePackageProductionProps) {
        super(props);
        this.state = {
            ap_name: "", 
            ap_description: ""
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
                Delete package production
            </h1>
            )
        ;
    }
}
export default DeletePackageProduction;
