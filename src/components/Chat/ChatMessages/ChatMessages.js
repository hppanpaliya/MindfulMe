import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ChatMessages.css";
import useChatMessages from "./utils/useChatMessages";
import useReceiverDisplayName from "./utils/useReceiverDisplayName";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";

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
    <div className="chat-container">
      {/* Display receiver display name in chat title */}
      <h1 className="chat-title">Chat with {receiverDisplayName}</h1>

      {/* Display list of messages */}
      <MessageList messages={messages} currentUserUid={currentUser.uid} />

      {/* Display form for sending messages */}
      <MessageForm
        messageText={messageText}
        setMessageText={setMessageText}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}

// Export ChatMessages component as default
export default ChatMessages;
