import styled from "styled-components";
import loader from "../assets/aloader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { TfiReload } from "react-icons/tfi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import multiavatar from "@multiavatar/multiavatar";

function SetAvatar() {
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [change, setChange] = useState(false);
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const { user, updateAvatar } = useAuth();

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
      return;
    }

    const data = await updateAvatar(avatars[selectedAvatar]);
    if (data?.isSet) {
      navigate("/");
    } else {
      toast.error("Failed to set avatar, please try again", toastOptions);
    }
  };

  const setImage = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      // generate a random avatarID
      const svgCode = multiavatar(Math.round(Math.random() * 1000)).toString();
      // convert SVG string to base64
      const base64 = btoa(svgCode);

      data.push(base64);
    }
    setAvatars(data);
    setIsLoading(false);
    setChange(false);
  };
  const handleChange = () => {
    setChange((prev) => !prev);
    setImage();
    // setIsLoading(true);
  };

  useEffect(() => {
    setImage();
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, [user, navigate]);

  return (
    <>
      {isLoading && !change ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="titleContainer">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
            <button onClick={handleChange} className="changeBtn">
              {change ? (
                <AiOutlineLoading3Quarters className="animate-spin " />
              ) : (
                <TfiReload />
              )}
            </button>
          </div>
          <button className="submitBtn" onClick={setProfilePicture}>
            Set as profile picture
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f6fa;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  height: 100vh;
  overflow: auto;
  /* overflow: auto; */
  .loader {
    max-inline-size: 100%;
    width: 20%;
  }
  .titleContainer {
    h1 {
      color: #999999;
      text-transform: capitalize;
    }
  }
  .avatars {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      cursor: pointer;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid #16d991;
    }
  }
  .changeBtn {
    background-color: white;
    color: #57eaae;
    /* padding: 1rem 2rem; */
    border: 1px solid #57eaae;
    font-weight: bold;
    cursor: pointer;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    font-size: 2rem;
    transition: 0.5s ease-in-out;
    text-transform: capitalize;
    &:hover {
      background-color: #16d991;
      color: white;
    }
    .animate-spin {
      animation-name: spin;
      animation-duration: 1000ms;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
  .submitBtn {
    background-color: #57eaae;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    transition: 0.5s ease-in-out;
    text-transform: capitalize;
    &:hover {
      background-color: #16d991;
    }
  }
  @media only screen and (max-width: 600px) {
    .titleContainer {
      h1 {
        font-size: x-large;
        text-align: center;
      }
    }
    .avatar {
      .img {
        height: 4rem;
      }
    }
    .changeBtn {
      width: 95px;
      height: 95px;
    }
  }
`;

export default SetAvatar;
