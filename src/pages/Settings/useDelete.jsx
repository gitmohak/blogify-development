//functionality to handle Account Deletion on the Settings page
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { serverAPI } from "../../App";

function useDelete(user, dispatch) {
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        try {
            await axios.delete(`${serverAPI}/user/${user._id}`, {
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

    return handleDeleteAccount;
}

export default useDelete