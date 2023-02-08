import React from "react";
import NoteCard from "./Card";
import Card from 'react-bootstrap/Card';
import { faNoteSticky } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function CardList ({boardTitle, cards, updateLike, deleteCard}) {
    const cardComponents = cards.map(card =>{
        return <NoteCard 
                id={card.id}
                message={card.message}
                likesCount={card.likes}
                updateLike={updateLike}
                deleteCard={deleteCard}/>
    })

    return (
        <section>
            <Card>
                <Card.Header><FontAwesomeIcon icon={faNoteSticky}/> Cards for <span className="font-italic">{boardTitle}</span></Card.Header>
                <Card.Body className="d-flex flex-wrap">
                    {cardComponents}
                </Card.Body>
            </Card>
        </section>
    )
}


export default CardList;