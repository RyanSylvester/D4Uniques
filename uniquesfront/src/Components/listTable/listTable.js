import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Checklist from './Checklist/Checklist.js';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const theme = createTheme({
    palette: {
      primary: {
        main: '#F3F3F3', 
      },
    },
  });

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
    
    handleCharacterChange = (event) => {
        const newCharacter = event.target.value;
        this.updateItems(newCharacter, this.state.filter.season, this.state.filter.showUbers, this.state.filter.showCompleted);
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
                <ThemeProvider theme={theme}>
                <div className="tableHeader">
                    <div className="ProgressVis">
                        <div className="Progress">100%</div>
                        <div className="ProgressBar"/>
                    </div>
                    
                    <div className="filterBar">

                        <div className="filterDropdown">
                            <FormControl sx={{ml: 20, minWidth: 210 }}>
                                <InputLabel>Class</InputLabel>
                                <Select
                                    label={"Class"}
                                    value={this.state.filter.character}
                                    onChange={this.handleCharacterChange}
                                >  
                                    <MenuItem value={"all"}>All Classes</MenuItem>
                                    <MenuItem value={"barb"}>Barbarian</MenuItem>
                                    <MenuItem value={"druid"}>Druid</MenuItem>
                                    <MenuItem value={"necro"}>Necromancer</MenuItem>
                                    <MenuItem value={'sorc'}>Sorcerer</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

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
                </ThemeProvider>
            </div>
        );
    }
}

export default ListTable;
