import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import firebase from "../../utils/firebase";
import { useSelector } from "react-redux";

function UpdateProgressModal({ open, handleClose, goalId }) {
  const [progress, setProgress] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const uid = user.uid;
  const goalRef = firebase.firestore().collection("users").doc(uid).collection("goals");

  useEffect(() => {
    if (!goalId) {
      return;
    }

    const fetchGoalData = async () => {
      try {
        const goalDoc = await goalRef.doc(goalId).get();
        if (goalDoc.exists) {
          const goalData = goalDoc.data();
          setProgress(goalData.progress);
        } else {
          console.error("No goal found with the provided goalId.");
        }
      } catch (error) {
        console.error("Error fetching goal:", error);
      }
    };

    fetchGoalData();
  }, [goalId, uid]);

  const handleSave = async () => {
    await updateGoalProgress(goalId, progress);
    handleClose();
  };

  const updateGoalProgress = async (goalId, progress) => {
    // Update the goal's progress in Firestore
    await goalRef.doc(goalId).update({ progress });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Progress Percentage</DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            label="Progress Percentage"
            type="number"
            InputProps={{ inputProps: { min: 0, max: 100 } }}
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateProgressModal;
