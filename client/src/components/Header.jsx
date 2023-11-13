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
            className={`menuIcon `}
            size={"1.9rem"}
          />
        ) : (
          <MdOutlineMenuOpen
            className={`menuIcon `}
            onClick={() => setOpen((prev) => !prev)}
            size={"1.9rem"}
          />
        )}
        {currentChat?.avatarImage && !open && (
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
  height: 3.9rem;
  border-bottom: 1px solid #efefef;
  justify-content: center;
  align-items: center;
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90vw;
  }

  .rightSide {
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
    width: 100vw;
    .avatar {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      border: 1px solid #57eaae;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        height: 2.2rem;
      }
    }
  }
  @media only screen and (min-width: 768px) {
    .menuIcon {
      display: none;
    }
  }
  @media only screen and (max-width: 600px) {
    min-width: 85vw;

    .menuIcon {
      color: #767b91;
      transition: 0.25s ease;
      visibility: visible;
      padding-top: 7px;
      margin-left: 0.5rem;
      &:active {
        transform: rotate(180deg);
      }
    }
    .content {
      width: 90vw;
    }
  }
`;
export default Header;
