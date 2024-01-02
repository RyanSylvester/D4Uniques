import React from 'react';
import Checklist from './Checklist/Checklist.js';

class ListTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            itemsByCategory: {},
            filter: {
                character: 'all',
                season: 'all',
                showUbers: true,
                showCompleted: true,
            },
        };
    }

    componentDidMount() {
        // Fetch items from DB
        fetch('http://127.0.0.1:8000')
            .then(response => response.json())
            .then(data => {
                let items = []; 
                data.forEach(item => {
                    items.push(item);
                });
                this.setState({items: items})
                this.updateItems(this.state.filter.character, this.state.filter.season, this.state.filter.showUbers, this.state.filter.showCompleted);
            })
            .catch(error => console.log(error));
    };

    categorizeItems = (items, filter) => {
        let itemsByCategory = {};
        console.log(items);
        items.forEach(item => {
            let isCorrectCharacter = (item.character === filter.character || filter.character === "all" || item.character === "all");
            let isCorrectSeason = (item.season === filter.season || filter.season === "all");
            let isHidden = (!filter.showUbers && item.uber) || (!filter.showCompleted && item.completed)
            console.log(item.name, isCorrectCharacter, isCorrectSeason, !isHidden);
            if (isCorrectCharacter && isCorrectSeason && !isHidden) {
                // Create Catgory if it doesn't exist
                if (!itemsByCategory[item.category]) {
                    itemsByCategory[item.category] = [];
                } 
                // Add item to category
                itemsByCategory[item.category].push(item); 
            }
        });
        return itemsByCategory;
    };

    updateItems = (newCharacter, newSeason, newUberState, newCompleteState) => {
        const newFilter = {
                character: newCharacter,
                season: newSeason,
                showUbers: newUberState,
                showCompleted: newCompleteState,
            };
            const newItemsByCategory = this.categorizeItems(this.state.items, newFilter);
            this.setState({
                filter: newFilter,
                itemsByCategory: newItemsByCategory,
            });
    };



    render() {
        const categoryMap = {
            'helm': 'Helm',
            'chest': 'Chest',
            'gloves': 'Gloves',
            'pants': 'Pants',
            'boots': 'Boots',
            'weapon': 'Weapons & Shields',
            'jewelery': 'Jewelry',
        };

        return (
            <div className="uniquesTable">
                <div className="tableHeader">
                    <div className="ProgressVis">
                        <div className="Progress">100%</div>
                        <div className="ProgressBar"/>
                    </div>
                    <div className="filterBar">
                        <div className="filterDropdown"></div>
                        <div className="filterDropdown"></div>
                        <div className="filterToggle"></div>
                        <div className="filterToggle"></div>
                    </div>
                </div>
                
                <div className="listContainer">
                    {Object.keys(categoryMap).map(category => (
                        <Checklist
                            key={category}
                            title={categoryMap[category]}
                            items={this.state.itemsByCategory[category]}
                        />
                    ))}
                </div>
                
            </div>
        );
    }
}

export default ListTable;
