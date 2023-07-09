import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="home" element={<HomePage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
