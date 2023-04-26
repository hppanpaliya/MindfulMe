import { Box, Typography } from "@mui/material";
import "./ConversationArea.css";
import { useRef, useEffect, forwardRef } from "react";

const Message = forwardRef(({ msg }, ref) => {
  const isUser = msg.role === "user";
  const isError = msg.role === "error";

  return (
    <Box
      ref={ref}
      className={`message-bubble ${
        isError ? "message-error" : isUser ? "message-user" : "message-assistant"
      }`}
      alignSelf={isError ? "center" : isUser ? "flex-end" : "flex-start"}
      mb={1}
      p={1}
      borderRadius={2}
    >
      <Typography>{msg.content}</Typography>
    </Box>
  );
});

function ConversationArea({ conversation }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  return (
    <Box
      height="80%"
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      alignItems="center"
      bgcolor="background.paper"
    >
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
          <Message
            key={index}
            msg={msg}
            ref={index === conversation.length - 1 ? messagesEndRef : null}
          />
        ))}
      </Box>
    </Box>
  );
}

export default ConversationArea;
