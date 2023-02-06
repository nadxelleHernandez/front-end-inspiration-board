import React from "react";
import { useState } from 'react';

function NewBoardForm() {
  // todo: On submit, call "props.addBoard" function
  const [formFields, setFormFields] = useState({
    title: '',
    owner: ''
});

  return (
    <section>
      <form>
        <div>
            <label htmlFor="title">Title:</label>
            <input 
                name="title"
                value={formFields.title}/>
        </div>
        <div>
            <label htmlFor="owner">Owner:</label>
            <input 
                name="owner"
                value={formFields.owner}/>
        </div>
        <input
            type="submit"
            value="Submit Query" />
      </form>
      <button>Hide New Board Form</button>
    </section>
    
  );
}
export default NewBoardForm;
