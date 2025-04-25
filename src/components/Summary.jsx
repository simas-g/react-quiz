import quizImg from "../assets/quiz-complete.png";
import questions from "../questions";
export default function Summary({ userAnswers }) {
  const skippedAnswers = userAnswers.filter((a) => a === null);
  const correctAnswers = userAnswers.filter(
    (a, i) => a === questions[i].answers[0]
  );
  const wrongAnswers = userAnswers.filter(
    (a, i) => a !== questions[i].answers[0] && a !== null
  );
  const skippedShare = (skippedAnswers.length / questions.length) * 100;
  const correctShare = (correctAnswers.length / questions.length) * 100;
  const wrongShare = (wrongAnswers.length / questions.length) * 100;
  return (
    <div id="summary">
      <img src={quizImg} alt="" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedShare.toFixed(0)}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctShare.toFixed(0)}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongShare.toFixed(0)}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers?.map((answer, i) => {
          let cssClass = "user-answer";
          if (answer === null) {
            cssClass += " skipped";
          } else if (answer === questions[i].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }
          return (
            <li key={i}>
              <h3>{i + 1}</h3>
              <p className="question">{questions[i].text}</p>
              <p className={cssClass}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
