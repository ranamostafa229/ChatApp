import styled from "styled-components";
import ChatInput from "./ChatInput";
import useMessages from "../hooks/useMessages";
import useScrollToBottom from "../hooks/useScrollToBottom";

const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const { messages, sendMessage } = useMessages({
    currentChat,
    currentUser,
    socket,
  });
  const scrollRef = useScrollToBottom();

  const handleSendMsg = async (msg) => {
    await sendMessage(msg);
  };

  return (
    <Container>
      <div className="chatMessages">
        {messages.map((message) => {
          return (
            <div
              ref={scrollRef}
              key={`${message.fromSelf}-${message.message}-${Math.random()}`}
            >
              <div
                className={`message ${message.fromSelf ? "sended" : "recieved"}`}
              >
                <div className={`avatar `}>
                  {!message.fromSelf && (
                    <img
                      src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`}
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
  grid-template-rows: 90% 10%;
  gap: 0.1rem;
  overflow: hidden;
  min-height: 85%;
  padding-top: 1rem;
  .chatMessages {
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
      padding-bottom: 10px;
      .content {
        background-color: white;
      }
    }
    .recieved {
      justify-content: flex-start;
      padding-bottom: 10px;

      .content {
        background-color: #ebebeb;
      }
    }
  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 85% 15%;
  }
`;
export default ChatContainer;
