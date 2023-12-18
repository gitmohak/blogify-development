import { useContext } from "react";
import "./topbar.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);

  const publicFolder = "http://localhost:5000/uploaded-images/";

  return (
    <nav className="topBar">
      <div className="topLeft">
        <i className="social-icon fa-brands fa-square-facebook" style={{ marginLeft: 0 }}></i>
        <i className="social-icon fa-brands fa-square-twitter"></i>
        <i className="social-icon fa-brands fa-square-youtube"></i>
        <i className="social-icon fa-brands fa-square-instagram"></i>
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
            dispatch({ type: "LOGOUT" });
          }}>
            LOGOUT
          </li>}

        </ul>
      </div>

      <div className="topRight">
        {user ? <>
          <Link to="/settings" className="link">
            <img src={publicFolder + user.profilePicture} alt="profile" />
          </Link>
          <i className="fa-solid fa-magnifying-glass"></i></>

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