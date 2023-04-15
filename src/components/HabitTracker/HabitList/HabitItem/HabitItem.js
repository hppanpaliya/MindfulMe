import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

import {
  deleteHabitAsync,
  updateHabitAsync,
  toggleCompletionAsync,
  fetchHabitsAsync,
  maintainHabitAsync,
} from "../../../../store/features/habits/habitsSlice";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const HabitItem = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.name);
  const [open, setOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const previousDaysMaintained = props.previousDaysMaintained;


  const handleStreakNumberClick = () => {
    setOpen(true);
  };



  const handleClose = () => {
    setOpen(false);
  };

  const handleMaintainHabit = async () => {
    //(user.user.uid, props.id);
    dispatch(maintainHabitAsync({ uid: user.user.uid, habitId: props.id }));
    dispatch(fetchHabitsAsync(user.user.uid));
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const handleDelete = async () => {
    console.log("Delete", props.id);
    dispatch(deleteHabitAsync({ uid: user.user.uid, habitId: props.id }));
    dispatch(fetchHabitsAsync(user.user.uid));

    props.setRefreshHabits(!props.refreshHabits);
  };

  const handleUpdate = async () => {
    console.log("Update", props.id, editedTitle);
    dispatch(updateHabitAsync({ uid: user.user.uid, habitId: props.id, updatedData: editedTitle }));
    setIsEditing(false);
    dispatch(fetchHabitsAsync(user.user.uid));
    props.setRefreshHabits(!props.refreshHabits);
  };

  const handleToggleCompletion = async () => {
    dispatch(toggleCompletionAsync({ uid: user.user.uid, habitId: props.id }));
    props.setRefreshHabits(!props.refreshHabits);
    dispatch(fetchHabitsAsync(user.user.uid));
  };

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.5rem 1rem",
        marginBottom: "0.5rem",
        backgroundColor: "#f5f5f5",
        borderRadius: "4px",
      }}
    >
      {isEditing ? (
        <TextField value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} fullWidth size="small" />
      ) : (
        <>
          <Typography onClick={handleToggleCompletion} variant="body1" sx={{ cursor: "pointer" }} color={props.isCompleted ? "green" : "black"}>
            {props.name}
          </Typography>
          <Typography variant="body1" sx={{ cursor: "pointer", marginLeft: "0.5rem" }} onClick={handleStreakNumberClick}>
            Streak: {props.streak}
          </Typography>
          {/* <Dialog onClose={handleClose} open={open}>
              <DialogContent>
                
            </DialogContent>
          </Dialog> */}
          <Button onClick={handleMaintainHabit} size="small">
            {" "}
            Maintain Habit
          </Button>
        </>
      )}
      <Box component="div">
        {isEditing ? (
          <IconButton onClick={handleUpdate} size="small">
            <SaveIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => setIsEditing(true)} size="small" edge="end">
            <EditIcon />
          </IconButton>
        )}
        <IconButton onClick={handleDelete} size="small" edge="end">
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default HabitItem;
