/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MovieCard from "./MovieCard";

describe("MovieCard", () => {
  const defaultProps = {
    id: "1",
    imageURL: "https://starwars-visualguide.com/assets/img/films/1.jpg",
    title: "Test Movie",
    summary: "This is a test movie summary.",
    rating: 7,
    onAccept: jest.fn(),
    onReject: jest.fn(),
  };

  it("renders correctly", () => {
    const { getByText, getByAltText } = render(<MovieCard {...defaultProps} />);

    expect(getByText("Rating: (7/10)")).toBeInTheDocument();
    expect(getByAltText("Test Movie")).toHaveAttribute(
      "src",
      "https://starwars-visualguide.com/assets/img/films/1.jpg"
    );
    expect(getByText("Movie: Test Movie")).toBeInTheDocument();
    expect(getByText("This is a test movie summary.")).toBeInTheDocument();
    expect(getByText("✔️ Accept")).toBeInTheDocument();
    expect(getByText("❌ Reject")).toBeInTheDocument();
  });

  it("calls onAccept and onReject when buttons are clicked", () => {
    const { getByText } = render(<MovieCard {...defaultProps} />);

    fireEvent.click(getByText("✔️ Accept"));
    expect(defaultProps.onAccept).toHaveBeenCalledTimes(1);

    fireEvent.click(getByText("❌ Reject"));
    expect(defaultProps.onReject).toHaveBeenCalledTimes(1);
  });
});
