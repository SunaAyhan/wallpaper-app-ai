
import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import GoogleFontLoader from 'react-google-font-loader';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




function GeneratePage() {
    const navigate = useNavigate();

    const handleWallpaperClick = () => {
        // Navigate to the wallpaper page
        navigate('wallpaper-page');
    };
    const [wallpaperProperties, setWallpaperProperties] = useState({
        colorCode: '#8b6ddb',
    });
    const [generatedWallpaper, setGeneratedWallpaper] = useState(null);



    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            padding={3}
        >
            <GoogleFontLoader
                fonts={[
                    {
                        font: 'Gorditas',
                        weights: [400, '400i'],
                    },

                ]}
                subsets={['cyrillic-ext', 'greek']}
            />
            <Typography style={{ marginBottom: "2rem", fontWeight: "bold", fontFamily: 'Gorditas', }} variant="h5" gutterBottom>
                Generate Anime Girl Wallpaper
            </Typography>
            <Box width="100%" marginBottom={"2rem"}>
                <TextField
                    style={{
                        fontFamily: 'Gorditas',
                    }}
                    name="Generate Wallpaper"
                    label="Generate Wallpaper"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={8}
                />
            </Box>
            <Button
                variant="contained"
                color="primary"
                style={{
                    backgroundColor: '#8b6ddb',
                    textTransform: 'none',

                    fontFamily: 'Gorditas',
                }}
            >
                Generate
            </Button>
            {generatedWallpaper && (

                <Paper

                    elevation={3}
                    sx={{
                        backgroundColor: "#8b6ddb",
                        height: 200,
                        width: '100%',
                        marginTop: 3,
                    }} onClick={handleWallpaperClick}
                />

            )}
        </Box>
    );
};

export default GeneratePage;