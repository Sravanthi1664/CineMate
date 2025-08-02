import { useState, useRef, useEffect, useCallback } from "react";
import socket from "../socket";

const emojiList = ["😀", "😂", "😍", "😎", "😢", "😡", "🎉", "❤️", "👍", "👀"];

export default function ChatBox({ roomId, username }) {
  const [messages, setMessages] = useState([
    { sender: "System", text: "Welcome to the room!" },
  ]);
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);

  // Store which rooms we’ve already joined
  const joinedRoomsRef = useRef(new Set());

  // Memoized handler for incoming messages
  const handleReceive = useCallback(({ sender, message }) => {
    setMessages((prev) => [...prev, { sender, text: message }]);
  }, []);

  // Join room only once
  useEffect(() => {
    if (!roomId || joinedRoomsRef.current.has(roomId)) return;

    socket.emit("join_room", { roomId, username });
    joinedRoomsRef.current.add(roomId);
    console.log(`✅ Emitted join_room for ${roomId}`);

    socket.on("receive_message", handleReceive);

    return () => {
      socket.off("receive_message", handleReceive);
    };
  }, [roomId, username, handleReceive]);

  const sendMessage = () => {
    if (!input.trim()) return;

    socket.emit("send_message", {
      roomId,
      sender: username || "Guest",
      message: input,
    });

    setInput("");
    setShowEmojiPicker(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const addEmoji = (emoji) => {
    setInput((prev) => prev + emoji);
  };

  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-md w-full max-w-md h-96 flex flex-col relative">
      <div className="bg-gray-800 p-3 font-semibold border-b border-gray-700">
        💬 Chatbox
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
        {messages.map((msg, idx) => (
          <div key={idx}>
            <span
              className={`font-medium ${
                msg.sender === username ? "text-green-400" : "text-blue-400"
              }`}
            >
              {msg.sender}:
            </span>{" "}
            <span className="text-gray-300">{msg.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {showEmojiPicker && (
        <div className="absolute bottom-20 left-3 bg-gray-800 p-2 rounded shadow-lg flex flex-wrap gap-1 z-10">
          {emojiList.map((emoji, index) => (
            <button
              key={index}
              onClick={() => addEmoji(emoji)}
              className="text-lg hover:scale-110 transition transform duration-100"
              type="button"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      <div className="border-t border-gray-700 p-3 flex gap-2 items-center">
        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="text-xl hover:text-yellow-400"
          type="button"
        >
          😊
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
          placeholder="Type a message..."
          autoComplete="off"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          type="button"
        >
          Send
        </button>
      </div>
    </div>
  );
}
