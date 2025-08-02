import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  console.log("Login component rendered ✅");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Login button clicked ✅");
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white px-4">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-6 text-center">Login</h1>
        <input
          className="mb-4 w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="mb-6 w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
        >
          Login
        </button>
        <p className="mt-4 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-purple-400 underline hover:text-purple-300"
          >
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
