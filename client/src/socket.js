// src/socket.js
import { io } from "socket.io-client";

const socket = io("https://cinemate-ot74.onrender.com");


socket.on("connect", () => {
  console.log("✅ Connected to socket server:", socket.id);
});

socket.on("disconnect", () => {
  console.log("❌ Disconnected from socket server");
});

export default socket;
