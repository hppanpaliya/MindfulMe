import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMood, getMoods } from "../../store/features/mood/moodSlice";
import { Button, Typography, Select, MenuItem } from "@mui/material";
import "./logging.css";

const MoodLogging = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.uid);
  const [moodValue, setMoodValue] = useState(5);

  const emoticons = ["😭", "😢", "😔", "😐", "🙂", "😀", "😄", "😁", "😆", "😍"];

  const handleMoodLogging = async (e) => {
    e.preventDefault();
    try {
      const moodData = {
        mood: moodValue,
        userId: userId,
        date: new Date(),
      };
      await dispatch(createMood(moodData));
      await dispatch(getMoods(userId));
      alert("Mood logged successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Log Mood
      </Typography>
      <div className="mood-logging-container">
        <Typography gutterBottom>Select your mood:</Typography>
        <Select
          value={moodValue}
          onChange={(e) => setMoodValue(e.target.value)}
          className="mood-select"
        >
          {emoticons.map((emoticon, index) => (
            <MenuItem value={index + 1} key={index + 1}>
              {emoticon}
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained" onClick={handleMoodLogging} className="log-mood-button">
          Log Mood
        </Button>
      </div>
    </div>
  );
};

export default MoodLogging;
