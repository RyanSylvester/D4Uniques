import React from 'react';
import Item from './Item/Item';

export default function Checklist({title, items, showUbers, showCompleted, inventory, updateInventory}) {
    
    const sortedItems = [...items].sort((a, b) => { // Sort by isUber, then alphabetically
        if (a.isUber && !b.isUber) return 1;
        if (!a.isUber && b.isUber) return -1;
        return a.name.localeCompare(b.name);
    });

    return (
        <div>
            <div className="columnTitle">{title}</div>
            <div className="checklistColumn">
                {
                    sortedItems
                        .filter(item => showUbers ? true : !item.isUber)
                        .filter(item => showCompleted ? true : !inventory.includes(item))
                        .map((item, index) => <Item 
                                                    key = {index} 
                                                    item={item} 
                                                    inventory={inventory}
                                                    isCompleted = {inventory.includes(item)}
                                                    updateInventory={updateInventory}/>)
                }
            </div>
        </div>
    );
}
