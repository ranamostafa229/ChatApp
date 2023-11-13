import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/ApiRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import Header from "../components/Header";
import { io } from "socket.io-client";

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const socket = useRef();

  const getCurrentUser = async () => {
    if (!localStorage.getItem("userChat")) {
      navigate("/login");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("userChat")));
    }
  };

  const getContacts = async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data);
      } else {
        navigate("/setAvatar");
      }
    }
  };
  const handleChatChange = (contact) => {
    setCurrentChat(contact);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    getContacts();
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  return (
    <Container display={open.toString()}>
      <Contacts
        contacts={contacts}
        currentUser={currentUser}
        handleChatChange={handleChatChange}
        open={open}
        setOpen={setOpen}
      />
      <div className="container">
        <Header
          currentUser={currentUser}
          currentChat={currentChat}
          open={open}
          setOpen={setOpen}
        />
        {currentChat === null ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
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
