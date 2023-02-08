import React from "react";
import PropTypes from 'prop-types';
import Board from "./Board";
import "./BoardList.css"
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';

function BoardList (props) {
  const boardComponents = props.boards.map((board) => {
    return (
        <div key={board.id}>
            <Board
              id={board.id}
              title={board.title}
              owner={board.owner}
              onUpdateSelectedBoard={props.onUpdateSelectedBoard}
            />
        </div>
      );
  });

  return (
      <section>
        <Card>
          <Card.Header><FontAwesomeIcon icon={faFolderOpen}/> Boards</Card.Header>
          <Card.Body>
          <ol className="board-list">{boardComponents}</ol>
          </Card.Body>
        </Card>
      </section>
  );
};

BoardList.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
  }))
};


export default BoardList;