import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMood, getMoods } from "../../store/features/mood/moodSlice";
import { Button, Typography, Slider, Box, Grow } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
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

  const valueLabelFormat = (value) => emoticons[value - 1];

  const emojiVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div>
      <Box className="mood-logging-container">
        <motion.div initial="hidden" animate="visible" transition={{ duration: 1 }} variants={emojiVariants}>
          <Typography component={"span"} gutterBottom>
            Select your mood:{" "}
          </Typography>{" "}
          <Typography component={"span"} style={{ fontSize: "2rem" }}>
            {emoticons[moodValue - 1]}
          </Typography>
        </motion.div>
        <Grow in>
          <Slider
            value={moodValue}
            min={1}
            max={10}
            step={1}
            onChange={(e, value) => setMoodValue(value)}
            valueLabelDisplay="auto"
            valueLabelFormat={valueLabelFormat}
          />
        </Grow>
        <Button variant="contained" onClick={handleMoodLogging} className="log-mood-button">
          Log Mood
        </Button>
      </Box>
      <br></br>
    </div>
  );
};

export default MoodLogging;
