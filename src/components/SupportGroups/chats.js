import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import app from "../../utils/firebase";
import "./Chats.css";
import axios from "axios";

const Chats = ({ groupId }) => {
  const user = useSelector((state) => state.auth.user);
  const [chatText, setChatText] = useState("");
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const chatsRef = app.firestore().collection("groups").doc(groupId).collection("chats").orderBy("timestamp", "asc");
    const unsubscribe = chatsRef.onSnapshot((snapshot) => {
      const chats = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
      
      let isChatFlagged = await axios.post("https://www.harshal.codes:8443/moderate", {
        message: chatText,
        userId: user.uid,
      });
      isChatFlagged = isChatFlagged.data.flagged;
      console.log(isChatFlagged);
      if (isChatFlagged) {
        alert("Your message has been flagged for moderation.");
        setChatText("");
      }
      else {
        const groupRef = app.firestore().collection("groups").doc(groupId);
        await groupRef.collection("chats").add(chatData);
        setChatText("");
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chats-container">
      <div className="chats-list">
        {chats.map((chat) => (
          <div key={chat.id} className={`chat-message ${chat.userId === user.uid ? "sent" : "received"}`}>
            <p className="chat-text">{chat.text}</p>
            <p className="chat-meta">
              {chat.timestamp ? chat.timestamp.toDate().toLocaleString() : null} - {chat.userId === user.uid ? "You" : chat.displayName}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleChatSubmit}>
        <div className="chat-input-container">
          <input type="text" className="chat-input" placeholder="Type a message..." value={chatText} onChange={handleChatTextChange} />
          <button type="submit" className="chat-send-button">Send</button>
        </div>
      </form>
    </div>
  );
};

export default Chats;
