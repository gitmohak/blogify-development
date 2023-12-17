import { Link } from "react-router-dom";
import "./login.css";
import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context.js";

export default function Login() {
  const {isFetching, dispatch} = useContext(Context);

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "LOGIN_START"});

    try {
      const {data} = await axios.post("/auth/login", {
        email, password
      });

      dispatch({type: "LOGIN_SUCCESS", payload: data.userInfo});
    } catch (error) {
      dispatch({type: "LOGIN_FAILURE"});
      console.log(error);
    }
  }

  return (
    <section className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="loginPgName">Email</label>

        <input className="loginInput" id="loginPgName" type="email" placeholder="Enter your email..." onChange={(e) => {
          setEmail(e.target.value)
        }}/>
        
        <label htmlFor="loginPgPassword">Password</label>

        <input className="loginInput" id="loginPgPassword" type="password" placeholder="Enter your password..." onChange={(e) => {
          setPassword(e.target.value)
        }} />

        <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
      </form>

      <Link to="/register" className="link">
        <button className="loginRegisterButton">Register</button>
      </Link>
    </section>
  );
}