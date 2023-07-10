
import { Box, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
function DiscoverPage() {
    const navigate = useNavigate();

    const handleWallpaperClick = () => {
        // Navigate to the wallpaper page
        navigate('wallpaper-page');
    };
    const wallpapers = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmmmKdMXFfF7uR4l9qx5JQVuDcLK9BLOlHDQ&usqp=CAU',
        'https://r1.ilikewallpaper.net/iphone-12-pro-wallpapers/download-144354/honkai-impact-3rd-anime-4k.jpg',
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ef235af8-b407-482f-be87-a165aee8ded4/dfnwxxv-db58e791-d837-4e45-ab58-a964510515ac.jpg/v1/fill/w_636,h_1257,q_70,strp/anime_girl_wallpaper_by_darkedgeyt_dfnwxxv-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTYwMCIsInBhdGgiOiJcL2ZcL2VmMjM1YWY4LWI0MDctNDgyZi1iZTg3LWExNjVhZWU4ZGVkNFwvZGZud3h4di1kYjU4ZTc5MS1kODM3LTRlNDUtYWI1OC1hOTY0NTEwNTE1YWMuanBnIiwid2lkdGgiOiI8PTgwOSJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.Fq181oeS-v9z5UEA5A_9IowCPaFnHJA0WZ2SAzD6Eyw',
        'https://www.wallpapertip.com/wmimgs/123-1236231_anime-anime-girls-digital-art-artwork-portrait-girl.jpg',
        'https://image.winudf.com/v2/image/Y29tLmJlc3R3YWxscGFwZXIuYW5pbWUuZ2lybC53YWxscGFwZXJfc2NyZWVuXzBfMTUyOTM5NjU4NV8wNzk/screen-0.webp?fakeurl=1&type=.webp',
        // Add more wallpapers...
    ]
    return <div>
        <Box sx={{ height: '100vh', overflowY: 'scroll', padding: '1rem' }}>
            <Grid container spacing={1.5}>
                {wallpapers.map((wallpaper, index) => (
                    <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
                        <Paper
                            elevation={3}
                            sx={{
                                height: 300,
                                backgroundImage: `url(${wallpaper})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                            onClick={handleWallpaperClick}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    </div>
}

export default DiscoverPage;