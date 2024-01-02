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

const Item = ({ title }) => {
    return (
        <ThemeProvider theme={theme}>
            <div>
                <div className="itemContainer">
                    <div className="itemTitleWrapper">
                        <p className="itemTitle">{title}</p>
                    </div>
                    <Checkbox 
                        className="itemCheck" 
                        color="primary"
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
