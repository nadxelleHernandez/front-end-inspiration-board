import React, { useState } from "react";


function NewCardForm({selectedBoard, addCard}) {
    const [formFields, setFormFields] = useState({
        message:"",
    })

    const [message, setMessage] = useState("")

    // On submit, call API to create a new card under the selected board
    const addCardonSubmit = (event) => {
        //todo:
        // make API call to update cards in the database
        // also update selectedBoard state, then CardList component will get re-rendered
        // or just call fetchCards function to reload?
        event.preventDefault();
        addCard({
            message: formFields.message
        })

        setFormFields({message:""});
        setMessage("");
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
        <form onSubmit={addCardonSubmit}>
            <h3>Create a New Card</h3>
            <div>
                <label htmlFor="message">Message</label>
                <input id="message" name="message" value={formFields.message} onChange={fieldsOnChange}/>
            </div>
            <h4>Preview:</h4>
            <p>{message}</p>
            <input type="submit" value="Submit"/>
        </form>
    );
}


export default NewCardForm;