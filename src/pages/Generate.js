import React, { useEffect, useState } from "react";
import { TextField, Button, Paper, Typography, Box, Card } from "@mui/material";
import GoogleFontLoader from "react-google-font-loader";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import WallpaperPage from "./Wallpaper";
import LoadingScreen from "../components/LoadingScreen";
import { LocalFlorist } from "@mui/icons-material";
import BuyTokensPopup from "../components/BuyTokensPopup";
function GeneratePage({setPaymentProcessing, usageLimits, setUsageLimits, user}) {
  const [textFieldValue, setTextFieldValue] = useState("");
  const [isTextFieldFocused, setIsTextFieldFocused] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [buyTokensPopupOpen, setBuyTokensPopupOpen] = useState(false);
  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener("resize", handleWindowResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const handleWindowResize = () => {
    const windowHeight = window.innerHeight;

    // Calculate the difference between the window height and the document body height
    const bodyHeight = document.body.clientHeight;
    const heightDifference = bodyHeight - windowHeight;

    // If the height difference is positive, it means the keyboard is open
    setIsKeyboardOpen(heightDifference > 0);
  };

  const handleKeyboardShow = () => {
    setIsTextFieldFocused(true);
  };

  const handleKeyboardHide = () => {
    setIsTextFieldFocused(false);
  };
  const ButtonStyle = {
    backgroundColor: "white",
    color: "#8b6ddb    ",
    fontSize: "14px",
    fontWeight: "bold",
    textTransform: "none",
    marginBottom: "0.8rem",
    minHeight: "3rem",
    minWidth: "100%",
    boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.15)',
 


   
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
 
  const [isLoading, setIsLoading] = useState(false);

  //Generate wallpaper by calling the API https://0x8a3cf5929896120565520424a8d6a55c956f82f3.diode.link/sdAI with body {token: googleUser.user_id, prompt: textFieldValue}
  //set the generated wallpaper to the state setGeneratedWallpaper
  //set the loading state true while the wallpaper is being generated
  const generateWallpaper = async () => {
    setIsLoading(true);
      // const googleUser = '{"idToken": "test"}';
    const googleUser = localStorage.getItem("googleUser");
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
            }else if(res.data.error === "Not enough tokens"){
              setIsLoading(false);
              setBuyTokensPopupOpen(true);
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

  // Feeling lucky button
  const handleFeelingLucky = async () => {
    setIsLoading(true);
      // const googleUser = '{"idToken": "test"}';
    const googleUser = localStorage.getItem("googleUser");
    if (googleUser) {
      await axios
        .post(
          "https://0x8a3cf5929896120565520424a8d6a55c956f82f3.diode.link/sdAI",
          { token: JSON.parse(googleUser).idToken, prompt: "" }
        )
        .then((res) => {
          if (res.data.error) {
            if (res.data.error === "Invalid token") {
              localStorage.removeItem("googleUser");
            }else if(res.data.error === "Not enough tokens"){
              setIsLoading(false);
              setBuyTokensPopupOpen(true);
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
        overflow: "hidden",
      
      }}
    >
       <GoogleFontLoader
                fonts={[
                    {
                        font: 'Changa',
                        weights: [400, '400i'],
                    },

                ]}
                subsets={['cyrillic-ext', 'greek']}
            />
      <Typography
        style={{
          marginBottom: "1rem",
          fontWeight: "bold",
          fontFamily: "Changa",
          color: "#8b6ddb",
         
          
        }}
        variant="h5"
        gutterBottom
      >
        Create Anime Girl Wallpaper
      </Typography>
      <Box
        style={{
          backgroundColor: "#ffffff",
          borderRadius: 10,
        }}
        width="100%"
        marginBottom={"2rem"}
      >
        <TextField
          style={{
            fontFamily: "Changa !important",
          }}
          name="Generate Wallpaper"
          fontFamily="Changa"
          label="Explain Your Dream Wallpaper"
          variant="outlined"
          fullWidth
          value={textFieldValue}
          onChange={(e) => setTextFieldValue(e.target.value)}
          onFocus={() => setIsTextFieldFocused(true)}
          onBlur={() => setIsTextFieldFocused(false)}
          multiline
          rows={4}
          placeholder="watching nightsky sitting on grass"
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        style={{
          backgroundColor: "#8b6ddb",
          textTransform: "none",
          fontFamily: "Changa",
          marginBottom: "2rem",
          width: "100%",
        }}
        onClick={generateWallpaper}
        
      >
        <Typography
          style={{
            fontFamily: "Changa",
            fontSize: "1.3rem",
          }}
        >
          Create
        </Typography>
        <NorthEastIcon
              disabled={isTextFieldFocused}
          style={{
            marginLeft: "0.5rem",
            fontFamily: "Changa",
           
          }}
        />
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{
          backgroundColor: "#60BB4C",
          textTransform: "none",
          fontFamily: "Changa",
          marginBottom: "2rem",
          width: "100%",
        }}
        onClick={handleFeelingLucky} 
      >
        <Typography
          style={{
            fontFamily: "Changa",
            fontSize: "1.3rem",
          }}
        >
          Feeling Lucky
        </Typography>
        <LocalFlorist
          style={{
            marginLeft: "0.5rem",
            fontFamily: "Changa",
          }}
        />
      </Button>
      <Typography
        style={{
          marginBottom: "1rem",
          fontWeight: "bold",
          fontFamily: "Changa",
          color: "#8b6ddb",
        }}
        variant="h5"
        gutterBottom
      >
        Get Inspired
      </Typography>
      
      <Button
        style={ButtonStyle}
        onClick={(e) =>
          setTextFieldValue(
            "Futuristic cyberpunk anime girl with a katana in a neon city"
          )
        }
        variant="contained"
      >
        <p style={{
          fontFamily: "Changa",
        }} >      Futuristic cyberpunk anime girl with a katana in a neon city </p>
  
      </Button>
      <Button
        style={ButtonStyle}
        onClick={(e) =>
          setTextFieldValue(
            "Elegant anime girl with cherry blossom petals in the background"
          )
        }
        variant="contained"
      >
       <p  style={{
          fontFamily: "Changa",
        }}>Elegant anime girl with cherry blossom petals in the background</p> 
      </Button>
      <Button
        style={ButtonStyle}
        onClick={(e) =>
          setTextFieldValue(
            "Fierce warrior girl with a mythical weapon in a fantasy setting with a dragon in the background"
          )
        }
        variant="contained"
      >
      <p  style={{
          fontFamily: "Changa",
        }}>Fierce warrior girl with a mythical weapon in a fantasy setting with a dragon in the background </p>  
      </Button>
      <Button
        style={ButtonStyle}
        onClick={(e) =>
          setTextFieldValue(
            "Dancing under rain moon light"
          )
        }
        variant="contained"
      >
      <p  style={{
          fontFamily: "Changa",
        }}> Dancing under rain moon light</p>
      </Button>
      <Button
        style={ButtonStyle}
        onClick={(e) =>
          setTextFieldValue(
            "Celestial Goddess with a halo and wings"
          )
        }
        variant="contained"
      >
      <p  style={{
          fontFamily: "Changa",
        }}>Celestial Goddess with a halo and wings</p>
      </Button>
      <Button
        style={ButtonStyle}
        onClick={(e) =>
          setTextFieldValue(
            "Underwater Mermaid Explorer"
          )
        }
        variant="contained"
      >
      <p  style={{
          fontFamily: "Changa",
        }}>Underwater Mermaid Explorer</p>
      </Button>
      <Button
        style={ButtonStyle}
        onClick={(e) =>
          setTextFieldValue(
            "Neo-Tokyo Street Punk"
          )
        }
        variant="contained"
      >
      <p  style={{
          fontFamily: "Changa",
        }}>Neo-Tokyo Street Punk</p>
      </Button>
      
    </Box>
}{buyTokensPopupOpen && (
        <BuyTokensPopup
          setPaymentProcessing={setPaymentProcessing}
          setBuyTokensPopupOpen={setBuyTokensPopupOpen}
          usageLimits={usageLimits}
          setUsageLimits={setUsageLimits}
          userID={user?.id}
        />
      )  
      } 
</div>
  );}

export default GeneratePage;
