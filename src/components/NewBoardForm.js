import React from "react";

function NewBoardForm() {
  // todo: On submit, call "props.addBoard" function

  return (
    <section>
      <form>
        <div>
            <label htmlFor="title">Title:</label>
            <input name="title" />
        </div>
        <div>
            <label htmlFor="owner">Owner:</label>
            <input name="owner" />
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
