//Page to write a new Post very well with functionality.
import { useState } from "react"
import "./write.css"
import useWrite from "./useWrite.jsx";

export default function Write() {
    const [inputTitle, setInputTitle] = useState("");
    const [inputDescription, setInputDescription] = useState("");
    const [file, setFile] = useState(null);
    const [isPublishing, setIsPublishing] = useState(false);

    const handleSubmit = useWrite(inputTitle, inputDescription, setIsPublishing, file);

    return (
        <section className="write">
            <form onSubmit={handleSubmit}>

                {
                    <div className="imageContainer">
                        <img src={file ? URL.createObjectURL(file) : "/images/mountain.jpg"} alt="Uploaded" />
                    </div>
                }
                <div className="formItems">
                    <div className="formTop position-relative">
                        <label htmlFor="fileInput">
                            <span className="btn btn-success btn-lg">Add Image</span>
                        </label>

                        <input type="file" name="fileInput" id="fileInput" hidden onChange={(event) => {
                            setFile(event.target.files[0])
                        }}
                            accept=".jpg, .jpeg, .png"
                        />

                        <input autoComplete="on" className="writeTitle" type="text" placeholder="Click here to Write Title" autoFocus={true} onChange={(event) => {
                            setInputTitle(event.target.value)
                        }} required minLength={5} maxLength={50} />

                        <input type="submit" value="Publish" className="btn btn-success btn-lg write-publish" disabled={isPublishing} />
                    </div>

                    <textarea rows="6" placeholder="Click here to type your story..." onChange={(event) => {
                        setInputDescription(event.target.value)
                    }} required minLength={20} maxLength={5000} ></textarea>

                </div>
            </form>
        </section>
    )
}