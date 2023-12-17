import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      await axios.post("/auth/register", {
        username, email, password
      });
  
      navigate("/login");

    } catch (error) {
      console.log(error);
      setError(true);
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
        } />

        <label htmlFor="registerPgEmail">Email</label>
        
        <input className="loginInput2" id="registerPgEmail" type="email" placeholder="Enter your email..." onChange={
          (e) => {
            setEmail(e.target.value)
          }
        } />

        <label htmlFor="registerPgPassword">Password</label>
        <input className="loginInput2" id="registerPgPassword" type="password" placeholder="Enter your password..." onChange={
          (e) => {
            setPassword(e.target.value)
          }
        } />

        <button className="loginButton2" type="submit">Register</button>

        {
          error && <span className="registerError">Something Went Wrong.</span>
        }
      </form>

      <Link to="/login" className="link">
        <button className="loginRegisterButton2">Login</button>
      </Link>
    </section>
  );
}
