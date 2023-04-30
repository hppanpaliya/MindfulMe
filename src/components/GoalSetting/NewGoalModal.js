import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import firebase from "../../utils/firebase";

const StyledFormControl = styled(FormControl)`
  margin: 8px 0;
  width: 100%;
`;

function NewGoalModal({ open, handleClose }) {
  const [goalTitle, setGoalTitle] = useState("");
  const [description, setDescription] = useState("");
  const [smartGoal, setSmartGoal] = useState({
    specific: false,
    measurable: false,
    achievable: false,
    relevant: false,
    timeBound: false,
  });

  const user = useSelector((state) => state.auth.user);
  const uid = user.uid;
  const goalsRef = firebase.firestore().collection("users").doc(uid).collection("goals");

  const handleSave = async () => {
    const newGoal = {
      title: goalTitle,
      description,
      smartGoal,
      createdAt: Date.now(),
      progress: 0,
    };

    await saveGoal(newGoal);
    handleClose();
  };

  const saveGoal = async (goal) => {
    // Add the new goal to the goals collection in Firestore
    await goalsRef.add(goal);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create a New Goal</DialogTitle>
      <DialogContent>
        <Box>
          <StyledFormControl>
            <TextField label="Goal Title" value={goalTitle} onChange={(e) => setGoalTitle(e.target.value)} />
          </StyledFormControl>
          <StyledFormControl>
            <TextField label="Description" multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
          </StyledFormControl>
          <StyledFormControl>
            <FormLabel component="legend">SMART Goal Checklist</FormLabel>
            <FormGroup>
              {Object.keys(smartGoal).map((key) => (
                <FormControlLabel
                  key={key}
                  control={<Checkbox checked={smartGoal[key]} onChange={(e) => setSmartGoal({ ...smartGoal, [key]: e.target.checked })} name={key} />}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                />
              ))}
            </FormGroup>
          </StyledFormControl>
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

export default NewGoalModal;
