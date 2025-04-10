// src/util/NotificationReceiver.jsx
import { useEffect } from "react";

import { toast } from "react-toastify";
import socket from "../socket";

const NotificationReceiver = () => {
  useEffect(() => {
    socket.on("customNotification", (payload) => {
      console.log("Notification received:", payload);

      toast.info(`${payload.message}`, {
        position: "top-right",
      });
    });

    return () => {
      socket.off("customNotification");
    };
  }, []);

  return null;
};

export default NotificationReceiver;
