import React from "react";
import PropTypes from 'prop-types';

function Board (props) {

  const onClickBoard = () => {

    const selectedBoard = {
      id: props.id,
      title: props.title,
      owner: props.owner,
    };
    props.onUpdateSelectedBoard(selectedBoard);
  };
  
  return (
    <div>
      <li className="board-title" onClick={onClickBoard}>{props.title}</li>
    </div>
  );
};

Board.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
};

export default Board;