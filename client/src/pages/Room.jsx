import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import VideoPlayer from "../components/VideoPlayer";
import RoomSidebar from "../components/RoomSidebar";
import ChatBox from "../components/ChatBox";
import socket from "../socket";

export default function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const hasJoinedRoom = useRef(false);

  // Consistent random guest name per session
  const usernameRef = useRef(`Guest-${Math.floor(Math.random() * 1000)}`);
  const username = usernameRef.current;

  useEffect(() => {
    if (!roomId || hasJoinedRoom.current) return;

    // Join Room
    socket.emit("join_room", { roomId, username });
    console.log(`🟢 ${username} joined room: ${roomId}`);
    hasJoinedRoom.current = true;

    // Cleanup on leave/unmount
    return () => {
      socket.emit("leave_room", { roomId, username });
      console.log(`🔴 ${username} left room: ${roomId}`);
      socket.removeAllListeners(); // prevent duplicated listeners
      hasJoinedRoom.current = false;
    };
  }, [roomId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLeave = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white">
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-start gap-8">
          {/* Left Section */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-purple-400 mb-2">Room ID:</h2>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-mono bg-gray-800 px-3 py-1 rounded text-sm text-purple-300">
                  {roomId}
                </span>
                <button
                  onClick={handleCopy}
                  className="bg-purple-600 px-3 py-1 rounded hover:bg-purple-700 text-sm"
                >
                  📋 {copied ? "Copied!" : "Copy Room ID"}
                </button>
                <button
                  onClick={handleLeave}
                  className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-sm"
                >
                  🚪 Leave Room
                </button>
              </div>
            </div>

            {/* Video Player */}
            <VideoPlayer />
          </div>

          {/* Right Sidebar */}
          <div className="w-full md:w-1/3 flex flex-col gap-6">
            <RoomSidebar />
            <ChatBox roomId={roomId} username={username} />
          </div>
        </div>
      </main>
    </div>
  );
}
