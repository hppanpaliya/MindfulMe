import React, { Fragment, useEffect, useRef } from "react";
import { Box, List, ListItem, Typography } from "@mui/material";
import { styled } from "@mui/system";

const MessageBubble = styled(Box)(({ theme, iscurrentuser }) => ({
  display: "inline-flex",
  flexDirection: "column",
  borderRadius: 16,
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
  alignSelf: iscurrentuser ? "flex-end" : "flex-start",
  backgroundColor: iscurrentuser ? theme.palette.primary.main : theme.palette.background.box,
  color: iscurrentuser ? theme.palette.primary.contrastText : theme.palette.text.primary,
  borderBottomRightRadius: iscurrentuser ? 0 : 16,
  borderBottomLeftRadius: iscurrentuser ? 16 : 0,
  position: "relative",
  margin: theme.spacing(1, 1, 1, 1),
}));

const TimestampTypography = styled(Typography)(({ theme, iscurrentuser }) => ({
  position: "relative",
  bottom: 0,
  right: 0,
  fontSize: "0.8rem",
  color: iscurrentuser ? theme.palette.primary.contrastText : theme.palette.text.secondary,
  opacity: iscurrentuser ? 0.8 : 0.5,
  textAlign: "right",
}));

const DateSeparator = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(1, 0),
  color: theme.palette.text.secondary,
  opacity: 0.5,
}));

const MessageList = ({ messages, currentUserUid }) => {
  const lastMessageRef = useRef(null);
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (isMountedRef.current && lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView();
      }

      setTimeout(() => {
        isMountedRef.current = true;
      }, 1000);
    }
  }, [messages]);

  const isNewDay = (prevTimestamp, currentTimestamp) => {
    const prevDate = new Date(prevTimestamp);
    const currentDate = new Date(currentTimestamp);

    return (
      prevDate.getDate() !== currentDate.getDate() ||
      prevDate.getMonth() !== currentDate.getMonth() ||
      prevDate.getFullYear() !== currentDate.getFullYear()
    );
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: "auto",
        paddingTop: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <List sx={{ padding: 0, display: "flex", flexDirection: "column" }}>
        {messages.map((message, index) => {
          const isCurrentUser = message.sender === currentUserUid;
          const showDate = index === 0 || isNewDay(messages[index - 1].timestamp, message.timestamp);

          return (
            <Fragment key={message.messageId}>
              {showDate && <DateSeparator>{new Date(message.timestamp).toLocaleDateString()}</DateSeparator>}
              <MessageBubble key={message.messageId} iscurrentuser={isCurrentUser} ref={index === messages.length - 1 ? lastMessageRef : null}>
                <Box sx={{ marginBottom: "0.4rem" }}>
                  <Typography
                    variant="body1"
                    sx={{
                      wordWrap: "break-word",
                      maxWidth: "100%",
                    }}
                  >
                    {message.text}
                  </Typography>
                </Box>
                <TimestampTypography variant="caption" iscurrentuser={isCurrentUser}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </TimestampTypography>
              </MessageBubble>
            </Fragment>
          );
        })}
      </List>
    </Box>
  );
};

export default MessageList;
