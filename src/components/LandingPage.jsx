import React from "react";

export default function LandingPage({ startQuiz }) {
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div className="landing-page">
      <h1>Sentence Construction</h1>
      <p>
        Select the correct words to complete the sentence by arranging the
        provided options in the right order.
      </p>

      <div className="info">
        <div>
          <strong>Time Per Question</strong>
          <p>30 sec</p>
        </div>
        <div>
          <strong>Total Questions</strong>
          <p>10</p>
        </div>
        <div>
          <strong>Coins</strong>
          <p><span className="coin" /> 0</p>
        </div>
      </div>

      <div className="landing-buttons">
        <button className="back-btn">Back</button>
        <button className="start-btn" onClick={startQuiz}>Start</button>
      </div>

      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        Toggle Dark Mode
      </button>
    </div>
  );
}
