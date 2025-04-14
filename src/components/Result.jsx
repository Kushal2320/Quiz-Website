import React from "react";

const Result = ({ questions, userAnswers }) => {
  let score = 0;

  return (
    <div>
      <h2 className="result-title">Your Results</h2>
      {questions.map((q, i) => {
        const correct = JSON.stringify(q.correctAnswer) === JSON.stringify(userAnswers[i]);
        if (correct) score++;

        return (
          <div key={i} className="result-item">
            <p className="question-line">
              Q{i + 1}: {q.question.replace(/_____________/g, "____")}
            </p>
            <p>
              Your Answer:
              <span className={correct ? "correct" : "incorrect"}>
                {userAnswers[i]?.join(", ")}
              </span>
            </p>
            {!correct && (
              <p>
                Correct Answer: <span className="correct">{q.correctAnswer.join(", ")}</span>
              </p>
            )}
          </div>
        );
      })}
      <div className="score">
        🎯 Score: {score} / {questions.length}
      </div>
    </div>
  );
};

export default Result;
