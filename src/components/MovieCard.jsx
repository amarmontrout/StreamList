import React from "react";
import "../css/Movies.css";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <div className="movie-card-title">{movie.title}</div>
      <div className="movie-card-release-date">Release Date: {movie.release_date}</div>
      <img
        className="movie-card-poster"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="movie-card-overview">{movie.overview}</div>
    </div>
  );
};

export default MovieCard;
