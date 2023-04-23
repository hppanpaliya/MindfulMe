import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import app from "../../../utils/firebase";
import { Button, TextField, InputAdornment } from "@mui/material";

import "./Chats.css";

const Chats = ({ groupId }) => {
  const user = useSelector((state) => state.auth.user);

  const [chatText, setChatText] = useState("");
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const chatsRef = app
      .firestore()
      .collection("groups")
      .doc(groupId)
      .collection("chats")
      .orderBy("timestamp", "asc");
    const unsubscribe = chatsRef.onSnapshot((snapshot) => {
      const chats = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chats);
    });
    return unsubscribe;
  }, [groupId]);

  const handleChatTextChange = (event) => {
    setChatText(event.target.value);
  };

  const handleChatSubmit = async (event) => {
    event.preventDefault();

    if (chatText.trim() === "") return;

    try {
      const chatData = {
        text: chatText.trim(),
        userId: user.uid,
        displayName: user.displayName,
        timestamp: new Date(),
      };

      const groupRef = app.firestore().collection("groups").doc(groupId);
      await groupRef.collection("chats").add(chatData);

      setChatText("");
    } catch (error) {
      console.error(error);
    }
  };

  const getMessageClassName = (chat) => {
    if (chat.isFlagged) {
      return chat.userId === user.uid ? "sent flagged" : "received flagged";
    } else {
      return chat.userId === user.uid ? "sent" : "received";
    }
  };

  return (
    <div className="chats-container" style={{ height: "calc(100vh - 64px)" }}>
      <div className="chats-list">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-message ${getMessageClassName(chat)}`}
          >
            <p className="chat-text">
              {chat.isFlagged ? "Message flagged" : chat.text}
            </p>
            <p className="chat-meta">
              {chat.timestamp
                ? chat.timestamp.toDate().toLocaleString()
                : null}{" "}
              - {chat.userId === user.uid ? "You" : chat.displayName}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleChatSubmit}>
        <div className="chat-input-container">
          <TextField
            className="chat-input"
            placeholder="Type a message..."
            value={chatText}
            onChange={handleChatTextChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    type="submit"
                    className="chat-send-button"
                    size="large"
                  >
                    Send
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default Chats;
