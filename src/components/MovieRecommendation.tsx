import React, { useContext } from "react";
import { MovieContext } from "../hooks/MovieContext";
import MovieCard from "./MovieCard";
import "./MovieRecommendation.css";

const MovieRecommendation: React.FC = () => {
  const { currentMovie, acceptMovie, rejectMovie } = useContext(MovieContext);

  return (
    <div className="movie-recommendation">
      {currentMovie ? (
        <MovieCard
          {...currentMovie}
          onAccept={acceptMovie}
          onReject={rejectMovie}
        />
      ) : (
        <p>No more card</p>
      )}
    </div>
  );
};

export default MovieRecommendation;
