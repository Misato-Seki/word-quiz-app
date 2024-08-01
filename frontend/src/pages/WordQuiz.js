import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "../css/WordQuiz.css"

function WordQuiz() {
  const [isAnswerDisplay, setIsAnswerDisplay] = useState(false);
  const [word, setWord] = useState("");

  const fetchRandomWord = async () => {
    try {
      const response = await axios.get("http://localhost:8000/random-word");
      setWord(response.data);
      setIsAnswerDisplay(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAnswerDisplay = () => {
    setIsAnswerDisplay(true);
  };

  return (
    <>
      <div className="word-quiz">
        <div className="header">
          <h1>Word Quiz!</h1>
        </div>
        <div className="quiz-display">
          <h2>{word.finnish}</h2>
          <h2>{isAnswerDisplay ? word.english : ""}</h2>
          <div>
            {isAnswerDisplay && word.image ? (
              <img src={word.image} alt="image" />
            ) : (
              ""
            )}
          </div>
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

export default WordQuiz;
