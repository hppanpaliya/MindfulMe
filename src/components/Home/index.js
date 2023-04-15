//home/index.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Typography, Box, Button, Container } from '@mui/material';
import {List, ListItem, ListItemText} from '@mui/material';

//theme import
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";

const LinkContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: theme.spacing(2),
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontSize: '1.2rem',
  margin: theme.spacing(0, 2),
}));

const listStyle = {
  listStyleType: 'circle',
};

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <ThemeProvider theme={theme}>
    <Container sx={{mt: 5}}>
      <Typography variant='h2'>Welcome to our Mental Health Support Web App</Typography>
      <Typography variant='h5'>This app provides a range of resources and tools to support mental health and well-being, including:</Typography>
      {/* <List>
        <ListItem>
          <ListItemText primary="Mood tracking and journaling with data visualization" />
        </ListItem>

        <ListItem>
          <ListItemText primary="Personalized self-assessment tools and diagnostic quizzes" />
        </ListItem>
      </List> */}
      <ul>
        <li>Mood tracking and journaling with data visualization</li>
        <li>Personalized self-assessment tools and diagnostic quizzes</li>
        <li>Guided meditations and mindfulness exercises</li>
        <li>Cognitive-behavioral therapy (CBT) techniques and resources</li>
        <li>Coping strategies for managing stress and anxiety</li>
        <li>Personalized goal setting and progress tracking with reminders</li>
        <li>Access to mental health professionals and therapists with teletherapy</li>
        <li>Educational resources and articles on mental health topics with gamification elements</li>
        <li>AI chatbot for 24/7 support and assistance with coping skills and self-care</li>
        <li>Virtual support groups and peer-to-peer communication</li>
        <li>Multi-language support</li>
      </ul>
      <LinkContainer>
        {user ? (
          <>
            <Button variant="contained" color="primary" component={Link} to="/logout">Logout</Button>
          </>
        ) : null}
        {!user ? (
          <>
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to="/join">Join</StyledLink>
          </>
        ) : null}
      </LinkContainer>
    </Container>
    </ThemeProvider>
  );
};

export default Home;
