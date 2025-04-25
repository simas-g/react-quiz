import { useState, useCallback, useRef } from "react";
import QUESTIONS from "../questions.js";
import quizImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";
export default function Quiz() {
const shuffledQuestions = useRef()
  const [answers, setAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");

  const activeQuestionIndex =
    answerState === "" ? answers.length : answers.length - 1;
  const isGameOver = activeQuestionIndex === QUESTIONS.length;
  const handleAnswerClick = useCallback(
    function handleAnswerClick(answer) {
      setAnswerState("answered");
      setAnswers((prevAnswers) => [...prevAnswers, answer]);

      setTimeout(() => {
        if (answer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );
  if (isGameOver) {
    return (
      <div id="summary">
        <img src={quizImg} alt="" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }
  const handleSkipAnswer = useCallback(
    () => handleAnswerClick(null),
    [handleAnswerClick]
  );
  if(!shuffledQuestions.current) {
    shuffledQuestions.current = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledQuestions.current.sort(() => Math.random() - 0.5);
  }

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledQuestions.current.map((answer, index) => {
            const isSelected = answers[answers.length - 1] === answer;
            let cssClasses;
            if (answerState === "answered" && isSelected) {
              cssClasses = "selected";
            }
            if (
              (answerState === "correct" || answerState === "wrong") &&
              isSelected
            ) {
              cssClasses = answerState;
            }

            return (
              <li key={index} className="answer">
                <button
                  onClick={() => handleAnswerClick(answer)}
                  className={cssClasses}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
