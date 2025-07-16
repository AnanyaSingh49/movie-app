
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState({});
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // ✅ Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("favourites");
    if (stored) {
      try {
        setFavourites(JSON.parse(stored));
        console.log("✅ Loaded favourites:", stored);
      } catch (e) {
        console.error("❌ Failed to parse favourites", e);
      }
    }
  }, []);
  /*useEffect(() => {
  const storedFavs = JSON.parse(localStorage.getItem("favourites"));
  if (storedFavs) {
    setFavourites(storedFavs);
  }
}, []);*/

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  // ✅ Fetch genres
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
      .then((res) => {
        const genreMap = {};
        res.data.genres.forEach((g) => {
          genreMap[g.id] = g.name;
        });
        setGenres(genreMap);
      });
  }, []);

  // ✅ Fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let url = "";

        if (searchQuery.length > 1) {
          url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${page}&include_adult=false&language=en-US`;
        } else if (selectedGenre) {
          url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}&page=${page}`;
        } else {
          url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;
        }

        const res = await axios.get(url);
        const newMovies = res.data.results;

        if (page === 1) {
          setMovies(newMovies);
        } else {
          setMovies((prev) => [...prev, ...newMovies]);
        }
      } catch (e) {
        console.error("❌ Fetch movie error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, searchQuery, selectedGenre]);

  // ✅ Toggle favourite
  const toggleFavourite = (movie) => {
    const exists = favourites.some((m) => m.id === movie.id);
    const updated = exists
      ? favourites.filter((m) => m.id !== movie.id)
      : [...favourites, movie];
    setFavourites(updated);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        favourites,
        toggleFavourite,
        searchQuery,
        setSearchQuery,
        page,
        setPage,
        genres,
        selectedGenre,
        setSelectedGenre,
        loading,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}


/*import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState({});
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loading, setLoading] = useState(false);

 const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // ✅ Fetch genre list once
  const fetchGenres = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      const genreMap = {};
      res.data.genres.forEach((genre) => {
        genreMap[genre.id] = genre.name;
      });
      setGenres(genreMap);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  // ✅ Fetch movies (popular, search, or genre-filtered)
  const fetchMovies = async () => {
    setLoading(true);
    try {
      let url = "";

      if (searchQuery) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${page}`;
      } else if (selectedGenre) {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}&page=${page}`;
      } else {
        url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;
      }

      const res = await axios.get(url);

      if (page === 1) {
        setMovies(res.data.results);
      } else {
        setMovies((prev) => [...prev, ...res.data.results]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
    setLoading(false);
  };

  // ✅ Load favourites from localStorage on start
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(favs);
  }, []);

  // ✅ Save favourites to localStorage on change
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  // ✅ Fetch genres on first load
  (useEffect(() => {
    fetchGenres();
  }, []);

  // ✅ Fetch movies on page/search/genre change
  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [page, searchQuery, selectedGenre]);

  // ✅ Toggle favourite
  const toggleFavourite = (movie) => {
    const isFav = favourites.find((m) => m.id === movie.id);
    if (isFav) {
      setFavourites(favourites.filter((m) => m.id !== movie.id));
    } else {
      setFavourites([...favourites, movie]);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        favourites,
        toggleFavourite,
        searchQuery,
        setSearchQuery,
        page,
        setPage,
        genres,
        selectedGenre,
        setSelectedGenre,
        loading,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}*/
/*import React, { createContext, useState, useEffect } from "react";
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
}*/
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