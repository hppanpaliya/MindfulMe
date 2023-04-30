import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import firebase from "../../utils/firebase";
import EditGoalModal from "./EditGoalModal";
import UpdateProgressModal from "./UpdateProgressModal";

const StyledCard = styled(Card)`
  margin-bottom: 16px;
`;

function GoalsList({}) {
  const [goals, setGoals] = useState([]);
  const [editGoalId, setEditGoalId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updateGoalId, setUpdateGoalId] = useState(null);
  const [updateProgressModalOpen, setUpdateProgressModalOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all"); // "completed", "not-completed", "all"
  const [deleteGoalId, setDeleteGoalId] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const uid = user.uid;

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("goals")
      .onSnapshot((snapshot) => {
        const goalsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGoals(goalsData);
      });
    return () => unsubscribe();
  }, [uid]);

  const handleEditGoal = (goalId) => {
    setEditGoalId(goalId);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleUpdateProgress = (goalId) => {
    setUpdateGoalId(goalId);
    setUpdateProgressModalOpen(true);
  };

  const handleCloseUpdateProgressModal = () => {
    setUpdateProgressModalOpen(false);
  };

  const handleDeleteGoal = (goalId) => {
    setDeleteGoalId(goalId);
    setIsDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      await firebase.firestore().collection("users").doc(uid).collection("goals").doc(deleteGoalId).delete();
      setDeleteGoalId(null);
      setIsDeleteConfirmationOpen(false);
      console.log("Goal deleted:", deleteGoalId);
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteGoalId(null);
    setIsDeleteConfirmationOpen(false);
  };

  const filteredGoals = goals.filter((goal) => {
    switch (categoryFilter) {
      case "completed":
        return goal.progress === 100;
      case "not-completed":
        return goal.progress < 100;
      default:
        return true;
    }
  });

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Goals List
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, paddingBottom: 2 }}>
          <Button variant={categoryFilter === "all" ? "contained" : "outlined"} onClick={() => setCategoryFilter("all")}>
            All Goals
          </Button>
          <Button variant={categoryFilter === "completed" ? "contained" : "outlined"} onClick={() => setCategoryFilter("completed")}>
            Completed Goals
          </Button>
          <Button variant={categoryFilter === "not-completed" ? "contained" : "outlined"} onClick={() => setCategoryFilter("not-completed")}>
            Not Completed Goals
          </Button>
        </Box>
      </Box>
      {filteredGoals.map((goal) => (
        <StyledCard key={goal.id}>
          <CardContent>
            <Typography variant="h6">{goal.title}</Typography>
            <LinearProgress variant="determinate" value={goal.progress} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Description:</Typography>
                <Typography color="textSecondary">{goal.description}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">SMART Goal Checklist:</Typography>
                <List dense>
                  <EditGoalModal open={isEditModalOpen} handleClose={handleCloseEditModal} goalId={editGoalId} />
                  <UpdateProgressModal open={updateProgressModalOpen} handleClose={handleCloseUpdateProgressModal} goalId={updateGoalId} />
                  {Object.keys(goal.smartGoal).map((key) => (
                    <ListItem key={key}>
                      <ListItemText primary={key.charAt(0).toUpperCase() + key.slice(1)} secondary={goal.smartGoal[key] ? "Yes" : "No"} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => handleEditGoal(goal.id)}>
              Edit
            </Button>
            <Button size="small" onClick={() => handleDeleteGoal(goal.id)}>
              Delete
            </Button>
            <Button size="small" onClick={() => handleUpdateProgress(goal.id)}>
              Update Progress
            </Button>
          </CardActions>
        </StyledCard>
      ))}
      <Dialog open={isDeleteConfirmationOpen} onClose={handleCancelDelete}>
        <DialogTitle>Delete Goal</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to delete this goal?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleDeleteConfirmation} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default GoalsList;
