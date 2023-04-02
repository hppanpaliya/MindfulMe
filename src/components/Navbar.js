import { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem } from "@mui/material";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";

const NavLink = styled(Link)({
  color: "black",
  textDecoration: "none",
  margin: "0 16px",
});

const links = {
  guest: [
    { path: "/", text: "Home" },
    { path: "/memory-match", text: "Memory Match" },
    { path: "/coping-strategies", text: "Coping Strategies" },
    { path: "/cbt", text: "CBT" },
    { path: "/login", text: "Login" },
    { path: "/join", text: "Join" },
  ],
  user: [
    { path: "/", text: "Home" },
    { path: "/support-groups", text: "Support Groups" },
    { path: "/chat", text: "Chat" },
    { path: "/mood-tracker", text: "Mood Tracker" },
    { path: "/goal-setting", text: "Goal Setting" },
    { path: "/memory-match", text: "Memory Match" },
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
        <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ color: "black" }}>
          <MenuIcon />
        </IconButton>
        <div style={{ flexGrow: 1 }} />
        {user ? renderLinks(links.user) : renderLinks(links.guest)}
      </Toolbar>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer} sx={{ background: "lightgrey" }}>
        <div onClick={toggleDrawer}>
          <List>{user ? renderLinks(links.user) : renderLinks(links.guest)}</List>
        </div>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
