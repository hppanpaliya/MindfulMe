import React, { useState, useEffect } from "react";
import firebase from "../../utils/firebase";
import "./GoalSetting.css";
import { useSelector } from "react-redux";
import { FaPencilAlt } from "react-icons/fa";

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

  return (
    <div className="goal-tracker-container">
      <h1>Goal Tracker</h1>
      <div className="add-goal">
        <input type="text" value={newGoal} onChange={(e) => setNewGoal(e.target.value)} placeholder="Enter a new goal" />
        <button onClick={handleAddGoal}>Add Goal</button>
      </div>
      <ul className="goals-list">
        {goals.map((goal, index) => (
          <li key={index} className="goal-item">
            <div className="goal-header">
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
                </>
              ) : (
                <>
                  <span>{goal.title}</span>
                  <button
                    onClick={() => {
                      const updatedGoals = [...goals];
                      updatedGoals[index].isEditing = true;
                      setGoals(updatedGoals);
                    }}
                  >
                    <FaPencilAlt />
                  </button>
                </>
              )}
            </div>
            <p>Total Reminders: {goal.reminders ? goal.reminders.length : 0}</p>
            <div className="reminder-input">
              <input type="text" value={newReminder} onChange={(e) => setNewReminder(e.target.value)} placeholder="Enter a reminder" />
              <button onClick={() => handleAddReminder(goal.id)}>Add Reminder</button>
            </div>
            <div className="reminders-list">
              {goal.reminders &&
                goal.reminders.map((reminder, reminderIndex) => (
                  <div key={reminderIndex}>
                    <label>
                      <input
                        type="checkbox"
                        checked={reminder.isChecked}
                        onChange={() => {
                          const updatedReminders = [...goal.reminders];
                          updatedReminders[reminderIndex].isChecked = !reminder.isChecked;
                          handleUpdateReminders(goal.id, updatedReminders);
                        }}
                      />
                      {reminder.text}
                    </label>
                  </div>
                ))}
            </div>
            <br /> <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalSetting;
