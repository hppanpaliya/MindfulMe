import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Switch,
  FormControlLabel,
  Button,
  CircularProgress,
} from "@mui/material";
import firebase from "../../../../utils/firebase";
import { useSelector } from "react-redux";

const usersRef = firebase.firestore().collection("users");

const EmailNotificationToggle = () => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      usersRef
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setEmailNotifications(doc.data().emailNotifications);
          }
          setLoading(false);
        });
    }
  }, [user]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    const newEmailNotifications = !emailNotifications;
    setEmailNotifications(newEmailNotifications);
    usersRef.doc(user.uid).update({ emailNotifications: newEmailNotifications });

    if (!newEmailNotifications) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <FormControlLabel control={<Switch checked={emailNotifications} onChange={handleToggle} color="primary" />} label="Email Notifications" />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Email Notifications</DialogTitle>
        <DialogContent>
          <DialogContentText>Email notifications have been turned off for this account.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmailNotificationToggle;
