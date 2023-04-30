import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Button, Box } from "@mui/material";

function ScoreModal({ open, score, handleClose }) {
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
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle>
        <Typography variant="h6" align="center">
          Your Score
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h4" align="center">
          {score / 4} / 10
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          {getMoodMessage(score)}
        </Typography>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ScoreModal;
