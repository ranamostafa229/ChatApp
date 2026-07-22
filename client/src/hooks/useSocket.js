import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { host } from "../utils/ApiRoutes";

const useSocket = (userId) => {
  const socket = useRef(null);

  useEffect(() => {
    if (!userId) return;

    socket.current = io(host);
    socket.current.emit("add-user", userId);

    return () => {
      socket.current?.disconnect();
    };
  }, [userId]);

  return socket;
};

export default useSocket;
