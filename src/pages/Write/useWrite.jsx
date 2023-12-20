import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../../context/Context";

function useWrite(inputTitle, inputDescription, setIsPublishing, file) {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newPost = {
            title: inputTitle,
            description: inputDescription.split(/[\n]+/g).join('\n<br /><br />\n'),
            username: user.username
        }

        if (file) {
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

            const { data } = await axios.post("/post", newPost);
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

    return handleSubmit;
}

export default useWrite;