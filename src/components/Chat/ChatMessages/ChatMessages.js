import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ChatMessages.css";
import useChatMessages from "./utils/useChatMessages";
import useReceiverDisplayName from "./utils/useReceiverDisplayName";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";

function ChatMessages() {
  const [messageText, setMessageText] = useState("");
  const currentUser = useSelector((state) => state.auth.user);

  const { id } = useParams();
  const { messages, sendMessage } = useChatMessages(currentUser.uid, id);
  const receiverDisplayName = useReceiverDisplayName(id);

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage(messageText);
    setMessageText("");
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">Chat with {receiverDisplayName}</h1>
      <MessageList messages={messages} currentUserUid={currentUser.uid} />
      <MessageForm
        messageText={messageText}
        setMessageText={setMessageText}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}
export default ChatMessages;
