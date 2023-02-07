import React from "react";



function SelectedBoard ({board}) {
    const displayMessage = board === null ? 'Please select a Board from the Board List!' : `${board.title} -  ${board.owner}`;

    return(
        <section>
            <h2>Selected Board</h2>
            <p>{displayMessage}</p>
        </section>
    );
}


export default SelectedBoard;