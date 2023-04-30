import React, { useState } from "react";
import questions from "./questions.json";
import { Typography, Button, Box, FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledLabel = styled("label")({
  display: "block",
});

function SelfAssessment() {
  const initialSelectedAnswers = questions.reduce((acc, question) => ({ ...acc, [question.id]: null }), {});
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(initialSelectedAnswers);

  function handleOptionSelect(questionId, optionValue) {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: Number(optionValue) });
  }

  function calculateScore() {
    let newScore = 0;
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const selectedOption = selectedAnswers[question.id] && question.options.find((option) => option.value === selectedAnswers[question.id]);
      if (selectedOption) {
        newScore += selectedOption.value;
      }
    }
    setScore(newScore);
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", maxWidth: "600px", margin: "0 auto" }}>
      {questions.map((question, index) => (
        <FormControl key={question.id} component="fieldset" sx={{ mt: 6 }}>
          <Typography variant="body1">
            {index + 1}. {question.text}
          </Typography>
          <RadioGroup
            aria-label={index + 1 + ". " + question.text}
            name={question.id}
            value={selectedAnswers[question.id]}
            onChange={(event) => handleOptionSelect(question.id, event.target.value)}
          >
            {question.options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={<StyledLabel htmlFor={`${question.id}_${option.value}`}>{option.text}</StyledLabel>}
              />
            ))}
          </RadioGroup>
        </FormControl>
      ))}
      <Button variant="contained" onClick={calculateScore} sx={{ mt: 2, maxWidth: "200px", alignSelf: "center" }}>
        Calculate Score
      </Button>
      <Typography variant="body1" sx={{ mt: 2, alignSelf: "center" }}>
        Your score: {score}
      </Typography>
    </Box>
  );
}

export default SelfAssessment;
