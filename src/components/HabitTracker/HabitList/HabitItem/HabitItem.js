import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import "./HabitItem.css";
import DeleteModal from "./DeleteModal";
import Tooltip from "@mui/material/Tooltip";

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
import lightTheme from "../../../../theme";
import dartTheme from "../../../../theme/darkTheme";

const HabitItem = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.name);
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [calendarDate, setCalendarDate] = useState(new Date());
  const previousDaysMaintained = props.previousDaysMaintained;
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  let backgroundColor = darkMode ? dartTheme.palette.background.paper : lightTheme.palette.background.default;
  let backgroundColorSecondary = darkMode ? dartTheme.palette.background.default : lightTheme.palette.background.paper;
  const handleStreakNumberClick = () => {
    setOpen(true);
  };

  const convertTimestampsToDates = (timestamps) => {
    return timestamps.map((timestamp) => new Date(timestamp));
  };

  const previousDaysMaintainedDates = convertTimestampsToDates(previousDaysMaintained);

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaintainHabit = async () => {
    //(user.user.uid, props.id);
    dispatch(maintainHabitAsync({ uid: user.user.uid, habitId: props.id }));
    dispatch(fetchHabitsAsync(user.user.uid));
    props.setRefreshHabits(!props.refreshHabits);
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
    dispatch(
      updateHabitAsync({
        uid: user.user.uid,
        habitId: props.id,
        updatedData: editedTitle,
      })
    );
    setIsEditing(false);
    dispatch(fetchHabitsAsync(user.user.uid));
    props.setRefreshHabits(!props.refreshHabits);
  };

  const handleToggleCompletion = async () => {
    dispatch(toggleCompletionAsync({ uid: user.user.uid, habitId: props.id }));
    props.setRefreshHabits(!props.refreshHabits);
    dispatch(fetchHabitsAsync(user.user.uid));
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
    console.log("Open");
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    console.log("Close");
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
        borderRadius: "4px",
        backgroundColor: !props.isCompleted ? backgroundColor : backgroundColorSecondary,
      }}
    >
      {isEditing ? (
        <TextField value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} fullWidth size="small" />
      ) : (
        <>
          <Tooltip title={props.isCompleted ? "Click to mark as incompleted" : "Click to mark as completed"} placement="top">
            <Button onClick={handleToggleCompletion} size="small" color="primary">
              {props.name}
            </Button>
          </Tooltip>
          <Tooltip title="Click to see calendar" placement="top">
            <Button sx={{ cursor: "pointer", marginLeft: "0.5rem" }} size="small" color="primary" onClick={handleStreakNumberClick}>
              Streak: {props.streak}
            </Button>
          </Tooltip>

          <Dialog onClose={handleClose} open={open}>
            <DialogContent>
              <Calendar
                value={calendarDate}
                tileClassName={({ date, view }) => {
                  if (view === "month" && previousDaysMaintainedDates.some((attendedDate) => attendedDate.toDateString() === date.toDateString())) {
                    previousDaysMaintainedDates.some((attendedDate) =>
                      console.log(attendedDate.toDateString(), date.toDateString(), attendedDate.toDateString() === date.toDateString())
                    );
                    return "attended";
                  }
                }}
              />
              <Typography variant="body1">Dates in green are days you maintained this habit.</Typography>
            </DialogContent>
          </Dialog>
          <Tooltip title="Click to maintain habit and streak" placement="top">
            <Button onClick={handleMaintainHabit} size="small" color="primary" disabled={props.isCompleted}>
              Maintain Habit
            </Button>
          </Tooltip>
        </>
      )}
      <Box component="div">
        {isEditing ? (
          <Tooltip title="Click to save changes" placement="top">
            <IconButton onClick={handleUpdate} size="small">
              <SaveIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Click to edit habit" placement="top">
            <IconButton onClick={() => setIsEditing(true)} size="small" edge="end">
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Click to delete habit" placement="top">
          <IconButton onClick={openDeleteModal} size="small" edge="end">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <DeleteModal open={deleteModal} handleClose={closeDeleteModal} deleteHabit={handleDelete} habit={props} />
      </Box>
    </Box>
  );
};

export default HabitItem;
