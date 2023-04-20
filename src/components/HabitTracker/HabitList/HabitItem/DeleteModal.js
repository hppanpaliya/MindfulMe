import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const DeleteModal = ({ open, handleClose, deleteHabit, habit }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Habit</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete {habit.name}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button onClick={deleteHabit} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
