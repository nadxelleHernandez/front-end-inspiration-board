import React from "react";
import PropTypes from 'prop-types';
import Board from "./Board";

function BoardList (props) {
  const boardComponents = props.boards.map((board) => {
    return (
        <div key={board.id}>
            <Board
              title={board.title}
              owner={board.owner}
              cards={board.cards}
            />
        </div>
      );
  });

  return (
      <section>
          <h2>Boards</h2>
          <ol className="board-list">{boardComponents}</ol>
      </section>
  );
};

BoardList.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
      cards: PropTypes.array.isRequired,
  }))
};


export default BoardList;