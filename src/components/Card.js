import React from "react";

function Card ({id, message, likesCount, updateLike, deleteCard}) {
  
  return (
    <li>
      <main>{message}</main>
      <div>
        <span>{likesCount} 💖</span>
        <button onClick={()=>{updateLike(id)}}>+1</button>
        <button onClick={()=>{deleteCard(id)}}>Delete</button>
      </div>
    </li>
  );
}


export default Card;