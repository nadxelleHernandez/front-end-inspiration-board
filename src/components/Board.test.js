import React from 'react';
import Board from './Board';
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react"

describe("Wave 01: ChatEntry", () => {
  beforeEach(() => {
    render(
      <div>
        <Board
          title="Fun Quotes"
          owner="Supriya"
          cards=""
        />
        <Board
          title="Hiking Mantras"
          owner="Megan"
          cards=""
        />
      </div> 
    );
  });

  test("shows the title for the first board", () => {
    expect(screen.getByText(/Fun Quotes/)).toBeInTheDocument();
  });

  test("shows the title for the second board", () => {
    expect(screen.getByText(/Hiking Mantras/)).toBeInTheDocument();
  });
});