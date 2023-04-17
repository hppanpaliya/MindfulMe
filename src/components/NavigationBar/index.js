import { useState } from "react";
import { AppBar, Toolbar } from "@mui/material";
import { useSelector } from "react-redux";

import { NavigationBarMenu, NavigationBarTitle, NavigationLinks, NavigationDrawer } from "./StyledComponent";
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
    <AppBar position="sticky" onMouseLeave={handleMouseLeave}>
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
