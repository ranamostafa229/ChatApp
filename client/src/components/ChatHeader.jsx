import styled from "styled-components";

const ChatHeader = ({ currentChat, open }) => {
  return (
    <Container>
      <div className={`chatHeader ${open ? "open" : "close"}`}>
        <div className="userDetails">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h3>{currentChat?.username}</h3>
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .chatHeader {
    display: flex;
    align-items: center;
    padding: 0 2rem;
    width: max-content;
    visibility: visible;
    .userDetails {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .avatar {
        img {
          height: 2.2rem;
        }
      }
      .username {
        h3 {
          color: #757a91;
          font-weight: 400;
          width: fit-content;
          text-transform: capitalize;
        }
      }
    }
    @media only screen and (max-width: 600px) {
      visibility: hidden;
    }
  }
`;
export default ChatHeader;
