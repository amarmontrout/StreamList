import React, { useState, useCallback } from "react";
import Heading from ".././components/Heading";
import Input from "../components/ui/Input";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";
import { API_KEY, BASE_URL } from "../variables";

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("searchResults")) || [];
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return [];
    }
  });

  const saveToLocalStorage = useCallback((results) => {
    localStorage.setItem("searchResults", JSON.stringify(results));
  }, []);

  const searchMovies = useCallback(async (query) => {
    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  }, []);

  const handleChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!searchQuery.trim()) return;

      try {
        const response = await searchMovies(searchQuery);
        setResult(response);
        saveToLocalStorage(response);
        setSearchQuery("");
      } catch (error) {
        console.error("Error submitting search:", error);
      }
    },
    [searchQuery, searchMovies, saveToLocalStorage]
  );

  return (
    <div className="container">
      <Heading>
        <h1>Movie Search</h1>
      </Heading>
      <main>
        <Input
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          inputText={searchQuery}
        />
        <div className="movie-card-results">
          {result.map((entry) => (
            <MovieCard
              movie={entry}
              key={entry.id || entry.title} // Use movie's unique ID instead of uuidv4
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Movies;
