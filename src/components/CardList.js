import React from "react";
import Card from "./Card";



function CardList ({cards}) {
    const cardcomponents = cards.map(card =>{
        return <Card message={card.message} likesCount={card.likes} />
    })

    return (
        <ul>{cardcomponents}</ul>
    )
}


export default CardList;