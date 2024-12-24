import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorite, setFavorite] = useState(() => {
    // Load favorites from localStorage during initialization
    const storedFavs = localStorage.getItem("favorites");
    try {
      return storedFavs ? JSON.parse(storedFavs) : [];
    } catch (e) {
      console.error("Failed to parse favorites from localStorage", e);
      return [];
    }
  });

  // Sync favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorite));
  }, [favorite]);

  // Add a movie to favorites
  const addToFavorite = (movie) => {
    setFavorite((prev) => [...prev, movie]);
  };

  // Remove a movie from favorites
  const deleteFromFavorite = (movieId) => {
    setFavorite((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  // Check if a movie is in favorites
  const isFavorite = (movieId) => {
    return favorite.some((movie) => movie.id === movieId);
  };

  return (
    <MovieContext.Provider
      value={{ favorite, addToFavorite, deleteFromFavorite, isFavorite }}
    >
      {children}
    </MovieContext.Provider>
  );
};
