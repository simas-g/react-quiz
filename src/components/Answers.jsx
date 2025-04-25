import { useRef } from "react";

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledQuestions = useRef();
  if (!shuffledQuestions.current) {
    shuffledQuestions.current = [...answers];
    shuffledQuestions.current.sort(() => Math.random() - 0.5);
  }
  return (
    <ul id="answers">
      {shuffledQuestions.current.map((answer, index) => {
        const isSelected = selectedAnswer === answer;
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
              onClick={() => onSelect(answer)}
              className={cssClasses}
              disabled={answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
