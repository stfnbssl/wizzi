import React from 'react';

export function PackiItemList(props) {
    return <div>
        <ul>
            {
                props.items.map((item, ndx) => {
                    return (<li key={ndx}>
                        <a href={'/~/stfnbssl/' + item.name}>{item.name}</a>
                        <span>&nbsp;&nbsp;</span>
                        <a href={'/~/' + item._id.toString()}>{item._id.toString()}</a>
                    </li>)
                })
            }
        </ul>
    </div>
};