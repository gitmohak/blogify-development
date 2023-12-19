import "./settings.css"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../../components/Modal/Modal";

export default function Settings() {
    const { user, dispatch } = useContext(Context);
    const publicFolder = "http://localhost:5000/uploaded-images/"

    const [file, setFile] = useState(null);
    const [inputUsername, setInputUsername] = useState(user.username);
    const [inputEmail, setInputEmail] = useState(user.email);
    const [inputPassword, setInputPassword] = useState("");

    const myModalRef = useRef(null);

    const [isUpdating, setIsUpdating] = useState(false);

    let profileImg = "";

    if (file)
        profileImg = URL.createObjectURL(file);

    else if (user.profilePicture)
        profileImg = publicFolder + user.profilePicture;

    else
        profileImg = "/images/profile-image.png";

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        dispatch({ type: "UPDATE_START" });

        const updatedUser = {
            userId: user._id,
            username: inputUsername,
            email: inputEmail,
            password: inputPassword
        }

        if (file) {
            const fileData = new FormData();
            const filename = Date.now() + file.name;
            fileData.append("name", filename);
            fileData.append("file", file);

            updatedUser.profilePicture = filename;

            try {
                await axios.post("/upload", fileData);
            } catch (error) {
                toast.error('Something Went Wrong while uploading image', {
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

        try {
            setIsUpdating(true);
            const { data } = await axios.put(`/user/${user._id}`, updatedUser);
            dispatch({ type: "UPDATE_SUCCESS", payload: data.userInfo });

            setIsUpdating(false);

            toast.success('Updated Successfully', {
                position: "top-center",
                autoClose: 7000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            navigate("/");
        } catch (error) {
            dispatch({ type: "UPDATE_FAILURE" });

            setIsUpdating(false);

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

    const handleDeleteStart = () => myModalRef.current.click();

    const handleDeleteAccount = async () => {
        try {
            await axios.delete(`/user/${user._id}`, {
                data: {
                    userId: user._id,
                    username: user.username
                }
            });

            toast.success('Account Deleted Successfully', {
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
        } catch (error) {
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

    return (<>
        <section className="settingsContainer">
            <div className="settings">
                <div className="innerSettings">
                    <div className="settingsTop">
                        <h1 className="text-success fw-bold">Account Settings</h1>
                        <button className="btn btn-danger btn-lg fs-4" onClick={handleDeleteStart}>Delete Account</button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="profileHeader">Profile Picture</div>
                        <div className="profileChange position-relative">
                            <img src={profileImg} alt="Profile" />


                            <label htmlFor="profileUpdateImg">
                                <span className="btn btn-success btn-lg fs-4">Change</span>
                            </label>
                        </div>

                        <input type="file" id="profileUpdateImg" hidden onChange={(event) => {
                            setFile(event.target.files[0])
                        }} accept=".jpg, .jpeg, .png" />

                        <label htmlFor="nameInput" className="profileHeader">Username</label>

                        <input className="username" id="nameInput" type="text" value={inputUsername} onChange={(e) => {
                            setInputUsername(e.target.value);
                        }} required minLength={5} maxLength={40} />

                        <label htmlFor="emailInput" className="profileHeader">Email</label>

                        <input className="username" id="emailInput" type="email" value={inputEmail} onChange={(e) => {
                            setInputEmail(e.target.value);
                        }} required minLength={5} maxLength={100} />

                        <label htmlFor="passwordInput" className="profileHeader">Password</label>

                        <input className="username" id="passwordInput" type="password" onChange={(e) => {
                            setInputPassword(e.target.value);
                        }} required minLength={5} maxLength={70} />

                        <div className="submitButton">
                            <input className="btn btn-success btn-lg fs-4" type="submit" value="Update" style={{ fontSize: "1.2rem", padding: "10px 100px" }} disabled={isUpdating} />
                        </div>
                    </form>
                </div>
            </div>
            
            <Modal myModalRef={myModalRef} message={"Do you really want to Delete your Account?"} handleDelete={handleDeleteAccount} />

        </section>
    </>
    )
}
