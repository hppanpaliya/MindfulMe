import MenuIcon from "@mui/icons-material/Menu";
import links from "../../utils/links.json";
import renderLinks from "../renderLinks/index.js";
import { IconButton, Drawer, List, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

// Styled component for NavLink
const NavLink = styled(Link)({
  textDecoration: "none",
  margin: "0 16px",
  "@media(max-width: 600px)": {
    margin: "16px 0",
  },
});

// Component for menu icon
export const NavigationBarMenu = ({ isOpenMenu, openDrawer }) => (
  <IconButton edge="start" color="inherit" aria-label="menu" onClick={openDrawer} sx={{ display: { xs: "block", sm: "block", md: "none" } }}>
    <MenuIcon />
  </IconButton>
);

// Component for navigation bar title
export const NavigationBarTitle = () => (
  <NavLink to="/">
    <Typography variant="h5">MindfulMe </Typography>
  </NavLink>
);

// Component for navigation links
export const NavigationLinks = ({ user }) => (
  <Box
    sx={{
      display: { xs: "none", sm: "none", md: "flex" },
      flexGrow: 1,
      justifyContent: "flex-end",
    }}
  >
    {user ? renderLinks(links.user) : renderLinks(links.guest)}
  </Box>
);

// Component for navigation drawer
export const NavigationDrawer = ({ user, isOpenMenu, closeDrawer }) => (
  <Drawer
    anchor="left"
    open={isOpenMenu}
    onClose={closeDrawer}
  >
    <div>
      <List
        component={Box}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "150px",
          width: "70vw",
        }}
      >
        {user
          ? renderLinks(links.user, closeDrawer)
          : renderLinks(links.guest, closeDrawer)}
      </List>
    </div>
  </Drawer>
);
