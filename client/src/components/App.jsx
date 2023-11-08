import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/allNotes")
      .then((res) => {
        setNotes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Header />
      <CreateArea setNotes={setNotes}/>
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.description}
            setNotes={setNotes}
            notes={notes}
          />
        );
      })}
      <Footer />
    </>
  );
}

export default App;
