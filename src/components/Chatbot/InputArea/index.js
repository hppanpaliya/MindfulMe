import { Box, TextField, Button } from "@mui/material";

function InputArea({ message, setMessage, sendMessage }) {
  return (
    <Box height="10%" display="flex" alignItems="center" p={1} justifyContent="center"  bgcolor="background.default">
      <Box display="flex" flexDirection="row" alignItems="center" width="100%" maxWidth="600px">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <Button variant="contained" onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default InputArea;
