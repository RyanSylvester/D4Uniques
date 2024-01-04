import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Checklist from './Checklist/Checklist.js';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

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
            userInventory: [],
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
                this.setState({items: items}, () => {
                    this.updateItems(this.state.filter.character, this.state.filter.season, this.state.filter.showUbers, this.state.filter.showCompleted);
                });
            })
            .catch(error => console.log(error));
    };

    // const [userInventory, setUserInventory] = useState([this.state.items[0], this.state.items[1]]);

    categorizeItems = (items, filter) => {
        let itemsByCategory = {};
        console.log(items);
        items.forEach(item => {
            let isCorrectCharacter = (item.character === filter.character || filter.character === "all" || item.character === "all");
            let isCorrectSeason = (item.season === filter.season || filter.season === "all");
            let isHidden = (!filter.showUbers && item.uber) || (!filter.showCompleted && item.completed)
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
            // this.setState({userInventory: [this.state.items[0], this.state.items[1]]});
            // console.log(this.state.userInventory)
    };
    
    handleCharacterChange = (event) => {
        const newCharacter = event.target.value;
        this.updateItems(newCharacter, this.state.filter.season, this.state.filter.showUbers, this.state.filter.showCompleted);
    };

    handleSeasonChange = (event) => {  
        const newSeason = event.target.value;
        this.updateItems(this.state.filter.character, newSeason, this.state.filter.showUbers, this.state.filter.showCompleted);
    }
    handleShowUberChange = (event) => {
        const newUberState = event.target.checked;
        this.updateItems(this.state.filter.character, this.state.filter.season, newUberState, this.state.filter.showCompleted);
    }

    updateInventory = (item, isChecked) => {
        
        const { userInventory } = this.state; // Get userInventory from state
        if (isChecked) {
            userInventory.push(item);
        } else {
            const index = userInventory.indexOf(item);
            if (index > -1) {
                userInventory.splice(index, 1);
            }
        }
        this.setState({ userInventory }); // Update userInventory in state
        console.log(this.state.userInventory);
    }

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
                        <div className='toggles'>
                            <div className="filterToggle">
                                    <FormGroup>
                                        <FormControlLabel 
                                            control={<Switch defaultChecked/>}                                         
                                            label={<Typography sx={{fontFamily: 'Josefin Sans, sans-serif'}}>Show Completed</Typography>}/>
                                    </FormGroup>
                            </div>
                            <div className="filterToggle">
                                <FormGroup>
                                    <FormControlLabel 
                                        control={<Switch defaultChecked/>} 
                                        onChange={this.handleShowUberChange}
                                        label={<Typography sx={{fontFamily: 'Josefin Sans, sans-serif'}}>Show Ubers</Typography>}/>                                    
                                </FormGroup>
                            </div>
                        </div>

                        <div className="dropdowns">
                            <div className="filterDropdown">
                                <FormControl sx={{ml: 20, minWidth: 190}}>
                                    <InputLabel>Class</InputLabel>
                                    <Select
                                        sx={{fontFamily: 'Josefin Sans, sans-serif'}}
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

                            <div className="filterDropdown">
                                <FormControl sx={{ml: 20, minWidth: 190}}>
                                    <InputLabel>Release</InputLabel>
                                    <Select
                                        sx={{fontFamily: 'Josefin Sans, sans-serif'}}
                                        label={"Release"}
                                        value={this.state.filter.season}
                                        onChange={this.handleSeasonChange}
                                    >  
                                        <MenuItem value={"all"}>All</MenuItem>
                                        <MenuItem value={"base"}>Base Game</MenuItem>
                                        <MenuItem value={"S1"}>Season 1</MenuItem>
                                        <MenuItem value={"S2"}>Season 2</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
                <div className="listContainer">
                    {Object.keys(categoryMap).map(category => (
                        <Checklist
                            key={category}
                            title={categoryMap[category]}
                            items={Array.isArray(this.state.itemsByCategory[category]) ? this.state.itemsByCategory[category] : []}
                            showUbers = {this.state.filter.showUbers}
                            showCompleted = {this.state.filter.showCompleted}
                            updateInventory = {this.updateInventory}

                        />
                    ))}
                </div>
                </ThemeProvider>
            </div>
        );
    }
}

export default ListTable;
