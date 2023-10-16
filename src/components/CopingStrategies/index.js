import React from "react";
import "./CopingStrategies.css";
import { Container, Typography, Box } from "@mui/material";

const CopingStrategies = () => {
    return (
      <Container className="coping-strategies">
        <Typography variant="h4" align="center" fontWeight="bold">
          Coping Strategies for Managing Stress and Anxiety
        </Typography>
        <Box className="coping-strategies-section">
          <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
            1. Exercise
          </Typography>
          <Typography variant="body1">
            Exercise is a great way to relieve stress and anxiety. It releases endorphins, which are natural mood boosters, and can help you feel more
            relaxed and calm.
          </Typography>
          <Typography variant="body1">Some ways to incorporate exercise into your routine include:</Typography>
          <ul>
            <li>Going for a walk or run</li>
            <li>Joining a fitness class</li>
            <li>Doing yoga or pilates</li>
            <li>Playing a sport</li>
          </ul>
        </Box>
        <div className="coping-strategies-section">
          <Typography variant="h5" fontWeight="bold">
            2. Practice Mindfulness
          </Typography>
          <Typography variant="body1">
            Mindfulness is the practice of being present and aware in the moment. It can help you focus on the present instead of worrying about the
            future or ruminating on the past, which can reduce stress and anxiety.
          </Typography>
          <Typography variant="body1">Some ways to practice mindfulness include:</Typography>
          <ul>
            <li>Meditation</li>
            <li>Breathing exercises</li>
            <li>Yoga</li>
            <li>Progressive muscle relaxation</li>
          </ul>
        </div>
        <div className="coping-strategies-section">
          <Typography variant="h5" fontWeight="bold">
            3. Connect with Others
          </Typography>
          <Typography variant="body1">
            Connecting with others can help you feel supported and less alone, which can reduce stress and anxiety. You can connect with others in a
            variety of ways, such as:
          </Typography>
          <ul>
            <li>Joining a support group</li>
            <li>Talking to a friend or family member</li>
            <li>Volunteering in your community</li>
            <li>Attending social events</li>
          </ul>
        </div>
        <div className="coping-strategies-section">
          <Typography variant="h5" fontWeight="bold">
            4. Get Enough Sleep
          </Typography>
          <Typography variant="body1">
            Sleep is crucial for both physical and mental well-being. Getting enough sleep can help you feel more rested and less stressed, while not
            getting enough sleep can increase feelings of anxiety.
          </Typography>
          <Typography variant="body1">Some ways to improve your sleep include:</Typography>
          <ul>
            <li>Establishing a regular sleep schedule</li>
            <li>Creating a relaxing bedtime routine</li>
            <li>Avoiding screens before bed</li>
            <li>Avoiding caffeine and alcohol before bed</li>
          </ul>
        </div>
      </Container>
    );
};

export default CopingStrategies;
