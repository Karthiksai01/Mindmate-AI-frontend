import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ChatPage from "./pages/ChatPage.jsx";

// A wrapper to protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { token, isAuthReady } = useContext(AuthContext);

  if (!isAuthReady) {
    // Optional: show a loading spinner while checking auth status
    return <div className="flex items-center justify-center h-screen bg-[#343541] text-white">Loading...</div>;
  }

  return token ? children : <Navigate to="/login" />;
};

// The main App component which sets up the providers and router
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/chat" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

