import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { AppBar, Toolbar, IconButton, Drawer, List, Box, Typography, Menu, MenuItem, Popper, Paper, Collapse } from "@mui/material";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
// dropdown menu icon
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const NavLink = styled(Link)({
  color: "black",
  textDecoration: "none",
  margin: "0 16px",
  "@media(max-width: 600px)": {
    margin: "16px 0",
  },
});

const DesktopDropdown = ({ title, items }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDesktop, setOpenDesktop] = useState(false);

  const handleMouseEnter = (event) => {
    console.log("handleMouseEnter");
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
    if (!openDesktop) {
      setOpenDesktop(true);
    }
  };

  const handleMouseLeave = () => {
    console.log("handleMouseLeave");
    if (anchorEl !== null) {
      setAnchorEl(null);
    }
    if (openDesktop) {
      setOpenDesktop(false);
    }
  };

  return (
    <>
          <Box component="div" onMouseLeave={handleMouseLeave}>
      <Typography
        onMouseEnter={handleMouseEnter}
        aria-controls={`${title}-menu`}
        aria-haspopup="true"
        sx={{
          cursor: "pointer",
          padding: "0 16px",
          color: "black",
          fontWeight: "bold",
        }}
      >
        {title} <ExpandMoreIcon />
      </Typography>
      <Menu open={openDesktop} anchorEl={anchorEl} onClose={handleMouseLeave} MenuListProps={{ onMouseLeave: handleMouseLeave }}>
        {items.map((item) => (
          <MenuItem key={item.path} component={Link} to={item.path} onClick={handleMouseLeave}>
            {item.text}
          </MenuItem>
        ))}
      </Menu>
      </Box>

    </>
  );
};

const MobileDropdown = ({ title, items }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleClick = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <>
      <Typography
        onClick={handleClick}
        aria-controls={`${title}-menu`}
        aria-haspopup="true"
        sx={{
          cursor: "pointer",
          padding: "0 16px",
          color: "black",
          fontWeight: "bold",
        }}
      >
        {title} <ExpandMoreIcon />
      </Typography>
      <Collapse in={isOpenMenu}>
        <List component="nav" aria-labelledby={`${title}-menu`}>
          {items.map((item) => (
            <MenuItem key={item.path} component={Link} to={item.path}>
              {item.text}
            </MenuItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

const Dropdown = ({ title, items }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    <MobileDropdown title={title} items={items} onClick={(e) => e.stopPropagation()} />
  ) : (
    <DesktopDropdown title={title} items={items} />
  );
};

// Define the dropdown menu items
const links = {
  guest: [
    { path: "/", text: "Home" },
    {
      category: "Games",
      items: [
        { path: "/memory-match", text: "Memory Match" },
        { path: "/draw", text: "DrawingApp" },
      ],
    },
    {
      category: "Resources",
      items: [
        { path: "/coping-strategies", text: "Coping Strategies" },
        { path: "/cbt", text: "CBT" },
      ],
    },
    { path: "/login", text: "Login" },
    { path: "/join", text: "Join" },
  ],
  user: [
    { path: "/", text: "Home" },
    {
      category: "Social",
      items: [
        { path: "/support-groups", text: "Support Groups" },
        { path: "/chat", text: "Chat" },
      ],
    },
    {
      category: "Tracking Tools",
      items: [
        { path: "/mood-tracker", text: "Mood Tracker" },
        { path: "/goal-setting", text: "Goal Setting" },
        { path: "/self-assessment", text: "Self Assessment" },
        { path: "/habit-tracker", text: "Habit Tracker" },
      ],
    },
    {
      category: "Games",
      items: [
        { path: "/memory-match", text: "Memory Match" },
        { path: "/draw", text: "Drawing" },
        { path: "/guided-meditation", text: "Meditation" },
      ],
    },
    {
      category: "Resources",
      items: [
        { path: "/coping-strategies", text: "Coping Strategies" },
        { path: "/cbt", text: "CBT" },
      ],
    },
    { path: "/survey", text: "Survey" },
    { path: "/logout", text: "Logout" },
  ],
};
const NavBar = () => {
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const toggleDrawer = () => {
    setIsOpenMenu(!isOpen);
  };

  const handleMouseLeave = () => {
    setIsOpenMenu(false);
  };

  const renderLinks = (dropdowns) => {
    return (
      <>
        {dropdowns.map((dropdown) => {
          if (dropdown.items) {
            return <Dropdown key={dropdown.category} title={dropdown.category} items={dropdown.items} />;
          } else {
            return (
              <NavLink key={dropdown.path} to={dropdown.path} sx={{
                paddingTop: "0.5rem",
              }} >
                {dropdown.text}
              </NavLink>
            );
          }
        })}
      </>
    );
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#87CEFA" }} onMouseLeave={handleMouseLeave}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer} sx={{ display: { xs: "block", sm: "none" } }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          <NavLink to="/">Mental Health App</NavLink>
        </Typography>
        {/* Wrap the links in a flex container */}
        <Box sx={{ display: { xs: "none", sm: "flex" }, flexGrow: 1, justifyContent: "flex-end" }}>
          {user ? renderLinks(links.user) : renderLinks(links.guest)}
        </Box>
      </Toolbar>
      <Drawer anchor="left" open={isOpenMenu} onClose={toggleDrawer} sx={{ background: "lightgrey" }}>
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
