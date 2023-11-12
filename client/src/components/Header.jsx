import styled from "styled-components";
import Logout from "./Logout";
import ChatHeader from "./ChatHeader";
import { MdOutlineMenuOpen } from "react-icons/md";
import { BsArrowLeft } from "react-icons/bs";

const Header = ({ currentUser, currentChat, open, setOpen }) => {
  return (
    <Container>
      <div className={`${currentUser?.avatarImage ? "content" : ""}`}>
        {open ? (
          <BsArrowLeft
            onClick={() => setOpen((prev) => !prev)}
            className={`menuIcon ${open ? "open" : ""}`}
          />
        ) : (
          <MdOutlineMenuOpen
            className={`menuIcon ${open ? "open" : ""}`}
            onClick={() => setOpen((prev) => !prev)}
          />
        )}
        {currentChat?.avatarImage && (
          <ChatHeader currentChat={currentChat} open={open} />
        )}
        <div className="rightSide">
          <Logout />
          {currentUser?.avatarImage && (
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUser?.avatarImage}`}
                alt="avatar"
              />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  background-color: white;
  width: 100%;
  height: 3.9rem;
  border-bottom: 1px solid #efefef;

  @media only screen and (min-width: 768px) {
    .menuIcon {
      visibility: hidden;
    }
  }
  @media only screen and (max-width: 600px) {
    .menuIcon {
      color: #767b91;
      font-size: 2rem;
      transition: 0.25s ease;
      visibility: visible;
      padding-top: 7px;
      margin-left: 1rem;
      &:active {
        transform: rotate(180deg);
      }
    }
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  align-items: center;
  .rightSide {
    display: flex;
    justify-content: end;
    width: 100%;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;

    .avatar {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      border: 1px solid #57eaae;
      /* border: 1px solid #cecece; */
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        height: 2.2rem;
      }
    }
  }
`;
export default Header;
