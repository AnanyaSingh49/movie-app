import React, { useContext, useState, useRef, useEffect } from "react";
import { MovieContext } from "../context/MovieContext";
import MovieModal from "./MovieModal";
import "../css/MovieCard.css";

function MovieCard({ movie }) {
  const { favourites, toggleFavourite } = useContext(MovieContext);
  const [showModal, setShowModal] = useState(false);
  const cardRef = useRef();
  const [scale, setScale] = useState(1);

  const isFav = favourites.some((m) => m.id === movie.id);
  const imageBase = "https://image.tmdb.org/t/p/w300";

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const middle = window.innerHeight / 2;
      const distance = Math.abs(rect.top + rect.height / 2 - middle);
      const maxDistance = window.innerHeight / 2;
      const newScale = 1 + Math.max(0, 1 - distance / maxDistance) * 0.3;
      setScale(newScale);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className="movie-card"
        ref={cardRef}
        style={{ transform: `scale(${scale})` }}
        onClick={() => setShowModal(true)}
      >
        <div className="poster-container">
          <img
            src={
              movie.poster_path
                ? imageBase + movie.poster_path
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={movie.title}
          />
          <button
            className={`fav-btn ${isFav ? "liked" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavourite(movie);
            }}
          >
            {isFav ? "❤️" : "🤍"}
          </button>
        </div>

        <div className="card-details">
          <h3>{movie.title}</h3>
          <p>{movie.release_date}</p>
        </div>
      </div>

      {showModal && <MovieModal movie={movie} onClose={() => setShowModal(false)} />}
    </>
  );
}

export default MovieCard;


/*
import React, { useContext, useState, useRef, useEffect } from "react";
import { MovieContext } from "../context/MovieContext";
import MovieModal from "./MovieModal";
import "../css/MovieCard.css";

function MovieCard({ movie }) {
  const { favourites, toggleFavourite } = useContext(MovieContext);
  const [showModal, setShowModal] = useState(false);
  const cardRef = useRef();
  const [scale, setScale] = useState(1);

  const isFav = favourites.some((m) => m.id === movie.id);
  const imageBase = "https://image.tmdb.org/t/p/w300";

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const middle = window.innerHeight / 2;
      const distance = Math.abs(rect.top + rect.height / 2 - middle);
      const maxDistance = window.innerHeight / 2;
      const newScale = 1 + Math.max(0, 1 - distance / maxDistance) * 0.3;
      setScale(newScale);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className="movie-card"
        ref={cardRef}
        style={{ transform: `scale(${scale})` }}
        onClick={() => setShowModal(true)}
      >
        
<img src={imageBase + movie.poster_path} alt={movie.title} />
        <div className="card-details">
          <h3>{movie.title}</h3>
          <p>{movie.release_date}</p>

          <button
  type="button"
  onClick={(e) => {
    e.stopPropagation();
    toggleFavourite(movie);
  }}
>
            {isFav ? "❤️" : "🖤"}
          </button>
        </div>
      </div>

      {showModal && <MovieModal movie={movie} onClose={() => setShowModal(false)} />}
    </>
  );
}

export default MovieCard;
*/





