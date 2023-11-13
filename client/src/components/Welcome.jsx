import styled from "styled-components";
import Robot from "../assets/robot.gif";

const Welcome = ({ currentUser }) => {
  return (
    <Container>
      <img src={Robot} alt="robot" />
      <h1>
        Welcome, <span>{currentUser?.username}</span>
      </h1>
      <h3>Select a chat to start messaging</h3>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #999999;
  img {
    height: 20rem;
  }
  h1 {
    text-transform: capitalize;
    text-align: center;
  }
  span {
    color: #16d991;
  }
`;

export default Welcome;
