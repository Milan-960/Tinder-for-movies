import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  it("renders the header and MovieRecommendation component", () => {
    render(<App />);

    const headerElement = screen.getByText(/Tinder for Movies/i);
    expect(headerElement).toBeInTheDocument();

    const movieRecommendationElement = screen.getByTestId(
      "movie-recommendation"
    );
    expect(movieRecommendationElement).toBeInTheDocument();
  });
});
