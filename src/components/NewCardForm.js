import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';


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
    <section>
      <Card>
        <Card.Header>💗Create a New Card💗</Card.Header>
        <Card.Body>
        <Form
          aria-label="Create a New Card"
          name="cardForm"
          onSubmit={addCardonSubmit}>
          <Form.Group>
            <Form.Label htmlFor="message">Message</Form.Label>
            <Form.Control
                required
                id="message"
                name="message"
                value={formFields.message}
                onChange={fieldsOnChange}/>
          </Form.Group>
          <div className="form-preview">Preview:</div>
          <p>{message}</p>
          <Button className="submit-button" type="submit" value="Submit">
            Submit Query
          </Button> 
        </Form>
        </Card.Body>
      </Card>
    </section>
  );
}

export default NewCardForm;