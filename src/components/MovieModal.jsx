import React, { useEffect, useState } from "react";
import "../css/MovieModal.css";
import axios from "axios";

function MovieModal({ movie, onClose }) {
  const imageBase = "https://image.tmdb.org/t/p/w500";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState("");

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}`
        );
        const castData = res.data.cast.slice(0, 5); // first 5 cast
        const crew = res.data.crew;
        const directorInfo = crew.find((member) => member.job === "Director");

        setCast(castData);
        setDirector(directorInfo ? directorInfo.name : "Unknown");
      } catch (error) {
        console.error("Error fetching credits:", error);
      }
    };

    fetchCredits();
  }, [movie.id, API_KEY]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img
          src={
            movie.poster_path
              ? `${imageBase}${movie.poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.title}
        />
        <div className="modal-details">
          <h2>{movie.title}</h2>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average}</p>
          <p><strong>Overview:</strong> {movie.overview || "No overview available."}</p>
          <p><strong>Director:</strong> {director}</p>
          <p><strong>Cast:</strong> {cast.map(actor => actor.name).join(", ")}</p>
        </div>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
    </div>
  );
}

export default MovieModal;
/*import "../css/MovieModal.css";

function MovieModal({ movie, onClose }) {
  const imageBase = "https://image.tmdb.org/t/p/w500";
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageBase + movie.backdrop_path} alt={movie.title} />
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <p><strong>Rating:</strong> {movie.vote_average}</p>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default MovieModal;*/