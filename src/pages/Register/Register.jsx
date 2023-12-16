import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  return (
    <section className="login2">
      <span className="loginTitle2">Register</span>
      <form className="loginForm2">
        <label htmlFor="registerPgName">Username</label>
        <input className="loginInput2" id="registerPgName" type="text" placeholder="Enter your username..." />
        <label htmlFor="registerPgEmail">Email</label>
        <input className="loginInput2" id="registerPgEmail" type="email" placeholder="Enter your email..." />
        <label htmlFor="registerPgPassword">Password</label>
        <input className="loginInput2" id="registerPgPassword" type="password" placeholder="Enter your password..." />
        <button className="loginButton2">Register</button>
      </form>

      <Link to="/login" className="link">
        <button className="loginRegisterButton2">Login</button>
      </Link>
    </section>
  );
}
