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

const NavBar = () => {
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ color: "black" }}>
          <MenuIcon />
        </IconButton>
        <div style={{ flexGrow: 1 }} />
        {!user ? (
          <>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/join">Join</NavLink>
          </>
        ) : (
          <>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/support-groups">Support Groups</NavLink>
            <NavLink to="/mood-tracker">Mood Tracker</NavLink>
            <NavLink to="/logout">Logout</NavLink>
          </>
        )}
      </Toolbar>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer} sx={{ background: "lightgrey" }}>
        <div onClick={toggleDrawer}>
          <List>
            <ListItem key="home">
              <NavLink to="/">Home</NavLink>
            </ListItem>
            {!user ? (
              <>
                <ListItem key="home">
                  <NavLink to="/">Home</NavLink>
                </ListItem>
                <ListItem key="login">
                  <NavLink to="/login">Login</NavLink>
                </ListItem>
                <ListItem key="join">
                  <NavLink to="/join">Join</NavLink>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem key="home">
                  <NavLink to="/">Home</NavLink>
                </ListItem>
                <ListItem key="mood-tracker">
                  <NavLink to="/mood-tracker">Mood Tracker</NavLink>
                </ListItem>
                <ListItem key="logout">
                  <NavLink to="/logout">Logout</NavLink>
                </ListItem>
              </>
            )}
          </List>
        </div>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
