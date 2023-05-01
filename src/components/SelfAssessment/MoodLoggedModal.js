import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Button, Box } from "@mui/material";

function MoodLoggedModal({ open, moodValue, handleClose, handleVisitMoodJournal }) {
  const emoticons = ["😭", "😢", "😔", "😐", "🙂", "😀", "😄", "😁", "😆", "😍"];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle>
        <Typography variant="h6" align="center">
          Mood Logged Successfully
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h4" align="center">
          {emoticons[moodValue - 1]}
        </Typography>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" color="primary" onClick={handleVisitMoodJournal} style={{ marginRight: "10px" }}>
            Visit Mood Journal
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default MoodLoggedModal;
