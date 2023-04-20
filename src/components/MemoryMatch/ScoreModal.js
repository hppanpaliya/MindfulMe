import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const ScoreModal = ({ open, handleClose, moves, timeElapsed }) => {
  const score = Math.floor(10000 / (moves * (timeElapsed / 10)));

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Game Over!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You made {moves} moves and took {timeElapsed} seconds to complete the
          game. <br />
          Your score is: {score}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScoreModal;
