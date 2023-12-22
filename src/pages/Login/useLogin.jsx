//Custom React Hook function to enhance the functionality of the Login page. It handles the Login Button action.
import { toast } from 'react-toastify';
import axios from "axios";
import { serverAPI } from '../../App';

function useLogin(dispatch, email, password) {
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });

        try {
            const { data } = await axios.post(`${serverAPI}/auth/login`, {
                email: email.trim().toLowerCase(),
                password: password.trim()
            });

            dispatch({ type: "LOGIN_SUCCESS", payload: data.userInfo });

            toast.success('Logged In Successfully', {
                position: "top-center",
                autoClose: 7000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE" });

            const { response: {
                data: {
                    message
                }
            } } = error;

            if (message === "Password is incorrect")
                toast.error('Wrong Password', {
                    position: "top-center",
                    autoClose: 7000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });

            else if (message === "User not found")
                toast.error('Email does not exist', {
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

export default useLogin