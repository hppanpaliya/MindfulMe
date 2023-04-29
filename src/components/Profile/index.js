import React from "react";
import DarkModeSwitch from "./settings/DarkModeSwitch";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: auto;
`;

const Profile = () => {
  return (
    <Container>
      <div>
        <Typography variant="h2" gutterBottom>
          Profile
        </Typography>
        <DarkModeSwitch />
      </div>
    </Container>
  );
};

export default Profile;
