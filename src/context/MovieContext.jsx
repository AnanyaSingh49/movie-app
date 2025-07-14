import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MovieContext = createContext();

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fetch Movies (search or popular)
  const fetchMovies = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const endpoint = searchQuery
        ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            searchQuery
          )}&page=${page}`
        : `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;

      const res = await axios.get(endpoint);
      const newMovies = res.data.results;

      if (page === 1) {
        setMovies(newMovies);
      } else {
        setMovies((prev) => [...prev, ...newMovies]);
      }

      if (newMovies.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Watch for page or searchQuery change
  useEffect(() => {
    fetchMovies();
  }, [page, searchQuery]);

  // Infinite Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 50 >=
          document.documentElement.scrollHeight &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  // Toggle Favourite
  const toggleFavourite = (movie) => {
    const exists = favourites.some((fav) => fav.id === movie.id);
    let updated;

    if (exists) {
      updated = favourites.filter((fav) => fav.id !== movie.id);
    } else {
      updated = [...favourites, movie];
    }

    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  };

  // Search Handler
  const handleSearch = (query) => {
    setSearchQuery(query);
    setMovies([]);
    setPage(1);
    setHasMore(true);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        favourites,
        toggleFavourite,
        handleSearch,
        searchQuery,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
/*import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MovieContext = createContext();

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favourites")) || []
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fetch movies based on query (search or popular)
  const fetchMovies = async (pageNum = 1, isNewQuery = false) => {
    setLoading(true);
    try {
      const url = query
        ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${pageNum}`
        : `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${pageNum}`;

      const { data } = await axios.get(url);

      if (data.results.length === 0) {
        setHasMore(false);
      }

      setMovies(prev =>
        isNewQuery ? data.results : [...prev, ...data.results]
      );
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch & infinite scroll handler
  useEffect(() => {
    fetchMovies(page, page === 1);
  }, [page, query]);

  // Save favourites to localStorage
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = movie => {
    const exists = favourites.some(fav => fav.id === movie.id);
    if (exists) {
      setFavourites(favs => favs.filter(fav => fav.id !== movie.id));
    } else {
      setFavourites(favs => [...favs, movie]);
    }
  };

  const handleSearch = q => {
    setPage(1);
    setHasMore(true);
    setQuery(q);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(p => p + 1);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        favourites,
        toggleFavourite,
        handleSearch,
        loadMore,
        query,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}*/