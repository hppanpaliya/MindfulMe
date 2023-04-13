import { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { AppBar, Toolbar, IconButton, Drawer, List, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import links from "../utils/links.json";
import renderLinks from "./renderLinks";

// Styled component for NavLink
const NavLink = styled(Link)({
  color: "black",
  textDecoration: "none",
  margin: "0 16px",
  "@media(max-width: 600px)": {
    margin: "16px 0",
  },
});

// Component for menu icon
const NavigationBarMenu = ({ isOpenMenu, openDrawer }) => (
  <IconButton
    edge="start"
    color="inherit"
    aria-label="menu"
    onClick={openDrawer}
    sx={{ display: { xs: "block", sm: "none" } }}
  >
    <MenuIcon />
  </IconButton>
);

// Component for navigation bar title
const NavigationBarTitle = () => (
  <Typography variant="h6">
    <NavLink to="/">Mental Health App</NavLink>
  </Typography>
);

// Component for navigation links
const NavigationLinks = ({ user }) => (
  <Box
    sx={{
      display: { xs: "none", sm: "flex" },
      flexGrow: 1,
      justifyContent: "flex-end",
    }}
  >
    {user ? renderLinks(links.user) : renderLinks(links.guest)}
  </Box>
);

// Component for navigation drawer
const NavigationDrawer = ({ user, isOpenMenu, closeDrawer }) => (
  <Drawer anchor="left" open={isOpenMenu} onClose={closeDrawer} sx={{ background: "lightgrey" }}>
    <div>
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
        {user ? renderLinks(links.user, closeDrawer) : renderLinks(links.guest, closeDrawer)}
      </List>
    </div>
  </Drawer>
);

// Main navigation bar component
const NavigationBar = () => {
  const { user } = useSelector((state) => state.auth);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  // Handler for opening the navigation drawer
  const openDrawer = () => {
    setIsOpenMenu(true);
  };

  // Handler for closing the navigation drawer
  const closeDrawer = () => {
    setIsOpenMenu(false);
  };

  // Handler for mouse leaving the navigation bar
  const handleMouseLeave = () => {
    setIsOpenMenu(false);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#87CEFA" }} onMouseLeave={handleMouseLeave}>
      <Toolbar>
        <NavigationBarMenu isOpenMenu={isOpenMenu} openDrawer={openDrawer} />
        <NavigationBarTitle />
        <NavigationLinks user={user} />
      </Toolbar>
      <NavigationDrawer user={user} isOpenMenu={isOpenMenu} closeDrawer={closeDrawer} />
    </AppBar>
  );
};

export default NavigationBar;
