/**
 * A functional component that renders a message input form.
 * @param {string} messageText - The current value of the message input.
 * @param {function} setMessageText - A function to update the message input.
 * @param {function} handleSendMessage - A function to handle sending the message when the form is submitted.
 * @returns {JSX.Element} - The message input form.
 */
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
