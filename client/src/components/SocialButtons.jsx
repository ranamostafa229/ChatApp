import { BsFacebook, BsGoogle } from "react-icons/bs";
import styled from "styled-components";
import useSocialAuth from "../hooks/useSocialAuth";

const SocialButtons = () => {
  const { loginWithProvider } = useSocialAuth();

  return (
    <Container>
      <button type="button" onClick={() => loginWithProvider("google")}>
        <BsGoogle />
        Google
      </button>
      <button type="button" onClick={() => loginWithProvider("facebook")}>
        <BsFacebook />
        Facebook
      </button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 1rem;

  button {
    background-color: #f5f6fa;

    color: #999999;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    transition: 0.5s ease-in-out;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    &:hover {
      background-color: #b0fdde;
      color: #16d991;
    }
  }
`;

export default SocialButtons;
