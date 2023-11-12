import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import logo from "../assets/logo.svg";
import { FiUser } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/ApiRoutes";
import SocialButtons from "../components/SocialButtons";

function Login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  // const handleValidation = () => {
  //   const { username, password } = values;
  //   if (password === "") {
  //     toast.warn("password is required", toastOptions);
  //     return false;
  //   } else if (username === "") {
  //     toast.warn("Username is required", toastOptions);
  //     return false;
  //   }
  //   return true;
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (handleValidation()) {
    const { password, username } = values;
    const { data } = await axios.post(loginRoute, {
      username,
      password,
    });
    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      localStorage.setItem("userChat", JSON.stringify(data.user));
      navigate("/");
    }
    // }
  };
  useEffect(() => {
    if (localStorage.getItem("userChat")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="logo">
            <img src={logo} alt="logo" />
            <h1 className="brand">ConnentMe</h1>
          </div>
          <div className="infoInput">
            <input
              type="text"
              placeholder="Name"
              name="username"
              required={true}
              min={3}
              onChange={(e) => handleChange(e)}
            />
            <FiUser className="icon" />
          </div>

          <div className="infoInput">
            <input
              type="password"
              placeholder="Password"
              name="password"
              required={true}
              onChange={(e) => handleChange(e)}
            />
            <RiLockPasswordLine className="icon" />
          </div>

          <button type="submit" className="submit">
            Sign In
          </button>
          <hr style={{ border: "1px solid #f5f6fa" }} />
          <div className="options">
            <span>OR USE WITH</span>
          </div>
          <SocialButtons />

          <span
            style={{
              textAlign: "center",
            }}
          >
            Don't have an account ? <Link to={"/register"}> Register </Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
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
    .infoInput {
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
    .submit {
      background-color: #57eaae;
      color: white;
      padding: 1rem 2rem;
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
    .options {
      color: #999999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    span {
      color: #999999;
      text-transform: uppercase;
      font-weight: 600;

      a {
        color: #16d991;
        text-decoration: none;
        font-weight: bold;
      }
    }
    @media only screen and (max-width: 600px) {
      padding: 2rem 1.3rem;
    }
  }
`;
export default Login;
