import { useContext, useState } from "react"
import "./write.css"
import axios from "axios";
import { Context } from "../../context/Context.js";

export default function Write() {
    const [inputTitle, setInputTitle] = useState("");
    const [inputDescription, setInputDescription] = useState("");
    const [file, setFile] = useState(null);

    const {user} = useContext(Context);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newPost = {
            title: inputTitle,
            description: inputDescription,
            username: user.username
        }

        await axios.post("/post")
    }

    return (
        <section className="write">
            <form onSubmit={handleSubmit}>
                {
                <div className="imageContainer">
                    <img src="/images/mountain.jpg" alt="Uploaded" />
                </div>
}
                <div className="formItems">
                    <div className="formTop">
                        <label htmlFor="fileInput">
                            <span className="imageButton">Add Image</span>
                        </label>

                        <input type="file" name="fileInput" id="fileInput" hidden onChange={(event) => {
                            setFile(event.target.files[0])
                        }} 
                        accept=".jpg, .jpeg, .png"
                        />

                        <input className="writeTitle" type="text" placeholder="Title" autoFocus={true} onChange={(event) => {
                            setInputTitle(event.target.value)
                        }} />

                        <input type="submit" value="Publish" className="imageButton publishButton" />
                    </div>

                    <textarea rows="9" placeholder="Tell your story..." onChange={(event) => {
                        setInputDescription(event.target.value)
                    }}></textarea>

                </div>
            </form>
        </section>
    )
}
