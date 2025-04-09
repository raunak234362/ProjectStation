// src/socket.js
import { io } from "socket.io-client";

const socket = io("http://192.168.1.198:5155", {
  transports: ["websocket"],
  reconnectionAttempts: 5,
  autoConnect: false, // manual connect
});

export default socket;
