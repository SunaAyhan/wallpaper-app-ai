import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
import WallpaperPage from "./pages/Wallpaper";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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
              element={<HomePage setIsLoading={setIsLoading} />}
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
