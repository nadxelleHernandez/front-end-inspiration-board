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
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";

const kBaseUrl = "https://adorableocelots-inspiboard-be.herokuapp.com";

const createCardAPI = (card) => {
  return axios
    .post(`${kBaseUrl}/boards/${card.board_id}/cards`, card)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.statusText);
      console.log(error.response.data);
      return error.response.data;
    });
};

const fetchCardsAPI = (boardId) =>{
    return axios
      .get(`${kBaseUrl}/boards/${boardId}`)
      .then((response) =>{
        return response.data;
      })
      .catch((error)=> {
        console.log(error.response.data)
      });
}

function App() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState({ show: false, message: "" });
  const [sortCardsValue, setSortCardsValue] = useState("");

  const handleClose = () => setShowModal({ show: false, message: "" });
  const handleShow = (errorMessage) =>
    setShowModal({ show: true, message: errorMessage });

  const fetchBoards = () => {
    return axios
      .get(`${kBaseUrl}/boards`)
      .then((response) => {
        setBoards(response.data["data"]);
      })
      .catch((error) => {
        console.log(error);
        handleShow(`Cannot fetch the Boards at this time. Try again later`);
      });
  };
  useEffect(() => {
    fetchBoards();
  }, []);
  
  const verifyBoardTitle = (title)=>{
    for (let board of boards){
      if (board.title === title){
        handleShow(`A board named '${title}' already exists. Please choose a different name.`);
        return false;
      }
    }
    return true;
  }

  const addBoard = (newBoard) => {
    const verificationResult = verifyBoardTitle(newBoard.title);
    if (verificationResult){
      return axios
        .post(`${kBaseUrl}/boards`, newBoard)
        .then((response) => {
          let newBoardData = { ...response.data["data"] };
          const newBoards = [...boards];
          newBoards.push(newBoardData);
          setBoards(newBoards);
        })
        .catch((error) => {
          console.log(error);
          handleShow(`Cannot add a Board at this time. Try again later.`);
        });
  }};

  const addCard = (newCard) => {
    const newCardData = [...cards];
    createCardAPI(newCard).then((responseData) => {
      if (responseData.statuscode !== 201) {
        handleShow(`Error creating the card: ${responseData.message}`);
      } else {
        newCard = responseData.data;
        newCardData.push(newCard);

        if (sortCardsValue !== "none") {
          newCardData.sort(sortMethods[sortCardsValue].method)
        }
        setCards(newCardData);

      }
    });
  };

  const updateSelectedBoard = (board) => {
    const newSelectedBoard = {
      id: board.id,
      title: board.title,
      owner: board.owner,
    };
    setSelectedBoard(newSelectedBoard);
    fetchCardsAPI(board.id).then(boardData =>{setCards(boardData.cards)})
    setSortCardsValue("none")
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

        if (sortCardsValue === "likes") {
          newCards.sort(sortMethods[sortCardsValue].method)
        }
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
  const deleteBoardCallBack = (boardId) => {
    const endPoint = kBaseUrl + `/boards/${boardId}`;

    axios
      .delete(endPoint)
      .then((response) => {
        const newBoards = [];
        for (let board of boards) {
          if (board.id !== boardId) {
            newBoards.push(board);
          }
        }
        setBoards(newBoards);
        setCards([]);
        setSelectedBoard(null);
      })
      .catch((error) => {
        console.log(error);
        handleShow(
          `Cannot delete board with id ${boardId} currently, try again later`
        );
      });
  };

  const sortMethods = {
    none: { method: "" },
    id: { method: (a, b) => (a.id-b.id) },
    alphabetically: { method: (a, b) => (a.message.localeCompare(b.message)) },
    likes: { method: (a, b) => (a.likes-b.likes) }
  };

  const handleSortCards = (sortBy) => {
    setSortCardsValue(sortBy);
    if (sortBy === "none") {
      return
    }
    const newCards = [...cards];
    newCards.sort(sortMethods[sortBy].method);
    setCards(newCards);
  };

  return (
    <div className="Inspiration Board">
      <header className="Inspo-Board">
        <Card className="inspo-title">
          <Card.Body>
            <h1>
              <FontAwesomeIcon icon={faPalette} /> Inspiration Board
            </h1>
          </Card.Body>
        </Card>
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
              <SelectedBoard
                board={selectedBoard}
                deleteBoard={deleteBoardCallBack}
              />
            </Col>
            <Col sm>
              <NewBoardForm addBoardCallBack={addBoard}/>
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
                  onHandleSortCards={handleSortCards}
                  sortCardsValue={sortCardsValue}
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
