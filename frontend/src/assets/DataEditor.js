import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

function DataEditor() {
  const [input, setInput] = useState("");
  const [wordData, setWordData] = useState({
    finnish: "",
    english: "",
    image: "",
    id: "",
  });
  const [error, setError] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const fetchData = async () => {
    if (!input) {
      alert("Input word!");
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/word?word=${input}`);
      if (!response.ok) {
        throw new Error("Word not found");
      }
      const word = await response.json();
      setWordData({ ...word, id: word.id });
      setIsUpdateMode(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWordData({
      ...wordData,
      [name]: value,
    });
  };

  const addData = async () => {
    const { finnish, english, image } = wordData;
    if (!finnish || !english || !image) {
      alert("All fields are required");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/word", {
        finnish,
        english,
        image,
      });
      if (response.status !== 201) {
        throw new Error("Something went wrong.");
      }
      alert("Word added successfully.");
      setWordData({
        finnish: "",
        english: "",
        image: "",
        id: "",
      });
      setInput('');
    } catch (error) {
      setError(error.message);
    }
  };

  const updateData = async () => {
    const { id, finnish, english, image } = wordData;
    if (!finnish || !english || !image) {
      alert("All fields are required");
      return;
    }
    try {
      const response = await axios.put(`http://localhost:8000/word/${id}`, {
        finnish,
        english,
        image,
      });
      if (response.status !== 200) {
        throw new Error("Something went wrong.");
      }
      alert("Word updated successfully.");
      setIsUpdateMode(false);
      setWordData({
        finnish: "",
        english: "",
        image: "",
        id: "",
      });
      setInput('');
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteData = async () => {
    const { id } = wordData;
    if (!id) {
      alert("Nothing to delete.");
      return;
    }
    try {
      const response = await axios.delete(`http://localhost:8000/word/${id}`);
      if (response.status !== 204) {
        throw new Error("Something went wrong.");
      }
      alert("Word deleted successfully.");
      setWordData({
        finnish: "",
        english: "",
        image: "",
        id: "",
      });
      setInput('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Data Editor</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter Finnish or English word"
      />
      <Button variant="secondary" onClick={fetchData}>
        Fetch
      </Button>
      <p>Finnish</p>
      <input name="finnish" value={wordData.finnish} onChange={handleChange} />
      <p>English</p>
      <input name="english" value={wordData.english} onChange={handleChange} />
      <p>image</p>
      <input name="image" value={wordData.image} onChange={handleChange} />
      <Button variant="secondary" onClick={isUpdateMode ? updateData : addData}>
        Save
      </Button>
      <Button variant="secondary" onClick={deleteData}>
        Delete
      </Button>
    </div>
  );
}

export default DataEditor;
