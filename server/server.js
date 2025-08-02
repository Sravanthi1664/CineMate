// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const io = new Server(server, {
  cors: {
    origin: "https://cinemate-1.onrender.com", // ✅ your frontend origin
    methods: ["GET", "POST"],
    credentials: true,
  },
});


const socketToRoom = {};
const socketToUsername = {};

io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  socket.on("join_room", ({ roomId, username }) => {
  if (!roomId) return;

  socket.join(roomId);
  socketToRoom[socket.id] = roomId;
  socketToUsername[socket.id] = username;

  console.log(`✅ ${username} (${socket.id}) joined room ${roomId}`);

  // Notify others in the room (not the sender)
  socket.to(roomId).emit("receive_message", {
    sender: "System",
    message: `${username} has joined the room!`,
  });
});


  socket.on("send_message", ({ roomId, sender, message }) => {
    if (!roomId || !message) return;
    io.to(roomId).emit("receive_message", { sender, message });
  });

  socket.on("video_play", ({ roomId }) => {
    socket.to(roomId).emit("sync_play");
  });

  socket.on("video_pause", ({ roomId }) => {
    socket.to(roomId).emit("sync_pause");
  });

  socket.on("video_seek", ({ roomId, time }) => {
    socket.to(roomId).emit("sync_seek", { time });
  });

  socket.on("disconnect", () => {
    const roomId = socketToRoom[socket.id];
    const username = socketToUsername[socket.id];
    console.log("🔴 Disconnected:", socket.id);

    delete socketToRoom[socket.id];
    delete socketToUsername[socket.id];
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
