import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import app from "../../../utils/firebase";
import { Button, TextField, InputAdornment } from "@mui/material";
import styled from "@emotion/styled";

const Container = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

const ChatList = styled.div(({ theme }) => ({
  flexGrow: 1,
  padding: "10px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const ChatMessage = styled.div(({ theme, sent }) => ({
  margin: "10px",
  padding: "10px",
  borderRadius: "16px",
  alignSelf: sent ? "flex-end" : "flex-start",
  backgroundColor: sent ? theme.palette.primary.main : theme.palette.background.box,
  "&.flagged": {
    backgroundColor: sent ? theme.palette.error.light : theme.palette.error.dark,
  },
  color: sent ? theme.palette.primary.contrastText : theme.palette.text.primary,
  width: "fit-content",
  borderBottomRightRadius: sent ? 0 : "16px",
  borderBottomLeftRadius: sent ? "16px" : 0,
}));

const ChatText = styled.p(({ theme }) => ({
  margin: 0,
}));

const ChatMeta = styled.p(({ theme }) => ({
  fontSize: "12px",

  marginTop: "5px",
}));

const ChatInputContainer = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "10px",
  borderTop: "1px solid #ccc",
}));

const ChatInput = styled(TextField)(({ theme }) => ({
  flexGrow: 1,
  padding: "10px",
  fontSize: "1rem",
  border: "1px solid #ccc",
  borderRadius: "5px",
  marginRight: "10px",
}));

const Chats = ({ groupId }) => {
  const user = useSelector((state) => state.auth.user);

  const [chatText, setChatText] = useState("");
  const [chats, setChats] = useState([]);
  const lastMessageRef = useRef(null);
  const isMountedRef = useRef(false);

  useEffect(() => {
    const chatsRef = app.firestore().collection("groups").doc(groupId).collection("chats").orderBy("timestamp", "asc");
    const unsubscribe = chatsRef.onSnapshot((snapshot) => {
      const chats = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chats);
    });
    return unsubscribe;
  }, [groupId]);

  useEffect(() => {
    if (isMountedRef.current && lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView();
      }
      setTimeout(() => {
        isMountedRef.current = true;
      }, 1000);
    }
  }, [chats]);

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
    let className = chat.isFlagged ? "flagged" : "";
    className += chat.userId === user.uid ? " sent" : " received";
    return className.trim();
  };

  return (
    <Container style={{ height: window.innerHeight - 64 }}>
      <ChatList>
        {chats.map((chat, index) => (
          <ChatMessage
            key={chat.id}
            className={getMessageClassName(chat)}
            sent={chat.userId === user.uid}
            ref={index === chats.length - 1 ? lastMessageRef : null}
          >
            <ChatText>{chat.isFlagged ? "Message flagged" : chat.text}</ChatText>
            <ChatMeta>
              {chat.timestamp ? chat.timestamp.toDate().toLocaleString() : null} - {chat.userId === user.uid ? "You" : chat.displayName}
            </ChatMeta>
          </ChatMessage>
        ))}
      </ChatList>
      <form onSubmit={handleChatSubmit}>
        <ChatInputContainer>
          <ChatInput
            placeholder="Type a message..."
            value={chatText}
            onChange={handleChatTextChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button variant="contained" type="submit" className="chat-send-button" size="large">
                    Send
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </ChatInputContainer>
      </form>
    </Container>
  );
};

export default Chats;
