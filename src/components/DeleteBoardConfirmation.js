import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function DeleteBoardConfirmation({ title, dismiss, confirm }) {
    return (
        <Modal show={true} onHide={dismiss}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm board deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete the board '{title}'?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={confirm}>
                    Confirm Deletion
                </Button>
                <Button variant="outline-secondary" onClick={dismiss}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteBoardConfirmation;