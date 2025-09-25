import React from 'react';

// Added a default empty array for the 'chats' prop to prevent crashes if it's undefined.
function Sidebar({ chats = [], onSelectChat, onNewChat, activeChatId }) {
  return (
    <div className="w-64 bg-[#202123] text-white flex flex-col p-2">
      <button
        onClick={onNewChat}
        className="w-full p-3 mb-4 text-left text-lg rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors duration-200 flex items-center justify-between"
      >
        <span>+ New Chat</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      </button>
      <div className="flex-1 overflow-y-auto pr-2">
        <h2 className="text-xs text-gray-400 font-semibold mb-2 px-2">Chat History</h2>
        {/* This check is now safe because 'chats' will always be an array. */}
        {chats.length > 0 ? (
          chats.map((chat) => (
            <div
              key={chat._id}
              className={`p-3 rounded-lg cursor-pointer truncate ${
                activeChatId === chat._id ? 'bg-gray-700' : 'hover:bg-gray-800'
              }`}
              onClick={() => onSelectChat(chat._id)}
              title={chat.title}
            >
              {chat.title}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 px-2">No chats yet.</p>
        )}
      </div>
    </div>
  );
}

export default Sidebar;