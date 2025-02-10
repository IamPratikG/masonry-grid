import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import MasonryWall from "../components/MasonryWall";

describe("MasonryWall component", () => {
  it("renders children correctly", () => {
    const { container } = render(
      <MasonryWall>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </MasonryWall>
    );

    expect(container.firstChild).toHaveStyle("display: grid");
    expect(container.firstChild?.childNodes).toHaveLength(3);
  });
});
