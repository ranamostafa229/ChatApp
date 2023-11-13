import styled from "styled-components";
import { BsEmojiSmileFill } from "react-icons/bs";
import Picker from "emoji-picker-react";
import { useState } from "react";

const ChatInput = ({ handleSendMsg }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };
  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <form className="inputContainer" onSubmit={(e) => sendChat(e)}>
        <div className="buttonContainer">
          <div className="emoji">
            <BsEmojiSmileFill onClick={handleEmojiPicker} />
            {showEmojiPicker && (
              <Picker
                onEmojiClick={(emoji, event) => handleEmojiClick(event, emoji)}
              />
            )}
          </div>
        </div>
        <input
          type="text"
          placeholder="Type a message "
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />

        <button className="submit">Send</button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95%;
  padding: 0 2rem;
  padding-bottom: 0.6rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  @media only screen and (max-width: 600px) {
    width: 100%;
    padding: 0 0.5rem;
    gap: 10px;
  }
  .buttonContainer {
    display: flex;
    align-items: center;
    color: #cecece;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.4rem;
        color: #16d991;
        cursor: pointer;
        margin: 10px;
      }
      .EmojiPickerReact {
        position: absolute;
        top: -460px;
      }
    }
  }
  .inputContainer {
    width: 100%;
    display: flex;
    border-radius: 0.5rem;
    align-items: center;
    gap: 1rem;
    background-color: white;
    input {
      width: 90%;
      background-color: transparent;
      color: #999999;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #16d991;
      }
      &:focus {
        outline: none;
      }
    }
    .submit {
      padding: 0.6rem 0.7rem;
      border-radius: 0.4rem;
      margin: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      cursor: pointer;
      color: white;
      background-color: #57eaae;

      &:hover {
        background-color: #16d991;
      }
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
      }
    }
  }
`;
export default ChatInput;
