import React, { useEffect, useRef } from "react";
import { Box, List, ListItem, Typography } from "@mui/material";

const MessageList = ({ messages, currentUserUid }) => {
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Box sx={{ flexGrow: 1, overflowY: "auto", paddingTop: 3 }}>
      <List sx={{ padding: 0 }}>
        {messages.map((message, index) => (
          <ListItem
            key={message.messageId}
            sx={{
              borderRadius: "16px",
              p: 2,
              mb: 2,
              alignSelf:
                message.sender === currentUserUid ? "flex-end" : "flex-start",
              bgcolor:
                message.sender === currentUserUid ? "#E0E0E0" : "#2196f3",
              color: message.sender === currentUserUid ? "#47555c" : "#fff",
            }}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Typography variant="body1">{message.text}</Typography>
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.8rem",
                color: message.sender === currentUserUid
                  ? "rgba(0, 0, 0, 0.5)"
                  : "rgba(255, 255, 255, 0.8)",
                textAlign: "right",
                marginTop: 1,
              }}
            > &nbsp;&nbsp;
              {new Date(message.timestamp).toLocaleTimeString()}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MessageList;
