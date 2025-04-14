import React, { useEffect, useState } from "react";
import questionsData from "./data/questions.json";
import QuestionCard from "./components/QuestionCard";
import Result from "./components/Result";
import LandingPage from "./components/LandingPage";

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(30);
  const [autoSubmitted, setAutoSubmitted] = useState(false);
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    if (showLanding || showResult) return;

    setTimer(30);
    setAutoSubmitted(false);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          if (!autoSubmitted) {
            setAutoSubmitted(true);
            handleNext(userAnswers[currentQuestion] || []);
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestion, showLanding, showResult]);

  const handleNext = (answers) => {
    const updated = [...userAnswers];
    updated[currentQuestion] = answers || [];
    setUserAnswers(updated);

    if (currentQuestion + 1 === questionsData.questions.length) {
      setShowResult(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleStart = () => {
    setShowLanding(false);
  };

  return (
    <div className="container">
      {showLanding ? (
        <LandingPage startQuiz={handleStart} />
      ) : showResult ? (
        <Result questions={questionsData.questions} userAnswers={userAnswers} />
      ) : (
        <QuestionCard
          question={questionsData.questions[currentQuestion]}
          total={questionsData.questions.length}
          index={currentQuestion}
          onNext={handleNext}
          timer={timer}
        />
      )}
    </div>
  );
}
