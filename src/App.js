import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WallpaperPage from './pages/Wallpaper';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <div style={{
          backgroundColor: "#f4f4f4",
        }}>
          <Routes>
            <Route path="/"element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="wallpaper" element={<WallpaperPage />} />

          </Routes></div>
      </BrowserRouter>
    </div>
  );
}

export default App;
