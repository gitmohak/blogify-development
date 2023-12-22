//Custom React hook function to enhance the functionality of a single post
import axios from "axios";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../../context/Context";
import { serverAPI } from "../../App";

function useSinglePost(setIsUpdating, setPostState) {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const location = useLocation();
    const postId = location.pathname.slice(6);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`${serverAPI}/post/${postId}`);
                setPostState(data.post);

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
        })();
        // eslint-disable-next-line
    }, [postId]);

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    const handleDelete = async () => {
        try {
            setIsUpdating(true);
            await axios.delete(`${serverAPI}/post/${postId}`, {
                data: {
                    username: user.username
                }
            });

            setIsUpdating(false);

            toast.success('Deleted Successfully', {
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
            setIsUpdating(false);

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

    return { handleDelete, user };
}

export default useSinglePost