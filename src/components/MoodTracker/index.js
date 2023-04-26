import React from "react";
import MoodLogging from "./MoodLogging";
import MoodVisualize from "./MoodVisualize";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";

// MoodTracker component is responsible for rendering both the MoodLogging and MoodVisualize components
const MoodTracker = () => {
    return (
        // Use a Grid component to stack the MoodLogging and MoodVisualize components, and center them vertically and horizontally
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            height="calc(100vh - 164px)"
        >
            {/* Render the MoodLogging component for users to log their mood */}
            <Grid item>
                <MoodLogging />
            </Grid>
            {/* Render the MoodVisualize component to display a visualization of the user's mood data */}
            <Grid item>
                <MoodVisualize />
            </Grid>
        </Grid>
    );
};

export default MoodTracker;
