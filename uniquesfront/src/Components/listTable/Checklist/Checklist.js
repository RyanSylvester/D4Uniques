import React from 'react';
import Item from './Item/Item';

export default function Checklist({title}) {
    return (
        <div>
            <div className="columnTitle">{title}</div>
            <div className="checklistColumn">
                <Item title="Godslayer Crown"/>
                <Item title="Tempest Roar"/>
                <Item title="Vasiley's Prayer"/>
            </div>
        </div>
    );
  }