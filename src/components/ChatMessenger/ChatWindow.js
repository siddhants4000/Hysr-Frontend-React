import React from 'react';
import './ChatWindow.css';

const messages = [
  { text: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!', sender: 'them' },
  { text: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.', sender: 'them' },
  { text: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!', sender: 'me' },
  { text: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.', sender: 'me' },
];

const ChatWindow = () => {
  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>Conversation Title</h2>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message-bubble ${message.sender}`}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input type="text" placeholder="Type a message, @name" className="input" />
        <button className="send-button">Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
