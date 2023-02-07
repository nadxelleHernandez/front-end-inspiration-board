import React from "react";
// import './App.css';
import BoardList from "./components/BoardList";
import CardList from "./components/CardList";
import NewBoardForm from "./components/NewBoardForm";
import NewCardForm from "./components/NewCardForm";
import SelectedBoard from "./components/SelectedBoard";
import boardData from "./data/boards.json";
import cardData from "./data/cards.json";
import { useState, useEffect } from "react";

function App() {
  // Displayed by BoardList.
  // todo: Make an API call to fetch boards after page load.
  // Creating a new board also updates this state.
  const [boards, setBoards] = useState(boardData);

  // Updated when user selects a board
  // todo: Should this contain the cards for the board or use separate state for cards?
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [cards, setCards] = useState(cardData);

  const fetchBoards = () => {
    // todo: Make an API call to fetch boards
    // and update boards state
  };
  useEffect(() => fetchBoards(), []);

  const fetchCards = (boardId) => {
    // todo: Make API call to get all cards belonging to the chosen board
    // Then update selectedBoard state
  };

  const addBoard = (newBoard) => {
    // TODO: make API call to add board
    const newBoards = [...boards];

    // TODO: Remove when accessing API
    const nextId = Math.max(...newBoards.map(board => board.id)) + 1;

    newBoards.push({
        id: nextId,
        title: newBoard.title,
        owner: newBoard.owner,
        cards: [], // TODO: might keep? 
    });

    setBoards(newBoards);
  };

  const addCard = (newCard) =>{
    const newCardData = [...cards];

    //TODO: Make an API call to add new Card

    newCardData.push({
      id: 100, //TODO: Should be generated from database
      message: newCard.message,
      board_id: 2,
      likes: 0
    })

    setCards(newCardData);

  };
    //should be pass down to board component, and should be trigger when use clicks a board.
    const updateSelectedBoard = (board)=>{
      // Need to pass {id, title, owner}
      const newSelectedBoard = {
        title: board.title,
        owner: board.owner,
      };

      setSelectedBoard(newSelectedBoard);
      //Todo: Need to update card data
      // Make a api call to get cards belonging to this board
    };

    // TODO: delete after we implement to board
    const testSelectedBoard = () =>{
      const testData ={
        title: "yummy food",
        owner: "Ya-Juan",
      }

      updateSelectedBoard(testData);
    }

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <SelectedBoard board={selectedBoard}/>
        <button onClick={testSelectedBoard}>test selcted board</button>
        {
          // NewCardForm and CardList components only get displayed
          // when there is a selected board.
          selectedBoard && [<NewCardForm addCard={addCard}/>, <CardList cards={cards}/>]
        }
        <BoardList boards={boards} />
        <NewBoardForm addBoardCallBack={addBoard}/>
        {/* <NewCardForm addCard={addCard}/>
        <CardList cards={cards}/> */}
      </main>
    </div>
  );
}

export default App;
