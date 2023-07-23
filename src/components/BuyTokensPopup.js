import { LiveTv, LiveTvTwoTone, MonetizationOn } from "@mui/icons-material";
import { Button, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { QonversionPlugin } from "capacitor-plugin-qonversion";
import { useEffect, useState } from "react";
import { AdMob, RewardAdOptions, AdLoadInfo, RewardAdPluginEvents, AdMobRewardItem } from '@capacitor-community/admob';

function BuyTokensPopup({setPaymentProcessing, setBuyTokensPopupOpen, usageLimits, setUsageLimits, userID}) {
    const [isAdLoading, setIsAdLoading] = useState(false);
    const handleRewardAd = async () => {
        setIsAdLoading(true);
        AdMob.addListener(RewardAdPluginEvents.Loaded, (info) => {
            // Subscribe prepared rewardVideo
          });
        
          AdMob.addListener(RewardAdPluginEvents.Rewarded, (rewardItem) => {
            // Subscribe user rewarded
            console.log(rewardItem);
          });
        const options = {
            // isTesting: true,
            adId: 'ca-app-pub-3871453776891057/8301575239',
            ssv: {
                userId: userID,
            },
        };
        await AdMob.prepareRewardVideoAd(options);
        await AdMob.showRewardVideoAd();
        alert("Congratulations! You have earned 2 token");
        setIsAdLoading(false);
        //wait for 2 seconds for ad to load
        await new Promise(resolve => setTimeout(resolve, 2000));
        //check new usage limits once
        const googleUser = localStorage.getItem("googleUser");
        const usageLimits = await axios.post(
            "https://0x8a3cf5929896120565520424a8d6a55c956f82f3.diode.link/login",
            { token: JSON.parse(googleUser).idToken }
        ).then((res) => {
            if (res.data.error) {
                if (res.data.error === "Invalid token") {
                localStorage.removeItem("googleUser");
                }
            } else {
                setUsageLimits(res.data);
            }
            }
        )
        .catch((err) => {
            console.log("err", err);
            }
        );
    }

    const handleBuyToken = async () => {
        const currentUsageLimits = usageLimits.usageLeft;
        const products = await QonversionPlugin.products();
        const purchase = await QonversionPlugin.purchase({
          productId: "token10",
        }).then((res) => {
          setPaymentProcessing(true);
          alert("Payment successful. It's now processing.");
        }).catch((err) => {
          alert("Payment failed. If you think this is a mistake, you can restore your purchase by clicking on the + icon again.");
          return;
        });
        await QonversionPlugin.syncPurchases();
        //check if purchase is processed by api every 5 seconds
        const interval = setInterval(async () => {
          const googleUser = localStorage.getItem("googleUser");
          const usageLimits = await axios
            .post(
              "https://0x8a3cf5929896120565520424a8d6a55c956f82f3.diode.link/login",
              { token: JSON.parse(googleUser).idToken }
            )
            .then((res) => {
              if (res.data.error) {
                if (res.data.error === "Invalid token") {
                  localStorage.removeItem("googleUser");
                }
              } else {
                if (res.data.usageLeft > currentUsageLimits) {
                  setUsageLimits(res.data);
                  clearInterval(interval);
                  setPaymentProcessing(false);
                }
              }
            })
            .catch((err) => {
              console.log("err", err);
            });
        }, 5000);
      };
    return ( 
        <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: "1000",
      }}
    >
    
    

    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        backgroundColor: "white",
        transform: "translate(-50%, -50%)",
        padding: "1rem",
        borderRadius: "5px",
        width: "80%",
        maxWidth: "400px",
        textAlign: "center",
        zIndex: "1001",
        border: "1px solid #8b6ddb",
      }}
    >
        {/* Close button */}
    <div
        style={{
            position: "absolute",
            top: "0",
            right: "0",
            padding: "0.5rem",
            zIndex: "1001",
        }}
        onClick={() => {if(!isAdLoading) setBuyTokensPopupOpen(false)}}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="white"
            viewBox="0 0 24 24"
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6L6 18" stroke="black" strokeWidth="2" />
            <path d="M6 6l12 12" stroke="black" strokeWidth="2" />
        </svg>
    </div>
      <Typography
        style={{
          fontFamily: "Changa",
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        Buy Tokens
      </Typography>
      <Typography
        style={{
          fontFamily: "Changa",
          fontSize: "1rem",
          marginBottom: "1rem",
        }}
      >
        Are you running out of tokens? You can buy 50 tokens for $0.99 or watch an ad to earn 2 tokens.
      </Typography>
      <Button
        style={{
          border: "none",
          borderRadius: "5px",
          fontFamily: "Changa",
          backgroundColor: "#8b6ddb",
          textTransform: "none",
          fontSize: "1rem",
          color: "white",
          fontWeight: "bold",
          marginBottom: "0.5rem",
          width: "100%",
        }}
        onClick={handleBuyToken}
        variant="outlined"
      >
        Buy 50 Tokens
        <MonetizationOn
            style={{
                marginLeft: "0.5rem",
            }}
        />
      </Button>
      <Button
        style={{
          border: "none",
          borderRadius: "5px",
          fontFamily: "Changa",
          backgroundColor: "#8b6ddb",
          textTransform: "none",
          fontSize: "1rem",
          color: "white",
          fontWeight: "bold",
          width: "100%",

        }}
        onClick={handleRewardAd}
        variant="outlined"
      >
        {isAdLoading? <CircularProgress/>:"Watch Ad"}
        <LiveTvTwoTone  
            style={{
                marginLeft: "0.5rem",
            }}
        />
      </Button>
    </div>
    </div>
    );
}

export default BuyTokensPopup;