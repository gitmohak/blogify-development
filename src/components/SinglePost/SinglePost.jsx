import { useLocation } from "react-router-dom"
import "./singlePost.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SinglePost() {
  const location = useLocation();
  const postId = location.pathname.slice(6);
  const [postState, setPostState] = useState({});

  useEffect(() => {
    (async () => {

      const {data} = await axios.get(`/post/${postId}`);
      setPostState(data.post);

    })();
  }, [postId])
  

  return (
    <section className="singlePost">
      {
        postState.photo && <img src={postState.photo} />
      }
      
      <div className="titleSection">
        <div className="title">{postState.title}</div>
        <div className="actionButtons">
          <i className="fa-regular fa-pen-to-square"></i>
          <i className="fa-regular fa-trash-can"></i>
        </div>
      </div>

      <div className="subTitles">
      
        <p className="author"><Link to={`/?user=${postState.username}`} className="link">Author: <b>{postState.username}</b></Link></p>
        <p className="time">{new Date(postState.createdAt).toDateString()}</p>
      </div>

      <p className="description">{postState.description}</p>
    </section>
  )
}
