import styled from "styled-components";
import logo from "../assets/logo.svg";
import { useState } from "react";

const Contacts = ({ contacts, handleChatChange, open }) => {
  const [currentSelected, setCurrentSelected] = useState(null);

  const changeCurrentChat = (id, contact) => {
    setCurrentSelected(id);
    handleChatChange(contact);
  };

  return (
    <Container className={`${open ? "open" : "close"}`}>
      <div className="brand">
        <img src={logo} alt="logo" />
      </div>

      <div className="contacts">
        {contacts.map((contact) => {
          return contact?.avatarImage ? (
            <div
              className={`contact ${
                contact._id === currentSelected ? "selected" : ""
              }`}
              key={contact._id}
              onClick={() => changeCurrentChat(contact?._id, contact)}
            >
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${contact?.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{contact?.username}</h3>
              </div>
            </div>
          ) : (
            ""
          );
        })}
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  overflow: hidden;
  background-color: white;
  .open {
    visibility: visible;
  }
  .close {
    visibility: hidden;
  }
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3.9rem;
    img {
      height: 2rem;
    }
    h3 {
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    gap: 0.2rem;

    &::-webkit-scrollbar {
      width: 0.3rem;
      &-thumb {
        background-color: #ededed;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 5rem;
      cursor: pointer;
      width: 100%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      align-items: center;
      transition: 0.5s ease-in-out;
      text-transform: capitalize;
      text-align: center;
      font-size: small;
      .avatar {
        img {
          height: 2.3rem;
        }
      }
      .username {
        h3 {
          color: #999999;
          font-size: 12px;
          font-weight: 500;
        }
        @media only screen and (max-width: 600px) {
          h3 {
            font-size: 10px;
          }
          .selected {
            background-color: #f5f5f5;
          }
        }
      }
      &:hover {
        background-color: #f5f5f5;
      }
    }
    .selected {
      background-color: #ededed;
    }
  }

  .currentUser {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h3 {
          font-size: 1rem;
        }
      }
    }
  }
`;
export default Contacts;
