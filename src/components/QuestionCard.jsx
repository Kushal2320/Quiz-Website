import React, { useEffect, useState } from "react";

const QuestionCard = ({ question, index, total, onNext, timer }) => {
  const [selected, setSelected] = useState(Array(4).fill(null));

  const blanks = question.question.match(/___________/g)?.length || 4;

  useEffect(() => {
    setSelected(Array(4).fill(null));
  }, [question]);

  const handleSelect = (word) => {
    if (selected.includes(word)) return;
    const updated = [...selected];
    const firstEmpty = updated.findIndex((w) => w === null);
    if (firstEmpty !== -1) {
      updated[firstEmpty] = word;
      setSelected(updated);
    }
  };

  const handleUnselect = (idx) => {
    const updated = [...selected];
    updated[idx] = null;
    setSelected(updated);
  };

  const handleSubmit = () => {
    if (selected.includes(null)) return;
    onNext(selected);
  };

  const renderText = () => {
    const parts = question.question.split("_____________");
    return parts.map((part, i) => (
      <span key={i}>
        {part}
        {i < blanks && (
          <button onClick={() => handleUnselect(i)} className="blank">
            {selected[i] || "____"}
          </button>
        )}
      </span>
    ));
  };

  return (
    <div>
      <div className="header">
        <span>Question {index + 1} / {total}</span>
        <span className="timer">⏱️ {timer}s</span>
      </div>
      <div className="question-text">{renderText()}</div>
      <div className="options">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(opt)}
            disabled={selected.includes(opt)}
            className="option"
          >
            {opt}
          </button>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={selected.includes(null)}
        className="next-button"
      >
        Next
      </button>
    </div>
  );
};

export default QuestionCard;
