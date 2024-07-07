import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Hero from './Hero';
import AnimeDetail from './AnimeDetail';
import Login from './Login';
import Signup from './Signup';
import { AuthProvider, useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const [animeData, setAnimeData] = useState([]);

  useEffect(() => {
    load_Search();
  }, []);

  const setWait = (func, delay) => {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const load_Search = async (searchQuery = "") => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${searchQuery}&sfw`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const anime = await response.json();
      const grid = anime.data;
      setAnimeData(grid.map(anime => ({
        img: anime.images.webp.image_url,
        img2: anime.images.webp.large_image_url,
        title: anime.title,
        titleJapanese: anime.title_japanese,
        year: anime.year,
        synopsis: anime.synopsis,
        trailer: anime.trailer?.url,
      })));
    } catch (error) {
      alert('There was a problem with fetching data:', error);
    }
  };

  const handleSearch = setWait((e) => {
    const val = e.target.value.toLowerCase();
    load_Search(val);
  }, 500);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar onSearch={handleSearch} />
          <Routes>
            <Route path="/" element={<ProtectedRoute><Hero animeData={animeData} /></ProtectedRoute>} />
            <Route path="/anime/:index" element={<ProtectedRoute><AnimeDetail animeData={animeData} /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
