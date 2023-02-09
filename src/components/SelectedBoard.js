import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import DeleteBoardConfirmation from "./DeleteBoardConfirmation";
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function SelectedBoard({ board, deleteBoard }) {
  const displayMessage = board === null ? 'Please select a Board from the Board List!' : `${board.title} -  ${board.owner}`;
  const flag = board !== null ? true : false;

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const dismissDeleteConfirmation = () => setShowDeleteConfirmation(false);
  const confirmDeletion = () => {
    deleteBoard(board.id);
    setShowDeleteConfirmation(false);
  };

  return (
    <section>
      <Card>
        <Card.Header><FontAwesomeIcon icon={faSquareCheck} /> Selected Board</Card.Header>
        <Card.Body>
          <Stack direction="horizontal" gap={2}>
            <p>{displayMessage}</p>
            {flag && <Button variant="outline-dark" size='sm' className="ms-auto" onClick={() => setShowDeleteConfirmation(true)}><FontAwesomeIcon icon={faTrash} /></Button>}
          </Stack>
        </Card.Body>
      </Card>
      {
        showDeleteConfirmation &&
        <DeleteBoardConfirmation
          title={board.title}
          dismiss={dismissDeleteConfirmation}
          confirm={confirmDeletion} />
      }
    </section>
  );
}


export default SelectedBoard;