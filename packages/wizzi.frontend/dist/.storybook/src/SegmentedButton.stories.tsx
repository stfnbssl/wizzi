/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\dist\lib\artifacts\ts\module\gen\main.js
    package: wizzi-js@0.7.8
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi.frontend\.wizzi\storybook\src\SegmentedButton.stories.tsx.ittf
    utc time: Sat, 01 May 2021 05:18:23 GMT
*/
import React from 'react';
import {Story, Meta} from '@storybook/react';
import {SegmentedButton, SegmentedButtonProps} from '../../src/components/widgets/SegmentedButton';
import cookies from 'js-cookie';
import {Provider} from 'react-redux';
import {PreferencesProvider} from '../../src/features/preferences/index';
import {ThemeProvider} from '../../src/components/ThemeProvider';
import createStore from '../../src/store/createRedux';
const store = createStore({
    splitTestSettings: {
        
     }
 });

export default {
            title: 'SegmentedButton', 
            component: SegmentedButton, 
            decorators: [
                (Story) => 
                
                     (
                    <Provider
                     store={store}>
                        <PreferencesProvider
                         cookies={cookies} queryParams={{ theme: 'light' }}>
                            <ThemeProvider
                            >
                                <Story
                                 />
                            </ThemeProvider>
                        </PreferencesProvider>
                    </Provider>
                    )
                
                
            ], 
            argTypes: {
                
             }, 
            args: {
                
             }, 
            parameters: {
                docs: {
                    
                 }
             }
         } as Meta
const Template: Story<SegmentedButtonProps> = (args) => 

     (
    <SegmentedButton
     {...args} />
    )

;

export const Sample_1 = Template.bind({});

Sample_1.args = {
    segments: [
        {
            id: 'device-id', 
            text: 'Device ID'
         }, 
        {
            id: 'account', 
            text: 'Account'
         }, 
        {
            id: 'qr-code', 
            text: 'QR Code'
         }
    ]
 };
