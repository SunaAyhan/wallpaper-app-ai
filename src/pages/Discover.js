
import { Box, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function DiscoverPage() {
    const navigate = useNavigate();
    const [wallpapers, setWallpapers] = useState([]);

    const handleWallpaperClick = (wallpaper) => {
        // Navigate to the wallpaper page
        const wpJSON = {
            "output": [
                {
                    "image": wallpaper.url,
                }
            ],
        }
        navigate("/wallpaper", { state: { generatedWallpaper: wpJSON } });
    };
    useEffect(() => {
        // Fetch wallpapers from the API https://0x8a3cf5929896120565520424a8d6a55c956f82f3.diode.link/myCreations with body {token: googleUser.user_id}
        /* Example return: [
            {
                "_id": "64af13c13ac13a6590f40761",
                "google_id": "test",
                "url": "https://14068d66ba387efac9ce5e4b1741bcf2.r2.cloudflarestorage.com/ai-api/07-23/sync-134ee545-5c2d-475f-bd42-91f1b3c2318a_0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=16b502c87564788383d52ec498a61a24%2F20230712%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230712T205739Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=7a2b77d730ee7a3362d74d61d270be6b9533c31ac18f579e242aabe9e6dfcc53",
                "prompt": "Elegant anime girl with cherry blossom petals in the background cute anime poster, anime, trending on artstation, "
            },
            {
                "_id": "64af140b3ac13a6590f40762",
                "google_id": "test",
                "url": "https://14068d66ba387efac9ce5e4b1741bcf2.r2.cloudflarestorage.com/ai-api/07-23/sync-c0b88090-2293-4353-b723-1d647733cd82_0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=16b502c87564788383d52ec498a61a24%2F20230712%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230712T205853Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=7b1d0b6d75775d011af9b3add6ec2cfff3c435820a2f31dd2a3d132e120528e3",
                "prompt": "Fierce warrior girl with a mythical weapon in a fantasy setting with a dragon in the background cute anime poster, anime, ilya kuvshinov, trending on pixiv. a detailed portrait of emma watson as a female"
            }
        ]*/
        // const googleUser = '{"idToken": "test"}';
        const googleUser = localStorage.getItem("googleUser");
        axios.post('https://0x8a3cf5929896120565520424a8d6a55c956f82f3.diode.link/myCreations', { token: JSON.parse(googleUser).idToken })
            .then((response) => {
                console.log(response.data);
                if (response.data.error) {
                }else
                setWallpapers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
        
    return <div>
        <Box sx={{ height: '100vh', overflowY: 'scroll', padding: '1rem', backgroundColor: '#f4f4f4' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem', fontFamily: 'Alegreya' }}>
                My Creations
            </Typography>
            <Grid container spacing={1.5}>
                {wallpapers?.map((wallpaper, index) => (
                    <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
                        <Paper
                            elevation={3}
                            sx={{
                                height: 300,
                                backgroundImage: `url(${wallpaper.url})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
                                border: '2px solid #f4f4f4',
                            }}
                            onClick={handleWallpaperClick.bind(this, wallpaper)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    </div>
}

export default DiscoverPage;