import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox'; 

const theme = createTheme({
    palette: {
      primary: {
        main: '#FFFFFF',
      },
      secondary: {
        main: '#000000',
      },
    },
  });

const Item = ({ title }) => {
    return (
        <ThemeProvider theme={theme}>
            <div>
                <div className="itemContainer">
                    <div className="itemTitle">
                        <p className="itemTitle">{title}</p>
                    </div>
                    <Checkbox 
                        className="itemCheck" 
                        color="primary"
                        sx={{
                            color: '#FFFFFF',
                            '&.Mui-checked': {
                                color: '#FFFFFF',
                            },
                        }}
                    />
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Item;
