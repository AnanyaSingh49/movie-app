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
    navigate("/login");
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
            <Link to="/login" className="nav-auth-link">Login</Link>
            <Link to="/signup" className="nav-auth-link">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;

/*import React, { useContext, useEffect, useState } from "react";
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
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo" onClick={handleHome}>🎬 byananya</h2>
        <div className="nav-links">
          <button onClick={handleHome}>🏠 Home</button>
          <button onClick={handleFav}>❤️ Favourites</button>
        </div>
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>

      <div className="auth-links">
        {user ? (
          <>
            <span className="user-email">{user.email}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
export default NavBar;
*/

/*import React, { useContext, useEffect, useState } from "react";
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
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo" onClick={handleHome}>🎬 byananya</h2>
        <div className="nav-links">
          <button onClick={handleHome}>🏠 Home</button>
          <button onClick={handleFav}>❤️ Favourites</button>
        </div>
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>

      <div className="auth-links">
        {user ? (
          <>
            <span className="user-email">{user.email}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
export default NavBar;*/

/*import React, { useContext, useState } from "react";
import { MovieContext } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";
import "../css/NavBar.css";

function NavBar() {
  const { setSearchQuery, setPage } = useContext(MovieContext);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

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

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo" onClick={handleHome}>🎬 MovieApp</h2>
        <div className="nav-links">
          <button onClick={handleHome}>🏠 Home</button>
          <button onClick={handleFav}>❤️ Favourites</button>
        </div>
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>
    </nav>
  );
}

export default NavBar;*/

/*import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";
import "../css/NavBar.css";

function NavBar() {
  const { handleSearch } = useContext(MovieContext);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const submitSearch = e => {
    e.preventDefault();
    handleSearch(searchInput);
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>🎬 Search Movie </div>
      <form onSubmit={submitSearch} className="search-form">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="nav-buttons">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/favourites")}>Favourites</button>
      </div>
    </nav>
  );
}

export default NavBar;*/
