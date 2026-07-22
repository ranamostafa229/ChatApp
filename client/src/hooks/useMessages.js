import { useCallback, useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/ApiRoutes";

const useMessages = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!currentChat || !currentUser) {
      setMessages([]);
      return;
    }

    const getMessages = async () => {
      const { data } = await apiClient.post(getAllMessagesRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(data);
    };

    getMessages();
  }, [currentChat, currentUser]);

  useEffect(() => {
    if (!socket?.current) return;

    const handleMessageReceive = (msg) => {
      setMessages((prev) => [...prev, { fromSelf: false, message: msg }]);
    };

    socket.current.on("msg-recieve", handleMessageReceive);
    return () => {
      socket.current.off("msg-recieve", handleMessageReceive);
    };
  }, [socket]);

  const sendMessage = useCallback(
    async (message) => {
      if (!currentChat || !currentUser) return;

      await apiClient.post(sendMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message,
      });

      socket?.current?.emit("send-msg", {
        to: currentChat._id,
        from: currentUser._id,
        message,
      });

      setMessages((prev) => [...prev, { fromSelf: true, message }]);
    },
    [currentChat, currentUser, socket],
  );

  return { messages, sendMessage };
};

export default useMessages;
