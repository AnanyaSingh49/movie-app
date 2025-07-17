

import React, { useContext, useEffect } from "react";
import { MovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import Genres from "../components/Genres";
import "../css/Home.css";

function Home() {
  const {
    movies,
    favourites,
    toggleFavourite,
    selectedGenre,
    setSelectedGenre,
    setPage,
    loading,
  } = useContext(MovieContext);

  // Reset to page 1 when genre changes
  useEffect(() => {
    setPage(1);
  }, [selectedGenre]);

  // 👇 Infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = window.innerHeight;

      if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
        // Near bottom & not already loading
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, setPage]);

  return (
    <div>
      <Genres onSelectGenre={(id) => setSelectedGenre(id)} />

      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFav={favourites.some((fav) => fav.id === movie.id)}
            toggleFavourite={toggleFavourite}
          />
        ))}
      </div>

      
      {loading && <p style={{ textAlign: "center", color: "white" }}>Loading...</p>}
    </div>
  );
}

export default Home;

/*import React, { useContext, useEffect } from "react";
import { MovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import Genres from "../components/Genres";
import "../css/Home.css"; // If you have grid styling here

function Home() {
  const {
    movies,
    favourites,
    toggleFavourite,
    selectedGenre,
    setSelectedGenre,
    setPage,
  } = useContext(MovieContext);

  // Reset to page 1 whenever selectedGenre changes
  useEffect(() => {
    setPage(1);
  }, [selectedGenre, setPage]);

  return (
    <div>
    
      <Genres onSelectGenre={(id) => setSelectedGenre(id)} />

      
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFav={favourites.some((fav) => fav.id === movie.id)}
            toggleFavourite={toggleFavourite}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;*/
/*import React, { useContext, useEffect, useRef, useCallback } from "react";
import { MovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";

const Home = () => {
  const { movies, setPage } = useContext(MovieContext);
  const loaderRef = useRef(null);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, [setPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  return (
    <div className="home">
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div ref={loaderRef} className="loader">
        Loading more movies...
      </div>
    </div>
  );
};

export default Home;*/