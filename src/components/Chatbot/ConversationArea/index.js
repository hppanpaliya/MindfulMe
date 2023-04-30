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
        {conversation.map((msg, index) => (
          <Message key={index} msg={msg} ref={index === conversation.length - 1 ? messagesEndRef : null} />
        ))}
      </Box>
      <div ref={messagesEndRef} />
    </Box>
  );
}

export default ConversationArea;
