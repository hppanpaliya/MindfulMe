import React, { useState } from "react";
import { IconButton, Dialog, DialogTitle, DialogContent, Typography, Button } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { styled } from "@mui/material/styles";
import FAQjson from "../../utils/FAQ.json";
import { useLocation } from "react-router-dom";

const FixedIconButton = styled(IconButton)({
  position: "fixed",
  right: "10px",
  top: "130px",
  zIndex: 1000,

  "&:hover": {
    backgroundColor: "primary.light",
    color: "primary.main",
    border: "1px solid #aaa",
  },
});

function FAQButton() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const currentPage = FAQjson.find((path) => path.path === location.pathname);
  const faqContent = currentPage ? currentPage.faq : "No FAQ available for this page.";

  return (
    <>
      <FixedIconButton color="primary" size="large" onClick={handleClickOpen}>
        <HelpOutlineIcon />
      </FixedIconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogTitle>FAQ</DialogTitle>
        <DialogContent>
          <Typography variant="body1" style={{ whiteSpace: "pre-wrap" }} gutterBottom>
            {faqContent}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleClose} fullWidth>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default FAQButton;
