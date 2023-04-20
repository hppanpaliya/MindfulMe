import React from "react";
import PropTypes from "prop-types";
import { Box, MenuItem, Select, TextField } from "@mui/material";

const FiltersAndSorting = ({ filter, setFilter, sortBy, setSortBy }) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <Box
      sx={{
        marginTop: "2rem",
        display: "flex",
        justifyContent: "center",
        gap: "1rem",
        marginBottom: "2rem",
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <TextField
        select
        label="Filter"
        value={filter}
        onChange={handleFilterChange}
        sx={{ width: "18rem" }}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="completed">Completed</MenuItem>
        <MenuItem value="notCompleted">Not Completed</MenuItem>
      </TextField>
      <TextField
        select
        label="Sort By"
        value={sortBy}
        onChange={handleSortChange}
        sx={{ width: "18rem" }}
      >
        <MenuItem value="nameAsc">Name (A-Z)</MenuItem>
        <MenuItem value="nameDesc">Name (Z-A)</MenuItem>
        <MenuItem value="dateAsc">Date Added (Oldest)</MenuItem>
        <MenuItem value="dateDesc">Date Added (Newest)</MenuItem>
      </TextField>
    </Box>
  );
};

FiltersAndSorting.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,
};

export default FiltersAndSorting;
