import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useRef, useEffect, forwardRef } from "react";

const MessageBubble = styled(Box)(({ theme, isUser, isError }) => ({
  maxWidth: "60%",
  wordWrap: "break-word",
  backgroundColor: isError ? "#e77b7b" : isUser ? theme.palette.primary.main : theme.palette.background.paper,
  color: isError ? "#721c24" : isUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
  alignSelf: isError ? "center" : isUser ? "flex-end" : "flex-start",
  marginBottom: theme.spacing(1),
  padding: theme.spacing(1),
  borderRadius: 2,
}));

const Message = forwardRef(({ msg }, ref) => {
  const isUser = msg.role === "user";
  const isError = msg.role === "error";

  return (
    <MessageBubble ref={ref} isUser={isUser} isError={isError}>
      <Typography>{msg.content}</Typography>
    </MessageBubble>
  );
});

function ConversationArea({ conversation }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const initialBotMessage2 = {
    content: "Please note that you are interacting with an AI therapy bot designed to provide support and coping skills, not a human therapist.",
    role: "bot",
  };

  const initialBotMessage = {
    content:
      "Welcome to the MindfulMe: Your Companion for Mental Well-being AI Therapist. Our goal is to provide you with a secure and empathetic space to share your concerns. We specialize in guiding individuals through challenges such as stress, anxiety, depression, relationships, and personal growth. Please feel free to start the conversation whenever you're ready.",
    role: "bot",
  };

  return (
    <Box height="80%" display="flex" flexDirection="column" justifyContent="flex-end" alignItems="center" bgcolor="background.paper">
      <Box
        display="flex"
        flexDirection="column"
        borderRadius={4}
        p={2}
        width="100%"
        maxWidth="600px"
        minHeight="400px"
        maxHeight="100%"
        overflow="auto"
      >
        {[initialBotMessage, initialBotMessage2, ...conversation].map((msg, index) => (
          <Message key={index} msg={msg} ref={index === conversation.length ? messagesEndRef : null} />
        ))}
      </Box>
      <div ref={messagesEndRef} />
    </Box>
  );
}

export default ConversationArea;
