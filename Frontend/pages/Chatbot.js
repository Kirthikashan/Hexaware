import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Chatbot.module.css'; // Import CSS Module
import { useNavigate } from 'react-router-dom';

const Chatbot = () => {
  const [chatSessions, setChatSessions] = useState(() => {
    const savedSessions = localStorage.getItem('chatSessions');
    return savedSessions ? JSON.parse(savedSessions) : {};
  });

  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('chatSessions', JSON.stringify(chatSessions));
  }, [chatSessions]);

  useEffect(() => {
    if (currentChatId === null && Object.keys(chatSessions).length > 0) {
      const firstChatId = Object.keys(chatSessions)[0];
      setCurrentChatId(firstChatId);
      setMessages(chatSessions[firstChatId].messages);
    } else if (currentChatId === null) {
      startNewChat(); // Start a new chat if no sessions exist
    }
  }, [chatSessions, currentChatId]);

  const startNewChat = () => {
    const newChatId = Date.now();
    setChatSessions((prevSessions) => ({
      ...prevSessions,
      [newChatId]: { id: newChatId, title: 'New Chat', messages: [] }
    }));
    setCurrentChatId(newChatId); // Set new chat as current
    setMessages([]); // Clear messages for the new chat
  };

  const switchChat = (chatId) => {
    const chat = chatSessions[chatId];
    if (chat) {
      setCurrentChatId(chatId);
      setMessages(chat.messages); // Load messages for the clicked chat
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);

    // Update chat title with the first user message if it's a new chat
    if (messages.length === 0) {
      setChatSessions((prevSessions) => ({
        ...prevSessions,
        [currentChatId]: {
          ...prevSessions[currentChatId],
          title: input,
          messages: updatedMessages,
        },
      }));
    }

    try {
      const response = await axios.post('http://localhost:8001/api/chat', {
        message: input,
      });

      const botMessage = {
        role: 'bot',
        content: response.data.response || 'No response from bot.',
      };

      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);

      setChatSessions((prevSessions) => ({
        ...prevSessions,
        [currentChatId]: {
          ...prevSessions[currentChatId],
          messages: finalMessages,
        },
      }));
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: 'bot',
        content: 'Error communicating with the chatbot.',
      };
      const finalMessages = [...updatedMessages, errorMessage];
      setMessages(finalMessages);

      setChatSessions((prevSessions) => ({
        ...prevSessions,
        [currentChatId]: {
          ...prevSessions[currentChatId],
          messages: finalMessages,
        },
      }));
    }

    setInput('');
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const clearChatHistory = () => {
    setChatSessions({});
    localStorage.removeItem('chatSessions');
    setCurrentChatId(null);
    setMessages([]);
  };

  return (
    <div className={styles.chatbotContainer}>
      <button className={styles.backButton} onClick={() => navigate('/employee/learning-plan')}>
        ← Back
      </button>
      <div className={styles.chatHeader}>
        <h2>Chatbot</h2>
        <button onClick={startNewChat} className={styles.newChatButton}>
          New Chat
        </button>
        <button onClick={clearChatHistory} className={styles.clearButton}>
          Clear Chat History
        </button>
      </div>
      <div style={{ display: 'flex', height: '100%' }}>
        <div className={styles.sidebar}>
          <h3>Chat History</h3>
          <ul className={styles.chatHistory}>
            {Object.values(chatSessions).map((session) => (
              <li
                key={session.id}
                className={`${styles.historyItem} ${
                  currentChatId === session.id ? styles.active : ''
                }`}
                onClick={() => switchChat(session.id)}
              >
                {session.title}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.chat-window}>
          {messages.map((msg, index) => (
            <div key={index} className={`${styles.message} ${styles[msg.role]}`}>
              <span>{msg.content}</span>
            </div>
          ))}
          {loading && (
            <div className={`${styles.message} ${styles.bot}`}>
              <span>...</span>
            </div>
          )}
        </div>
      </div>
      <div className={styles.chatInputContainer}>
        <input
          type="text"
          className={styles.chatInput}
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
        />
        <button className={styles.sendButton} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
