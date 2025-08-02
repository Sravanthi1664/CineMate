import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header() {
  const navigate = useNavigate();

  // Check if user is logged in (by checking token in localStorage)
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Optional
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-3 flex justify-between items-center shadow-md">
      {/* Logo + Title */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="CineMate Logo" className="w-8 h-8 object-contain" />
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide font-cinzel">
          CineMate
        </h1>
        <div className="flex flex-col">
          <span className="text-sm text-gray-400 mt-1 ml-1">Stream together. Laugh together.</span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-full transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-4 py-2 rounded-full transition"
            >
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-full transition"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
