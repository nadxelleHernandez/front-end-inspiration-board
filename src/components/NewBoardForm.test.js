import React from 'react';
import NewBoardForm from './NewBoardForm';
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react"
import {addBoard} from "../App.js"

describe('NewBoardForm Component test', () => {

  beforeEach(() => {
    render(
      <NewBoardForm addBoardCallBack={addBoard}/>
    );
  });

  test('Loads an empty form', () => {
    expect(
      screen.getByRole('form', {
        name: /Create a New Board/i,
      })
    ).toHaveFormValues({
      title: "",
      owner: "",
    });
  });
});