import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import Link

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };
  
    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-[#343541]">
      <div className="bg-[#40414f] p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-white text-2xl font-semibold mb-2">Create Account</h2>
        <p className="text-gray-400 mb-6 text-sm">Get started with your AI assistant</p>

        {error && (
          <p className="text-red-400 mb-4 text-sm bg-red-500/10 p-2 rounded-lg">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-[#55566c] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-[#55566c] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-[#55566c] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button type="submit" className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition text-white font-medium shadow-md">
            Sign Up
          </button>
        </form>

        <p className="text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
