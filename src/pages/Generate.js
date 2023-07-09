
import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
function GeneratePage() {
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
            <Typography style={{ marginBottom: "2rem", fontWeight: "bold" }} variant="h5" gutterBottom>
                Generate Anime Girl Wallpaper
            </Typography>
            <Box width="100%" marginBottom={"2rem"}>
                <TextField
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
                    fontWeight: 'bold',
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
                    }}
                />
            )}
        </Box>
    );
};

export default GeneratePage;