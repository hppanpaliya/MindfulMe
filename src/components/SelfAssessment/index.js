import React, { useState } from "react";
import questions from "./questions.json";

function SelfAssessment() {
  const initialSelectedAnswers = questions.reduce(
    (acc, question) => ({ ...acc, [question.id]: null }),
    {}
  );
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(initialSelectedAnswers);

  function handleOptionSelect(questionId, optionValue) {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: optionValue });
  }

  function calculateScore() {
    let newScore = 0;
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const selectedOption =
        selectedAnswers[question.id] &&
        question.options.find((option) => option.value === selectedAnswers[question.id]);
      if (selectedOption) {
        newScore += selectedOption.value;
      }
    }
    setScore(newScore);
  }
  

  return (
    <div>
      {questions.map((question) => (
        <div key={question.id}>
          <h3>{question.text}</h3>
          {question.options.map((option) => (
            <div key={option.value}>
              <input
                type="radio"
                id={`${question.id}_${option.value}`}
                name={`${question.id}`}
                value={option.value}
                checked={selectedAnswers[question.id] === option.value}
                onChange={() => handleOptionSelect(question.id, option.value)}
              />
              <label htmlFor={`${question.id}_${option.value}`}>
                {option.text}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={calculateScore}>Calculate Score</button>
      <p>Your score: {score}</p>
    </div>
  );
}

export default SelfAssessment;
