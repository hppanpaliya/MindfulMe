/**
 * A functional component that renders a message input form.
 * @param {string} messageText - The current value of the message input.
 * @param {function} setMessageText - A function to update the message input.
 * @param {function} handleSendMessage - A function to handle sending the message when the form is submitted.
 * @returns {JSX.Element} - The message input form.
 */

import React from "react";
import { Button, InputAdornment, TextField } from "@mui/material";

const MessageForm = ({ messageText, setMessageText, handleSendMessage, receiverDisplayName }) => (
  <form onSubmit={handleSendMessage} className="form-container">
    <TextField
      value={messageText}
      onChange={(e) => setMessageText(e.target.value)}
      placeholder={`Message ${receiverDisplayName}...`}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button type="submit" variant="contained" size="large">
              Send
            </Button>
          </InputAdornment>
        ),
      }}
    />
  </form>
);

export default MessageForm;
