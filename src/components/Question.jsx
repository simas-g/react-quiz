import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";
import QUESTIONS from "../questions";
import { useState } from "react";
export default function Question({ onSelectAnswer, index, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });
  let timer = 10000
    if(answer.selectedAnswer) {
      timer = 1000;
    }
    if(answer.isCorrect !==null) {
      timer = 2000
    }
  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: answer === QUESTIONS[index].answers[0],
      });
      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }
  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    if (answer.isCorrect) {
      answerState = "correct";
    } else {
      answerState = "wrong";
    }
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }
  return (
    <div id="question">
      <QuestionTimer
        timeout={timer}
        onTimeout={answer.selectedAnswer==='' ? onSkipAnswer : null}
        mode={answerState} 
        key={timer}
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        onSelect={handleSelectAnswer}
        answers={QUESTIONS[index].answers}
        answerState={answerState}
        selectedAnswer={answer.selectedAnswer}
      />
    </div>
  );
}
