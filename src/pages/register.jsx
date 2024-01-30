import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ResgisterAPI } from "./../Services/auth.service";
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  /* background-color: #131324; */
  background-color: #512b81;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    /* background-color: #00000076; */
    background-color: #2e0249;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #8468cf;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #997af0;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #997af0;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = values;
      const response = await ResgisterAPI({ username, email, password });

      if (response.success === false) {
        toast.error(`${response.msg}`, toastOptions);
      }
      if (response.success === true) {
        localStorage.setItem(
          "chat_app_user",
          JSON.stringify(response.data.user)
        );
        navigate("/");
      }
    }
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (username.length < 3) {
      toast.error("Username must be greater than 3 characters ", toastOptions);
      return false;
    } else if (email === "") {
      toast.error(" Email is required ", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password must be equal or greater than 8 characters ",
        toastOptions
      );
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Password and Confirm password do not match", toastOptions);
      return false;
    }
    return true;
  };
  useEffect(() => {
    if (localStorage.getItem("chat_app_user")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <ToastContainer />
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={logo} alt="Logo" />
            <h1>Chatty</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create Account</button>
          <span>
            already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
    </>
  );
}
