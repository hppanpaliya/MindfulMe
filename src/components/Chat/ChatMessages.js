import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { authSlice } from '../../store/features/auth/authSlice';
import firebase from '../../utils/firebase';
import { useSelector } from 'react-redux';
import './ChatMessages.css';

function ChatMessages() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [receiverDisplayName, setReceiverDisplayName] = useState('');
  const currentUser = useSelector((state) => state.auth.user);

  const { id } = useParams();

  useEffect(() => {
    const fetchReceiverDisplayName = async () => {
      const userRef = firebase.firestore().collection("users").doc(id);
      const userDoc = await userRef.get();

      if (userDoc.exists) {
        console.log(userDoc.data());
        setReceiverDisplayName(userDoc.data().username);
      }
    };

    fetchReceiverDisplayName();
  }, [id]);

  useEffect(() => {
    const fetchMessages = () => {
      const chatId = currentUser.uid > id ? `${currentUser.uid}-${id}` : `${id}-${currentUser.uid}`;
      const messagesRef = firebase.firestore().collection("chats").doc(chatId).collection("messages");
  
      const unsubscribe = messagesRef
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          const messagesData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            messageId: doc.id,
          }));
          setMessages(messagesData);
        });
  
      return unsubscribe;
    };
  
    return fetchMessages();
  }, [currentUser.uid, id]);
  
  const sendMessage = async (e) => {
    e.preventDefault();
    const chatId = currentUser.uid > id ? `${currentUser.uid}-${id}` : `${id}-${currentUser.uid}`;
    const messagesRef = firebase.firestore().collection("chats").doc(chatId).collection("messages");
  
    await messagesRef.add({
      sender: currentUser.uid,
      senderDisplayName: currentUser.displayName,
      receiver: id,
      text: messageText,
      timestamp: Date.now(),
    });
    setMessageText("");
  };
  
  return (
    <div className="chat-container">
      <h1 className="chat-title">Chat with {receiverDisplayName}</h1>
      <ul className="messages-list">
        {messages.map(message => (
          <li
            key={message.messageId}
            className={`message-item ${
              message.sender === currentUser.uid
                ? "sender-bubble"
                : "receiver-bubble"
            }`}
          >
            {message.text}
            <span
              className={`${
                message.sender === currentUser.uid
                  ? "sender-timestamp"
                  : "receiver-timestamp"
              }`}
            >
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage} className="form-container">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
          className="message-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );  
}

export default ChatMessages;
