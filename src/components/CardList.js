import React from "react";
import Card from "./Card";



function CardList ({cards, updateLike, deleteCard}) {
    const cardcomponents = cards.map(card =>{
        return <Card message={card.message} likesCount={card.likes} updateLike={updateLike} deleteCard={deleteCard} />
    })

    return (
        <ul>{cardcomponents}</ul>
    )
}


export default CardList;