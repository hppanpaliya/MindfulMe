import React from "react";
import MoodLogging from "./logging";
import MoodVisualize from "./visualization";
import { Box } from "@mui/system";

const MoodTracker = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Mood Tracker</h1>
      <MoodLogging />
      <MoodVisualize />
    </Box>
  );
};

export default MoodTracker;
