import React from "react";
import Card from "./Card";



function CardList ({boardTitle, cards, updateLike, deleteCard}) {
    const cardcomponents = cards.map(card =>{
        return <Card message={card.message} likesCount={card.likes} updateLike={updateLike} deleteCard={deleteCard} />
    })

    return (
        <section>
            <h2>Cards for {boardTitle}</h2>
            <ul>{cardcomponents}</ul>
        </section>
    )
}


export default CardList;