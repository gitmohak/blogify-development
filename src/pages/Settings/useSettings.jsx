//functionality to handle updation of user information on the settings page
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function useSettings(inputPassword, setIsUpdating, dispatch, user, inputUsername, inputEmail, file) {
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

    return handleSubmit;
}

export default useSettings