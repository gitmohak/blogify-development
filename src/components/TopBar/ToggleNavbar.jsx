//Toggle Navbar for smaller screens
import { Link, useNavigate } from "react-router-dom";
import "./topbar.css";
import { toast } from "react-toastify";
import { useRef } from "react";

function ToggleNavbar({user, dispatch}) {
  const navigate = useNavigate();

  window.document.onclick = () => {
    if (!ref.current.classList.contains('collapsed'))
      ref.current.click();
  }

  const ref = useRef(null);

  return (
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
                <a className="link" target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/mohakarora/">
                  <i className="social-icon fa-brands fa-linkedin" style={{ marginLeft: 0 }}></i>
                </a>

                <a className="link" target="_blank" rel="noreferrer" href="https://twitter.com/itsMohak">
                  <i className="social-icon fa-brands fa-square-twitter"></i>
                </a>

                <a className="link" target="_blank" rel="noreferrer" href="https://youtube.com/itsmohak">
                  <i className="social-icon fa-brands fa-square-youtube"></i>
                </a>

                <a className="link" target="_blank" rel="noreferrer" href="https://www.instagram.com/itsMohak/">
                  <i className="social-icon fa-brands fa-square-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  )
}

export default ToggleNavbar