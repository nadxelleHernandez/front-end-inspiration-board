import React, { useState } from "react";


function NewCardForm({selectedBoard}) {
    const [formFields, setFormFields] = useState({
        message:"",
    })

    const [message, setMessage] = useState("")

    // On submit, call API to create a new card under the selected board
    const addCard = () => {
        //todo:
        // make API call to update cards in the database
        // also update selectedBoard state, then CardList component will get re-rendered
        // or just call fetchCards function to reload?
    };

    const fieldsOnChange = (event)=>{
        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        setFormFields({
            ...formFields,
            [fieldName]: fieldValue,
        })

        if (fieldName === "message"){
            setMessage(fieldValue)
        };
    }

    return (
        <form>
            <h3>Create a New Card</h3>
            <div>
                <label htmlFor="message"></label>
                <input name="message" value={formFields.message} onChange={fieldsOnChange}/>
            </div>
            <h4>Preview:</h4>
            <p>{message}</p>
            <input type="submit"/>
        </form>
    );
}


export default NewCardForm;