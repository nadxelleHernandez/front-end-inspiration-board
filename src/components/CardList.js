import { React } from "react";
import NoteCard from "./Card";
import Card from 'react-bootstrap/Card';
import { faNoteSticky } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from 'react-bootstrap/Form';
import "./CardList.css"


function CardList ({boardTitle, cards, updateLike, deleteCard, onHandleSortCards, sortCardsValue}) {
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
                    <Form.Select value={sortCardsValue} onChange={(e) => onHandleSortCards(e.target.value)} aria-label="Default select example">
                        <option className="option" value="none">Sort Cards by</option>
                        <option className="option" value="id">ID</option>
                        <option className="option" value="alphabetically">A-Z</option>
                        <option className="option" value="likes">Likes</option>
                    </Form.Select>
                </Card.Header>
                <Card.Body className="d-flex flex-wrap">
                    {cardComponents}
                </Card.Body>
            </Card>
        </section>
    )
}


export default CardList;