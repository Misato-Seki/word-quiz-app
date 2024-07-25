import "./App.css";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

function App() {
  const [isAnswerDIsplay, setIsAnswerDisplay] = useState(false);
  const [word, setWord] = useState("");

  const fetchRandomWord = async () => {
    try {
      const response = await axios.get("http://localhost:8000/random-word");
      setWord(response.data);
      setIsAnswerDisplay(false)
    } catch (error) {
      console.error(error);
    }
  };

  const handleAnswerDisplay = () => {
    setIsAnswerDisplay(true);
  };

  return (
    <>
    <div className="word-quiz-container">
      <div className="header">
        <h1>Word Quiz!</h1>
      </div>
      <div className="quiz-display">
        <h2>{word.finnish}</h2>
        <h2>{isAnswerDIsplay ? word.english : ""}</h2>
      </div>
      <div className="footer">
      <Button variant="secondary" onClick={fetchRandomWord}>
          Next
        </Button>
        <Button variant="secondary" onClick={handleAnswerDisplay}>
          Show Answer
        </Button>
      </div>
      </div>
    </>
  );
}

export default App;
