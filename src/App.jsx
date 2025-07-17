// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Fav from "./pages/Fav";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import "./css/App.css";

import { MovieProvider } from "./context/MovieContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <Routes>
          /* Public Routes */
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          /* Protected Routes with NavBar */
          <Route
            path="/"
            element={
              <PrivateRoute>
                <>
                  <NavBar />
                  <Home />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/favourites"
            element={
              <PrivateRoute>
                <>
                  <NavBar />
                  <Fav />
                </>
              </PrivateRoute>
            }
          />
        </Routes>
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;
