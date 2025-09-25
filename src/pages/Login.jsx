import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      // Pass both token and user object to login context
      login(res.data.token, res.data.user);
      navigate("/chat");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#343541]">
      <div className="bg-[#40414f] p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-white text-2xl font-semibold mb-2">Welcome Back</h2>
        <p className="text-gray-400 mb-6 text-sm">Log in to continue your session</p>

        {error && (
          <p className="text-red-400 mb-4 text-sm bg-red-500/10 p-2 rounded-lg">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-[#55566c] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-[#55566c] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button type="submit" className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition text-white font-medium shadow-md">
            Log In
          </button>
        </form>

        <p className="text-gray-400 mt-6 text-sm">
          Dont have an account?{" "}
          <Link to="/signup" className="text-emerald-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

