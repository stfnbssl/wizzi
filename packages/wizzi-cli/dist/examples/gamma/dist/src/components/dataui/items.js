/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-cli\dist\examples\gamma\.wizzi\src\components\dataui\items.js.ittf
    utc time: Mon, 15 Feb 2021 13:37:11 GMT
*/
'use strict';
import React, {useRef} from 'react';
import {useItems} from '../../state/hooks';
import {Button} from '../widgets';
const Item = (props) => {
    const {
        completeItem
    } = useItems();
    const handleComplete = () =>
        completeItem(props.id);
    return  (
            <div className='item-item'>
                <input id={props.id.toString()} type='checkbox' checked={props.completed} onChange={handleComplete}>
                </input>
            
                <label htmlFor={props.id.toString()} className={'item-item-text' + (props.completed ? ' completed' : '')}>
                {props.text}</label>
            
            </div>
        )
    ;
};
const AddItem = () => {
    const itemInput = useRef(null);
    const {
        addItem
    } = useItems();
    const handleSubmit = (event) => {
        event.preventDefault();
        if (itemInput.current) {
            addItem(itemInput.current.value)
            itemInput.current.value = '';
        }
    };
    return  (
            <div className='item-add'>
                <form onSubmit={handleSubmit}>
                    <input type='text' ref={itemInput} className='form-field' placeholder='e.g. Buy Tickets'>
                    </input>
                
                </form>
            
            </div>
        )
    ;
};
const ItemList = () => {
    const {
        items
    } = useItems();
    return  (
            <div className='item-visible-list'>
            {
                items.map((item) =>  (
                        <Item key={item.id} {...item}>
                        </Item>
                    )
                )
            }</div>
        )
    ;
};
export const Items = () => {
    const {
        resetItems
    } = useItems();
    const handleBack = () =>
        resetItems();
    return  (
            <div className='item-list'>
                <div>
                    <Button text='Back' onClick={handleBack}>
                    </Button>
                
                </div>
            
                <AddItem>
                </AddItem>
            
                <ItemList>
                </ItemList>
            
            </div>
        )
    ;
};
