import { Link } from "react-router-dom";
import "./login.css";
import { useContext, useState } from "react";
import { Context } from "../../context/Context.js";
import useLogin from "./useLogin.jsx";

export default function Login() {
  const { isFetching, dispatch } = useContext(Context);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = useLogin(dispatch, email, password);

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