import { useContext, useState } from "react"
import "./write.css"
import axios from "axios";
import { Context } from "../../context/Context.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Write() {
    const [inputTitle, setInputTitle] = useState("");
    const [inputDescription, setInputDescription] = useState("");
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const [isPublishing, setIsPublishing] = useState(false);

    const { user } = useContext(Context);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newPost = {
            title: inputTitle,
            description: inputDescription.split(/[\n]+/g).join('\n<br /><br />\n'),
            username: user.username
        }

        if(file) {
            const fileData = new FormData();
            const filename = Date.now() + file.name;
            fileData.append("name", filename);
            fileData.append("file", file);

            newPost.photo = filename;

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
        else newPost.photo = "mountain.jpg";

        try {
            setIsPublishing(true);

            const {data} = await axios.post("/post", newPost);
            navigate(`/post/${data.post._id}`);

            toast.success('Published Successfully', {
                position: "top-center",
                autoClose: 7000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            setIsPublishing(false);

        } catch (error) {
            setIsPublishing(false);

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

                        <input className="writeTitle" type="text" placeholder="Click here to Write Title" autoFocus={true} onChange={(event) => {
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
