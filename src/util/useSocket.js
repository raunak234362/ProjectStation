// src/hooks/useSocketConnection.js
import { useEffect } from "react";
import socket from "../socket";

const useSocketConnection = (userId) => {
  useEffect(() => {
    if (!userId) return;

    socket.connect();
    socket.emit("joinRoom", userId);
    console.log("Socket connected and joined room:", userId);

    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, [userId]);
};

export default useSocketConnection;
