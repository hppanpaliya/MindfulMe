import { useEffect, useState } from "react";
import firebase from "../../../../utils/firebase";

// Custom hook for managing chat messages and sending new messages
const useChatMessages = (currentUserUid, receiverUid) => {
  // Set up local state for chat messages
  const [messages, setMessages] = useState([]);

  // Subscribe to messages collection for this chat and update state
  useEffect(() => {
    const fetchMessages = () => {
      // Calculate chat ID based on UIDs of current user and receiver
      const chatId =
        currentUserUid > receiverUid
          ? `${currentUserUid}-${receiverUid}`
          : `${receiverUid}-${currentUserUid}`;

      // Subscribe to messages collection and update state on changes
      const messagesRef = firebase
        .firestore()
        .collection("chats")
        .doc(chatId)
        .collection("messages");

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

    // Call fetchMessages function to subscribe to messages collection
    return fetchMessages();
  }, [currentUserUid, receiverUid]);

  // Function for sending a new message
  const sendMessage = async (messageText) => {
    // Calculate chat ID based on UIDs of current user and receiver
    const chatId =
      currentUserUid > receiverUid
        ? `${currentUserUid}-${receiverUid}`
        : `${receiverUid}-${currentUserUid}`;

    // Reference messages collection for this chat and add new message
    const messagesRef = firebase
      .firestore()
      .collection("chats")
      .doc(chatId)
      .collection("messages");

    // Get current user's display name
    const currentUser = await getCurrentUser(currentUserUid);

    // Add new message to messages collection
    await messagesRef.add({
      sender: currentUserUid,
      senderDisplayName: currentUser.username,
      receiver: receiverUid,
      text: messageText,
      timestamp: Date.now(),
    });
  };

  // Function for getting current user's display name from Firestore
  const getCurrentUser = async (currentUserUid) => {
    const userRef = firebase
      .firestore()
      .collection("users")
      .doc(currentUserUid);
    const userDoc = await userRef.get();
    return userDoc.data();
  };

  // Return chat messages and sendMessage function
  return { messages, sendMessage };
};

export default useChatMessages;
