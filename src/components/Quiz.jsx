import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";
export default function Quiz() {
  const [answers, setAnswers] = useState([]);

  const activeQuestionIndex = answers.length;
  const isGameOver = activeQuestionIndex === QUESTIONS.length;
  const handleAnswerClick = useCallback(
    function handleAnswerClick(answer) {
      setAnswers((prevAnswers) => [...prevAnswers, answer]);

    },
    []
  );
  const handleSkipAnswer = useCallback(
    () => handleAnswerClick(null),
    [handleAnswerClick]
  );
  if (isGameOver) {
    return (
      <Summary userAnswers={answers}/>
    );
  }


  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleAnswerClick}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
