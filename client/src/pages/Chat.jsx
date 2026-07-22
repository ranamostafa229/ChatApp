import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import useContacts from "../hooks/useContacts";
import useSocket from "../hooks/useSocket";

const Chat = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();
  const contacts = useContacts(user);
  const socket = useSocket(user?._id);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (!user.isAvatarImageSet) {
      navigate("/setAvatar");
    }
  }, [user, navigate]);

  const handleChatChange = (contact) => {
    setCurrentChat(contact);
  };

  return (
    <Container display={open.toString()}>
      <Contacts
        contacts={contacts}
        currentUser={user}
        handleChatChange={handleChatChange}
        open={open}
        setOpen={setOpen}
      />
      <div className="container">
        <Header
          currentUser={user}
          currentChat={currentChat}
          open={open}
          setOpen={setOpen}
        />
        {currentChat === null ? (
          <Welcome currentUser={user} />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={user}
            socket={socket}
          />
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 8% 92%;
  background-color: white;

  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 600px) {
    grid-template-columns: ${(props) =>
      props.display === "true" ? " 13% 87%" : " 0% 100%"};
  }

  .container {
    background-color: #f5f5f5;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    max-width: 100vw;
  }
`;
export default Chat;
