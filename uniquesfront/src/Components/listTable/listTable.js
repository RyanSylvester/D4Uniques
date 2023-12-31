import React from 'react';
import Checklist from './Checklist/Checklist.js';

class ListTable extends React.Component {

    componentDidMount() {
        fetch('http://127.0.0.1:8000')
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    }

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
