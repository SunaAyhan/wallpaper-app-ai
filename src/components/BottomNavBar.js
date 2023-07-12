import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DiscoverPage from '../pages/Discover';
import GeneratePage from '../pages/Generate';
import GoogleFontLoader from 'react-google-font-loader';

export default function FixedBottomNavigation() {
    const [value, setValue] = React.useState(0);

    const renderPage = () => {
        if (value === 0) {
            return <GeneratePage />;
        } else if (value === 1) {
            return <DiscoverPage />;
        }
    };

    return (
        <Box sx={{ pb: 7 }}>
            <CssBaseline />
            <GoogleFontLoader
                fonts={[
                    {
                        font: 'Gorditas',
                        weights: [400, '400i'],
                    },

                ]}
                subsets={['cyrillic-ext', 'greek']}
            />
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    sx={{
                        backgroundColor: '#8b6ddb',
                        '& .Mui-selected': {
                            color: 'white !important',
                            fontFamily: 'Alegreya',
                            // İkon rengi ve yazı rengi için mor (purple) renk
                        },


                    }}

                >
                    <BottomNavigationAction label="Generate" icon={<AddCircleIcon />}
                    />
                    <BottomNavigationAction label="My Creations" icon={<SearchIcon />} />
                </BottomNavigation>
            </Paper>
            {renderPage()}
        </Box>
    );
}
