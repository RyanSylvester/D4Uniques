import React from 'react';
import Item from './Item/Item';

export default function Checklist({title, items}) {



    return (
        <div>
            <div className="columnTitle">{title}</div>
            <div className="checklistColumn">
                {
                    items && items.map(item => <Item title={item.name} isUber={item.isUber}/>)
                }
            </div>
        </div>
    );
  }