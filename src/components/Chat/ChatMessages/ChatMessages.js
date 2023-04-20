import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ChatMessages.css";
import useChatMessages from "./utils/useChatMessages";
import useReceiverDisplayName from "./utils/useReceiverDisplayName";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
import { Container, Typography } from "@mui/material";

function ChatMessages() {
    // Set up local state for message text
    const [messageText, setMessageText] = useState("");

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
        <Container className="chat-container" maxWidth="600px">
            {/* Display receiver display name in chat title */}
            <Typography
                variant="h4"
                fontWeight="bold"
                className="chat-title"
                align="center"
            >
                Chat with {receiverDisplayName}
            </Typography>

            {/* Display list of messages */}
            <MessageList messages={messages} currentUserUid={currentUser.uid} />

            {/* Display form for sending messages */}
            <MessageForm
                messageText={messageText}
                setMessageText={setMessageText}
                handleSendMessage={handleSendMessage}
            />
        </Container>
    );
}

// Export ChatMessages component as default
export default ChatMessages;
