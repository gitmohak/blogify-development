import { useContext, useRef } from "react";
import "./topbar.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import { toast } from "react-toastify";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);

  const navigate = useNavigate();

  const publicFolder = "http://localhost:5000/uploaded-images/";

  const ref = useRef(null);

  document.onclick = () => {
    if (!ref.current.classList.contains('collapsed'))
      ref.current.click();
  }

  return (
    <>
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
            
            <span className="right-settings">
              <Link to="/settings" className="link settings-link">SETTINGS</Link></span>
            </>

            :

            <ul className="topList">
              <li className="topListItem">
                <Link to="/login" className="link">LOGIN</Link>
              </li>
              <li className="topListItem me-2">
                <Link to="/register" className="link">REGISTER</Link>
              </li>
            </ul>}
        </div>
      </nav>

      <nav className="navbar bg-light my-bootstrap-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold fst-italic fs-1" to="/">Blogify</Link>
          <button ref={ref} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">HOME</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/about">ABOUT</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/contact">CONTACT</Link>
              </li>


              {user && <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/write">WRITE</Link>
              </li>}

              {user && <li className="nav-item" onClick={() => {
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
                
                <Link className="nav-link active" aria-current="page">
                LOGOUT
                </Link>

              </li>}

              {user ? <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/settings">ACCOUNT SETTINGS</Link>
              </li>
                :
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/login">LOGIN</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/register">REGISTER</Link>
                  </li>
                </>}

              <li className="nav-item mt-3">
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
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}