import React from "react";
import Board from "./Board";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

describe("Board Component Tests", () => {
  beforeEach(() => {
    render(
      <div>
        <Board title="Fun Quotes" owner="Supriya" cards="" />
      </div>
    );
  });

  test("shows the title", () => {
    expect(screen.getByText(/Fun Quotes/)).toBeInTheDocument();
  });

  test("does not show the owner", () => {
    expect(screen.queryByText(/Supriya/)).not.toBeInTheDocument();
  });
});
