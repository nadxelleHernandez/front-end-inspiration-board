import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ErrorModal.css'

function ErrorModal({showModal, onHandleClose}) {
  return (
    <>
      <Modal show={showModal.show} onHide={onHandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>API Error: {showModal.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHandleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ErrorModal;