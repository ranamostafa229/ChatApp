import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { FiUser } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { checkUsernameRoute, registerRoute } from "../utils/ApiRoutes";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebaseConfig";
import { debounce } from "../utils/Debouncing";

export default function Setusername() {
  const [values, setValues] = useState("");
  const [label, setLabel] = useState("");
  const [email, setEmail] = useState(undefined);
  const [userNameStatus, setUserNameStatus] = useState(undefined);

  const navigate = useNavigate();

  onAuthStateChanged(firebaseAuth, (userData) => {
    console.log(userData);
    if (!userData) {
      navigate("/login");
    } else {
      setEmail(
        userData.email ? userData.email : userData.providerData[0].email
      );
    }
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  const handleValidation = () => {
    if (values.length < 3) {
      toast.warn("Username should be greater than 3 characters.", toastOptions);
      return false;
    }
    return true;
  };

  const checkUsername = async (username) => {
    if (username.length > 3) {
      const { data } = await axios.post(checkUsernameRoute, { username });
      console.log(data);
      setUserNameStatus(data.status);
      setLabel(data.msg);
      setValues(username);
    }
  };
  const handleChange = debounce((name) => checkUsername(name), 500);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { data } = await axios.post(registerRoute, {
        username: values,
        email,
        password: (Math.random() + 1).toString(20).substring(1),
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("userChat", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };
  useEffect(() => {
    if (localStorage.getItem("userChat")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <FormContainer>
        {email && (
          <form onSubmit={(e) => handleSubmit(e)}>
            <span>Enter Username </span>
            <div className="row">
              <input
                className={`${
                  userNameStatus
                    ? "success"
                    : userNameStatus !== undefined
                    ? "danger"
                    : ""
                }`}
                type="text"
                placeholder="username"
                name="username"
                required={true}
                min={3}
                onChange={(e) => handleChange(e.target.value)}
              />
              <FiUser className="icon" />
            </div>
            <label
              className={`${
                userNameStatus
                  ? "success"
                  : userNameStatus !== undefined
                  ? "danger"
                  : ""
              }`}
            >
              {label}
            </label>
            <button type="submit" className="submit">
              Create User
            </button>
          </form>
        )}
      </FormContainer>
      <ToastContainer />
    </>
  );
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: #f5f6fa;
  .logo {
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 5rem;
    }
    h1 {
      color: #999999;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: white;
    padding: 3rem 5rem;
    border-radius: 1rem;
    .row {
      display: flex;
      align-items: center;
      position: relative;

      .icon {
        position: absolute;
        display: flex;
        padding: 5px;
        color: #cecece;
        height: 2rem;
        width: 2rem;
      }
    }
    label {
      display: flex;
      align-items: center;
      justify-content: center;
      /* margin: 10px 0 0 5px; */
      transition: 0.3s ease-in-out;
      height: 0.5rem;
    }
    label.success {
      color: #16d991;
    }
    label.danger {
      color: red;
    }
    input:focus + .icon {
      color: #16d991;
    }
    input {
      background-color: transparent;
      padding: 1.6rem;
      height: 1rem;
      border: 0.1rem solid #f5f6fa;
      border-radius: 0.3rem;
      color: #999999;
      width: 100%;
      font-size: 0.9rem;
      &:focus {
        border: 0.1rem solid #f5f6fa;
        outline: none;
        box-shadow: 0 4px 4px 0 #f5f6fa;
      }
    }
    .success {
      border-color: #16d991;
      &:focus {
        border-color: #16d991;
      }
    }
    .danger {
      border-color: red;
      &:focus {
        border-color: red;
      }
    }
    .submit {
      background-color: #57eaae;
      color: white;
      padding: 1rem 2rem;
      margin-top: 5px;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #16d991;
      }
    }

    span {
      color: #999999;
      font-weight: 600;
    }
  }
`;
