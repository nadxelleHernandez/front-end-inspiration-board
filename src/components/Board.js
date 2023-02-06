import React from "react";
import PropTypes from 'prop-types';

function Board (props) {
  return (
    <div>
      <li className="board-title">{props.title}</li>
    </div>
  );
};

Board.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
};

export default Board;