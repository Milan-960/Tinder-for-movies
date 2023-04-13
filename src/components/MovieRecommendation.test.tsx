import React from "react";
import { render } from "@testing-library/react";
import MovieRecommendation from "./MovieRecommendation";
import { MovieContextProvider } from "../hooks/MovieContext";

describe("MovieRecommendation", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MovieContextProvider>
        <MovieRecommendation />
      </MovieContextProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
