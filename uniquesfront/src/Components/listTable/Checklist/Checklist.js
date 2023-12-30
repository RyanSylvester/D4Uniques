import React from 'react';
import Item from './Item/Item';

export default function Checklist({title}) {
    return (
        <div>
            <div class="columnTitle">{title}</div>
            <div class="checklistColumn">
                <Item title="Godslayer Crown"/>
                <Item title="Tempest Roar"/>
                <Item title="Vasiley's Prayer"/>
            </div>
        </div>
    );
  }