import { useLocation, useNavigate } from "react-router-dom"
import "./singlePost.css"
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context.js";
import { toast } from "react-toastify";

export default function SinglePost() {
  const location = useLocation();
  const postId = location.pathname.slice(6);
  const [postState, setPostState] = useState({});

  const [isUpdating, setIsUpdating] = useState(false);

  const navigate = useNavigate();
  const { user } = useContext(Context);

  const publicFolder = "http://localhost:5000/uploaded-images/";

  useEffect(() => {
    (async () => {

      const { data } = await axios.get(`/post/${postId}`);
      setPostState(data.post);

    })();
  }, [postId]);

  const handleDelete = async () => {
    const sure = window.confirm("Do you really want to Delete this Post?");
    if (!sure) return;

    try {
      setIsUpdating(true);
      await axios.delete(`/post/${postId}`, {
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
    }
  }

  return (
    <section className="singlePost">
      {
        postState.photo && <img src={publicFolder + postState.photo} />
      }

      <div className="titleSection">
        <div className="title">{postState.title}</div>
        {
          postState.username === user?.username &&
          <div className="actionButtons">
            <span className={`imageButton ${isUpdating ? "disabledBtn" : ""}`} onClick={handleDelete}>Delete</span>
          </div>
        }
      </div>

      <div className="subTitles">

        <p className="author"><Link to={`/?user=${postState.username}`} className="link">Author: <b>{postState.username}</b></Link></p>
        <p className="time">{new Date(postState.createdAt).toDateString()}</p>
      </div>

      <p className="description">{postState.description}</p>
    </section>
  )
}
