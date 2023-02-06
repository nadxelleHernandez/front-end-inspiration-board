import React from "react";
// import './App.css';
import BoardList from "./components/BoardList";
import CardList from "./components/CardList";
import NewBoardForm from "./components/NewBoardForm";
import NewCardForm from "./components/NewCardForm";
import SelectedBoard from "./components/SelectedBoard";
import boardData from "./data/boards.json";
import { useState, useEffect } from "react";

function App() {
  // Displayed by BoardList.
  // todo: Make an API call to fetch boards after page load.
  // Creating a new board also updates this state.
  const [boards, setBoards] = useState(boardData);

  // Updated when user selects a board
  // todo: Should this contain the cards for the board or use separate state for cards?
  const [selectedBoard, setSelectedBoard] = useState(null);

  const fetchBoards = () => {
    // todo: Make an API call to fetch boards
    // and update boards state
  };
  useEffect(() => fetchBoards(), []);

  const fetchCards = (boardId) => {
    // todo: Make API call to get all cards belonging to the chosen board
    // Then update selectedBoard state
  };

  const addBoard = () => {
    // TODO: make API call to add board
    const newBoards = [...boards];

    // TODO: Remove when accessing API
    const nextId = Math.max(...newBoards.map(board => board.id)) + 1;

    newBoards.push({
        id: nextId,
        title: newBoards.nameData,
        owner: newBoards.emailData,
        cards: [], // TODO: might keep? 
    });

    setBoards(newBoards);
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        {
          // NewCardForm and CardList components only get displayed
          // when there is a selected board.
          selectedBoard && [<NewCardForm />, <CardList />]
        }
        <BoardList boards={boards} />
        <NewBoardForm addBoardCallBack={addBoard}/>
      </main>
    </div>
  );
}

export default App;
