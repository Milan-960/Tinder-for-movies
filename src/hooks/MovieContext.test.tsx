import React, { useContext } from "react";
import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import { MovieContext, MovieContextProvider } from "./MovieContext";

jest.mock("axios");

const TestComponent: React.FC = () => {
  const { movies, currentMovie, acceptMovie, rejectMovie } =
    useContext(MovieContext);

  return (
    <div>
      <div data-testid="movies-count">{movies.length}</div>
      <div data-testid="current-movie">{currentMovie?.title}</div>
      <button data-testid="accept-button" onClick={acceptMovie}></button>
      <button data-testid="reject-button" onClick={rejectMovie}></button>
    </div>
  );
};

describe("MovieContextProvider", () => {
  it("fetches movies and sets the first movie as the current movie", async () => {
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

    const { getByTestId } = render(
      <MovieContextProvider>
        <TestComponent />
      </MovieContextProvider>
    );

    await waitFor(() => {
      expect(getByTestId("movies-count")).toHaveTextContent("2");
      expect(getByTestId("current-movie")).toHaveTextContent("A New Hope");
    });
  });

  it("accepts and rejects movies", async () => {
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

    const { getByTestId } = render(
      <MovieContextProvider>
        <TestComponent />
      </MovieContextProvider>
    );

    await waitFor(() => {
      expect(getByTestId("current-movie")).toHaveTextContent("A New Hope");
    });

    getByTestId("accept-button").click();
    await waitFor(() => {
      expect(getByTestId("current-movie")).toHaveTextContent(
        "The Empire Strikes Back"
      );
    });

    getByTestId("reject-button").click();
    await waitFor(() => {
      expect(getByTestId("current-movie")).toHaveTextContent("");
    });
  });
});
