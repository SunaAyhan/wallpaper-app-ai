import DrawerAppBar from "../components/AppBar";
import { Button, Card } from "@mui/material";

import GetAppIcon from '@mui/icons-material/GetApp';
import { useLocation } from "react-router";
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { CapacitorHttp } from '@capacitor/core';
import { Share } from '@capacitor/share';
import {Plugins} from '@capacitor/core';
import { Media, MediaSaveOptions } from "@capacitor-community/media";
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
const { Wallpaper } = Plugins;

function WallpaperPage() {
    //get the generated wallpaper from the location state
    const generatedWallpaper = useLocation().state.generatedWallpaper;
    const [status, setStatus] = useState("");

    const ensureDemoAlbum = async () => {
        const { albums } = await Media.getAlbums();
        const demoAlbum = albums.find(a => a.name === "Anime Wallpapers");
        if (demoAlbum) {
            setStatus("Demo album already exists!");
            return demoAlbum.identifier;
        }

        await Media.createAlbum({ name: "Anime Wallpapers" });
        setStatus("Created demo album");

        return demoAlbum.identifier;
    };
    
    const handleDownloadClick = async () => {
        const filePermission = await Filesystem.requestPermissions();
        // fetch the image with the Capacitor Http plugin
        // const response = await CapacitorHttp.request({
        // method: 'GET',
        // url: generatedWallpaper.output[0].image,
        // responseType: 'blob'
        // }).then(async (response) => {
        //     const savedFile = await Filesystem.writeFile({
        //     path: generatedWallpaper.id+".png",
        //     data: response.data,
        //     directory: Directory.External
        //     });
        //     //share the file
        //     await Share.share({
        //         title: 'Share',
        //         text: 'Share this wallpaper',
        //         url: savedFile.uri,
        //         dialogTitle: 'Share this wallpaper'
        //     });
        //     alert("File saved to: " + savedFile.uri);
        // }).catch((err) => {
        //     alert("err: " + err);
        // });
        
        let opts = { path: generatedWallpaper.output[0].image, albumIdentifier: await ensureDemoAlbum() };
        await Media.savePhoto(opts);
        alert("Saved to gallery");
    }

    //share the wallpaper
    const handleShareClick = async () => {
        // fetch the image with the Capacitor Http plugin
        const response = await CapacitorHttp.request({
        method: 'GET',
        url: generatedWallpaper.output[0].image,
        responseType: 'blob'
        }).then(async (response) => {
            const savedFile = await Filesystem.writeFile({
            path: generatedWallpaper.id+".png",
            data: response.data,
            directory: Directory.External
            });
            //share the file
            await Share.share({
                title: 'Share',
                text: 'Created with Sunayumi Anime Wallpaper Generator',
                url: savedFile.uri,
                dialogTitle: 'Share this wallpaper'
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
                Wallpaper.setBase64({
                    base64: response.data,
                    data: 'data:image/png;base64,'
                }).catch(err => alert(err));
            }).catch((err) => {
                alert("err: " + err);
            }
        );
    }



    return <div style={{height:"100vh", position:"relative", overflow:"hidden"}} >

        <DrawerAppBar />
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginRight: "2rem",
            marginLeft: "2rem",
            justifyContent: "center",
            height: "90%",
            position: "relative",
            
        }} >
          <div 
            style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "0.5rem",
                width: "100%",
                position: "relative",
            }}
          >
            <div style={{
                backgroundImage: `url(${generatedWallpaper.output[0].image})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "100%",
                borderRadius: "0.5rem",
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                border: "2px solid white",
                padding: "1rem",
                margin: "1rem",
                display: "flex",
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
            }}/>
          </div>
        </div>
        <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
                borderRadius: "0.5rem",
                flex: 1,
                padding: 0,
                position: "fixed",
                bottom: "1rem",
                width: "100%",
            }}>
            <Button style={{
                backgroundColor: " #8b6ddb ",
                color: "white",
                fontFamily: "Alegreya",
                fontWeight: "bold",
                fontSize: "1.5rem",
                borderRadius: "0.3rem",
                padding: "0.5rem",
                border : "2px solid white ",
                minWidth: "5rem",

                textTransform: "none",
            }}
                onClick={handleDownloadClick}
                variant="contained">
                   
                    <GetAppIcon style={{
                        marginLeft: "0.5rem"
                    }} /> 
                </Button>
            <Button style={{
                backgroundColor: " #8b6ddb",
                color: "white",
                fontFamily: "Alegreya",
                fontWeight: "bold",
                fontSize: "1.5rem",
                borderRadius: "0.3rem",
                padding: "0.5rem",
                marginLeft: "1rem",
                border : "2px solid white ",
                minWidth: "5rem",
             


                textTransform: "none",
            }}
                onClick={handleShareClick}  
            variant="contained"> <SendIcon style={{
                marginLeft: "0.5rem"
            }}/> </Button>
            </div>

    </div>
}

export default WallpaperPage;