// This component renders a list of chat messages
// The props are `messages` array which contains the messages to be displayed and `currentUserUid` which is the current user's uid
const MessageList = ({ messages, currentUserUid }) => (
  <ul className="messages-list">
    {messages.map((message) => (
      <li
        key={message.messageId}
        // the class name of the list item changes depending on whether the message sender is the current user or not
        className={`message-item ${
          message.sender === currentUserUid
            ? "sender-bubble"
            : "receiver-bubble"
        }`}
      >
        {message.text}
        <span
          // the class name of the timestamp span changes depending on whether the message sender is the current user or not
          className={`${
            message.sender === currentUserUid
              ? "sender-timestamp"
              : "receiver-timestamp"
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </li>
    ))}
  </ul>
);

export default MessageList;
