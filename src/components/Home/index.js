//home/index.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Typography, Box, Button } from '@mui/material';

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  padding: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '2rem',
  textAlign: 'center',
  margin: theme.spacing(2, 0),
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  textAlign: 'center',
  marginBottom: theme.spacing(2),
}));

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

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Root>
      <Title>Welcome to our Mental Health Support Web App</Title>
      <Subtitle>This app provides a range of resources and tools to support mental health and well-being, including:</Subtitle>
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
    </Root>
  );
};

export default Home;
