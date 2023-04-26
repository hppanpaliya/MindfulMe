import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ChatMessages.css";
import useChatMessages from "./utils/useChatMessages";
import useReceiverDisplayName from "./utils/useReceiverDisplayName";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

function ChatMessages() {
  // Set up local state for message text
  const [messageText, setMessageText] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  var listHeight = window.innerHeight - 64;
  var chatHeight = window.innerHeight - 64 - 64;
  if (isMobile) {
    listHeight = listHeight - 14;
    chatHeight = chatHeight - 14;
  } else {
    listHeight = listHeight - 24;
    chatHeight = chatHeight - 24;
  }

  // Get current user from Redux store
  const currentUser = useSelector((state) => state.auth.user);

  // Get chat ID from URL parameter
  const { id } = useParams();

  // Get messages and sendMessage function using custom hook
  const { messages, sendMessage } = useChatMessages(currentUser.uid, id);

  // Get display name of receiver using custom hook
  const receiverDisplayName = useReceiverDisplayName(id);

  // Handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage(messageText);
    setMessageText("");
  };

  // Render chat interface
  return (
    <Container className="chat-container" maxWidth="600px" maxHeight={listHeight} minHeight={listHeight}>
      {/* Display receiver display name in chat title */}
      <Typography fontWeight="bold" sx={{ textAlign: "center" }}>
        {receiverDisplayName}
      </Typography>
      <Grid container direction="column" maxHeight={chatHeight} minHeight={chatHeight}>
        <MessageList messages={messages} currentUserUid={currentUser.uid} />
      </Grid>
      {/* Display form for sending messages */}
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <MessageForm
          messageText={messageText}
          setMessageText={setMessageText}
          handleSendMessage={handleSendMessage}
          receiverDisplayName={receiverDisplayName}
        />
      </Box>
    </Container>
  );
}

// Export ChatMessages component as default
export default ChatMessages;
