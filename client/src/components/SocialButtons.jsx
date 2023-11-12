import { BsFacebook, BsGoogle } from "react-icons/bs";
import styled from "styled-components";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { firebaseAuth } from "../utils/firebaseConfig";
import axios from "axios";
import { firebaseLoginRoute } from "../utils/ApiRoutes";
import { useNavigate } from "react-router-dom";

const SocialButtons = () => {
  const navigate = useNavigate();
  const providers = {
    google: new GoogleAuthProvider(),
    facebook: new FacebookAuthProvider(),
  };
  const firebaseLogin = async (loginType) => {
    try {
      const provider = providers[loginType];
      const userData = await signInWithPopup(firebaseAuth, provider);
      const email = userData.user.email
        ? userData.user.email
        : userData.user.providerData[0].email;

      // ? userData.user?.email
      // : `${userData.user?.displayName.replace(" ", "")}@facebook.com`;
      const { data } = await axios.post(firebaseLoginRoute, { email });
      if (data.status) {
        localStorage.setItem("userChat", JSON.stringify(data.user));
        navigate("/");
      } else {
        navigate("/setusername");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <button type="button" onClick={() => firebaseLogin("google")}>
        <BsGoogle />
        Google
      </button>
      <button type="button" onClick={() => firebaseLogin("facebook")}>
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
