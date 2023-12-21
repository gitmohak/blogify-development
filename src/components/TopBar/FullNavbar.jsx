//The Full Navbar Component for larger screens
import { Link, useNavigate } from "react-router-dom";
import "./topbar.css";
import { toast } from "react-toastify";

function FullNavbar({user, dispatch}) {
    const navigate = useNavigate();
    const publicFolder = `${process.env.REACT_APP_SERVER}/uploaded-images/`;

    return (
        <nav className="topBar">
            <div className="topLeft">

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
                            <img src={user.profilePicture ? publicFolder + user.profilePicture : "/images/profile-image.png"} alt="Profile" />
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
    )
}

export default FullNavbar