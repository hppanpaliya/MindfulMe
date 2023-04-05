import { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { AppBar, Toolbar, IconButton, Drawer, List, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";

const NavLink = styled(Link)({
  color: "black",
  textDecoration: "none",
  margin: "0 16px",
  "@media(max-width: 600px)": {
    margin: "16px 0",
  },
});

const links = {
  guest: [
    { path: "/", text: "Home" },
    { path: "/memory-match", text: "Memory Match" },
    { path: "/coping-strategies", text: "Coping Strategies" },
    { path: "/cbt", text: "CBT" },
    { path: "/draw", text: "DrawingApp" },
    { path: "/login", text: "Login" },
    { path: "/join", text: "Join" },
  ],
  user: [
    { path: "/", text: "Home" },
    { path: "/support-groups", text: "Support Groups" },
    { path: "/chat", text: "Chat" },
    { path: "/mood-tracker", text: "Mood Tracker" },
    { path: "/draw", text: "DrawingApp" },
    { path: "/goal-setting", text: "Goal Setting" },
    { path: "/memory-match", text: "Memory Match" },
    { path: "/guided-meditation", text: "Guided Meditation" },
    { path: "/coping-strategies", text: "Coping Strategies" },
    { path: "/cbt", text: "CBT" },
    { path: "/logout", text: "Logout" },
  ],
};

const NavBar = () => {
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const renderLinks = (links) => {
    return (
      <>
        {links.map((link) => (
          <NavLink key={link.path} to={link.path}>
            {link.text}
          </NavLink>
        ))}
      </>
    );
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          <NavLink to="/">Mental Health App</NavLink>
        </Typography>
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          {user ? renderLinks(links.user) : renderLinks(links.guest)}
        </Box>
      </Toolbar>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer} sx={{ background: "lightgrey" }}>
        <div onClick={toggleDrawer}>
          <List
            component={Box}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "250px",
            }}
          >
            {user ? renderLinks(links.user) : renderLinks(links.guest)}
          </List>
        </div>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;