// src/socket.js
import { io } from "socket.io-client";

const socket = io("https://192.168.1.157:5154", {
  transports: ["websocket"],
  reconnectionAttempts: 5,
  autoConnect: false, // manual connect
});

export default socket;
