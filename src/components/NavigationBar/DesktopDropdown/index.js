import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Menu, MenuItem } from "@mui/material";

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
    <Box component="div" onMouseLeave={handleMouseLeave}>
      <Typography
        onMouseEnter={handleMouseEnter}
        aria-controls={`${title}-menu`}
        aria-haspopup="true"
        variant="body1"
        sx={{
          cursor: "pointer",
          padding: "0 16px",
          marginTop: "0.5rem",
          fontWeight: "bold",
        }}
      >
        {title}
      </Typography>
      <Menu open={openDesktop} anchorEl={anchorEl} onClose={handleMouseLeave} MenuListProps={{ onMouseLeave: handleMouseLeave }}>
        {items.map((item) => (
          <MenuItem key={item.path} component={Link} to={item.path} onClick={handleMouseLeave}>
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default DesktopDropdown;
