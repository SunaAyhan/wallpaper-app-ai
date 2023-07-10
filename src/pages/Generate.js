import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box, Card } from '@mui/material';
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
    const [isTextFieldFocused, setIsTextFieldFocused] = useState(false);
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            padding={3}
            style={{
                backgroundColor: "#f4f4f4",
                overflow: 'hidden', // Sayfanın kaydırılamaz olması için

            }}
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
            <Typography
                style={{
                    marginBottom: "2rem",
                    fontWeight: "bold",
                    fontFamily: 'Alegreya',
                }}
                variant="h5"
                gutterBottom
            >
                Generate Anime Girl Wallpaper
            </Typography>


            <Box style={{
                backgroundColor: "#ffffff",
                borderRadius: 10,

            }} width="100%" marginBottom={"2rem"}>
                <TextField
                    style={{
                        fontFamily: 'Alegreya',

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
                    fontFamily: 'Alegreya',
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
                        border: 'none'
                    }}
                    onClick={handleWallpaperClick}
                />
            )}
        </Box>
    );
};

export default GeneratePage;
