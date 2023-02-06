import React from "react";
import { useState } from 'react';
import PropTypes from 'prop-types';
import  "./NewBoardForm.css";

function NewBoardForm(props) {
  // todo: On submit, call "props.addBoard" function
  const [formFields, setFormFields] = useState({
    title: '',
    owner: ''
  });

  const [show, setShow] = useState(true);

  const isDisabled = (formFields.title === "") || (formFields.owner === "");
  const buttonDisplayBoardForm = show ? "Hide New Board Form" : "Show New Board Form";
  const classFormDisplay = show ? "board-form-visible" : "board-form-hidden"
  const titleInput = (formFields.title === "") ? "error" : "valid";
  const ownerInput = (formFields.owner === "") ? "error" : "valid";


  const onTitleChange = (event) => {
    setFormFields({
        ...formFields,
        title: event.target.value
    })
  };

  const onOwnerChange = (event) => {
    setFormFields({
        ...formFields,
        owner: event.target.value
    })
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

        props.addBoardCallBack({
            title: formFields.title,
            owner: formFields.owner
        });

        setFormFields({
            title: '',
            owner: '',
        });
  };

  const onToggleVisibility = () => {
    setShow(!show);
  };

  return (
    <section>
      <h2>Create a New Board</h2>
      <form className={classFormDisplay} onSubmit={onFormSubmit}>
        <div>
            <label htmlFor="title">Title:</label>
            <input
                required
                name="title"
                className={`title-input ` + titleInput}
                value={formFields.title}
                onChange={onTitleChange} />
        </div>
        <div>
            <label htmlFor="owner">Owner:</label>
            <input
                required
                name="owner"
                className={`owner-input ` + ownerInput}
                value={formFields.owner}
                onChange={onOwnerChange} />
        </div>
        <button disabled={isDisabled} type="submit">Submit Query</button>
        <div className="form-preview">Preview: {formFields.title} - {formFields.owner}</div>
      </form>
      <button className="form-toggle" onClick={onToggleVisibility}>{buttonDisplayBoardForm}</button>
    </section>
    
  );
}

NewBoardForm.propTypes = {
  addBoardCallBack: PropTypes.func.isRequired
};

export default NewBoardForm;
