/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.editor\.wizzi\src\components\Editor\SimpleEditor.tsx.ittf
    utc time: Wed, 21 Jul 2021 08:44:38 GMT
*/
import React, {FunctionComponent} from 'react';
// see https://mxstbr.blog/2016/11/styled-components-magic-explained/
import styled, {keyframes, css} from 'styled-components';

import {useState, useEffect} from "react";
import Prism from "prismjs";

export interface SimpleEditorProps {
    content: string;
    language: string;
}

export const SimpleEditor: FunctionComponent<SimpleEditorProps> = ({
    content, 
    language
 }) => {

    
    const [contentValue, setContentValue] = useState(content);
    const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    
        let value = contentValue,
            selStartPos = evt.currentTarget.selectionStart;
        // handle 4-space indent on
        console.log(evt.currentTarget);
        if (evt.key === "Tab") {
            value = value.substring(0, selStartPos) + "    " + value.substring(selStartPos, value.length);
            evt.currentTarget.selectionStart = selStartPos + 3;
            evt.currentTarget.selectionEnd = selStartPos + 4;
            evt.preventDefault();
            setContentValue(value);
        }
    }
    ;
    useEffect(() => 
    
        Prism.highlightAll()
    , [
        language, 
        contentValue
    ])
    return  (
        <div
         className="code-edit-container">
            <textarea 
                className="code-input"
                value={contentValue}
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) => 
                    
                        setContentValue(evt.target.value)
                }
                onKeyDown={handleKeyDown}
             />
            <pre
             className="code-output">
                <code
                 className={`language-${language}`}>
                    {contentValue}
                </code>
            </pre>
        </div>
        )
    ;
}
;
export default SimpleEditor;
