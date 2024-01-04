import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox'; 

const theme = createTheme({
    palette: {
      primary: {
        main: '#000000',
      },
      secondary: {
        main: '#000000',
      },
    },
  });

const Item = ({ item, isCompleted, updateInventory }) => {


    const handleCheckboxChange = (event) => {
        const isChecked = event.target.checked;
        // Access the checkbox value and the item itself here
        console.log("Checkbox value:", isChecked);
        console.log("Item:", item);
        // Update the inventory here using the updateInventory function
        updateInventory(item, isChecked);
    };

    return (
        <ThemeProvider theme={theme}>
            <div>
                <div className={item.isUber ? "uberItemContainer" : "itemContainer"}>
                    <div className="itemTitleWrapper">
                        <p className="itemTitle">{item.name}</p>
                    </div>
                    <Checkbox
                        className="itemCheck"
                        checked={isCompleted}
                        color="primary"
                        onChange={handleCheckboxChange}
                        sx={{
                            color: '#000000',
                            '&.Mui-checked': {
                                color: '#9BDC9A',
                            },
                        }}
                    />
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Item;
