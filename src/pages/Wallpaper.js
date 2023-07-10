import DrawerAppBar from "../components/AppBar";
import { Button } from "@mui/material";

import GetAppIcon from '@mui/icons-material/GetApp';
import { useLocation } from "react-router";
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { CapacitorHttp } from '@capacitor/core';
import {Plugins} from '@capacitor/core';
const { Wallpaper } = Plugins;

function WallpaperPage() {
    //get the generated wallpaper from the location state
    const generatedWallpaper = useLocation().state.generatedWallpaper;
// helper function
    const convertBlobToBase64 = (blob) => new Promise((resolve, reject) => {
        const reader = new FileReader;
        reader.onerror = reject;
        reader.onload = () => {
            console.log(blob);
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
        });
    const handleDownloadClick = async () => {
        // fetch the image with the Capacitor Http plugin
        const response = await CapacitorHttp.request({
        method: 'GET',
        url: generatedWallpaper.output[0].image,
        responseType: 'blob'
        }).then(async (response) => {
            const blob = new Blob( [ response.data ], { type: "image/png" } );
            const base64Data = await convertBlobToBase64(blob);
            savePhoto
            const savedFile = await Filesystem.writeFile({
            path: generatedWallpaper.id+".png",
            data: base64Data,
            directory: Directory.Data
            });
            alert("File saved to: " + savedFile.uri);
        }).catch((err) => {
            alert("err: " + err);
        });
        
    }

    //set the wallpaper as the device wallpaper
    const handleSetAsWallpaperClick = async () => {
        // fetch the image with the Capacitor Http plugin
        const response = await CapacitorHttp.request({
            method: 'GET',
            url: generatedWallpaper.output[0].image,
            responseType: 'blob'
            }).then(async (response) => {
                const blob = new Blob( [ response.data ], { type: "image/png" } );
                const base64Data = await convertBlobToBase64(blob);
                Wallpaper.setBase64({
                    base64: base64Data.replace(/^data:image\/(png|jpg);base64,/, ''),
                    data: 'data:image/png;base64,'
                }).catch(err => alert(err));
            }).catch((err) => {
                alert("err: " + err);
            }
        );
    }



    return <div style={{
        backgroundImage: `url(${generatedWallpaper.output[0].image})`,
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
            }}
                onClick={handleDownloadClick}
                variant="contained">
                    Download  
                    <GetAppIcon /> 
                </Button>
            <Button style={{
                backgroundColor: "white",
                color: "black",
                fontFamily: "Alegreya",
                fontWeight: "bold",
                fontSize: "1.5rem",
                borderRadius: "0.3rem",
                padding: "0.5rem",
                marginLeft: "1rem",


                textTransform: "none",
            }}
                onClick={handleSetAsWallpaperClick}  
            variant="contained">Set As Wallpaper </Button>

        </div>

    </div>
}

export default WallpaperPage;