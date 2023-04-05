import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import firebase from "../utils/firebase";
import { Modal, Box, Typography, Button } from "@mui/material";

const NotificationPermissionModal = () => {
  const user = useSelector((state) => state.auth.user);
    const [open, setOpen] = useState(false);
    const [token, setToken] = useState(null);

  async function saveTokenToFirestore(token) {
    try {
      const userId = user.uid;
      const userRef = firebase.firestore().collection("users").doc(userId);
      await userRef.update({
        notificationToken: token,
      });
      setToken(token);
      console.log("Token saved to Firestore.");
    } catch (error) {
      console.error("Error saving token to Firestore:", error);
      cleanupTokenAndPermissions(token);
    }
  }
  
  function cleanupTokenAndPermissions(token) {
    
    const messaging = firebase.messaging();
    messaging.deleteToken(token).then(() => {
      console.log("Token deleted.");
    }).catch((error) => {
      console.error("Error deleting token:", error);
    });
  
    // Note: Revoking notification permissions is not supported by all browsers.
    if (typeof Notification.revoke === "function") {
      Notification.revoke().then(() => {
        console.log("Notification permissions revoked.");
      }).catch((error) => {
        console.error("Error revoking notification permissions:", error);
      });
    } else {
      console.warn("Notification permissions cannot be revoked programmatically.");
    }
  }
  
  

    useEffect(() => {
    if (user && Notification.permission !== "granted") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [user]);

  const handleAllowClick = async () => {
    setOpen(false);
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const messaging = firebase.messaging();
      const token = await messaging.getToken({
        vapidKey:
          "BLJxHQPsdXGM_1xpsoA2xq6pgChoPBSGjIzzrwbGHlkV7R-R7k6dBAVDP6JdjgjhdXOETcQnJpHwY3cFx7-mW8o",
      });
      saveTokenToFirestore(token);
      console.log(token);
    } else {
      console.warn("Notification permission not granted.");
    }
  };

  const handleDeclineClick = () => {
    setOpen(false);
    console.warn("Notification permission not granted.");
  };

  return (
    <Modal open={open}>
      <Box sx={{ p: 2, backgroundColor: "white", borderRadius: 4, maxWidth: 400 }}>
        <Typography variant="h5" gutterBottom>
          Enable Notifications
        </Typography>
        <Typography variant="body1" gutterBottom>
          We would like to send you notifications when you receive new messages or updates. To enable
          notifications, please click the Allow button below.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="outlined" color="error" sx={{ mr: 2 }} onClick={handleDeclineClick}>
            Decline
          </Button>
          <Button variant="contained" color="success" onClick={handleAllowClick}>
            Allow
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NotificationPermissionModal;
