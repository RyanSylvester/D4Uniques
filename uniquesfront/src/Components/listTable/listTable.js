import React from 'react';
import Checklist from './Checklist/Checklist.js';

class ListTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsByCategory: {}
        };
    }

    componentDidMount() {
        fetch('http://127.0.0.1:8000')
            .then(response => response.json())
            .then(data => {
                // let items = data;
                let itemsByCategory = {};
                // console.log(items);            
                data.forEach(item => {
                    // Create Catgory if it doesn't exist
                    if (!itemsByCategory[item.category]) {
                        itemsByCategory[item.category] = [];
                    }
                    // Add item to category
                    itemsByCategory[item.category].push(item);
                });
                this.setState({itemsByCategory: itemsByCategory})
            })
            .catch(error => console.log(error));
    };
    

    render() {
        return (
            <div className="uniquesTable">
                <p>100%</p>
                <div className="ProgressBar"/>
                <div className="listContainer">
                    <Checklist title="Helm" items={this.state.itemsByCategory['helm']}/>
                    <Checklist title="Chest" items={this.state.itemsByCategory['chest']}/>
                    <Checklist title="Gloves" items={this.state.itemsByCategory['gloves']}/>
                    <Checklist title="Pants" items={this.state.itemsByCategory['pants']}/>
                    <Checklist title="Boots" items={this.state.itemsByCategory['boots']}/> 
                    <Checklist title="Weapons & Shields" items={this.state.itemsByCategory['weapon']}/> 
                    <Checklist title="Jewelry" items={this.state.itemsByCategory['jewelery']}/>
                </div>
                
            </div>
        );
    }
}

export default ListTable;
