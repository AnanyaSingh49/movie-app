


import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "../context/MovieContext";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "../css/NavBar.css";

function NavBar() {
  const { setSearchQuery, setPage } = useContext(MovieContext);
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchQuery(input);
    navigate("/");
  };

  const handleHome = () => {
    setSearchQuery("");
    setPage(1);
    navigate("/");
  };

  const handleFav = () => {
    navigate("/favourites");
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/Login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo" onClick={handleHome}>🎬 byananya</h2>
        {user && (
          <div className="nav-links">
            <button onClick={handleHome}>🏠 Home</button>
            <button onClick={handleFav}>❤️ Favourites</button>
          </div>
        )}
      </div>

      {user && (
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search movies..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>
      )}
     
      <div className="auth-links">
        {user ? (
          <>
            <span className="user-email">{user.email}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/Login" className="nav-auth-link">Login</Link>
            <Link to="/signup" className="nav-auth-link">Signup</Link>
          </>
        )}
      </div>
     
    </nav>
  );
}

export default NavBar;

