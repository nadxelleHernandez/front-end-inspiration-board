import React from "react";
import NoteCard from "./Card";
import Card from 'react-bootstrap/Card';
import { faNoteSticky } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import "./CardList.css"


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
                <Card.Header className="d-flex flex-wrap">
                    <div className="cardlist-title">
                        <FontAwesomeIcon icon={faNoteSticky}/> Cards for <span className="font-italic">{boardTitle}</span>
                    </div>
                    <DropdownButton id="dropdown-basic-button" title="Sort by">
                        <Dropdown.Item href="#/action-1">ID</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">A-Z</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Likes</Dropdown.Item>
                    </DropdownButton>
                </Card.Header>
                <Card.Body className="d-flex flex-wrap">
                    {cardComponents}
                </Card.Body>
            </Card>
        </section>
    )
}


export default CardList;