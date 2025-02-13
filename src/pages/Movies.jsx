import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Heading from ".././components/Heading";
import Input from "../components/ui/Input";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";
import { API_KEY, BASE_URL } from "../variables";

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    setResult(JSON.parse(localStorage.getItem("searchResults")) || []);
  }, []);

  const saveToLocalStorage = (results) => {
    localStorage.setItem("searchResults", JSON.stringify(results));
  };

  const searchMovies = async (query) => {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}`
    );
    const data = await response.json();
    return data.results;
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const response = await searchMovies(searchQuery);
    setResult(response);
    saveToLocalStorage(response);
    setSearchQuery("");
  };

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
          {result.map((entry) => {
            return <MovieCard movie={entry} key={uuidv4()} />;
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Movies;
