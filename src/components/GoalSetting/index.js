import React, { useState, useEffect } from "react";
import firebase from "../../utils/firebase";
import { useSelector } from "react-redux";

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
    <div style={{ justifyContent: "center",  display: "flex", flexDirection: "column", alignItems: "center", fontSize: "1.3rem", }} >
      <h1>Goal Tracker</h1>
      <div>
        <input type="text" value={newGoal} onChange={(e) => setNewGoal(e.target.value)} placeholder="Enter a new goal" />
        <button onClick={handleAddGoal}>Add Goal</button>
      </div>
      <div>
        {goals.map((goal, index) => (
          <div key={index}>
            <div>
              {goal.isEditing ? (
                <>
                  <input
                    type="text"
                    value={goal.title}
                    onChange={(e) => {
                      const updatedGoals = [...goals];
                      const index = updatedGoals.findIndex((g) => g.id === goal.id);
                      updatedGoals[index].title = e.target.value;
                      setGoals(updatedGoals);
                    }}
                  />
                  <button onClick={() => handleUpdateGoal(goal.id, goal.title)}>Update</button>
                  <button
                    onClick={() => {
                      const updatedGoals = [...goals];
                      updatedGoals[index].isEditing = false;
                      setGoals(updatedGoals);
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop:"2rem",paddingBottom:"0.5rem" }} >
                  <b>{goal.title}</b>
                  <button
                    onClick={() => {
                      const updatedGoals = [...goals];
                      updatedGoals[index].isEditing = true;
                      setGoals(updatedGoals);
                    }}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
            <div>
              <input type="text" value={newReminder} onChange={(e) => setNewReminder(e.target.value)} placeholder="Enter a reminder" />
              <button onClick={() => handleAddReminder(goal.id)}>Add Reminder</button>
            </div>
            <br />
            <b>Total Reminders: {goal.reminders ? goal.reminders.length : 0}</b>
            <div>
              {goal.reminders &&
                goal.reminders.map((reminder, reminderIndex) => (
                  <div key={reminderIndex} style={{ display: "flex", justifyContent: "space-between" }}>
        
                      <input
                      type="checkbox"
                      aria-label="Checkbox for following text input"
                        checked={reminder.isChecked}
                        onChange={() => {
                          const updatedReminders = [...goal.reminders];
                          updatedReminders[reminderIndex].isChecked = !reminder.isChecked;
                          handleUpdateReminders(goal.id, updatedReminders);
                        }}
                      />
                      {reminder.text}
                    <button
                      onClick={() => {
                        const newReminderText = window.prompt("Enter the new reminder text", reminder.text);
                        if (newReminderText) {
                          handleEditReminder(goal.id, reminderIndex, newReminderText);
                        }
                      }}
                    >
                      Edit
                    </button>
                  </div>
                ))}
            </div>
            <hr/>

          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalSetting;