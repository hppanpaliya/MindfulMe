import { useEffect, useState } from "react";
import firebase from "../../../../utils/firebase";

const useChatMessages = (currentUserUid, receiverUid) => {
    const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fetchMessages = () => {
      const chatId =
        currentUserUid > receiverUid
          ? `${currentUserUid}-${receiverUid}`
          : `${receiverUid}-${currentUserUid}`;
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

    return fetchMessages();
  }, [currentUserUid, receiverUid]);

    const sendMessage = async (messageText) => {
    const chatId =
      currentUserUid > receiverUid
        ? `${currentUserUid}-${receiverUid}`
        : `${receiverUid}-${currentUserUid}`;
    const messagesRef = firebase
      .firestore()
      .collection("chats")
      .doc(chatId)
      .collection("messages");

    const currentUser = await getCurrentUser(currentUserUid);

    await messagesRef.add({
      sender: currentUserUid,
      senderDisplayName: currentUser.username,
      receiver: receiverUid,
      text: messageText,
      timestamp: Date.now(),
    });
  };

  return { messages, sendMessage };
};

const getCurrentUser = async (currentUserUid) => {
  const userRef = firebase.firestore().collection("users").doc(currentUserUid);
  const userDoc = await userRef.get();
  return userDoc.data();
};

export default useChatMessages;
