import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addHabitAsync,
    fetchHabitsAsync,
} from "../../../store/features/habits/habitsSlice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FormControl } from "@mui/material";

const AddHabitForm = (props) => {
    const [newHabit, setNewHabit] = useState("");
    const user = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const handleChange = (event) => {
        setNewHabit(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newHabit.trim() !== "") {
            const habit = {
                name: newHabit,
                isCompleted: false,
                previousDaysMaintained: [],
                streak: 0,
                createdAt: Date.now(),
                streakStartDate: null,
                streakEndDate: null,
                lastUpdated: null,
            };

            // uid, habit
            dispatch(addHabitAsync({ uid: user.user.uid, habit: habit }));
            //props.setRefreshHabits(!props.refreshHabits);
            console.log(habit);
            dispatch(fetchHabitsAsync(user.user.uid));
            setNewHabit("");
        }
    };

    return (
        <FormControl
            sx={{
                m: 1,
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "center",
            }}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    handleSubmit(e);
                }
            }}
        >
            <TextField
                id="newHabit"
                label="Add a new habit"
                value={newHabit}
                onChange={handleChange}
                sx={{
                    margin: "1rem",
                    width: "18rem",
                }}
            />
            <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ margin: "1rem", width: "18rem" }}
            >
                Add Habit
            </Button>
        </FormControl>
    );
};

export default AddHabitForm;
