import React from "react";
import "./App.css";
import BoardList from "./components/BoardList";
import CardList from "./components/CardList";
import NewBoardForm from "./components/NewBoardForm";
import NewCardForm from "./components/NewCardForm";
import SelectedBoard from "./components/SelectedBoard";
import ErrorModal from "./components/ErrorModal";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

const kBaseUrl = "https://adorableocelots-inspiboard-be.herokuapp.com";

const createCardAPI = (card) => {
  return axios
    .post(`${kBaseUrl}/boards/${card.board_id}/cards`, card)
    .then((response) => {
      console.log(response.data.statuscode);
      console.log(response.data.message);
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.statusText);
      console.log(error.response.data);
      return error.response.data;
    });
};

function App() {
  // Displayed by BoardList.
  // todo: Make an API call to fetch boards after page load.
  // Creating a new board also updates this state.
  const [boards, setBoards] = useState([]);

  // Updated when user selects a board
  // todo: Should this contain the cards for the board or use separate state for cards?
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [cards, setCards] = useState();

  const [showModal, setShowModal] = useState({ show: false, message: "" });

  const handleClose = () => setShowModal({ show: false, message: "" });
  const handleShow = (errorMessage) =>
    setShowModal({ show: true, message: errorMessage });

  const fetchBoards = () => {
    // todo: Make an API call to fetch boards
    // and update boards state
    return axios
      .get(`${kBaseUrl}/boards`)
      .then((response) => {
        //console.log(response.data["data"]);
        setBoards(response.data["data"]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchBoards();
  }, []);

  const addBoard = (newBoard) => {
    // TODO: make API call to add board
    const newBoards = [...boards];
    // TODO: Remove when accessing API
    //const nextId = Math.max(...newBoards.map(board => board.id)) + 1;
    return axios
      .post(`${kBaseUrl}/boards`, newBoard)
      .then((response) => {
        let newBoardData = { ...response.data["data"] };
        console.log(response.data);
        newBoards.push(newBoardData);
        setBoards(newBoards);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addCard = (newCard) => {
    const newCardData = [...cards];
    createCardAPI(newCard).then((responseData) => {
      if (responseData.statuscode !== 201) {
        // there was an error
        handleShow(`Error creating the card: ${responseData.message}`);
      } else {
        newCard = responseData.data;
        newCardData.push(newCard);
        setCards(newCardData);
      }
    });
  };
  const updateSelectedBoard = (board) => {
    // Need to pass {id, title, owner, cards}
    const newSelectedBoard = {
      id: board.id,
      title: board.title,
      owner: board.owner,
    };

    setSelectedBoard(newSelectedBoard);

    //Todo: Need to update card data, we are passing in card data here :D
    // Make a api call to get cards belonging to this board
    setCards(board.cards);
  };

  const updateLikeCallBack = (cardId) => {
    const endPoint = kBaseUrl + `/cards/${cardId}/add-likes`;

    axios
      .patch(endPoint)
      .then((response) => {
        const cardLikes = response.data.data.likes;
        const newCards = cards.map((card) => {
          if (cardId === card.id) {
            return { ...card, likes: cardLikes };
          } else {
            return card;
          }
        });

        setCards(newCards);
      })
      .catch((error) => {
        console.log(error.response);
        handleShow(
          `Cannot like card with id ${cardId} currently, try again later`
        );
      });
  };

  const deleteCardCallBack = (cardId) => {
    const endPoint = kBaseUrl + `/cards/${cardId}`;

    axios
      .delete(endPoint)
      .then((response) => {
        console.log(response.data);
        const newCards = [];
        for (let card of cards) {
          if (card.id !== cardId) {
            newCards.push(card);
          }
        }
        setCards(newCards);
      })
      .catch((error) => {
        console.log(error);
        handleShow(
          `Cannot delete card with id ${cardId} currently, try again later`
        );
      });
  };

  return (
    <div className="Inspiration Board">
      <header className="Inspo-Board">
        <h1>Inspiration Board</h1>
      </header>
      <main>
        <Container fluid>
          <Row>
            <Col sm>
              <BoardList
                boards={boards}
                onUpdateSelectedBoard={updateSelectedBoard}
              />
            </Col>
            <Col sm>
              <SelectedBoard board={selectedBoard} />
            </Col>
            <Col sm>
              <NewBoardForm addBoardCallBack={addBoard} />
            </Col>
          </Row>
          <Row>
            <Col sm={8}>
              {selectedBoard && [
                <CardList
                  boardTitle={selectedBoard.title}
                  cards={cards}
                  updateLike={updateLikeCallBack}
                  deleteCard={deleteCardCallBack}
                />,
              ]}
            </Col>
            <Col sm={4}>
              {selectedBoard && [
                <NewCardForm addCard={addCard} selectedBoard={selectedBoard} />,
              ]}
            </Col>
          </Row>
        </Container>
        <ErrorModal showModal={showModal} onHandleClose={handleClose} />
      </main>
    </div>
  );
}

export default App;
