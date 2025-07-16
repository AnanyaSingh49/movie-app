import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import "../css/fav.css"; // ✅ if you use fav-specific styling

function Fav() {
  const { favourites } = useContext(MovieContext);

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "white", marginTop: "20px" }}>
        Your Favourites ❤️
      </h2>

      {favourites.length === 0 ? (
        <p style={{ color: "gray", textAlign: "center", marginTop: "40px" }}>
          No favourite movies yet!
        </p>
      ) : (
        <div className="movies-grid">
          {favourites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Fav;

/*import React, { useContext } from "react";
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

export default Fav;*/
