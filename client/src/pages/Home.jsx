import React, { useState, useEffect } from "react";
import RoomCard from "../components/RoomCard";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { FiSearch } from "react-icons/fi";

export default function Home() {
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRooms, setFilteredRooms] = useState([]);

  const handleCreateRoom = () => {
    const roomId = uuidv4();
    navigate(`/room/${roomId}`);
  };

  const handleJoinRoom = () => {
    const roomId = prompt("Enter Room ID to Join:");
    if (roomId) {
      navigate(`/room/${roomId}`);
    }
  };

  const dummyRooms = [
    { id: 27205, title: "Inception", users: 5, poster: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg" },
    { id: 157336, title: "Interstellar", users: 8, poster: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg" },
    { id: 414906, title: "The Batman", users: 3, poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg" },
    { id: 872585, title: "Oppenheimer", users: 7, poster: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg" },
    { id: 299534, title: "Avengers: Endgame", users: 12, poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg" },
    { id: 438631, title: "Dune", users: 6, poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg" },
    { id: 475557, title: "Joker", users: 4, poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg" },
    { id: 577922, title: "Tenet", users: 5, poster: "https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg" },
    { id: 155, title: "The Dark Knight", users: 9, poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
    { id: 550, title: "Fight Club", users: 3, poster: "https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg" },
    { id: 13, title: "Forrest Gump", users: 6, poster: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg" },
    { id: 313369, title: "La La Land", users: 4, poster: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg" },
    { id: 603, title: "The Matrix", users: 7, poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg" },
    { id: 11324, title: "Shutter Island", users: 4, poster: "https://image.tmdb.org/t/p/w500/kve20tXwUZpu4GUX8l6X7Z4jmL6.jpg" },
    { id: 37799, title: "The Social Network", users: 3, poster: "https://image.tmdb.org/t/p/w500/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg" },
    { id: 120467, title: "The Grand Budapest Hotel", users: 5, poster: "https://image.tmdb.org/t/p/w500/nX5XotM9yprCKarRH4fzOq1VM1J.jpg" },
  ];

  // Filter logic
  useEffect(() => {
    const results = dummyRooms.filter((room) =>
      room.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRooms(results);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 px-4 py-8 text-white">

      {/* 🔍 Search Input */}
                <div className="flex justify-end mb-8 px-4">
          <div className="relative w-full max-w-md">
            {/* Search Icon */}
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
              <FiSearch size={18} />
            </span>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Search for a room..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-2xl border border-gray-700 bg-zinc-900 text-white focus:ring-2 focus:ring-purple-600 focus:outline-none placeholder-gray-400 shadow-sm"
            />
          </div>
        </div>

      {/* 🎬 Trending Banner */}
      {/* 🎬 Trending Banner */}
          <div className="relative mx-4 mb-6">
            <div className="bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 text-white text-center py-1.5 px-4 rounded-lg shadow-md ring-1 ring-purple-400/20">
              <span className="inline-flex items-center gap-2 text-sm font-medium tracking-wide">
                <span className="text-lg">🎬</span>
                <span>Trending Now:</span>
                <span className="italic font-normal text-gray-200">
                  Inception, Oppenheimer, Interstellar
                </span>
              </span>
            </div>
          </div>



      {/* ➕ Room Action Buttons */}
      <div className="flex justify-center gap-6 mb-8">
        <button
          onClick={handleCreateRoom}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow"
        >
          Create Room
        </button>
        <button
          onClick={handleJoinRoom}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
        >
          Join Room
        </button>
      </div>

      {/* 🏠 Room Grid */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {filteredRooms.length === 0 ? (
          <p className="col-span-full text-center text-gray-400">
            No rooms found for "{searchQuery}"
          </p>
        ) : (
          filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              id={room.id}
              title={room.title}
              users={room.users}
              poster={room.poster}
            />
          ))
        )}
      </div>

      {/* ❓ FAQs */}
      <section className="mt-16 px-6 max-w-4xl mx-auto text-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center">Help Center / FAQs</h2>
        {[
          {
            question: "🔒 How do I create a private room?",
            answer: "Click the Create Room button on the home page. A unique ID will be generated and shared in the URL.",
          },
          {
            question: "🎥 What can I do inside a room?",
            answer: "You can watch movies in sync with friends, chat, and react live. New features are coming soon!",
          },
          {
            question: "👥 How many people can join a room?",
            answer: "Currently, up to 15 users can join a single room.",
          },
          {
            question: "💬 I found a bug or want to suggest something.",
            answer: "We'd love your feedback! Email us at support@cinemate.com.",
          },
        ].map((faq, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-md shadow mb-4">
            <button
              onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              className="w-full flex justify-between items-center text-left font-semibold text-white"
            >
              <span>{faq.question}</span>
              <span className="text-blue-400 text-xl">
                {openFAQ === index ? "−" : "+"}
              </span>
            </button>
            {openFAQ === index && (
              <p className="text-sm text-gray-300 mt-2">{faq.answer}</p>
            )}
          </div>
        ))}
      </section>

      {/* 🧾 Footer */}
      <footer className="mt-16 text-center text-sm text-gray-400 border-t border-gray-700 pt-6">
        <p>
          Need help?{" "}
          <a href="mailto:support@cinemate.com" className="text-blue-400 hover:underline">
            Contact Support
          </a>
        </p>
        <p className="mt-1">© 2025 CineMate. All rights reserved.</p>
      </footer>
    </div>
  );
}
