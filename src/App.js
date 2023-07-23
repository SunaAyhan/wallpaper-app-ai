import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
import WallpaperPage from "./pages/Wallpaper";
import LoadingScreen from "./components/LoadingScreen";
import { QonversionPlugin } from "capacitor-plugin-qonversion";
import qonversionKey from "./qonversionKey.json";
import { AdMob } from '@capacitor-community/admob';

function App() {

  useEffect( () => {
    const awaitGoogleAds = async () => {
      const { status } = await AdMob.trackingAuthorizationStatus();
      if (status === 'notDetermined') {
        alert("notDetermined");
      }
    
      AdMob.initialize({
        requestTrackingAuthorization: true,
        testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
        initializeForTesting: true,
      });
    }
    awaitGoogleAds().catch((err) => {
      alert("awaitGoogleAds: "+err);
    });

    const awaitQonversion = async () => {
      await QonversionPlugin.launchWithKey({
        key: qonversionKey.key,
        observerMode: false
      }).then((res) => {
        console.log("QonversionPlugin.launchWithKey: "+res);
      }).catch((err) => {
        console.log("QonversionPlugin.launchWithKey: "+err);
      });
    }
    awaitQonversion().catch((err) => {
      alert("awaitQonversion: "+err);
    });
    const googleUser = localStorage.getItem("googleUser");
    if (googleUser) {
      QonversionPlugin.identify({
        userId: JSON.parse(googleUser).id,
      });
    }

    // handleBackButton();
    const script = document.createElement('script');
    
    script.innerHTML = `function  pressBack(){
      window.history.back();
    }`;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  return (
    <div className="App">
      <BrowserRouter>
        <div
          style={{
            backgroundColor: "#f4f4f4",
          }}
        >
          <Routes>
         
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route path="/wallpaper" element={<WallpaperPage />} />
            <Route path="/loading" element={<LoadingScreen />} />
          </Routes>{" "}
        </div>{" "}
      </BrowserRouter>{" "}
    </div>
  );
}

export default App;
