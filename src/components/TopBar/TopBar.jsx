import { useContext } from "react";
import "./topbar.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import { toast } from "react-toastify";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);

  const navigate = useNavigate();

  const publicFolder = "http://localhost:5000/uploaded-images/";

  return (
    <nav className="topBar">
      <div className="topLeft">

        <a className="link" target="_blank" href="https://www.linkedin.com/in/mohakarora/">
          <i className="social-icon fa-brands fa-linkedin" style={{ marginLeft: 0 }}></i>
        </a>

        <a className="link" target="_blank" href="https://twitter.com/itsMohak">
          <i className="social-icon fa-brands fa-square-twitter"></i>
        </a>

        <a className="link" target="_blank" href="https://youtube.com/itsmohak">
          <i className="social-icon fa-brands fa-square-youtube"></i>
        </a>

        <a className="link" target="_blank" href="https://www.instagram.com/itsMohak/">
          <i className="social-icon fa-brands fa-square-instagram"></i>
        </a>
      </div>

      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem" style={{ marginLeft: 0 }}>
            <Link to="/" className="link">HOME</Link>
          </li>

          <li className="topListItem">
            <Link to="/about" className="link">ABOUT</Link>
          </li>

          <li className="topListItem">
            <Link to="/contact" className="link">CONTACT</Link>
          </li>

          {user && <li className="topListItem">
            <Link to="/write" className="link">WRITE</Link>
          </li>}

          {user && <li className="topListItem" onClick={() => {
            toast.success('Logged Out Successfully', {
              position: "top-center",
              autoClose: 7000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });

            dispatch({ type: "LOGOUT" });

            navigate("/");
          }}>
            LOGOUT
          </li>}

        </ul>
      </div>

      <div className="topRight">
        {user ?
          <>
            <Link to="/settings" className="link">
              <img src={user.profilePicture ? publicFolder + user.profilePicture : "/images/profile-image.png"} alt="profile" />
            </Link>

            <Link to="/settings" className="link settings-link">SETTINGS</Link>
          </>

          :

          <ul className="topList">
            <li className="topListItem">
              <Link to="/login" className="link">LOGIN</Link>
            </li>
            <li className="topListItem">
              <Link to="/register" className="link">REGISTER</Link>
            </li>
          </ul>}
      </div>
    </nav>
  )
}