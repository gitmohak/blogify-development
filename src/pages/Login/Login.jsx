import { Link } from "react-router-dom";
import "./login.css";

export default function Login() {
  return (
    <section className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm">
        <label htmlFor="loginPgEmail">Email</label>
        <input className="loginInput" id="loginPgEmail" type="email" placeholder="Enter your email..." />
        <label htmlFor="loginPgPassword">Password</label>
        <input className="loginInput" id="loginPgPassword" type="password" placeholder="Enter your password..." />
        <button className="loginButton">Login</button>
      </form>

      <Link to="/register" className="link">
        <button className="loginRegisterButton">Register</button>
      </Link>
    </section>
  );
}
