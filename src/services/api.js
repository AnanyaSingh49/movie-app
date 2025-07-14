// src/services/api.js
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (page = 1) => {
  try {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching movies:", err);
    return { results: [] };
  }
};