import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, TextField, IconButton, List, ListItem, ListItemText, Divider } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import app from "../../utils/firebase";

const Chats = ({ groupId }) => {
  const user = useSelector((state) => state.auth.user);
  const [chatText, setChatText] = useState("");
  const [chats, setChats] = useState([]);
  console.log("user", user);
  useEffect(() => {
    const unsubscribe = app
      .firestore()
      .collection("groups")
      .doc(groupId)
      .collection("chats")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
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
    if (chatText.trim() === "") {
      return;
    }
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

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box flexGrow={1} overflow="auto">
        <List>
          {chats.map((chat) => (
            <React.Fragment key={chat.id}>
              <ListItem>
                <ListItemText
                  primary={`${chat.text}`}
                  secondary={`${chat.timestamp ? chat.timestamp.toDate().toLocaleString() : null} - ${
                    chat.userId === user.uid ? "You" : chat.displayName
                  }`}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Box>
      <form onSubmit={handleChatSubmit}>
        <Box display="flex" alignItems="center" mt={1}>
          <TextField variant="outlined" fullWidth placeholder="Type a message..." value={chatText} onChange={handleChatTextChange} />
          <IconButton type="submit">
            <SendIcon />
          </IconButton>
        </Box>
      </form>
    </Box>
  );
};

export default Chats;
