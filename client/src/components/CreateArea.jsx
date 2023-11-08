import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import axios from "axios";

function CreateArea({ setNotes, notes }) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function expand() {
    setExpanded(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    axios.post("http://localhost:3001/api/addNote", note)
      .then(res => {
        setNotes([...notes, res.data]); // Update notes state with the newly added note
        setNote({
          title: "",
          content: ""
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <>
      <form className="create-note">
        {isExpanded && (<input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />)}
        <textarea
          name="content"
          onChange={handleChange}
          onClick={expand}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? "3" : "1"}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}><AddIcon /></Fab></Zoom>
      </form>
    </>
  );
}

export default CreateArea;
