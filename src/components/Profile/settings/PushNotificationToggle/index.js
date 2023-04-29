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

const PushNotificationToggle = () => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      usersRef
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setPushNotifications(doc.data().pushNotifications);
          }
          setLoading(false);
        });
    }
  }, [user]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    const newPushNotifications = !pushNotifications;
    setPushNotifications(newPushNotifications);
    usersRef.doc(user.uid).update({ pushNotifications: newPushNotifications });

    if (!newPushNotifications) {
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
      <FormControlLabel control={<Switch checked={pushNotifications} onChange={handleToggle} color="primary" />} label="Push Notifications" />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Push Notifications</DialogTitle>
        <DialogContent>
          <DialogContentText>Push notifications have been turned off for this account.</DialogContentText>
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

export default PushNotificationToggle;
