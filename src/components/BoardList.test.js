import React from 'react';
import BoardList from './BoardList';
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react"

const LOG = [
  {
    title: "Fun Quotes",
    owner: "Mark",
    cards: [],
  },
  {
    title: "Hiking Mantra",
    owner: "Supriya",
    cards: [],
  },
  {
    title: "Beach Sunset",
    owner: "Ada",
    cards: [],
  },
  {
    title: "Valley Views",
    owner: "Robert",
    cards: [],
  },
  {
    title: "Hair Care",
    owner: "Stacey",
    cards: [],
  },
];

describe("BoardList component Test", () => {
  beforeEach(() => {
    render(<BoardList boards={LOG} />);
  });

  test("renders without crashing and shows all board titles", () => {
    expect(screen.getByText(/Fun Quotes/)).toBeInTheDocument();
    expect(screen.getByText(/Hiking Mantra/)).toBeInTheDocument();
    expect(screen.getByText(/Beach Sunset/)).toBeInTheDocument();
    expect(screen.getByText(/Valley Views/)).toBeInTheDocument();
    expect(screen.getByText(/Hair Care/)).toBeInTheDocument();
  });

  test("does not show owners for all boards", () => {
    expect(screen.queryByText(/Mark/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Supriya/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Ada/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Robert/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Stacey/)).not.toBeInTheDocument();
  });

  test("renders an empty list without crashing", () => {
    const element = render(<BoardList boards={[]} />);
    expect(element).not.toBeNull();
  });
});
