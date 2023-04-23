import { useState } from "react";
import { AppBar, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import {
  NavigationBarMenu,
  NavigationBarTitle,
  NavigationLinks,
  NavigationDrawer,
} from "./StyledComponent";


const StyledAppBar = styled(AppBar)(({ theme }) => ({
  height: theme.customAppBarHeight,
}));




// Main navigation bar component
const NavigationBar = () => {
  const { user } = useSelector((state) => state.auth);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


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


  theme.customAppBarHeight = isMobile ? '50px' : '64px';


  return (
    <StyledAppBar position="sticky" onMouseLeave={handleMouseLeave}>
      <Toolbar>
        <NavigationBarMenu isOpenMenu={isOpenMenu} openDrawer={openDrawer} />
        <NavigationBarTitle />
        <NavigationLinks user={user} />
      </Toolbar>
      <NavigationDrawer
        user={user}
        isOpenMenu={isOpenMenu}
        closeDrawer={closeDrawer}
      />
    </StyledAppBar>
  );
};

export default NavigationBar;
