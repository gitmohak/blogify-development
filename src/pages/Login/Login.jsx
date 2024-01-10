//Login Page with functionality for the Application
import { Link } from "react-router-dom";
import "./login.css";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context.js";
import useLogin from "./useLogin.jsx";

export default function Login() {
  const { isFetching, dispatch } = useContext(Context);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = useLogin(dispatch, email, password);

  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  return (
    <section className="login">
      <div className="container d-flex flex-column justify-content-center align-items-center position-relative">
        <span className="loginTitle">Login</span>

        {/* Login Page Form */}
        <form className="loginForm" onSubmit={handleSubmit}>
          <label htmlFor="loginPgName">Email</label>

          <input autoComplete="on" className="loginInput" id="loginPgName" type="email" placeholder="Enter your email..." onChange={(e) => {
            setEmail(e.target.value)
          }} required minLength={5} maxLength={100} autoFocus />

          <label htmlFor="loginPgPassword">Password</label>

          <input autoComplete="on" className="loginInput" id="loginPgPassword" type="password" placeholder="Enter your password..." onChange={(e) => {
            setPassword(e.target.value)
          }} required minLength={5} maxLength={70} />

          <button className="btn btn-danger btn-lg w-50 mx-auto fs-2 mt-5" type="submit" disabled={isFetching}>Login</button>

          <Link to="/register" className="link">
            <button className="btn btn-success btn-lg loginRegisterButton fs-4">Register</button>
          </Link>
        </form>

      </div>
    </section>
  );
}