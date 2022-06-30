/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.9
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.ui\.wizzi\src\components\widgets\demo.tsx.ittf
    utc time: Fri, 24 Jun 2022 16:36:04 GMT
*/
import {Button} from './button';
import {Card} from './card';
import {Tick} from './tick';
import React, {FunctionComponent} from 'react';


export interface WidgetsDemoProps {
    title: string;
}

export const WidgetsDemo: FunctionComponent<WidgetsDemoProps> = ({
    title
 }) => 

     (
    <aside
    >
        <h2
        >
            {title}
        </h2>
        <h4
        >
        widget: Card
        </h4>
        <div
        >
            <Card
             title="Welcome!" paragraph="To this example of a Card widget" />
        </div>
        <h4
        >
        widget: Tick
        </h4>
        <div
        >
            <Tick
             />
        </div>
        <h4
        >
        widget: Button
        </h4>
        <div
        >
            <Button 
                active={true}
                icon="https://material.io/resources/icons/static/ic_material_192px_light.svg"
                theme="dark"
                onClick={() => 
                    
                        alert('Hello')
                }
            >
                Give me five
            </Button>
        </div>
    </aside>
    )

;
export default WidgetsDemo;
