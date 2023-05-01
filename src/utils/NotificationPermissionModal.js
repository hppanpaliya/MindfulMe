import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import firebase from "../utils/firebase";
import { Modal, Box, Typography, Button } from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";
import lightTheme from "../theme";
import darkTheme from "../theme/darkTheme";

const NotificationPermissionModal = () => {
  const user = useSelector((state) => state.auth.user);
  const [open, setOpen] = useState(false);
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  //const [token, setToken] = useState(null);
  const [remindLater, setRemindLater] = useState(false);

  // Save the token to Firestore
  async function saveTokenToFirestore(token) {
    try {
      const userId = user.uid;
      const userRef = firebase.firestore().collection("users").doc(userId);
      await userRef.update({
        notificationToken: token,
        pushNotifications: true,
      });
      //setToken(token);
      console.log("Token saved to Firestore.");
    } catch (error) {
      console.error("Error saving token to Firestore:", error);
      cleanupTokenAndPermissions(token);
    }
  }

  // Clean up the token and revoke notification permissions
  function cleanupTokenAndPermissions(token) {
    const messaging = firebase.messaging();
    messaging
      .deleteToken(token)
      .then(() => {
        console.log("Token deleted.");
      })
      .catch((error) => {
        console.error("Error deleting token:", error);
      });

    // Revoke notification permissions if supported by the browser
    if (typeof Notification.revoke === "function") {
      Notification.revoke()
        .then(() => {
          console.log("Notification permissions revoked.");
        })
        .catch((error) => {
          console.error("Error revoking notification permissions:", error);
        });
    } else {
      console.warn("Notification permissions cannot be revoked programmatically.");
    }
  }

  // Get the timestamp for the reminder
  async function getReminderTimestamp() {
    const userRef = firebase.firestore().collection("users").doc(user.uid);
    const doc = await userRef.get();
    return doc.exists && doc.data().hasOwnProperty("remindNotification") ? doc.data().remindNotification.toDate() : null;
  }

  function savePermissionStatus(status) {
    sessionStorage.setItem("notificationPermission", status);
  }

  // Check notification permissions and reminder timestamp
  useEffect(() => {
    // Check if the user has granted notification permissions
    const permission = sessionStorage.getItem("notificationPermission");
    if (permission !== "denied" && permission !== "granted") {
      const checkPermissionAndTimestamp = async () => {
        if (user) {
          const remindTimestamp = await getReminderTimestamp();

          if (!remindTimestamp || new Date() > remindTimestamp) {
            setOpen(true);
            const timer = setTimeout(() => {
              setOpen(false);
              console.warn("Notification permission not granted.");
            }, 15000);
            return () => clearTimeout(timer);
          }
        } else {
          setOpen(false);
        }
      };

      checkPermissionAndTimestamp();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Handle "Allow" button click
  const handleAllowClick = async () => {
    setOpen(false);
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const messaging = firebase.messaging();
      const token = await messaging.getToken({
        vapidKey: "BLJxHQPsdXGM_1xpsoA2xq6pgChoPBSGjIzzrwbGHlkV7R-R7k6dBAVDP6JdjgjhdXOETcQnJpHwY3cFx7-mW8o",
      });
      savePermissionStatus("granted");
      saveTokenToFirestore(token);
      console.log(token);
    } else {
      console.warn("Notification permission not granted.");
    }
  };

  // Handle "Decline" button click
  const handleDeclineClick = () => {
    setOpen(false);
    console.warn("Notification permission not granted.");
    savePermissionStatus("denied");

    if (remindLater) {
      const remindTimestamp = new Date();
      remindTimestamp.setDate(remindTimestamp.getDate() + 15);

      const usersRef = firebase.firestore().collection("users");
      usersRef
        .doc(user.uid)
        .set({ remindNotification: remindTimestamp }, { merge: true })
        .then(() => {
          console.log("Remind timestamp saved to Firestore.");
        })
        .catch((error) => {
          console.error("Error saving remind timestamp to Firestore:", error);
        });
    }
  };

  return (
    <Modal open={open}>
      <Box
        sx={{
          p: 2,
          borderRadius: 4,
          maxWidth: 400,
          backgroundColor: darkMode ? darkTheme.palette.background.paper : lightTheme.palette.background.paper,
          color: darkMode ? darkTheme.palette.text.primary : lightTheme.palette.text.primary,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Enable Notifications
        </Typography>
        <Typography variant="body1" gutterBottom>
          We would like to send you notifications when you receive new messages or updates. To enable notifications, please click the Allow button
          below.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="outlined" color="error" sx={{ mr: 2 }} onClick={handleDeclineClick}>
            Decline
          </Button>
          <Button variant="contained" color="success" onClick={handleAllowClick}>
            Allow
          </Button>
        </Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={remindLater}
              onChange={(e) => setRemindLater(e.target.checked)}
              name="remindLater"
              sx={{
                "&.Mui-checked": {
                  color: "green",
                },
              }}
            />
          }
          label="Remind me after 15 days"
        />
      </Box>
    </Modal>
  );
};

export default NotificationPermissionModal;
