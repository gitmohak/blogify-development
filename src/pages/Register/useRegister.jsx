//Custom React Hook function to enhance the functionality of the Register page. It handles the Register Button action.
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { serverAPI } from "../../App";

function useRegister(username, email, password, confirmPassword, setIsRegistering) {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Password & Confirmation do not Match', {
                position: "top-center",
                autoClose: 7000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            return;
        }

        try {
            setIsRegistering(true);
            await axios.post(`${serverAPI}/auth/register`, {
                username: username.trim().toLowerCase(),
                email: email.trim().toLowerCase(),
                password: password.trim()
            });

            setIsRegistering(false);

            toast.success('Registered Successfully', {
                position: "top-center",
                autoClose: 7000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            navigate("/login");

        } catch (error) {
            setIsRegistering(false);

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

export default useRegister;