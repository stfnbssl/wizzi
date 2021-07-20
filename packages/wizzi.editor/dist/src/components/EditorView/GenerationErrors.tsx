/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\EditorView\GenerationErrors.tsx.ittf
    utc time: Tue, 20 Jul 2021 18:56:29 GMT
*/
import * as React from 'react';
import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

export type GenerationErrorsProps = { 
    classes?: any;
    errorName?: string;
    errorLines?: string[];
    errorMessage?: string;
    errorStack?: string;
};

export class GenerationErrors extends React.Component<GenerationErrorsProps> {
    render() {
        const {
            classes, 
            errorName, 
            errorMessage, 
            errorLines, 
            errorStack
         } = this.props;
        return  (
            <div
             className={classes.container}>
                <div
                 className={classes.errorName}>
                    {errorName}
                </div>
                <div
                 className={classes.message}>
                    {
                        errorMessage
                         && errorMessage.split(',').map((line, i) => 
                        
                             (
                            <div
                             key={i}>
                                {line}
                            </div>
                            )
                        
                        )
                    }
                </div>
                <pre
                 className={classes.lines}>
                    {errorLines && errorLines.join('\n')}
                </pre>
                <ul
                >
                    {
                        errorStack
                         && errorStack.split('\n').map((line, i) => 
                        
                             (
                            <li
                             key={i}>
                                {line}
                            </li>
                            )
                        
                        )
                    }
                </ul>
            </div>
            )
        ;
    }
}

const muiStyles = (theme: Theme) => 

    createStyles({
        container: {
            display: 'flex', 
            flexDirection: 'column', 
            borderLeft: '1px solid #cccccc', 
            width: '44vw', 
            height: '100%', 
            overflow: 'scroll'
         }, 
        errorName: {
            padding: '15px 30px', 
            fontSize: '28px'
         }, 
        message: {
            padding: '15px 30px', 
            fontSize: '20px'
         }, 
        lines: {
            padding: '15px 30px', 
            fontSize: '18px', 
            fontFamily: 'Courier, mono'
         }
     })
;

export default withStyles(muiStyles)(GenerationErrors);
