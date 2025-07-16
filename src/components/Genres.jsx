import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import "../css/Genres.css";

function Genres({ onSelectGenre }) {
  const { genres, selectedGenre } = useContext(MovieContext);

  return (
    <div className="genres-container">
      <button
        className={`genre-button ${selectedGenre === null ? "active" : ""}`}
        onClick={() => onSelectGenre(null)}
      >
        All
      </button>
      {Object.entries(genres).map(([id, name]) => (
        <button
          key={id}
          className={`genre-button ${selectedGenre == id ? "active" : ""}`}
          onClick={() => onSelectGenre(id)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

export default Genres;