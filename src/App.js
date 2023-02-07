import React from "react";
import './App.css';
import BoardList from "./components/BoardList";
import CardList from "./components/CardList";
import NewBoardForm from "./components/NewBoardForm";
import NewCardForm from "./components/NewCardForm";
import SelectedBoard from "./components/SelectedBoard";
import boardData from "./data/boards.json";
import cardData from "./data/cards.json";
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
  const updateSelectedBoard = (board)=>{
    // Need to pass {id, title, owner, cards}
    const newSelectedBoard = {
      title: board.title,
      owner: board.owner,
    };

    setSelectedBoard(newSelectedBoard);
    //Todo: Need to update card data, we are passing in card data here :D
    // Make a api call to get cards belonging to this board
  };


  const updateLikeCallBack = (cardId) =>{

    //Todo:Make a API call to update likes count of card
    //Update cards State

  };

  const deleteCardCallBack = (cardId) =>{

    //Todo:Make a API call to delete a card
    //Update cards State


  }

  return (
    <div className="Inspiration Board">
      <header className="Inspo-Board">
        <h1>Inspiration Board</h1>
      </header>
      <main>
        <Container fluid>
          <Row>
            <Col sm><BoardList boards={boards} onUpdateSelectedBoard={updateSelectedBoard}/></Col>
            <Col sm><SelectedBoard board={selectedBoard}/></Col>
            <Col sm><NewBoardForm addBoardCallBack={addBoard}/></Col>
          </Row>
          <Row>
            <Col sm={8}>
              {selectedBoard && [<CardList cards={cards} updateLike={updateLikeCallBack} deleteCard={deleteCardCallBack}/>]}
            </Col>
            <Col sm={4}>
              {selectedBoard && [<NewCardForm addCard={addCard}/>]}
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default App;
