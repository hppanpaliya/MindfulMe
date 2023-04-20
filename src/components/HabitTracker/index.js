import React, { useState } from "react";
import HabitList from "./HabitList/HabitList";
import AddHabitForm from "./AddHabitForm/AddHabitForm";
import FiltersAndSorting from "./FiltersAndSorting/FiltersAndSorting";
import { Box } from "@mui/material";

const HabitTracker = () => {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("nameAsc");
  const [refreshHabits, setRefreshHabits] = useState(false);

  return (
    <Box
      justifyContent={"center"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      sx={{ marginTop: "2rem" }}
    >
      <AddHabitForm
        setRefreshHabits={setRefreshHabits}
        refreshHabits={refreshHabits}
      />
      <FiltersAndSorting
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <HabitList
        filter={filter}
        sortBy={sortBy}
        setRefreshHabits={setRefreshHabits}
        refreshHabits={refreshHabits}
      />
    </Box>
  );
};

export default HabitTracker;
