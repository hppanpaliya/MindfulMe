const MessageForm = ({ messageText, setMessageText, handleSendMessage }) => (
    <form onSubmit={handleSendMessage} className="form-container">
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
);
  
export default MessageForm;