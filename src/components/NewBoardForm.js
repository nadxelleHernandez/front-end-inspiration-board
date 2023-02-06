import React from "react";
import { useState } from 'react';
import PropTypes from 'prop-types';

function NewBoardForm(props) {
  // todo: On submit, call "props.addBoard" function
  const [formFields, setFormFields] = useState({
    title: '',
    owner: ''
  });

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

  return (
    <section>
      <form onSubmit={onFormSubmit}>
        <div>
            <label htmlFor="title">Title:</label>
            <input 
                name="title"
                value={formFields.title}
                onChange={onTitleChange} />
        </div>
        <div>
            <label htmlFor="owner">Owner:</label>
            <input 
                name="owner"
                value={formFields.owner}
                onChange={onOwnerChange} />
        </div>
        <input
            type="submit"
            value="Submit Query" />
      </form>
      <button>Hide New Board Form</button>
    </section>
    
  );
}

NewBoardForm.propTypes = {
  addBoardCallBack: PropTypes.func.isRequired
};

export default NewBoardForm;
