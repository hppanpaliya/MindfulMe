import React from "react";
import MoodLogging from "./logging";
import MoodVisualize from "./visualization";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

// MoodTracker component is responsible for rendering both the MoodLogging and MoodVisualize components
const MoodTracker = () => {
    return (
        // Use a Box component to wrap the MoodLogging and MoodVisualize components, and center them vertically
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
        >
            <Typography variant="h4" fontWeight="bold">
                Mood Tracker
            </Typography>
            {/* Render the MoodLogging component for users to log their mood */}
            <MoodLogging />
            {/* Render the MoodVisualize component to display a visualization of the user's mood data */}
            <MoodVisualize />
        </Box>
    );
};

export default MoodTracker;
