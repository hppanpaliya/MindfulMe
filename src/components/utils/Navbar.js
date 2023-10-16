import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  Box,
  Typography,
  Menu,
  MenuItem,
  Collapse,
} from "@mui/material";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
// dropdown menu icon
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import links from "./utils/links";

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
        <Menu
          open={openDesktop}
          anchorEl={anchorEl}
          onClose={handleMouseLeave}
          MenuListProps={{ onMouseLeave: handleMouseLeave }}
        >
          {items.map((item) => (
            <MenuItem
              key={item.path}
              component={Link}
              to={item.path}
              onClick={handleMouseLeave}
            >
              {item.text}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  );
};

const MobileDropdown = ({ title, items, closeDrawer }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleClick = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handleLinkClick = () => {
    closeDrawer();
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
            <MenuItem
              key={item.path}
              component={Link}
              to={item.path}
              onClick={handleLinkClick}
            >
              {item.text}
            </MenuItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

const Dropdown = ({ title, items, closeDrawer }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    <MobileDropdown
      title={title}
      items={items}
      closeDrawer={closeDrawer}
      onClick={(e) => e.stopPropagation()}
    />
  ) : (
    <DesktopDropdown title={title} items={items} />
  );
};

// Define the dropdown menu items

const NavBar = () => {
  const { user } = useSelector((state) => state.auth);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const openDrawer = () => {
    setIsOpenMenu(true);
  };

  const closeDrawer = () => {
    setIsOpenMenu(false);
  };

  const handleMouseLeave = () => {
    setIsOpenMenu(false);
  };

  const renderLinks = (dropdowns, closeDrawer) => {
    return (
      <>
        {dropdowns.map((dropdown) => {
          if (dropdown.items) {
            return (
              <Dropdown
                key={dropdown.category}
                title={dropdown.category}
                items={dropdown.items}
                closeDrawer={closeDrawer}
              />
            );
          } else {
            return (
              <NavLink
                key={dropdown.path}
                to={dropdown.path}
                sx={{
                  paddingTop: "0.5rem",
                }}
                onClick={closeDrawer}
              >
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
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={openDrawer} sx={{ display: { xs: "block", sm: "none" } }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          <NavLink to="/">MindfulMe</NavLink>
        </Typography>
        {/* Wrap the links in a flex container */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
        >
          {user ? renderLinks(links.user) : renderLinks(links.guest)}
        </Box>
      </Toolbar>
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
    </AppBar>
  );
};

export default NavBar;
