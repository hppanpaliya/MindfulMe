import { useEffect, useState } from "react";
import firebase from "../../../utils/firebase";

const useFetchUsers = (currentUserUid, setLoading) => {
  // State for list of users, conversations, and filtered chats
  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [filterChat, setfilterChat] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      // Fetch all users from Firebase, except for the current user
      const usersData = await getUsersFromFirebase(currentUserUid);
      setUsers(usersData);

      // Create an array of conversations based on current user's UID and other users' UID
      const newConversations = createConversationsArray(
        usersData,
        currentUserUid
      );
      setConversations(newConversations);

      // Fetch chats/messages for each conversation and filter out empty ones
      const filteredChats = await getFilteredChats(newConversations);
      setfilterChat(filteredChats);

      // Update the loading state
      setLoading(false);
    };

    fetchUsers();
  }, [currentUserUid, setLoading]);

  return { users, conversations, filterChat };
};


// Function to fetch all users from Firebase, except for the current user
const getUsersFromFirebase = async (currentUserUid) => {
  const usersRef = firebase.firestore().collection("users");
  const snapshot = await usersRef.get();
  return snapshot.docs
    .filter((doc) => doc.id !== currentUserUid)
    .map((doc) => ({ ...doc.data(), uid: doc.id }));
};

// Function to create an array of conversations based on current user's UID and other users' UID
const createConversationsArray = (usersData, currentUserUid) => {
  return usersData.map((user) => {
    const otherUid = user.uid;
    const smallerUid = currentUserUid > otherUid ? currentUserUid : otherUid;
    const biggerUid = currentUserUid > otherUid ? otherUid : currentUserUid;
    // Concatenate UIDs in a specific order to create a unique conversation ID
    return `${smallerUid}-${biggerUid}`;
  });
};

// Function to fetch chats/messages for each conversation and filter out empty ones
const getFilteredChats = async (conversations) => {
  const chatsRef = firebase.firestore().collection("chats");
  const filteredChats = [];

  for (const conversation of conversations) {
    // Fetch the last message for each conversation
    const chatSnapshot = await chatsRef
      .doc(conversation)
      .collection("messages")
      .orderBy("timestamp", "desc") // Order by 'timestamp' field
      .limit(1) // Limit to the last message
      .get();

    // If there are messages, add conversation to filtered chats array
    if (!chatSnapshot.empty) {
      const lastMessage = chatSnapshot.docs.map((doc) => ({
        ...doc.data(),
        messageId: doc.id,
      }))[0]; // Get the first (and only) item from the array
      filteredChats.push({ id: conversation, lastMessage: lastMessage });
    }
  }

  return filteredChats;
};


export default useFetchUsers;
