import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GoogleFontLoader from "react-google-font-loader";
import { QonversionPlugin } from "capacitor-plugin-qonversion";
import BuyTokensPopup from "./BuyTokensPopup";



function DrawerAppBar(props) {
  const { window, user, setUser, setUserLocal, userLocal, usageLimits, setUsageLimits, paymentProcessing, setPaymentProcessing } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [buyTokensPopupOpen, setBuyTokensPopupOpen] = React.useState(false);
  const navigate = useNavigate();
  //payment processed state

  const handleGoBack = () => {
    navigate(-1); // Bir önceki sayfaya gitmek için -1 parametresini kullanın
  };
  const googleLogin = async () => {
    const googleUser = await GoogleAuth.signIn();
    //store user details in local storage
    if(googleUser) {
      localStorage.setItem("googleUser", JSON.stringify(googleUser));
      setUserLocal(googleUser);
      const googleUserQ = localStorage.getItem("googleUser");
      QonversionPlugin.identify({
        userId: JSON.parse(googleUserQ).id,
      });
    }
  };
  
  const handleBuyToken = async () => {
    setBuyTokensPopupOpen(true);
  };

  React.useEffect(() => {
    const googleUser = localStorage.getItem("googleUser");
    // const googleUser = '{"idToken": "test"}';
    if (googleUser) {
      //get usage limits left for the user from api. Api address is https://0x8a3cf5929896120565520424a8d6a55c956f82f3.diode.link/usage
      //it's post request with body {token: googleUser.user_id}
      console.log(googleUser);
      const usageLimits = axios
        .post(
          "https://0x8a3cf5929896120565520424a8d6a55c956f82f3.diode.link/login",
          { token: JSON.parse(googleUser).idToken }
        )
        .then((res) => {
          if (res.data.error) {
            if (res.data.error === "Invalid token") {
              localStorage.removeItem("googleUser");
              setUser(null);
            }
          } else {
            setUsageLimits(res.data);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
      setUser(JSON.parse(googleUser));
    }
  }, [userLocal ]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };




  return (
      <>
      <AppBar
        style={{
          backgroundColor: "#8b6ddb",
          position: "sticky"
        }}
        component="nav"
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
        <Toolbar>
          <IconButton
            color="white"
            aria-label="open drawer"
            edge="start"
            onClick={handleGoBack}
            sx={{ display: { sm: "none" } }}
          >
            <ArrowBackIosIcon
              style={{
                color: "white",
              }}
            />
          </IconButton>

          <Typography
            sx={{
              fontFamily: "Changa",
              fontSize: "1.5rem",
              justifyContent: "start",
              alignItems: "center",
              display: "flex",
              textAlign: "center",
              color: "white",
              flexGrow: 1, // Add this line to make the text center-aligned
            }}
          >
            Sunayumi
          </Typography>

          {user ? (
            <>
              <Button
                style={{
                  border: "none",
                  borderRadius: "5px",
                  fontFamily: "Changa",
                
                  textTransform: "none",
                  fontSize: "1.3rem",
                  color: "white",
                }}
                onClick={handleBuyToken}
                variant="outlined"
              >
              <p style={{
                fontFamily: "Changa",
              }} > {paymentProcessing ? "Processing..." :  "Token: "+ (usageLimits? usageLimits.usageLeft : "fetching...")}</p>
                <AddCircleIcon
                  style={{
                    color: "white",
                    fontSize: "1.5rem",
                    marginLeft: "0.4rem",
                  
                  }}
                />
              </Button>
            </>
          ) : (
            <Button
                style={{
                  border: "3px solid ",
                  borderRadius: "5px",
                  fontFamily: "Changa",
                  backgroundColor: "#fff",
                  textTransform: "none",
                  fontSize: "1rem",
                  color: "#8b6ddb",
                  fontWeight: "bold",
                }}
                onClick={googleLogin}
                variant="outlined"
              >
              Login
            </Button>
          )}
        
          
        </Toolbar>
      </AppBar>
      {buyTokensPopupOpen && (
        <BuyTokensPopup
          setPaymentProcessing={setPaymentProcessing}
          setBuyTokensPopupOpen={setBuyTokensPopupOpen}
          usageLimits={usageLimits}
          setUsageLimits={setUsageLimits}
          userID={user.id}
        />
      )  
      }
      </>
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
