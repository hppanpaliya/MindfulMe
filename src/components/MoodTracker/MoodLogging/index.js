import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMood, getMoods } from "../../../store/features/mood/moodSlice";
import { Button, Typography, Slider, Box, Grow } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import "./logging.css";

const MoodLogging = () => {
  // Initialize Redux hooks and local state
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.uid);
  const [moodValue, setMoodValue] = useState(5);

  // Define mood emoticons
  const emoticons = ["😭", "😢", "😔", "😐", "🙂", "😀", "😄", "😁", "😆", "😍"];

  // Handle mood logging by dispatching Redux actions
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

  // Format the value label for the Slider component
  const valueLabelFormat = (value) => emoticons[value - 1];

  // Define animation variants for the motion.div component
  const emojiVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div>
      <Box className="mood-logging-container" sx={{ paddingTop: 2 }}>
        {/* Animate the mood selection text and emoticon */}

        <motion.div initial="hidden" animate="visible" transition={{ duration: 1 }} variants={emojiVariants}>
          <Typography variant="h2" fontWeight="bold">
            Mood Tracker
          </Typography>
          <Typography variant="body1" component={"span"} gutterBottom>
            Select your mood:{" "}
          </Typography>{" "}
          <Typography component={"span"} style={{ fontSize: "2rem" }}>
            {emoticons[moodValue - 1]}
          </Typography>
        </motion.div>
        {/* Render the Slider component for selecting mood value */}
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
              {/* Render the "Log Mood" button */}
        <br/>
        <Button variant="contained" onClick={handleMoodLogging} className="log-mood-button">
          Log Mood
        </Button>
      </Box>
      <br></br>
    </div>
  );
};

export default MoodLogging;
