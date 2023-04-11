
const MessageList = ({ messages, currentUserUid }) => (
    <ul className="messages-list">
      {messages.map((message) => (
        <li
          key={message.messageId}
          className={`message-item ${
            message.sender === currentUserUid
              ? "sender-bubble"
              : "receiver-bubble"
          }`}
        >
          {message.text}
          <span
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
  