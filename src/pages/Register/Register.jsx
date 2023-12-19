import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsRegistering(true);
      await axios.post("/auth/register", {
        username, email, password
      });

      setIsRegistering(false);

      toast.success('Registered Successfully', {
        position: "top-center",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });

      navigate("/login");

    } catch (error) {
      setIsRegistering(false);

      const { response: {
        data: {
          message
        }
      } } = error;

      if (message.includes("duplicate key error"))
        toast.error('Username / Email is already registered', {
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

        <button className="btn btn-success btn-lg w-50 mx-auto fs-2 mt-5" type="submit" disabled={isRegistering}>Register</button>
      </form>

      <Link to="/login" className="link">
        <button className="btn btn-danger btn-lg fs-3 loginRegisterButton2">Login</button>
      </Link>
    </section>
  );
}
