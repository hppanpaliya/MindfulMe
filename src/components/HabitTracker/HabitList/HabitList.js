import React, { useEffect } from "react";
import HabitItem from "./HabitItem/HabitItem";
import Insights from "../Insights/Insights";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import { fetchHabitsAsync } from "../../../store/features/habits/habitsSlice";

const HabitList = (props) => {
  const { user, loading } = useSelector((state) => state.auth);
  const { habits } = useSelector((state) => state.habits);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading) {
      console.log("useEffect get Habits");
      dispatch(fetchHabitsAsync(user.uid));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const filterHabits = (habits) => {
    if (props.filter === "completed") {
      return habits.filter((habit) => habit.isCompleted);
    } else if (props.filter === "notCompleted") {
      return habits.filter((habit) => !habit.isCompleted);
    } else {
      return habits;
    }
  };

  const sortHabits = (habits) => {
    const sortedHabits = [...habits];
    if (props.sortBy === "nameAsc") {
      return sortedHabits.sort((a, b) => a.name.localeCompare(b.name));
    } else if (props.sortBy === "nameDesc") {
      return sortedHabits.sort((a, b) => b.name.localeCompare(a.name));
    } else if (props.sortBy === "dateAsc") {
      return sortedHabits.sort((a, b) => a.createdAt - b.createdAt);
    } else if (props.sortBy === "dateDesc") {
      return sortedHabits.sort((a, b) => b.createdAt - a.createdAt);
    } else {
      return habits;
    }
  };

  const filteredHabits = filterHabits(habits);
  const sortedHabits = sortHabits(filteredHabits);

  return (
    <Box
      component="div"
      sx={{ flexDirection: "column", gap: "1rem", display: "flex" }}
    >
      <Insights habits={habits} />
      {sortedHabits.map((habit) => (
        <HabitItem
          key={habit.id}
          id={habit.id}
          name={habit.name}
          isCompleted={habit.isCompleted}
          createdAt={habit.createdAt}
          setRefreshHabits={props.setRefreshHabits}
          refreshHabits={props.refreshHabits}
          streakStartDate={habit.streakStartDate}
          streakEndDate={habit.streakEndDate}
          streak={habit.streak}
          lastUpdated={habit.lastUpdated}
          previousDaysMaintained={habit.previousDaysMaintained}
        />
      ))}
    </Box>
  );
};

export default HabitList;
