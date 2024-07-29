import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

function DataEditor() {
  const [input, setInput] = useState("");
  const [wordData, setWordData] = useState({
    finnish: "",
    english: "",
    image: "",
  });
  const [error, setError] = useState("");

  const fetchData = async () => {
    if (!input) {
      alert("Input word!");
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/word?word=${input}");
      if (!response) {
        throw new Error("Word not found");
      }
      const word = await response.json();
      setWordData(word);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="container">
      <h1 className="title">Data Editor</h1>
      {/* <h2>New Word</h2>
      <p>Finnish</p>
      <input />
      <p>English</p>
      <input />
      <p>image</p>
      <input />
      <Button variant="secondary" onClick={console.log("save")}>
        Save
      </Button> */}
      <h2>Edit Word</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter Finnish or English word"
      />
      <Button variant="secondary" onClick={fetchData}>
        Fetch
      </Button>
      <p>Finnish</p>
      <input value={wordData.finnish}/>
      <p>English</p>
      <input value={wordData.english}/>
      <p>image</p>
      <input value={wordData.image}/>
      <Button variant="secondary" onClick={console.log("save")}>
        Save
      </Button>
    </div>
  );
}

export default DataEditor;
