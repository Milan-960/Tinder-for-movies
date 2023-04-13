/* eslint-disable testing-library/prefer-screen-queries */
import React, { useContext } from "react";
import { fireEvent, render } from "@testing-library/react";
import axios from "axios";
import { MovieContext, MovieContextProvider } from "./MovieContext";
import MovieRecommendation from "../components/MovieRecommendation";

jest.mock("axios");

const TestComponent: React.FC = () => {
  const { movies, currentMovie, acceptMovie, rejectMovie } =
    useContext(MovieContext);

  return (
    <>
      <div>
        <div data-testid="movies-count">{movies.length}</div>
        <div data-testid="current-movie">{currentMovie?.title}</div>
        <button data-testid="accept-button" onClick={acceptMovie}></button>
        <button data-testid="reject-button" onClick={rejectMovie}></button>
      </div>
      <MovieRecommendation />
    </>
  );
};
it("renders the current movie and accepts or rejects it", async () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const fakeResponse = {
    data: {
      results: [
        {
          title: "A New Hope",
          opening_crawl: "It is a period of civil war...",
          episode_id: 4,
        },
        {
          title: "The Empire Strikes Back",
          opening_crawl: "It is a dark time for the Rebellion...",
          episode_id: 5,
        },
      ],
    },
  };
  mockedAxios.get.mockResolvedValue(fakeResponse);

  const { findByTestId } = render(
    <MovieContextProvider>
      <TestComponent />
    </MovieContextProvider>
  );

  const currentMovie = await findByTestId("current-movie");
  expect(currentMovie).toHaveTextContent("");

  fireEvent.click(await findByTestId("accept-button"));

  const nextMovie = await findByTestId("current-movie");
  expect(nextMovie).toHaveTextContent("The Empire Strikes Back");

  fireEvent.click(await findByTestId("reject-button"));
});
