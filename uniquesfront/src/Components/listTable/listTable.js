import React from 'react';
import Checklist from './Checklist/Checklist.js';

class ListTable extends React.Component {
    render() {
        return (
            <div>
                <p>100%</p>
                <div className="ProgressBar"/>
                <div className="listContainer">
                    <Checklist title="Head"/>
                    <Checklist title="Chest"/>
                    <Checklist title="Gloves"/>
                    <Checklist title="Pants"/>
                    <Checklist title="Shoes"/> 
                    <Checklist title="Weapons"/> 
                    <Checklist title="Jewelry"/> 
                </div>
                
            </div>
        );
    }
}

export default ListTable;
