
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Fav from "./pages/Fav";
import NavBar from "./components/NavBar";
import "./css/App.css";
import { MovieProvider } from "./context/MovieContext";

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favourites" element={<Fav />} />
      </Routes>
    </MovieProvider>
  );
}

export default App;

