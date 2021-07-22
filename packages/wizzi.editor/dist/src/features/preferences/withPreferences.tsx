/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\features\preferences\withPreferences.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import hoistNonReactStatics from 'hoist-non-react-statics';
import * as React from 'react';
import {$Subtract} from '../../types';
import {PreferencesContextType, PreferencesContext} from './types';

export default function withPreferences<P extends PreferencesContextType>(Comp: React.ComponentType<P>):  React.ComponentType<$Subtract<P, PreferencesContextType>> {
    
        
        /**
            * $FlowIssue: Flow doesn't know about forwardRef yet
        */
        class PreferenceConsumerComponent extends React.Component<$Subtract<P, PreferencesContextType>> {
            static displayName = `withPreferences(${Comp.displayName ?? Comp.name})`;
            render() {
                
                // @ts-ignore
                const { forwardedRef,  ...rest  } = this.props; 
                return  (
                    <PreferencesContext.Consumer
                    >
                        {
                            (props) => {
                            
                                
                                // @ts-ignore
                                return  ( <Comp
                                     ref={forwardedRef} {...props} {...rest} />
                                    )
                                ;
                                
                            }
                            
                        }
                    </PreferencesContext.Consumer>
                    )
                ;
            }
        }
        
        /**
            * $FlowIssue: Flow doesn't know about forwardRef yet
        */
        const Result = React.forwardRef((props, ref) => 
        
             (
            
            // @ts-ignore
            <PreferenceConsumerComponent
             {...props}
            // @ts-ignore
             forwardedRef={ref} />
            )
        
        );
        hoistNonReactStatics(Result, Comp);
        return Result as any; 
    }
    // The properties of PreferencesContextType are injected in the component
    // enhanced by withPreferences.
    // The PreferencesContextType properties are taken from the PreferencesContext.Consumer.
    //
    // react-redux doesn't work with forwardRef: https://github.com/reduxjs/react-redux/issues/914
    // so this HOC always needs wrap a connect call, and a connect call cannot wrap this
