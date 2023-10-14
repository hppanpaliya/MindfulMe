import React from "react";
import DarkModeSwitch from "./settings/DarkModeSwitch";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import EmailNotificationToggle from "./settings/EmailNotificationToggle";
import PushNotificationToggle from "./settings/PushNotificationToggle";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";



const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: auto;
  height: 60svh;
`;


const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Profile
      </Typography>
      <DarkModeSwitch />
      {user ? <>      <EmailNotificationToggle />
      <PushNotificationToggle />
      <Button variant="contained" color="primary">
        <StyledLink to="/change-password">Change Password</StyledLink>
        </Button>
      </> : <>
      </>

      }
    </Container>
  );
};

export default Profile;
