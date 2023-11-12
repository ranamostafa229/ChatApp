import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { FiUser } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/ApiRoutes";
import SocialButtons from "../components/SocialButtons";

function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
  const handleValidation = () => {
    const { password, confirmPassword, username } = values;
    if (password !== confirmPassword) {
      toast.warn(
        "password and cofirm password should be the same",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.warn("Username should be greater than 3", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.warn(
        "Password should be equal or greater than 8 characters",
        toastOptions
      );
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      console.log(registerRoute);
      const { password, email, username } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
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
              onChange={(e) => handleChange(e)}
            />
            <FiUser className="icon" />
          </div>
          <div className="infoInput">
            <input
              type="email"
              placeholder="Email"
              name="email"
              required={true}
              onChange={(e) => handleChange(e)}
            />
            <HiOutlineMail className="icon" />
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
          <div className="infoInput">
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              required={true}
              onChange={(e) => handleChange(e)}
            />
            <RiLockPasswordLine className="icon" />
          </div>
          <button type="submit" className="btn">
            Sign Up
          </button>
          <hr style={{ border: "1px solid #f5f6fa" }} />
          <div className="options">
            <span>OR SIGNUP WITH</span>
          </div>
          <SocialButtons />
          <span
            style={{
              textAlign: "center",
            }}
          >
            Already have an account ? <Link to={"/login"}>Login </Link>
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
      /* text-transform: uppercase; */
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: white;
    padding: 3rem 5rem;
    /* margin: 0 1rem; */
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
    .btn {
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
      padding: 1rem 1.4rem;
    }
  }
`;
export default Register;
