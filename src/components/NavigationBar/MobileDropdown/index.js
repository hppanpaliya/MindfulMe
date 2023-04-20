import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Collapse, List, MenuItem } from "@mui/material";

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

export default MobileDropdown;
