import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

function Note(props) {
  function handleClick(id) {
    axios.post("http://localhost:3001/api/delete", { id })
      .then(res => props.setNotes(res.data))
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={() => handleClick(props.id)}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
