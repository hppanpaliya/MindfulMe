import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import app from "../../../utils/firebase";
import "./Chats.css";
import axios from "axios";
import { Button, TextField, InputAdornment } from "@mui/material";

const Chats = ({ groupId }) => {
    // Get the user object from the Redux store
    const user = useSelector((state) => state.auth.user);

    // Define state variables for the chat text and messages
    const [chatText, setChatText] = useState("");
    const [chats, setChats] = useState([]);

    // Subscribe to updates to the messages collection in Firestore
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

    // Handle changes to the chat text input
    const handleChatTextChange = (event) => {
        setChatText(event.target.value);
    };

    // Handle submission of a chat message
    const handleChatSubmit = async (event) => {
        event.preventDefault();

        // Check if chat text is empty
        if (chatText.trim() === "") return;

        try {
            // Create a chat message object with the user's ID, display name, and timestamp
            const chatData = {
                text: chatText.trim(),
                userId: user.uid,
                displayName: user.displayName,
                timestamp: new Date(),
            };

            // Add the chat message to Firestore
            const groupRef = app.firestore().collection("groups").doc(groupId);
            await groupRef.collection("chats").add(chatData);

            // Clear the chat text input
            setChatText("");
        } catch (error) {
            console.error(error);
        }
    };

    // Determine the CSS class for a chat message based on its properties
    const getMessageClassName = (chat) => {
        if (chat.isFlagged) {
            return chat.userId === user.uid
                ? "sent flagged"
                : "received flagged";
        } else {
            return chat.userId === user.uid ? "sent" : "received";
        }
    };

    // Render the chat messages and input form
    return (
        <div className="chats-container">
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
                            -{" "}
                            {chat.userId === user.uid
                                ? "You"
                                : chat.displayName}
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
