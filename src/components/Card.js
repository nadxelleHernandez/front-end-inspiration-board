import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

function NoteCard ({id, message, likesCount, updateLike, deleteCard}) {
    return (
        <Card className="note-card">
            <Card.Body className="d-flex justify-content-center align-items-center">
                <main>{message}</main>
            </Card.Body>
            <Card.Footer>
                <Stack direction="horizontal" gap={2}>   
                    <Button variant="outline-danger" size='sm' onClick={()=>{updateLike(id)}}>{likesCount}<FontAwesomeIcon icon={faHeart} style={{marginLeft: '0.5rem'}} /></Button>
                    <Button variant="outline-dark" size='sm'className="ms-auto" onClick={()=>{deleteCard(id)}}><FontAwesomeIcon icon={faTrashCan} /></Button>
                </Stack>
            </Card.Footer>
        </Card>
        );
}

export default NoteCard;