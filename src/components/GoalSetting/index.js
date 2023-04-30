// import React, { useState, useEffect } from "react";
// import firebase from "../../utils/firebase";
// import { useSelector } from "react-redux";
// import {
//     Button,
//     Container,
//     Typography,
//     TextField,
//     InputAdornment,
// } from "@mui/material";

// const GoalSetting = () => {
//     const [goals, setGoals] = useState([]);
//     const [newGoal, setNewGoal] = useState("");
//     const [newReminder, setNewReminder] = useState("");
//     const user = useSelector((state) => state.auth.user);
//     const uid = user.uid;

//     const goalsRef = firebase
//         .firestore()
//         .collection("users")
//         .doc(uid)
//         .collection("goals");

//     useEffect(() => {
//         const fetchGoals = async () => {
//             const goalsSnapshot = await goalsRef.get();
//             const goalsData = goalsSnapshot.docs.map((doc) => {
//                 const data = doc.data();
//                 return { ...data, id: doc.id };
//             });
//             setGoals(goalsData);
//         };

//         fetchGoals();
//         // eslint-disable-next-line
//     }, []);

//     const handleUpdateGoal = async (goalId, updatedGoal) => {
//         await goalsRef.doc(goalId).update({
//             title: updatedGoal,
//         });
//         const updatedGoals = goals.map((goal) => {
//             if (goal.id === goalId) {
//                 return { ...goal, title: updatedGoal, isEditing: false };
//             }
//             return goal;
//         });
//         setGoals(updatedGoals);
//     };

//     const handleAddReminder = async (goalId) => {
//         if (newReminder.trim()) {
//             const goalDoc = await goalsRef.doc(goalId).get();
//             const goalData = goalDoc.data();
//             const existingReminders = goalData.reminders || [];
//             const updatedReminders = [
//                 ...existingReminders,
//                 { text: newReminder },
//             ];
//             await goalsRef.doc(goalId).update({
//                 reminders: updatedReminders,
//             });
//             const updatedGoals = goals.map((goal) => {
//                 if (goal.id === goalId) {
//                     return { ...goal, reminders: updatedReminders };
//                 }
//                 return goal;
//             });
//             setGoals(updatedGoals);
//             setNewReminder("");
//         }
//     };

//     const handleAddGoal = async () => {
//         if (newGoal.trim()) {
//             const goalData = {
//                 title: newGoal.trim(),
//                 createdAt: Date.now(),
//                 uid: uid,
//             };
//             const goalRef = await goalsRef.add(goalData);
//             goalData.id = goalRef.id;
//             setGoals([...goals, goalData]);
//             setNewGoal("");
//         }
//     };

//     const handleUpdateReminders = async (goalId, updatedReminders) => {
//         await goalsRef.doc(goalId).update({
//             reminders: updatedReminders,
//         });
//         const updatedGoals = goals.map((goal) => {
//             if (goal.id === goalId) {
//                 return { ...goal, reminders: updatedReminders };
//             }
//             return goal;
//         });
//         setGoals(updatedGoals);
//     };

//     const handleEditReminder = async (
//         goalId,
//         reminderIndex,
//         newReminderText
//     ) => {
//         const updatedReminders = [
//             ...goals.find((goal) => goal.id === goalId).reminders,
//         ];
//         updatedReminders[reminderIndex].text = newReminderText;
//         await handleUpdateReminders(goalId, updatedReminders);
//     };
//     return (
//         <Container
//             fullWidth
//             style={{
//                 justifyContent: "center",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 fontSize: "1.3rem",
//             }}
//         >
//             <Typography variant="h4" fontWeight="bold" sx={{ mt: 2 }}>
//                 Goal Tracker
//             </Typography>
//             <div>
//                 <TextField
//                     value={newGoal}
//                     onChange={(e) => setNewGoal(e.target.value)}
//                     placeholder="Enter a new goal"
//                     sx={{ mt: 2 }}
//                     InputProps={{
//                         endAdornment: (
//                             <InputAdornment position="end">
//                                 <Button
//                                     variant="contained"
//                                     onClick={handleAddGoal}
//                                     size="large"
//                                 >
//                                     Add Goal
//                                 </Button>
//                             </InputAdornment>
//                         ),
//                     }}
//                 />
//             </div>
//             <div>
//                 {goals.map((goal, index) => (
//                     <div key={index}>
//                         <div>
//                             {goal.isEditing ? (
//                                 <>
//                                     <TextField
//                                         value={goal.title}
//                                         onChange={(e) => {
//                                             const updatedGoals = [...goals];
//                                             const index =
//                                                 updatedGoals.findIndex(
//                                                     (g) => g.id === goal.id
//                                                 );
//                                             updatedGoals[index].title =
//                                                 e.target.value;
//                                             setGoals(updatedGoals);
//                                         }}
//                                         InputProps={{
//                                             endAdornment: (
//                                                 <InputAdornment position="end">
//                                                     <Button
//                                                         variant="contained"
//                                                         onClick={() =>
//                                                             handleUpdateGoal(
//                                                                 goal.id,
//                                                                 goal.title
//                                                             )
//                                                         }
//                                                         size="small"
//                                                         sx={{ mr: 1 }}
//                                                     >
//                                                         Update
//                                                     </Button>
//                                                     <Button
//                                                         variant="contained"
//                                                         onClick={() => {
//                                                             const updatedGoals =
//                                                                 [...goals];
//                                                             updatedGoals[
//                                                                 index
//                                                             ].isEditing = false;
//                                                             setGoals(
//                                                                 updatedGoals
//                                                             );
//                                                         }}
//                                                         size="small"
//                                                     >
//                                                         Cancel
//                                                     </Button>
//                                                 </InputAdornment>
//                                             ),
//                                         }}
//                                     />
//                                 </>
//                             ) : (
//                                 <div
//                                     style={{
//                                         display: "flex",
//                                         justifyContent: "space-between",
//                                         paddingTop: "2rem",
//                                         paddingBottom: "0.5rem",
//                                     }}
//                                 >
//                                     <Typography variant="h6">
//                                         {goal.title}
//                                     </Typography>
//                                     <Button
//                                         size="small"
//                                         variant="contained"
//                                         onClick={() => {
//                                             const updatedGoals = [...goals];
//                                             updatedGoals[
//                                                 index
//                                             ].isEditing = true;
//                                             setGoals(updatedGoals);
//                                         }}
//                                     >
//                                         Edit
//                                     </Button>
//                                 </div>
//                             )}
//                         </div>
//                         <div>
//                             <TextField
//                                 value={newReminder}
//                                 onChange={(e) => setNewReminder(e.target.value)}
//                                 placeholder="Enter a reminder"
//                                 InputProps={{
//                                     endAdornment: (
//                                         <InputAdornment position="end">
//                                             <Button
//                                                 variant="contained"
//                                                 onClick={() =>
//                                                     handleAddReminder(goal.id)
//                                                 }
//                                                 size="small"
//                                             >
//                                                 Add Goal
//                                             </Button>
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                             />
//                         </div>
//                         <br />
//                         <Typography variant="h6">
//                             Total Reminders:{" "}
//                             {goal.reminders ? goal.reminders.length : 0}
//                         </Typography>
//                         <div>
//                             {goal.reminders &&
//                                 goal.reminders.map(
//                                     (reminder, reminderIndex) => (
//                                         <div
//                                             key={reminderIndex}
//                                             style={{
//                                                 display: "flex",
//                                                 justifyContent: "space-between",
//                                             }}
//                                         >
//                                             <TextField
//                                                 type="checkbox"
//                                                 aria-label="Checkbox for following text input"
//                                                 checked={reminder.isChecked}
//                                                 onChange={() => {
//                                                     const updatedReminders = [
//                                                         ...goal.reminders,
//                                                     ];
//                                                     updatedReminders[
//                                                         reminderIndex
//                                                     ].isChecked =
//                                                         !reminder.isChecked;
//                                                     handleUpdateReminders(
//                                                         goal.id,
//                                                         updatedReminders
//                                                     );
//                                                 }}
//                                                 sx={{ mt: 1 }}
//                                             />
//                                             {reminder.text}
//                                             <Button
//                                                 variant="contained"
//                                                 size="small"
//                                                 sx={{ mt: 1 }}
//                                                 onClick={() => {
//                                                     const newReminderText =
//                                                         window.prompt(
//                                                             "Enter the new reminder text",
//                                                             reminder.text
//                                                         );
//                                                     if (newReminderText) {
//                                                         handleEditReminder(
//                                                             goal.id,
//                                                             reminderIndex,
//                                                             newReminderText
//                                                         );
//                                                     }
//                                                 }}
//                                             >
//                                                 Edit
//                                             </Button>
//                                         </div>
//                                     )
//                                 )}
//                         </div>
//                         <hr />
//                     </div>
//                 ))}
//             </div>
//         </Container>
//     );
// };

// export default GoalSetting;

import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import NewGoalModal from "./NewGoalModal";
import GoalsList from "./GoalsList";

const Introduction = styled("p")`
  font-size: 16px;
  margin: 16px 0;
`;

function GoalSetting() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: { xs: "90%", sm: "90%", md: "700px" },
        margin: { xs: "0 auto", md: "0 auto" },
      }}
    >
      <Typography variant="h4" component="h1" marginTop={2} align="center" gutterBottom>
        Goal Setting
      </Typography>
      <Introduction>Set SMART goals to improve your mental well-being and track your progress over time.</Introduction>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Create a New Goal
      </Button>
      <NewGoalModal open={open} handleClose={handleClose} />
      <GoalsList />
    </Box>
  );
}

export default GoalSetting;
