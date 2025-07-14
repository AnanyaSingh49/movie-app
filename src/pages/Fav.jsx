import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import "../css/fav.css";

function Fav() {
  const { favourites } = useContext(MovieContext);

  return (
    <div className="fav">
      <h2>Favourites</h2>
      <div className="movies-grid">
        {favourites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} isFav />
        ))}
      </div>
    </div>
  );
}

export default Fav;