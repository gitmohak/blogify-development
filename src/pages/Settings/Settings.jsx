import "./settings.css"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Settings() {
    const [file, setFile] = useState(null);
    const [inputUsername, setInputUsername] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");

    const navigate = useNavigate();

    const { user, dispatch } = useContext(Context);

    const publicFolder = "http://localhost:5000/uploaded-images/"

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch({type: "UPDATE_START"});

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
                console.log(error);
            }
        }

        try {
            const {data} = await axios.put(`/user/${user._id}`, updatedUser);
            dispatch({type: "UPDATE_SUCCESS", payload: data.userInfo});

        } catch (error) {
            dispatch({type: "UPDATE_FAILURE"});
            console.log(error);
        }
    }

    return (<>
        <section className="settingsContainer">
            <div className="settings">
                <div className="innerSettings">
                    <div className="settingsTop">
                        <h1>Account Settings</h1>
                        <p>Delete Account</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="profileHeader">Profile Picture</div>
                        <div className="profileChange">
                            <img src={file ? URL.createObjectURL(file) : publicFolder + user.profilePicture} alt="Profile" />


                            <label htmlFor="profileUpdateImg">
                                <span className="changeButton">Change</span>
                            </label>
                        </div>

                        <input type="file" id="profileUpdateImg" hidden onChange={(event) => {
                            setFile(event.target.files[0])
                        }} accept=".jpg, .jpeg, .png" />

                        <label htmlFor="nameInput" className="profileHeader">Username</label>

                        <input className="username" id="nameInput" type="text" placeholder={user.username} onChange={(e) => {
                            setInputUsername(e.target.value);
                        }} />

                        <label htmlFor="emailInput" className="profileHeader">Email</label>

                        <input className="username" id="emailInput" type="email" placeholder={user.email} onChange={(e) => {
                            setInputEmail(e.target.value);
                        }} />

                        <label htmlFor="passwordInput" className="profileHeader">Password</label>

                        <input className="username" id="passwordInput" type="password" onChange={(e) => {
                            setInputPassword(e.target.value);
                        }} />

                        <div className="submitButton">
                            <input className="changeButton" type="submit" value="Update" style={{ fontSize: "1.2rem", padding: "10px 100px" }} />
                        </div>
                    </form>
                </div>
            </div>
            <Sidebar />
        </section>
    </>
    )
}
