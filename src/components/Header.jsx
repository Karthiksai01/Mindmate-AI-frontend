import React, { useContext } from 'react';
// Corrected the import path to be more explicit for the bundler.
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="absolute top-0 left-0 right-0 p-4 bg-[#343541] flex justify-between items-center text-white border-b border-gray-700 z-10">
      <div>
        <h1 className="text-xl font-semibold">Mindmate AI</h1>
      </div>
      <div className="flex items-center space-x-4">
        {user && <span className="text-gray-300">Welcome, {user.username}</span>}
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;

