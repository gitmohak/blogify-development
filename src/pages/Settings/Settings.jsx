//Settings page to Update user information with awesome functionality
import "./settings.css"
import { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context";
import Modal from "../../components/Modal/Modal";
import useSettings from "./useSettings";
import useDelete from "./useDelete";

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

    const handleDeleteStart = () => myModalRef.current.click();

    const handleSubmit = useSettings(inputPassword, setIsUpdating, dispatch, user, inputUsername, inputEmail, file);

    const handleDeleteAccount = useDelete(user, dispatch);

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

                            <button className="btn btn-danger btn-lg fs-4 responsive-delete" onClick={handleDeleteStart} >Delete Account</button>
                        </div>
                    </form>
                </div>
            </div>
            
            <Modal myModalRef={myModalRef} message={"Do you really want to Delete your Account?"} handleDelete={handleDeleteAccount} />

        </section>
    </>
    )
}