import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box, Card } from "@mui/material";
import GoogleFontLoader from "react-google-font-loader";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import WallpaperPage from "./Wallpaper";
import LoadingScreen from "../components/LoadingScreen";
function GeneratePage() {
  const ButtonStyle = {
    backgroundColor: "white",
    color: "#000",
    fontSize: "14px",
    fontWeight: "bold",
    textTransform: "none",
    marginBottom: "0.8rem",
    minHeight: "3rem",
    minWidth: "100%",
  };

  const navigate = useNavigate();
  const handleWallpaperClick = () => {
    // Navigate to the wallpaper page with the generated wallpaper
    navigate("/wallpaper", {
      state: { generatedWallpaper: generatedWallpaper },
    });
  };

  const [wallpaperProperties, setWallpaperProperties] = useState({
    colorCode: "#8b6ddb",
  });

  const [generatedWallpaper, setGeneratedWallpaper] = useState(null);
  const [isTextFieldFocused, setIsTextFieldFocused] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //Generate wallpaper by calling the API https://0x8a3cf5929896120565520424a8d6a55c956f82f3.diode.link/sdAI with body {token: googleUser.user_id, prompt: textFieldValue}
  //set the generated wallpaper to the state setGeneratedWallpaper
  //set the loading state true while the wallpaper is being generated
  const generateWallpaper = async () => {
    setIsLoading(true);
    const googleUser = '{"idToken": "test"}';
    if (googleUser) {
      await axios
        .post(
          "https://0x8a3cf5929896120565520424a8d6a55c956f82f3.diode.link/sdAI",
          { token: JSON.parse(googleUser).idToken, prompt: textFieldValue }
        )
        .then((res) => {
          if (res.data.error) {
            if (res.data.error === "Invalid token") {
              localStorage.removeItem("googleUser");
            }
          } else {
            setGeneratedWallpaper(res.data);
            // Navigate to the wallpaper page with the generated wallpaper
            navigate("/wallpaper", { state: { generatedWallpaper: res.data } });
          }
        })
        .catch((err) => {
          alert("Error generating wallpaper: " + err);
          console.log("err", err);
        });
    } else {
      alert("Please login");
    }
    setIsLoading(false);
  };

  return ( 
  <div>
    {isLoading ? <LoadingScreen /> : 
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding={3}
        style={{
          backgroundColor: "#f4f4f4",
          overflow: "hidden", // Sayfanın kaydırılamaz olması için
        }}
      >
        <GoogleFontLoader
          fonts={[
            {
              font: "Gorditas",
              weights: [400, "400i"],
            },
          ]}
          subsets={["cyrillic-ext", "greek"]}
        />
        <Typography
          style={{
            marginBottom: "2rem",
            fontWeight: "bold",
            fontFamily: "Alegreya",
          }}
          variant="h5"
          gutterBottom
        >
          Generate Anime Girl Wallpaper
        </Typography>
        <Box
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 10,
          }}
          width="100%"
          marginBottom={"1rem"}
        >
          <TextField
            style={{
              fontFamily: "Alegreya",
            }}
            name="Generate Wallpaper"
            label="Explain Your Dream Wallpaper"
            variant="outlined"
            fullWidth
            value={textFieldValue}
            onChange={(e) => setTextFieldValue(e.target.value)}
            onFocus={() => setIsTextFieldFocused(true)}
            onBlur={() => setIsTextFieldFocused(false)}
            multiline
            rows={8}
            placeholder="watching nightsky sitting on grass"
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          style={{
            backgroundColor: "#8b6ddb",
            textTransform: "none",
            fontFamily: "Alegreya",
            marginBottom: "1rem",
          }}
          onClick={generateWallpaper}
          disabled={isLoading}
        >
          <Typography
            style={{
              fontFamily: "Alegreya",
              fontSize: "1.3rem",
            }}
          >
            Generate
          </Typography>
          <NorthEastIcon
            style={{
              marginLeft: "0.5rem",
              fontFamily: "Alegreya",
              color: "white",
            }}
          />
        </Button>
        <Button style={ButtonStyle} variant="contained">
          Futuristic cyberpunk anime girl..
        </Button>
        <Button style={ButtonStyle} variant="contained">
          Elegant anime girl with cherry blossom petals..
        </Button>
        <Button style={ButtonStyle} variant="contained">
          Fierce warrior girl with a mythical weapon..
        </Button>
        <Button style={ButtonStyle} variant="contained">
          Playful anime girl surrounded by floating balloons..
        </Button>
        <Button style={ButtonStyle} variant="contained">
          Steampunk engineer anime girl with mechanical gadgets and goggles..
        </Button>
        {/* {generatedWallpaper && (
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
          >
            <img
              src={generatedWallpaper.output[0].image}
              alt="Generated Wallpaper"
              style={{
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                minHeight: "100%"
              }}
            />
          </Paper>
        )} */}
        <p
          style={{
            position: "absolute",
            bottom: "5rem",
            fontFamily: "Alegreya",
            fontSize: "3px",
            color: "grey",
          }}
        >
          Modelin İsmi
        </p>
      </Box>
} </div>
  );}

export default GeneratePage;
