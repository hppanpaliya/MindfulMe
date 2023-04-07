import { Box, Typography, TextField, Button, List, ListItem, IconButton, Checkbox } from "@mui/material";
import { Edit, Check, Close } from "@mui/icons-material";
import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import firebase from "../../utils/firebase";
import { useSelector } from "react-redux";

const GoalTrackerContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center", // Added to center vertically
  background: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)", // Changed background to gradient
  padding: "2rem",
  borderRadius: "1rem",
  width: "100%",
  maxWidth: "700px",
  boxSizing: "border-box", // Added to include padding in the height calculation
});

const AddGoal = styled(Box)({
  display: "flex",
  marginBottom: "1rem",
  gap: "1rem",
  "@media (max-width: 600px)": {
    // Added media query for mobile devices
    flexDirection: "column",
  },
});

const GoalsList = styled(List)({
  width: "100%",
});

const GoalItem = styled(ListItem)({
  background: "#e0eaf3",
  borderRadius: "0.5rem",
  marginBottom: "1rem",
  padding: "1rem",
});

const GoalHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "1rem",
});

const ReminderInput = styled(Box)({
  display: "flex",
  marginBottom: "1rem",
  gap: "1rem",
});

const RemindersList = styled(Box)({
  paddingLeft: "1rem",
});

const ParentContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
});

const GoalSetting = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [newReminder, setNewReminder] = useState("");
  const user = useSelector((state) => state.auth.user);
  const uid = user.uid;

  const goalsRef = firebase.firestore().collection("users").doc(uid).collection("goals");

  useEffect(() => {
    const fetchGoals = async () => {
      const goalsSnapshot = await goalsRef.get();
      const goalsData = goalsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return { ...data, id: doc.id };
      });
      setGoals(goalsData);
    };

    fetchGoals();
    // eslint-disable-next-line
  }, []);

  const handleUpdateGoal = async (goalId, updatedGoal) => {
    await goalsRef.doc(goalId).update({
      title: updatedGoal,
    });
    const updatedGoals = goals.map((goal) => {
      if (goal.id === goalId) {
        return { ...goal, title: updatedGoal, isEditing: false };
      }
      return goal;
    });
    setGoals(updatedGoals);
  };

  const handleAddReminder = async (goalId) => {
    if (newReminder.trim()) {
      const goalDoc = await goalsRef.doc(goalId).get();
      const goalData = goalDoc.data();
      const existingReminders = goalData.reminders || [];
      const updatedReminders = [...existingReminders, { text: newReminder }];
      await goalsRef.doc(goalId).update({
        reminders: updatedReminders,
      });
      const updatedGoals = goals.map((goal) => {
        if (goal.id === goalId) {
          return { ...goal, reminders: updatedReminders };
        }
        return goal;
      });
      setGoals(updatedGoals);
      setNewReminder("");
    }
  };

  const handleAddGoal = async () => {
    if (newGoal.trim()) {
      const goalData = {
        title: newGoal.trim(),
        createdAt: Date.now(),
        uid: uid,
      };
      const goalRef = await goalsRef.add(goalData);
      goalData.id = goalRef.id;
      setGoals([...goals, goalData]);
      setNewGoal("");
    }
  };

  const handleUpdateReminders = async (goalId, updatedReminders) => {
    await goalsRef.doc(goalId).update({
      reminders: updatedReminders,
    });
    const updatedGoals = goals.map((goal) => {
      if (goal.id === goalId) {
        return { ...goal, reminders: updatedReminders };
      }
      return goal;
    });
    setGoals(updatedGoals);
  };

  const handleEditReminder = async (goalId, reminderIndex, newReminderText) => {
    const updatedReminders = [...goals.find((goal) => goal.id === goalId).reminders];
    updatedReminders[reminderIndex].text = newReminderText;
    await handleUpdateReminders(goalId, updatedReminders);
  };

  return (
    <ParentContainer>
      <GoalTrackerContainer>
        <Typography variant="h4" gutterBottom>
          Goal Tracker
        </Typography>
        <AddGoal>
          <TextField fullWidth value={newGoal} onChange={(e) => setNewGoal(e.target.value)} placeholder="Enter a new goal" />
          <Button onClick={handleAddGoal} variant="contained" sx={{ backgroundColor: "#AED9E0" }}>
            Add Goal
          </Button>
        </AddGoal>
        <GoalsList>
          {goals.map((goal, index) => (
            <GoalItem key={index}>
              <GoalHeader>
                {goal.isEditing ? (
                  <>
                    <TextField
                      value={goal.title}
                      onChange={(e) => {
                        const updatedGoals = [...goals];
                        const index = updatedGoals.findIndex((g) => g.id === goal.id);
                        updatedGoals[index].title = e.target.value;
                        setGoals(updatedGoals);
                      }}
                    />
                    <IconButton onClick={() => handleUpdateGoal(goal.id, goal.title)}>
                      <Check />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        const updatedGoals = [...goals];
                        updatedGoals[index].isEditing = false;
                        setGoals(updatedGoals);
                      }}
                    >
                      <Close />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Typography variant="h6">{goal.title}</Typography>
                    <IconButton
                      onClick={() => {
                        const updatedGoals = [...goals];
                        updatedGoals[index].isEditing = true;
                        setGoals(updatedGoals);
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </>
                )}
              </GoalHeader>
              <Typography>Total Reminders: {goal.reminders ? goal.reminders.length : 0}</Typography>
              <ReminderInput>
                <TextField fullWidth value={newReminder} onChange={(e) => setNewReminder(e.target.value)} placeholder="Enter a reminder" />
                <Button onClick={() => handleAddReminder(goal.id)} variant="contained" sx={{ backgroundColor: "#AED9E0" }}>
                  Add Reminder
                </Button>
              </ReminderInput>
              <RemindersList>
                {goal.reminders &&
                  goal.reminders.map((reminder, reminderIndex) => (
                    <div key={reminderIndex}>
                      <label>
                        <Checkbox
                          checked={reminder.isChecked}
                          onChange={() => {
                            const updatedReminders = [...goal.reminders];
                            updatedReminders[reminderIndex].isChecked = !reminder.isChecked;
                            handleUpdateReminders(goal.id, updatedReminders);
                          }}
                        />
                        {reminder.text}
                      </label>
                      <Button
                        onClick={() => {
                          const newReminderText = window.prompt("Enter the new reminder text", reminder.text);
                          if (newReminderText) {
                            handleEditReminder(goal.id, reminderIndex, newReminderText);
                          }
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  ))}
              </RemindersList>
              <br />
              <br />
            </GoalItem>
          ))}
        </GoalsList>
      </GoalTrackerContainer>
    </ParentContainer>
  );
};

export default GoalSetting;
