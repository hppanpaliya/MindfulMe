import { Box, TextField, Button, InputAdornment } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function InputArea({ message, setMessage, sendMessage }) {
  const theme = useTheme();
  return (
    <Box
      height="10%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding="2px"
      sx={{ backgroundColor: theme.palette.background.paper }}
    >
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button type="submit" variant="contained" onClick={sendMessage} size="large">
                  Send
                </Button>
              </InputAdornment>
            ),
          }}
        ></TextField>
      </Box>
    </Box>
  );
}

export default InputArea;
