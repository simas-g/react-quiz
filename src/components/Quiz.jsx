import { useState } from "react";
import QUESTIONS from "../questions.js";
export default function Quiz() {
  const [answers, setAnswers] = useState([]);
  const activeQuestionIndex = answers.length;
  function handleAnswerClick(answer) {
    setAnswers((prevAnswers) => [...prevAnswers, answer]);
  }
  return (
    <div id="question">
      <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
      <ul id="answers">
        {QUESTIONS[activeQuestionIndex].answers.map((answer, index) => (
          <li key={index}>
            <button
              onClick={() => handleAnswerClick(answer)}
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
