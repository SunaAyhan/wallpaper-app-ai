import DrawerAppBar from "../components/AppBar";
import backgroundImage from "../assets/3.png"; // Resmin dosya yolunu düzeltin
import { Button } from "@mui/material";

import GetAppIcon from '@mui/icons-material/GetApp';


function WallpaperPage() {
    return <div style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh" // Arka planın tamamını kaplaması için sayfa yüksekliğini ayarlayabilirsiniz
    }} >

        <DrawerAppBar />
        <div style={{
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            bottom: "2rem",
            width: "100%"
        }}>
            <Button style={{
                backgroundColor: "white",
                color: "black",
                fontFamily: "Alegreya",
                fontWeight: "bold",
                fontSize: "1.5rem",
                borderRadius: "0.3rem",
                padding: "0.5rem",


                textTransform: "none",
            }} variant="contained">Download  <GetAppIcon /> </Button>
        </div>

    </div>
}

export default WallpaperPage;