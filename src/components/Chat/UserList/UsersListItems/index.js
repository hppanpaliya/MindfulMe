import * as React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";

const UsersList = styled(Box)(({ theme }) => ({
  width: "100%",
  ".user-link": {
    textDecoration: "none",
  },
  ".user-avatar": {
    color: "#fff",

    fontWeight: "bold",
    fontSize: "18px",
    width: "36px",
    height: "36px",
    marginRight: "16px",
  },
  ".list-item": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "8px",
    borderBottom: "1px solid #eee",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));
  

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const UsersListItems = ({ users }) => (
  <UsersList component="div">
    {users.map((user) => (
      <motion.div key={user.uid} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link to={`/chat/${user.uid}`} className="user-link">
          <ListItem disablePadding className="list-item">
            <ListItemAvatar>
              <Avatar className="user-avatar">{user.username.charAt(0).toUpperCase()}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="subtitle1" component="div">
                  {user.username}
                </Typography>
              }
              secondary={
                <Typography variant="body2" component="div" sx={{ color: "text.secondary" }}>
                  {user.lastMessage
                    ? user.lastMessage.text.length > 30
                      ? `${user.lastMessage.text.substring(0, 30)}...`
                      : user.lastMessage.text
                    : "No messages yet"}
                </Typography>
              }
            />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {user.lastMessage && formatDate(user.lastMessage.timestamp)}
            </Typography>
          </ListItem>
        </Link>
      </motion.div>
    ))}
  </UsersList>
);

export default UsersListItems;
