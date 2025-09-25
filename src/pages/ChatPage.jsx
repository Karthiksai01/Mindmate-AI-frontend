import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import ChatWindow from '../components/ChatWindow.jsx';
import Header from '../components/Header.jsx';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.jsx';

function ChatPage() {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const { token, logout } = useContext(AuthContext);

  // Fetch all user chats for the sidebar
  useEffect(() => {
    const fetchChats = async () => {
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:5000/api/chat", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChats(res.data);
      } catch (err) {
        console.error("Failed to fetch chats", err);
        if (err.response?.status === 401) logout();
      }
    };
    fetchChats();
  }, [token, logout]);

  const handleNewChat = () => {
    setSelectedChatId(null);
  };

  const handleSelectChat = (id) => {
    setSelectedChatId(id);
  };

  const handleNewChatCreated = (newChat) => {
    // Add new chat to the top of the list and select it
    setChats(prevChats => [newChat, ...prevChats]);
    setSelectedChatId(newChat._id);
  };

  return (
    <div className="relative flex h-screen pt-20 bg-[#343541]">
      <Header />
      <Sidebar
        chats={chats}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        activeChatId={selectedChatId}
      />
      <ChatWindow
        chatId={selectedChatId}
        onNewChatCreated={handleNewChatCreated}
      />
    </div>
  );
}

export default ChatPage;

