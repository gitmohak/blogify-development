import "./settings.css"
import Sidebar from "../../components/Sidebar/Sidebar"

export default function Settings() {
    return (<>
        <section className="settingsContainer">
            <div className="settings">
                <div className="innerSettings">
                    <div className="settingsTop">
                        <h1>Account Settings</h1>
                        <p>Delete Account</p>
                    </div>
                    <form action="">
                        <div className="profileHeader">Profile Picture</div>
                        <div className="profileChange">
                            <img src="/images/profile.jpg" alt="Profile" />


                            <label htmlFor="profileUpdateImg">
                                <span className="changeButton">Change</span>
                            </label>
                        </div>

                        <input type="file" id="profileUpdateImg" hidden />

                        <label htmlFor="nameInput" className="profileHeader">Username</label>
                        <input className="username" id="nameInput" type="text" placeholder="Mohak" />

                        <label htmlFor="emailInput" className="profileHeader">Email</label>
                        <input className="username" id="emailInput" type="email" placeholder="mohak@gmail.com" />

                        <label htmlFor="passwordInput" className="profileHeader">Password</label>
                        <input className="username" id="passwordInput" type="password" />

                        <div className="submitButton">
                            <input className="changeButton" type="submit" value="Update" style={{ fontSize: "1.2rem", padding:"10px 100px" }} />
                        </div>
                    </form>
                </div>
            </div>
            <Sidebar />
        </section>
    </>
    )
}
