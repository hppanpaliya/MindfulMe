// home/index.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, Container, Grid } from '@mui/material';

const Home = () => {
  return (
    <Box>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to our Mental Health Support Web App
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          Discover our features
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h6">App Overview</Typography>
            <Typography variant="body1">
              Welcome to our Mental Health Support Web App! Our app provides a range of resources and tools to support mental health and well-being.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Games</Typography>
            <ul>
              <li>
                <Typography variant="body1">
                  Memory Match: Test your memory skills.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  DrawingApp: Unleash your creativity.
                </Typography>
              </li>
            </ul>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Social</Typography>
            <ul>
              <li>
                <Typography variant="body1">
                  Support Groups: Join virtual support groups.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Chat: Connect with peers.
                </Typography>
              </li>
            </ul>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Resources</Typography>
            <ul>
              <li>
                <Typography variant="body1">
                  Coping Strategies: Learn effective coping strategies.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  CBT: Discover Cognitive-Behavioral Therapy Techniques and Resources
                </Typography>
              </li>
            </ul>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Tracking Tools</Typography>
            <ul>
              <li>
                <Typography variant="body1">
                  Mood Tracker: Track your mood and gain insights.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Goal Setting: Set and track your personal goals.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Self Assessment: Evaluate your mental health status.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Habit Tracker: Monitor and build healthy habits.
                </Typography>
              </li>
            </ul>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Meditation</Typography>
            <ul>
              <li>
                <Typography variant="body1">
                  Guided Meditation: Relax and find inner peace.
                </Typography>
              </li>
            </ul>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Account</Typography>
            <ul>
              <li>
                <Typography variant="body1">
                  Login / Logout: Access or sign out from your account.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Survey: Provide valuable feedback
                  </Typography>
          </li>
        </ul>
      </Grid>
    </Grid>
  </Container>
</Box>

  );
};

export default Home;