import React, { useContext, useState } from "react";
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

export default NavBar;