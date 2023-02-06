import React from "react";



function Card ({message, likesCount}) {


    return (
        <li>
            <main>{message}</main>
            <div>
                <span>{likesCount} 💖</span>
                <button>+1</button>
                <button>Delete</button>
            </div>

        </li>
        );
}


export default Card;