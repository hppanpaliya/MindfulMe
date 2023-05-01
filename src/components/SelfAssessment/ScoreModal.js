import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createMood } from "../../store/features/mood/moodSlice";
import MoodLoggedModal from "./MoodLoggedModal";
import { useNavigate } from "react-router-dom";

function ScoreModal({ open, score, handleClose }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.uid);
  const moodValue = Math.round(score / 4);
  const [moodLogged, setMoodLogged] = useState(false);
  const navigate = useNavigate();

  const handleMoodLogging = async (e) => {
    e.preventDefault();
    try {
      const moodData = {
        mood: moodValue,
        userId: userId,
        date: new Date(),
      };
      await dispatch(createMood(moodData));
      setMoodLogged(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVisitMoodJournal = () => {
    navigate("/mood-tracker");
    console.log("Visit Mood Journal");
  };

  function getMoodMessage(score) {
    if (score >= 0 && score <= 10) {
      return "You should seek support!";
    } else if (score >= 11 && score <= 20) {
      return "You might need some help!";
    } else if (score >= 21 && score <= 30) {
      return "You're doing well!";
    } else if (score >= 31 && score <= 40) {
      return "You're feeling great!";
    }
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogTitle>
          <Typography variant="h6" align="center">
            Your Score
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="h4" align="center">
            {moodValue} / 10
          </Typography>
          <Typography variant="h6" align="center" gutterBottom>
            {getMoodMessage(score)}
          </Typography>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained" color="primary" onClick={handleMoodLogging} style={{ marginRight: "10px" }}>
              Log Mood
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <MoodLoggedModal
        open={moodLogged}
        moodValue={moodValue}
        handleClose={() => {
          setMoodLogged(false);
          handleClose();
        }}
        handleVisitMoodJournal={handleVisitMoodJournal}
      />
    </>
  );
}

export default ScoreModal;
