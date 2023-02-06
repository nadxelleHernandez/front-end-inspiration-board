import React from "react";
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


export default BoardList;