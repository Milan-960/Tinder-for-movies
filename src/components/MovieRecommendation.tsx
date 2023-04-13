import React, { useContext, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { MovieContext } from "../hooks/MovieContext";
import MovieCard from "./MovieCard";
import "./MovieRecommendation.css";

const MovieRecommendation: React.FC = () => {
  const { currentMovie, acceptMovie, rejectMovie } = useContext(MovieContext);

  const [transformStyle, setTransformStyle] = useState<React.CSSProperties>({});

  // For swiping
  const swiped = (direction: string) => {
    if (direction === "right") {
      acceptMovie();
    } else if (direction === "left") {
      rejectMovie();
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => swiped("left"),
    onSwipedRight: () => swiped("right"),
    onSwiping: (eventData) => {
      setTransformStyle({ transform: `translate(${eventData.deltaX}px)` });
    },
    onSwiped: () => {
      setTransformStyle({});
    },
    trackMouse: true,
  });

  return (
    <div className="movie-recommendation">
      {currentMovie ? (
        <>
          <div {...handlers} style={transformStyle}>
            <MovieCard
              {...currentMovie}
              onAccept={acceptMovie}
              onReject={rejectMovie}
            />
          </div>
        </>
      ) : (
        <p>No More Movies!</p>
      )}
    </div>
  );
};

export default MovieRecommendation;
