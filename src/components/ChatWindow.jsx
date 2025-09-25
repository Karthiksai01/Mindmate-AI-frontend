import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.jsx';

const API_BASE_URL = 'https://mindmate-ai-backend.onrender.com/api';

function ChatWindow({ chatId, onNewChatCreated }) {
  const { token, logout } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); // For fetching history
  const [isReplying, setIsReplying] = useState(false); // For AI reply
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isReplying]);

  useEffect(() => {
    const fetchChat = async () => {
      if (!chatId) {
        setMessages([]);
        return;
      }
      setIsLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/chat/${chatId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data.messages || []);
      } catch (err) {
        console.error('Error fetching chat:', err);
        if (err.response?.status === 401) logout();
      } finally {
        setIsLoading(false);
      }
    };
    fetchChat();
  }, [chatId, token, logout]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isReplying) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsReplying(true);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/chat/message`,
        { chatId, message: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const assistantMessage = { role: 'assistant', content: res.data.reply };
      setMessages((prev) => [...prev, assistantMessage]);

      if (res.data.newChat) {
        onNewChatCreated(res.data.newChat);
      }
    } catch (err) {
      console.error('Send message error:', err);
      if (err.response?.status === 401) logout();
      // Optionally add an error message to the chat
      const errorMessage = { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' };
      setMessages((prev) => [...prev.slice(0, -1), errorMessage]); // Replaces user message if send fails
    } finally {
      setIsReplying(false);
    }
  };

  const WelcomeScreen = () => (
    <div className="flex flex-col items-center justify-center h-full text-white">
      <h1 className="text-4xl font-bold mb-4">Mindmate AI</h1>
      <p className="text-gray-400">Select a chat from the sidebar or start a new one!</p>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col bg-[#343541]">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {!chatId && !messages.length ? <WelcomeScreen /> : null}
        {isLoading ? (
          <p className="text-center text-gray-400">Loading messages...</p>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xl p-3 rounded-lg text-white ${m.role === 'user' ? 'bg-blue-600' : 'bg-[#444654]'}`}>
                <p style={{ whiteSpace: 'pre-wrap' }}>{m.content}</p>
              </div>
            </div>
          ))
        )}
        {isReplying && (
          <div className="flex justify-start">
            <div className="max-w-xl p-3 rounded-lg bg-[#444654] text-white">
              <div className="flex items-center space-x-2">
                 <span className="typing-dot"></span>
                 <span className="typing-dot" style={{animationDelay: '0.2s'}}></span>
                 <span className="typing-dot" style={{animationDelay: '0.4s'}}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-700">
        <form onSubmit={sendMessage} className="flex items-center space-x-3 bg-[#40414F] p-3 rounded-lg">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
            placeholder="Type your message here..."
            disabled={isReplying}
          />
          <button
            type="submit"
            disabled={!input.trim() || isReplying}
            className="p-2 rounded-md bg-blue-600 text-white disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-blue-700 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatWindow;

