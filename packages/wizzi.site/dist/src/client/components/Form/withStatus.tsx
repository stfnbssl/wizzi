/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.site\.wizzi\client\src\components\Form\withStatus.tsx.ittf
    utc time: Tue, 11 May 2021 04:47:43 GMT
*/
import * as React from 'react';
import {$Subtract} from '../../types';
import {FormValidationContext} from './Form';
type InjectedProps = { 
    disabled: boolean | undefined;
};
export default function withStatus<P extends InjectedProps>(Comp: React.ComponentType<P>):  React.ComponentType<$Subtract<P, InjectedProps>> {
    
        function withStatusFn(props: any) {
        
            return  (
                <FormValidationContext.Consumer
                >
                    {
                        (value: { 
                            valid: boolean;
                        } | undefined = {
                            valid: true
                         }) => 
                        
                             (
                            <Comp
                             disabled={!value.valid} {...props} />
                            )
                        
                        
                    }
                </FormValidationContext.Consumer>
                )
            ;
        }
        withStatusFn.displayName = `withStatus(${Comp.displayName ?? Comp.name})`;
        return withStatusFn;
    }
