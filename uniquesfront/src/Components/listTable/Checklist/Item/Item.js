import React from 'react';

const Item = ({ title }) => {
    return (
        <div>
            <div className="itemContainer">
                <div className="itemTitle">
                    <p class="itemTitle">{title}</p>
                </div>
            </div>
        </div>
    );
};

export default Item;
