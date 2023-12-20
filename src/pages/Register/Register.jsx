import { Link } from "react-router-dom";
import "./register.css";
import { useState } from "react";
import useRegister from "./useRegister";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = useRegister(username, email, password, confirmPassword, setIsRegistering);

  return (
    <section className="login2">

      <span className="loginTitle2">Register</span>
      <form className="loginForm2" onSubmit={handleSubmit}>
        <label htmlFor="registerPgName">Username</label>

        <input className="loginInput2" id="registerPgName" type="text" placeholder="Enter your username..." onChange={
          (e) => {
            setUsername(e.target.value)
          }
        } required minLength={5} maxLength={40} autoFocus />

        <label htmlFor="registerPgEmail">Email</label>

        <input className="loginInput2" id="registerPgEmail" type="email" placeholder="Enter your email..." onChange={
          (e) => {
            setEmail(e.target.value)
          }
        } required minLength={5} maxLength={100} />

        <label htmlFor="registerPgPassword">Password</label>
        <input className="loginInput2" id="registerPgPassword" type="password" placeholder="Enter your password..." onChange={
          (e) => {
            setPassword(e.target.value)
          }
        } required minLength={5} maxLength={70} />

        <label htmlFor="registerPgConfirm">Confirm Password</label>
        <input className="loginInput2" id="registerPgConfirm" type="password" placeholder="Confirm your password..." onChange={
          (e) => {
            setConfirmPassword(e.target.value)
          }
        } required minLength={5} maxLength={70} />

        <button className="btn btn-success btn-lg w-50 mx-auto fs-2 mt-5" type="submit" disabled={isRegistering}>Register</button>
      </form>

      <Link to="/login" className="link">
        <button className="btn btn-danger fs-4 loginRegisterButton2">Login</button>
      </Link>
    </section>
  );
}