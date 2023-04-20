import MenuIcon from "@mui/icons-material/Menu";
import links from "../../utils/links.json";
import renderLinks from "../renderLinks/index.js";
import { IconButton, Drawer, List, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

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
export const NavigationBarMenu = ({ isOpenMenu, openDrawer }) => (
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
export const NavigationBarTitle = () => (
  <Typography variant="h6">
    <NavLink to="/">Mental Health App</NavLink>
  </Typography>
);

// Component for navigation links
export const NavigationLinks = ({ user }) => (
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
export const NavigationDrawer = ({ user, isOpenMenu, closeDrawer }) => (
  <Drawer
    anchor="left"
    open={isOpenMenu}
    onClose={closeDrawer}
    sx={{ background: "lightgrey" }}
  >
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
        {user
          ? renderLinks(links.user, closeDrawer)
          : renderLinks(links.guest, closeDrawer)}
      </List>
    </div>
  </Drawer>
);
