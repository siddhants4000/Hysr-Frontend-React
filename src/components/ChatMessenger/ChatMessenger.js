import React from 'react';

import '../ChatMessenger/ChatMessenger.css';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';

const ChatApp = () => {
  return (
    <div className="chat-app">
      <ChatSidebar />
      <ChatWindow />
    </div>
  );
};

export default ChatApp;
