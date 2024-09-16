import React from 'react';
import './ChatSidebar.css';

const contacts = [
  { name: 'Rahul Sarkar', message: 'You: Facebook call', time: '2y' },
  { name: 'Easha Chandhok', message: 'You and Easha Chandhok are c...', time: '3y' },
  { name: 'Shivam Aggarwal', message: 'You and Shivam Aggarwal are c...', time: '3y' },
  { name: 'Rhea Sharma', message: 'You and Rhea Sharma are celeb...', time: '3y' },
  { name: 'Prithvi Kumar', message: 'You celebrated a friendversary', time: '3y' },
  { name: 'Sharnith A Natarajan', message: 'You and Sharnith A Natarajan...', time: '3y' },
  { name: 'Lenovo India', message: 'Thanks for answering our quest...', time: '3y' },
];

const ChatSidebar = () => {
  return (
    <div className="chat-sidebar">
      <h2>Chats</h2>
      <input type="text" placeholder="Search Messenger" className="search-input" />
      <ul className="contacts-list">
        {contacts.map((contact, index) => (
          <li key={index} className="contact-item">
            <div className="contact-avatar"></div>
            <div className="contact-info">
              <h3>{contact.name}</h3>
              <p>{contact.message}</p>
              <span>{contact.time}</span>
            </div>
          </li>
        ))}
      </ul>
      <a href="https://www.google.com/" className="see-all">See all in Messenger</a>
    </div>
  );
};

export default ChatSidebar;
