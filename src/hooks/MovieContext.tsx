import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

interface Movie {
  id: string;
  imageURL: string;
  title: string;
  summary: string;
  rating: number;
}

interface MovieContextValue {
  movies: Movie[];
  currentMovie: Movie | null;
  acceptMovie: () => void;
  rejectMovie: () => void;
}

// movie context created
export const MovieContext = createContext<MovieContextValue>({
  movies: [],
  currentMovie: null,
  acceptMovie: () => {},
  rejectMovie: () => {},
});

interface MovieContextProviderProps {
  children: React.ReactNode;
}

export const MovieContextProvider: React.FC<MovieContextProviderProps> = ({
  children,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);

  const moveToNextMovie = useCallback(() => {
    const currentIndex = movies.findIndex(
      (movie) => movie.id === currentMovie?.id
    );
    setCurrentMovie(movies[currentIndex + 1]);
  }, [movies, currentMovie]);

  //* In a real scenario
  //* you would need a backend to handle the accepting and rejecting of movies,
  //* as well as to store user preferences

  const acceptMovie = useCallback(() => {
    if (!currentMovie) return;

    // Simulate accepting a movie
    console.log("Accept movie:", currentMovie.id);
    moveToNextMovie();
  }, [currentMovie, moveToNextMovie]);

  const rejectMovie = useCallback(() => {
    if (!currentMovie) return;

    // Simulate rejecting a movie
    console.log("Reject movie:", currentMovie.id);
    moveToNextMovie();
  }, [currentMovie, moveToNextMovie]);

  //? This is to just match the requriments from the task about recommendations for making a put call

  //   const acceptMovie = async () => {
  //     if (!currentMovie) return;
  //     try {
  //       await axios.put(`/recommendations/${currentMovie.id}/accept`);
  //       console.log("Accept movie:", currentMovie.id);
  //       moveToNextMovie();
  //     } catch (error) {
  //       console.error("Error accepting movie:", error);
  //     }
  //   };

  //   const rejectMovie = async () => {
  //     if (!currentMovie) return;
  //     try {
  //       await axios.put(`/recommendations/${currentMovie.id}/reject`);
  //       console.log("Reject movie:", currentMovie.id);
  //       moveToNextMovie();
  //     } catch (error) {
  //       console.error("Error rejecting movie:", error);
  //     }
  //   };

  const fetchMovies = async (): Promise<void> => {
    const response = await axios.get<{ results: Record<string, any>[] }>(
      "https://swapi.dev/api/films/"
    );

    const films: Movie[] = response.data.results.map(
      (film: Record<string, any>, index: number) => ({
        id: String(index + 1),
        imageURL: `https://starwars-visualguide.com/assets/img/films/${
          index + 1
        }.jpg`,
        title: film.title,
        summary: film.opening_crawl,
        rating: film.episode_id,
      })
    );

    setMovies(films);
    setCurrentMovie(films[0]);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <MovieContext.Provider
      value={{ movies, currentMovie, acceptMovie, rejectMovie }}
    >
      {children}
    </MovieContext.Provider>
  );
};
