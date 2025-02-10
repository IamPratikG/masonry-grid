import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { PhotosProvider } from "../PhotosContext";
import SearchBox from "../components/SearchBox";

describe("SearchBox component", () => {
  it("renders search input and button", () => {
    render(
      <PhotosProvider>
        <SearchBox />
      </PhotosProvider>
    );

    expect(screen.getByPlaceholderText("Search photos...")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("updates input value on change", () => {
    render(
      <PhotosProvider>
        <SearchBox />
      </PhotosProvider>
    );

    const input = screen.getByPlaceholderText("Search photos...");
    fireEvent.change(input, { target: { value: "nature" } });
    expect(input).toHaveValue("nature");
  });
});
