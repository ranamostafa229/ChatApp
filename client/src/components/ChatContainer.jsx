import styled from "styled-components";
import ChatInput from "./ChatInput";
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/ApiRoutes";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMsg, setArrivalMsg] = useState(null);

  const scrollRef = useRef();

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser?._id,
      to: currentChat?._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };
  const getMessages = async () => {
    if (currentChat) {
      const response = await axios.post(getAllMessagesRoute, {
        from: currentUser?._id,
        to: currentChat?._id,
      });
      setMessages(response.data);
    }
  };
  useEffect(() => {
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMsg({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMsg && setMessages((prev) => [...prev, arrivalMsg]);
  }, [arrivalMsg]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chatMessages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className={`avatar `}>
                  {!message.fromSelf && (
                    <img
                      src={`data:image/svg+xml;base64,${
                        !message.fromSelf ? currentChat?.avatarImage : ""
                      }`}
                      alt="avatar"
                    />
                  )}
                </div>
                <div className="content">
                  <p>{message?.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 88% 12%;
  gap: 0.1rem;
  overflow: hidden;
  height: calc(100vh - 50px);

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 85% 15%;
  }

  padding-top: 1rem;
  .chatMessages {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 2rem;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0.3rem;
      &-thumb {
        background-color: #c4c4c4;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      gap: 1rem;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: black;
      }
      .avatar {
        display: flex;
        flex-direction: column;
        padding-bottom: 2rem;
        img {
          height: 2rem;
        }
      }
      .shif {
        order: 1;
      }
      .unshif {
        order: -1;
      }
    }

    .sended {
      justify-content: flex-end;
      .content {
        background-color: white;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #ebebeb;
      }
    }
  }
`;
export default ChatContainer;
