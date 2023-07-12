import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';




const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function DrawerAppBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [userLocal, setUserLocal] = React.useState(null);
    const [usageLimits, setUsageLimits] = React.useState(null);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Bir önceki sayfaya gitmek için -1 parametresini kullanın
    };
    const googleLogin = async () => {
        const googleUser = await GoogleAuth.signIn();
        //store user details in local storage
        localStorage.setItem('googleUser', JSON.stringify(googleUser));
        setUserLocal(googleUser);
    };

    React.useEffect(() => {
        const googleUser = localStorage.getItem('googleUser');
        if (googleUser) {
            //get usage limits left for the user from api. Api address is https://0x8a3cf5929896120565520424a8d6a55c956f82f3.diode.link/usage 
            //it's post request with body {token: googleUser.user_id}
            console.log(googleUser);
            const usageLimits = axios.post('https://0x8a3cf5929896120565520424a8d6a55c956f82f3.diode.link/login', { token: JSON.parse(googleUser).idToken }).then((res) => {
                if (res.data.error) {
                    if (res.data.error === "Invalid token") {
                        localStorage.removeItem('googleUser');
                        setUser(null);
                    }
                } else {
                    setUsageLimits(res.data);
                }
            }).catch((err) => {
                console.log("err", err);
            });
            setUser(JSON.parse(googleUser));
        }
    }, [userLocal]);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            {user ? (
                <>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            localStorage.removeItem('googleUser');
                            setUser(null);
                        }}
                    >
                        Logout
                    </Button>
                    <Typography variant="h6" sx={{ my: 2 }}>
                        Usage Left {usageLimits?.usageLeft}
                    </Typography>
                </>
            ) : (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        googleLogin();
                    }}
                >
                    Login
                </Button>
            )}
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex', marginBottom: "3rem" }}>
            <CssBaseline />
            <AppBar style={{
                backgroundColor: 'white',
            }} component="nav">
                <Toolbar  >
                    <IconButton
                        color="#000"
                        aria-label="open drawer"
                        edge="start"

                        onClick={handleGoBack}
                        sx={{ display: { sm: 'none' } }}
                    >

                        <ArrowBackIcon style={{
                            color: 'black',
                        }} />
                    </IconButton>


                    <Typography sx={{
                        fontFamily: 'Alegreya',
                        fontSize: '1.5rem',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#000',
                        flexGrow: 1, // Add this line to make the text center-aligned
                    }} >
                        SunaYumi
                    </Typography>

                    <Chip style={{
                        border: '1px solid #000',
                        borderRadius: '5px',
                        fontFamily: 'Alegreya',
                        fontWeight: 'bold',
                    }} label="Hak: 5" variant="outlined" />



                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Button key={item} sx={{ color: '#fff' }}>
                                {item}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

DrawerAppBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default DrawerAppBar;
