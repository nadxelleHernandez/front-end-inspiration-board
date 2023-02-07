import React from "react";
import Card from 'react-bootstrap/Card';

function SelectedBoard ({board}) {
  const displayMessage = board === null ? 'Please select a Board from the Board List!' : `${board.title} -  ${board.owner}`;

  return(
    <section>
      <Card>
        <Card.Header>💗Selected Board💗</Card.Header>
        <Card.Body>
          <p>{displayMessage}</p>
        </Card.Body>
      </Card>
    </section>
  );
}


export default SelectedBoard;