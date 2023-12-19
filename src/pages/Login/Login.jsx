import { Link } from "react-router-dom";
import "./login.css";
import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context.js";
import { toast } from 'react-toastify';

export default function Login() {
  const { isFetching, dispatch } = useContext(Context);

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const { data } = await axios.post("/auth/login", {
        email, password
      });

      dispatch({ type: "LOGIN_SUCCESS", payload: data.userInfo });

      toast.success('Logged In Successfully', {
        position: "top-center",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });

    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });

      const { response: {
        data: {
          message
        }
      } } = error;

      if (message === "Password is incorrect")
        toast.error('Wrong Password', {
          position: "top-center",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

      else if (message === "User not found")
        toast.error('Email does not exist', {
          position: "top-center",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

      else
        toast.error('Something Went Wrong!', {
          position: "top-center",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        window.console.clear();
    }
  }

  return (
    <section className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="loginPgName">Email</label>

        <input className="loginInput" id="loginPgName" type="email" placeholder="Enter your email..." onChange={(e) => {
          setEmail(e.target.value)
        }} required minLength={5} maxLength={100} autoFocus/>

        <label htmlFor="loginPgPassword">Password</label>

        <input className="loginInput" id="loginPgPassword" type="password" placeholder="Enter your password..." onChange={(e) => {
          setPassword(e.target.value)
        }} required minLength={5} maxLength={70} />

        <button className="btn btn-danger btn-lg w-50 mx-auto fs-2 mt-5" type="submit" disabled={isFetching}>Login</button>
      </form>

      <Link to="/register" className="link">
        <button className="btn btn-success btn-lg loginRegisterButton fs-4">Register</button>
      </Link>
    </section>
  );
}
